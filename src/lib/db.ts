import { isFirebaseConfigured, db } from './firebase';
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  query,
  orderBy,
  runTransaction
} from 'firebase/firestore';

// Types
export interface Product {
  id: string;
  name: string;
  color: string;
  size: 'Small' | 'Medium' | 'Large' | 'Giant';
  price: number;
  lorryStock: number;   // Lorry / Stall stock
  category: string;
  updatedAt: number;
}

export interface SaleItem {
  productId: string;
  name: string;
  color: string;
  size: string;
  price: number;
  quantity: number;
}

export interface Sale {
  id: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  cashReceived: number;
  changeGiven: number;
  soldBy: string;
  createdAt: number;
}

export interface Shrinkage {
  id: string;
  productId: string;
  name: string;
  color: string;
  size: string;
  quantity: number;
  loggedBy: string;
  reason: 'Stolen' | 'Damaged' | 'Lost';
  createdAt: number;
}

export interface Expense {
  id: string;
  description: string;
  amount: number;
  loggedBy: string;
  createdAt: number;
}

export interface User {
  username: string;
  name: string;
  role: 'admin' | 'stock_manager' | 'seller';
  passwordHash: string;
  updatedAt: number;
}

const DB_NAME = 'teddy_bear_stall_pos_db';
const DB_VERSION = 4; // Version 4 adds Expenses Log

// Local IndexedDB Promisified Helpers
export function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('IndexedDB is only available in the browser'));
      return;
    }

    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const database = request.result;

      // Products store
      if (!database.objectStoreNames.contains('products')) {
        database.createObjectStore('products', { keyPath: 'id' });
      }

      // Sales store
      if (!database.objectStoreNames.contains('sales')) {
        database.createObjectStore('sales', { keyPath: 'id' });
      }

      // Users store
      if (!database.objectStoreNames.contains('users')) {
        database.createObjectStore('users', { keyPath: 'username' });
      }

      // Shrinkage store
      if (!database.objectStoreNames.contains('shrinkage')) {
        database.createObjectStore('shrinkage', { keyPath: 'id' });
      }

      // Expenses store
      if (!database.objectStoreNames.contains('expenses')) {
        database.createObjectStore('expenses', { keyPath: 'id' });
      }
    };
  });
}

// ----------------------------------------------------
// PRODUCTS SERVICE
// ----------------------------------------------------
export async function getProducts(): Promise<Product[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'products'), orderBy('name', 'asc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Product));
    } catch (e) {
      console.warn("Firestore getProducts failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('products', 'readonly');
    const store = tx.objectStore('products');
    const req = store.getAll();
    req.onsuccess = () => {
      resolve(req.result);
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveProductLocal(product: Product): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'products', product.id);
      await setDoc(docRef, product);
      return;
    } catch (e) {
      console.warn("Firestore saveProduct failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    store.put(product);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteProductLocal(id: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'products', id);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.warn("Firestore deleteProduct failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('products', 'readwrite');
    const store = tx.objectStore('products');
    store.delete(id);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ----------------------------------------------------
// SALES SERVICE
// ----------------------------------------------------
export async function getSales(): Promise<Sale[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'sales'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Sale));
    } catch (e) {
      console.warn("Firestore getSales failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('sales', 'readonly');
    const store = tx.objectStore('sales');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result.sort((a, b) => b.createdAt - a.createdAt));
    req.onerror = () => reject(req.error);
  });
}

export async function recordSaleLocal(sale: Sale): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await runTransaction(db, async (transaction) => {
        for (const item of sale.items) {
          const pRef = doc(db!, 'products', item.productId);
          const pDoc = await transaction.get(pRef);
          if (!pDoc.exists()) {
            throw new Error(`Product ${item.name} does not exist!`);
          }
          const currentLorryStock = pDoc.data().lorryStock || 0;
          if (currentLorryStock < item.quantity) {
            throw new Error(`Insufficient lorry stock for ${item.name}!`);
          }
          transaction.update(pRef, {
            lorryStock: currentLorryStock - item.quantity,
            updatedAt: Date.now()
          });
        }
        const saleRef = doc(db!, 'sales', sale.id);
        transaction.set(saleRef, sale);
      });
      return;
    } catch (e) {
      console.warn("Firestore recordSale transaction failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction(['sales', 'products'], 'readwrite');
    const sStore = tx.objectStore('sales');
    const pStore = tx.objectStore('products');

    sStore.put(sale);

    // Deduct ONLY from Lorry/Stall stock
    for (const item of sale.items) {
      const getReq = pStore.get(item.productId);
      getReq.onsuccess = () => {
        const prod = getReq.result as Product | undefined;
        if (prod) {
          prod.lorryStock = Math.max(0, prod.lorryStock - item.quantity);
          prod.updatedAt = Date.now();
          pStore.put(prod);
        }
      };
    }

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ----------------------------------------------------
// SHRINKAGE SERVICE
// ----------------------------------------------------
export async function getShrinkage(): Promise<Shrinkage[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'shrinkage'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Shrinkage));
    } catch (e) {
      console.warn("Firestore getShrinkage failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('shrinkage', 'readonly');
    const store = tx.objectStore('shrinkage');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result.sort((a, b) => b.createdAt - a.createdAt));
    req.onerror = () => reject(req.error);
  });
}

export async function recordShrinkageLocal(shrink: Shrinkage): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      await runTransaction(db, async (transaction) => {
        const pRef = doc(db!, 'products', shrink.productId);
        const pDoc = await transaction.get(pRef);
        if (!pDoc.exists()) {
          throw new Error('Product does not exist!');
        }

        const currentLorry = pDoc.data().lorryStock || 0;
        if (currentLorry < shrink.quantity) {
          throw new Error(`Insufficient lorry stock to register loss. Available: ${currentLorry}`);
        }

        transaction.update(pRef, {
          lorryStock: currentLorry - shrink.quantity,
          updatedAt: Date.now()
        });

        const sRef = doc(db!, 'shrinkage', shrink.id);
        transaction.set(sRef, shrink);
      });
      return;
    } catch (e) {
      console.warn("Firestore recordShrinkage transaction failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction(['shrinkage', 'products'], 'readwrite');
    const sStore = tx.objectStore('shrinkage');
    const pStore = tx.objectStore('products');

    sStore.put(shrink);

    // Deduct ONLY from Lorry/Stall stock
    const getReq = pStore.get(shrink.productId);
    getReq.onsuccess = () => {
      const prod = getReq.result as Product | undefined;
      if (prod) {
        prod.lorryStock = Math.max(0, prod.lorryStock - shrink.quantity);
        prod.updatedAt = Date.now();
        pStore.put(prod);
      }
    };

    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ----------------------------------------------------
// EXPENSES SERVICE
// ----------------------------------------------------
export async function getExpenses(): Promise<Expense[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'expenses'), orderBy('createdAt', 'desc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ id: d.id, ...d.data() } as Expense));
    } catch (e) {
      console.warn("Firestore getExpenses failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('expenses', 'readonly');
    const store = tx.objectStore('expenses');
    const req = store.getAll();
    req.onsuccess = () => resolve(req.result.sort((a, b) => b.createdAt - a.createdAt));
    req.onerror = () => reject(req.error);
  });
}

export async function recordExpenseLocal(expense: Expense): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'expenses', expense.id);
      await setDoc(docRef, expense);
      return;
    } catch (e) {
      console.warn("Firestore recordExpense failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('expenses', 'readwrite');
    const store = tx.objectStore('expenses');
    store.put(expense);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

// ----------------------------------------------------
// USERS SERVICE
// ----------------------------------------------------
export async function getUsers(): Promise<User[]> {
  if (isFirebaseConfigured && db) {
    try {
      const q = query(collection(db, 'users'), orderBy('name', 'asc'));
      const snap = await getDocs(q);
      return snap.docs.map(d => ({ username: d.id, ...d.data() } as User));
    } catch (e) {
      console.warn("Firestore getUsers failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('users', 'readonly');
    const store = tx.objectStore('users');
    const req = store.getAll();
    req.onsuccess = () => {
      if (req.result.length === 0) {
        const defaults: User[] = [
          { username: 'admin', name: 'Pasindu (Admin)', role: 'admin', passwordHash: 'admin123', updatedAt: Date.now() },
        ];
        const writeTx = localDb.transaction('users', 'readwrite');
        const writeStore = writeTx.objectStore('users');
        for (const d of defaults) {
          writeStore.put(d);
        }
        resolve(defaults);
      } else {
        resolve(req.result);
      }
    };
    req.onerror = () => reject(req.error);
  });
}

export async function saveUserLocal(user: User): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'users', user.username);
      await setDoc(docRef, user);
      return;
    } catch (e) {
      console.warn("Firestore saveUser failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    store.put(user);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export async function deleteUserLocal(username: string): Promise<void> {
  if (isFirebaseConfigured && db) {
    try {
      const docRef = doc(db, 'users', username);
      await deleteDoc(docRef);
      return;
    } catch (e) {
      console.warn("Firestore deleteUser failed. Falling back to Local IndexedDB:", e);
    }
  }

  const localDb = await openDB();
  return new Promise((resolve, reject) => {
    const tx = localDb.transaction('users', 'readwrite');
    const store = tx.objectStore('users');
    store.delete(username);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}
