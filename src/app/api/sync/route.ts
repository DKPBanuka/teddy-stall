import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'src', 'data');
const DB_FILE = path.join(DATA_DIR, 'server-db.json');

// Interface matching the db.ts definitions
interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
  minStock: number;
  updatedAt: number;
}

interface Sale {
  id: string;
  items: any[];
  total: number;
  soldBy: string;
  createdAt: number;
}

interface User {
  username: string;
  name: string;
  role: 'admin' | 'stock_manager' | 'seller';
  passwordHash: string;
  updatedAt: number;
}

interface ServerState {
  products: Product[];
  sales: Sale[];
  users: User[];
}

const DEFAULT_STATE: ServerState = {
  products: [
    { id: 'p1', name: 'Classic Brown Teddy Bear', price: 25.0, quantity: 45, category: 'Classic', minStock: 10, updatedAt: 1719727200000 },
    { id: 'p2', name: 'Giant Cuddle Panda', price: 49.99, quantity: 12, category: 'Giant Plushes', minStock: 5, updatedAt: 1719727200000 },
    { id: 'p3', name: 'Pink Ribbon Teddy', price: 19.99, quantity: 8, category: 'Classic', minStock: 10, updatedAt: 1719727200000 },
    { id: 'p4', name: 'Mini Keychain Bear', price: 5.5, quantity: 120, category: 'Miniatures', minStock: 20, updatedAt: 1719727200000 },
    { id: 'p5', name: 'Glow-in-the-dark Teddy', price: 29.99, quantity: 3, category: 'Special Edition', minStock: 5, updatedAt: 1719727200000 },
  ],
  sales: [
    {
      id: 's1',
      items: [{ productId: 'p1', name: 'Classic Brown Teddy Bear', price: 25.0, quantity: 2 }],
      total: 50.0,
      soldBy: 'seller',
      createdAt: 1719729000000
    }
  ],
  users: [
    { username: 'admin', name: 'Pasindu (Admin)', role: 'admin', passwordHash: 'admin123', updatedAt: 1719727200000 },
    { username: 'manager', name: 'Nimal (Stock Manager)', role: 'stock_manager', passwordHash: 'manager123', updatedAt: 1719727200000 },
    { username: 'seller', name: 'Kamal (Seller)', role: 'seller', passwordHash: 'seller123', updatedAt: 1719727200000 },
  ],
};

function readDB(): ServerState {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(DEFAULT_STATE, null, 2), 'utf-8');
    return DEFAULT_STATE;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(raw);
  } catch (error) {
    console.error('Failed to read server DB file, returning defaults:', error);
    return DEFAULT_STATE;
  }
}

function writeDB(state: ServerState) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  fs.writeFileSync(DB_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

export async function GET() {
  const db = readDB();
  return NextResponse.json(db);
}

export async function POST(req: NextRequest) {
  try {
    const syncItems = await req.json();
    if (!Array.isArray(syncItems)) {
      return NextResponse.json({ error: 'Payload must be an array of sync items' }, { status: 400 });
    }

    const db = readDB();

    for (const item of syncItems) {
      const { action, payload } = item;

      switch (action) {
        case 'UPSERT_PRODUCT': {
          const index = db.products.findIndex(p => p.id === payload.id);
          if (index !== -1) {
            // Merge or replace (last write wins based on request order)
            db.products[index] = { ...db.products[index], ...payload };
          } else {
            db.products.push(payload);
          }
          break;
        }

        case 'DELETE_PRODUCT': {
          db.products = db.products.filter(p => p.id !== payload.id);
          break;
        }

        case 'RECORD_SALE': {
          // Check if sale already processed to avoid duplicates
          if (!db.sales.some(s => s.id === payload.id)) {
            db.sales.push(payload);

            // Subtract inventory on the server database
            for (const item of payload.items) {
              const prod = db.products.find(p => p.id === item.productId);
              if (prod) {
                prod.quantity = Math.max(0, prod.quantity - item.quantity);
                prod.updatedAt = Date.now();
              }
            }
          }
          break;
        }

        case 'UPSERT_USER': {
          const index = db.users.findIndex(u => u.username === payload.username);
          if (index !== -1) {
            db.users[index] = { ...db.users[index], ...payload };
          } else {
            db.users.push(payload);
          }
          break;
        }

        case 'DELETE_USER': {
          db.users = db.users.filter(u => u.username !== payload.username);
          break;
        }

        default:
          console.warn(`Unknown sync action: ${action}`);
      }
    }

    writeDB(db);

    return NextResponse.json({ success: true, db });
  } catch (error: any) {
    console.error('Sync POST processing error:', error);
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
