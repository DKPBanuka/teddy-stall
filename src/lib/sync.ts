import {
  getSyncQueue,
  deleteSyncItem,
  openDB,
  Product,
  Sale,
  User,
  saveProductLocal,
  saveUserLocal,
  recordSaleLocal
} from './db';

export interface SyncStatus {
  status: 'synced' | 'pending' | 'syncing' | 'error' | 'offline';
  lastSynced: number | null;
  errorMessage?: string;
  pendingCount: number;
}

type StatusListener = (status: SyncStatus) => void;
const listeners = new Set<StatusListener>();

let currentStatus: SyncStatus = {
  status: 'synced',
  lastSynced: typeof window !== 'undefined' ? Number(localStorage.getItem('last_synced') || 0) || null : null,
  pendingCount: 0
};

export function subscribeToSyncStatus(listener: StatusListener) {
  listeners.add(listener);
  listener(currentStatus);
  return () => {
    listeners.delete(listener);
  };
}

function updateStatus(newStatus: Partial<SyncStatus>) {
  currentStatus = { ...currentStatus, ...newStatus };
  if (currentStatus.lastSynced) {
    localStorage.setItem('last_synced', currentStatus.lastSynced.toString());
  }
  listeners.forEach(l => l(currentStatus));
}

// Function to check if server is reachable (online status)
export async function checkOnlineStatus(): Promise<boolean> {
  if (typeof window !== 'undefined' && !navigator.onLine) {
    return false;
  }
  try {
    const res = await fetch('/api/sync', { method: 'GET', cache: 'no-store' });
    return res.ok;
  } catch {
    return false;
  }
}

// Update the pending items count indicator
export async function refreshPendingCount() {
  try {
    const queue = await getSyncQueue();
    updateStatus({ pendingCount: queue.length });
    if (queue.length > 0 && currentStatus.status === 'synced') {
      updateStatus({ status: 'pending' });
    }
  } catch (err) {
    console.error('Failed to get sync queue count:', err);
  }
}

// The main bidirectional sync function
export async function synchronize(): Promise<boolean> {
  const isOnline = await checkOnlineStatus();
  if (!isOnline) {
    updateStatus({ status: 'offline' });
    return false;
  }

  updateStatus({ status: 'syncing' });

  try {
    // 1. Get queue items
    const queue = await getSyncQueue();
    
    // 2. If we have pending local changes, send them to the server
    if (queue.length > 0) {
      const res = await fetch('/api/sync', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(queue),
      });

      if (!res.ok) {
        throw new Error(`Server returned error status: ${res.status}`);
      }

      // Sync successful! Delete synced items from IndexedDB queue
      for (const item of queue) {
        if (item.id !== undefined) {
          await deleteSyncItem(item.id);
        }
      }
    }

    // 3. Pull down latest database state from the server to refresh local client DB
    const getRes = await fetch('/api/sync', { cache: 'no-store' });
    if (!getRes.ok) {
      throw new Error(`Failed to fetch server data: ${getRes.status}`);
    }

    const serverData = await getRes.json();
    const db = await openDB();

    // Refresh products store
    const pTx = db.transaction('products', 'readwrite');
    const pStore = pTx.objectStore('products');
    pStore.clear();
    for (const prod of serverData.products as Product[]) {
      pStore.put(prod);
    }
    await new Promise<void>((resolve, reject) => {
      pTx.oncomplete = () => resolve();
      pTx.onerror = () => reject(pTx.error);
    });

    // Refresh sales store
    const sTx = db.transaction('sales', 'readwrite');
    const sStore = sTx.objectStore('sales');
    sStore.clear();
    for (const sale of serverData.sales as Sale[]) {
      sStore.put(sale);
    }
    await new Promise<void>((resolve, reject) => {
      sTx.oncomplete = () => resolve();
      sTx.onerror = () => reject(sTx.error);
    });

    // Refresh users store
    const uTx = db.transaction('users', 'readwrite');
    const uStore = uTx.objectStore('users');
    uStore.clear();
    for (const user of serverData.users as User[]) {
      uStore.put(user);
    }
    await new Promise<void>((resolve, reject) => {
      uTx.oncomplete = () => resolve();
      uTx.onerror = () => reject(uTx.error);
    });

    updateStatus({
      status: 'synced',
      lastSynced: Date.now(),
      pendingCount: 0,
      errorMessage: undefined
    });
    return true;

  } catch (error: any) {
    console.error('Synchronization failed:', error);
    updateStatus({
      status: 'error',
      errorMessage: error.message || 'Unknown synchronization error'
    });
    return false;
  }
}

// Auto-sync listener initialization
export function initAutoSync() {
  if (typeof window === 'undefined') return;

  // Refresh counts on startup
  refreshPendingCount();

  // Listen for browser coming online
  window.addEventListener('online', () => {
    synchronize();
  });

  // Periodically check/sync every 30 seconds
  const interval = setInterval(() => {
    refreshPendingCount().then(() => {
      if (currentStatus.pendingCount > 0) {
        synchronize();
      }
    });
  }, 30000);

  return () => {
    clearInterval(interval);
  };
}
