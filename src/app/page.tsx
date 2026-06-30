'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { isFirebaseConfigured } from '@/lib/firebase';
import {
  Product,
  Sale,
  User,
  Shrinkage,
  Expense,
  getProducts,
  getSales,
  getUsers,
  saveProductLocal,
  deleteProductLocal,
  recordSaleLocal,
  getShrinkage,
  recordShrinkageLocal,
  saveUserLocal,
  deleteUserLocal,
  getExpenses,
  recordExpenseLocal
} from '@/lib/db';
import {
  LogOut,
  UserPlus,
  Trash2,
  Plus,
  Edit2,
  TrendingUp,
  AlertTriangle,
  RefreshCw,
  ShoppingCart,
  Package,
  Users,
  DollarSign,
  Search,
  X,
  CheckCircle,
  Moon,
  Sun,
  ShoppingBag,
  ListFilter,
  FileText,
  AlertCircle,
  TrendingDown,
  Percent,
  Menu,
  ChevronRight,
  Calendar
} from 'lucide-react';

// Unified Color to Hex Converter
export function getColorHex(color: string): string {
  const resolvedColor = (color || '').toLowerCase();
  if (resolvedColor.includes('pink')) return '#f472b6';
  if (resolvedColor.includes('white')) return '#e4e4e7';
  if (resolvedColor.includes('blue')) return '#60a5fa';
  if (resolvedColor.includes('purple')) return '#c084fc';
  if (resolvedColor.includes('beige') || resolvedColor.includes('cream')) return '#fef3c7';
  if (resolvedColor.includes('gold') || resolvedColor.includes('caramel') || resolvedColor.includes('yellow')) return '#fbbf24';
  if (resolvedColor.includes('black')) return '#27272a';
  if (resolvedColor.includes('green')) return '#10b981';
  if (resolvedColor.includes('grey') || resolvedColor.includes('gray')) return '#9ca3af';
  if (resolvedColor.includes('brown')) return '#b45309';
  if (resolvedColor.includes('red')) return '#ef4444';
  return '#d1d5db'; // default light grey
}

// Dynamic SVG Toy Icon (Teddy, Dino, Unicorn, Elephant, Penguin)
function ToyIcon({ category, color, className = "w-12 h-12" }: { category?: string; color: string; className?: string }) {
  const fillHex = getColorHex(color);
  const resolvedCategory = (category || '').toLowerCase();

  return (
    <div className="p-2 rounded-2xl flex items-center justify-center bg-zinc-50 dark:bg-zinc-800/80 border border-zinc-100 dark:border-zinc-700/40 shrink-0 shadow-xs">
      {resolvedCategory === 'dino' ? (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: fillHex }}>
          <path d="M20,60 Q30,30 50,30 Q65,30 75,50 Q85,55 90,50 Q85,65 80,75 Q65,85 45,85 Q20,85 20,60" />
          <circle cx="50" cy="30" r="14" />
          <circle cx="43" cy="27" r="2" fill="#000" />
          <polygon points="62,20 68,15 67,23" fill="#ef4444" />
          <polygon points="73,32 80,28 77,36" fill="#ef4444" />
          <polygon points="80,48 88,45 84,53" fill="#ef4444" />
          <ellipse cx="38" cy="85" rx="8" ry="4" />
          <ellipse cx="62" cy="85" rx="8" ry="4" />
        </svg>
      ) : resolvedCategory === 'unicorn' ? (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: fillHex }}>
          <path d="M30,75 C30,55 45,35 60,35 C70,35 80,45 80,55 C80,65 70,75 55,75 C45,75 30,75 30,75 Z" />
          <circle cx="65" cy="45" r="17" />
          <circle cx="58" cy="42" r="2" fill="#000" />
          <polygon points="70,30 85,10 75,27" fill="#facc15" />
          <path d="M55,30 Q45,45 42,65" stroke="#f472b6" strokeWidth="4" strokeLinecap="round" />
          <ellipse cx="78" cy="48" rx="3" ry="5" fill="#fda4af" opacity="0.6" />
        </svg>
      ) : resolvedCategory === 'elephant' ? (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: fillHex }}>
          <circle cx="50" cy="55" r="23" />
          <circle cx="50" cy="40" r="15" />
          <ellipse cx="32" cy="35" rx="12" ry="10" />
          <ellipse cx="68" cy="35" rx="12" ry="10" />
          <path d="M50,45 Q50,60 40,58 Q38,57 40,54" fill="none" stroke="#27272a" strokeWidth="3" strokeLinecap="round" />
          <circle cx="45" cy="38" r="1.5" fill="#000" />
          <circle cx="55" cy="38" r="1.5" fill="#000" />
          <circle cx="38" cy="76" r="6" />
          <circle cx="62" cy="76" r="6" />
        </svg>
      ) : resolvedCategory === 'penguin' ? (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: fillHex }}>
          <ellipse cx="50" cy="55" rx="23" ry="28" />
          <ellipse cx="50" cy="58" rx="15" ry="18" fill="#ffffff" />
          <circle cx="45" cy="38" r="2" fill="#000" />
          <circle cx="55" cy="38" r="2" fill="#000" />
          <polygon points="50,42 46,47 54,47" fill="#f97316" />
          <ellipse cx="38" cy="81" rx="6" ry="3.5" fill="#f97316" />
          <ellipse cx="62" cy="81" rx="6" ry="3.5" fill="#f97316" />
        </svg>
      ) : (
        <svg viewBox="0 0 100 100" className={className} style={{ fill: fillHex }}>
          <circle cx="50" cy="50" r="30" />
          <circle cx="25" cy="25" r="12" />
          <circle cx="75" cy="25" r="12" />
          <circle cx="25" cy="25" r="6" fill="#f43f5e" opacity="0.3" />
          <circle cx="75" cy="25" r="6" fill="#f43f5e" opacity="0.3" />
          <circle cx="50" cy="58" r="10" fill="#ffffff" />
          <ellipse cx="50" cy="54" rx="4" ry="2" fill="#000000" />
          <circle cx="40" cy="45" r="3" fill="#000000" />
          <circle cx="60" cy="45" r="3" fill="#000000" />
        </svg>
      )}
    </div>
  );
}

export default function Dashboard() {
  const { user, loading, logout, isAdmin, isStockManager, isSeller } = useAuth();
  const router = useRouter();

  // Navigation and Layout Theme
  const [activeTab, setActiveTab] = useState<'pos' | 'stock' | 'stock_details' | 'expenses' | 'reports' | 'users'>('pos');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Application Data States
  const [products, setProducts] = useState<Product[]>([]);
  const [sales, setSales] = useState<Sale[]>([]);
  const [shrinkageLogs, setShrinkageLogs] = useState<Shrinkage[]>([]);
  const [expensesLogs, setExpensesLogs] = useState<Expense[]>([]);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [loadingData, setLoadingData] = useState(true);

  // POS State
  const [cart, setCart] = useState<{ product: Product; quantity: number }[]>([]);
  const [discountAmt, setDiscountAmt] = useState<string>('');
  const [cartDiscountType, setCartDiscountType] = useState<'0' | '100' | '200' | '300' | 'custom'>('0');
  const [cashReceived, setCashReceived] = useState<string>('');
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 1500);
  };

  // Checkout Overlay Screen State
  const [checkoutScreenActive, setCheckoutScreenActive] = useState(false);

  // Flow A: 2-Step Instant Checkout Modal State
  const [activeQuickProduct, setActiveQuickProduct] = useState<Product | null>(null);
  const [quickSize, setQuickSize] = useState<string>('Medium');
  const [quickColor, setQuickColor] = useState<string>('Brown');
  const [quickQty, setQuickQty] = useState<number>(1);
  const [quickDiscount, setQuickDiscount] = useState<string>('');
  const [quickDiscountType, setQuickDiscountType] = useState<'0' | '100' | '200' | '300' | 'custom'>('0');

  // Shrinkage State
  const [shrinkProductId, setShrinkProductId] = useState('');
  const [shrinkQty, setShrinkQty] = useState<number>(0);
  const [shrinkReason, setShrinkReason] = useState<'Stolen' | 'Damaged' | 'Lost'>('Stolen');

  // Add Expense Mockup Fields
  const [expenseName, setExpenseName] = useState('');
  const [expenseAmountVal, setExpenseAmountVal] = useState<string>('');
  const [expenseCategory, setExpenseCategory] = useState('Food');
  const [expenseDate, setExpenseDate] = useState(new Date().toISOString().split('T')[0]);
  const [expenseNotes, setExpenseNotes] = useState('');

  // Catalog Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRangeFilter, setPriceRangeFilter] = useState<'All' | 'Under500' | '500-1000' | '1000-1500' | 'Above1500'>('All');

  // CRUD Product Modals
  const [showProductModal, setShowProductModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '', color: '', size: undefined, price: undefined, lorryStock: undefined, category: 'Teddy'
  });
  const [variantQueue, setVariantQueue] = useState<{ id?: string; color: string; size: 'Small' | 'Medium' | 'Large' | 'Giant'; price: number; lorryStock: number }[]>([]);
  const [deletedVariantIds, setDeletedVariantIds] = useState<string[]>([]);

  // CRUD User Modals
  const [showUserModal, setShowUserModal] = useState(false);
  const [userForm, setUserForm] = useState<Partial<User>>({
    username: '', name: '', role: 'seller', passwordHash: ''
  });

  // Reports Date Filters
  const [reportsFilterType, setReportsFilterType] = useState<'all' | 'today' | 'yesterday' | '7days' | 'month' | 'custom'>('all');
  const [reportsStartDate, setReportsStartDate] = useState<string>('');
  const [reportsEndDate, setReportsEndDate] = useState<string>('');

  // Guard page load
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // Set default tab based on role
  useEffect(() => {
    if (user) {
      if (isSeller) {
        setActiveTab('pos');
      } else if (isStockManager) {
        setActiveTab('stock');
      } else {
        setActiveTab('pos');
      }
    }
  }, [user, isSeller, isStockManager]);

  // Handle Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme as 'light' | 'dark');
    if (savedTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Load Data
  const loadStoreData = async () => {
    setLoadingData(true);
    try {
      const prods = await getProducts();
      setProducts(prods);

      const sls = await getSales();
      setSales(sls);

      const shrnk = await getShrinkage();
      setShrinkageLogs(shrnk);

      const exp = await getExpenses();
      setExpensesLogs(exp);

      const usrs = await getUsers();
      setUsersList(usrs);

      if (prods.length > 0) {
        setShrinkProductId(prods[0].id);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    if (user) {
      loadStoreData();
    }
  }, [user]);

  // Trigger dynamic checks in Quick Checkout Modal when size or color changes
  useEffect(() => {
    if (activeQuickProduct) {
      const match = products.find(
        p => p.name === activeQuickProduct.name && p.size === quickSize && p.color === quickColor
      );
      if (match) {
        setActiveQuickProduct(match);
      }
    }
  }, [quickSize, quickColor, products]);

  // Sync discount value with quick type selections
  useEffect(() => {
    if (quickDiscountType === '0') setQuickDiscount('0');
    else if (quickDiscountType === '100') setQuickDiscount('100');
    else if (quickDiscountType === '200') setQuickDiscount('200');
    else if (quickDiscountType === '300') setQuickDiscount('300');
  }, [quickDiscountType]);

  useEffect(() => {
    if (cartDiscountType === '0') setDiscountAmt('0');
    else if (cartDiscountType === '100') setDiscountAmt('100');
    else if (cartDiscountType === '200') setDiscountAmt('200');
    else if (cartDiscountType === '300') setDiscountAmt('300');
  }, [cartDiscountType]);

  // --- Cart Actions ---
  const addToCart = (product: Product) => {
    const availableLorryStock = product.lorryStock;
    if (availableLorryStock <= 0) return;

    const existing = cart.find(item => item.product.id === product.id);
    if (existing) {
      if (existing.quantity >= availableLorryStock) return;
      setCart(cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  const updateCartQty = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.product.id === productId) {
        const newQty = item.quantity + delta;
        if (newQty <= 0) return null;
        if (newQty > item.product.lorryStock) return item;
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(Boolean) as any);
  };

  // Calculations for Multi-Cart
  const cartSubtotal = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const discountAmount = Number(discountAmt || 0);
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const changeDue = cashReceived ? Math.max(0, Number(cashReceived) - cartTotal) : 0;

  // Perform multi checkout
  const handlePOSCheckout = async () => {
    if (cart.length === 0 || !user) return;
    const numCash = Number(cashReceived || 0);
    if (numCash < cartTotal) {
      alert('Cash received is less than total amount!');
      return;
    }

    const saleItems = cart.map(item => ({
      productId: item.product.id,
      name: item.product.name,
      color: item.product.color,
      size: item.product.size,
      price: item.product.price,
      quantity: item.quantity
    }));

    const sale: Sale = {
      id: 'sale_' + Math.random().toString(36).substr(2, 9),
      items: saleItems,
      subtotal: Number(cartSubtotal.toFixed(2)),
      discount: Number(discountAmount.toFixed(2)),
      total: Number(cartTotal.toFixed(2)),
      cashReceived: Number(numCash.toFixed(2)),
      changeGiven: Number(changeDue.toFixed(2)),
      soldBy: user?.name || 'Unknown',
      createdAt: Date.now()
    };

    try {
      await recordSaleLocal(sale);
      showToast(`Sale recorded! Rs. ${sale.total}`);
      setCart([]);
      setCashReceived('');
      setDiscountAmt('0');
      setCartDiscountType('0');
      setCheckoutScreenActive(false);
      setMobileCartOpen(false);
      await loadStoreData();
    } catch (err: any) {
      alert('Checkout failed: ' + err.message);
    }
  };

  // --- Flow A: Quick Single-Item Checkout ---
  const handleQuickCheckoutConfirm = async () => {
    if (!activeQuickProduct || !user) return;
    const itemSubtotal = activeQuickProduct.price * quickQty;
    const itemDiscount = Number(quickDiscount || 0);
    const itemTotal = Math.max(0, itemSubtotal - itemDiscount);

    const sale: Sale = {
      id: 'sale_' + Math.random().toString(36).substr(2, 9),
      items: [{
        productId: activeQuickProduct.id,
        name: activeQuickProduct.name,
        color: activeQuickProduct.color,
        size: activeQuickProduct.size,
        price: activeQuickProduct.price,
        quantity: quickQty
      }],
      subtotal: Number(itemSubtotal.toFixed(2)),
      discount: Number(itemDiscount.toFixed(2)),
      total: Number(itemTotal.toFixed(2)),
      cashReceived: Number(itemTotal.toFixed(2)),
      changeGiven: 0,
      soldBy: user?.name || 'Unknown',
      createdAt: Date.now()
    };

    try {
      await recordSaleLocal(sale);
      showToast(`Sale recorded! Rs. ${sale.total}`);
      setActiveQuickProduct(null);
      setQuickQty(1);
      setQuickDiscount('');
      setQuickDiscountType('0');
      await loadStoreData();
    } catch (err: any) {
      alert('Checkout failed: ' + err.message);
    }
  };

  // --- Add Expense Actions ---
  const handleSaveExpense = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!expenseName || !expenseAmountVal || !user) return;

    const expense: Expense = {
      id: 'exp_' + Math.random().toString(36).substr(2, 9),
      description: `${expenseName.trim()} (${expenseCategory})` + (expenseNotes ? ` - ${expenseNotes.trim()}` : ''),
      amount: Number(expenseAmountVal),
      loggedBy: user?.name || 'Unknown',
      createdAt: new Date(expenseDate).getTime() || Date.now()
    };

    try {
      await recordExpenseLocal(expense);
      setExpenseName('');
      setExpenseAmountVal('');
      setExpenseNotes('');
      alert('Daily Expense logged successfully!');
      await loadStoreData();
    } catch (err: any) {
      alert('Failed to log expense: ' + err.message);
    }
  };

  // --- Loss/Shrinkage Action ---
  const handleShrinkageLog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!shrinkProductId || shrinkQty <= 0 || !user) return;

    const matchedProd = products.find(p => p.id === shrinkProductId);
    if (!matchedProd) return;

    if (matchedProd.lorryStock < shrinkQty) {
      alert(`Insufficient Lorry Stock to register loss! Lorry Stock: ${matchedProd.lorryStock}`);
      return;
    }

    const shrinkageEntry: Shrinkage = {
      id: 'sh_' + Math.random().toString(36).substr(2, 9),
      productId: shrinkProductId,
      name: matchedProd.name,
      color: matchedProd.color,
      size: matchedProd.size,
      quantity: shrinkQty,
      loggedBy: user?.name || 'Unknown',
      reason: shrinkReason,
      createdAt: Date.now()
    };

    try {
      await recordShrinkageLocal(shrinkageEntry);
      setShrinkQty(0);
      alert('Loss / Shrinkage logged successfully. Deducted from Lorry Stock.');
      await loadStoreData();
    } catch (err: any) {
      alert('Shrinkage logging failed: ' + err.message);
    }
  };

  const addVariantToQueue = () => {
    if (!productForm.color) {
      alert('Please select a color!');
      return;
    }
    if (!productForm.size) {
      alert('Please select a size!');
      return;
    }
    if (productForm.price === undefined || Number(productForm.price) <= 0) {
      alert('Please enter a valid price!');
      return;
    }

    const color = productForm.color;
    const size = productForm.size as any;
    const price = Number(productForm.price);
    const lorryStock = Number(productForm.lorryStock || 0);

    const exists = variantQueue.some(item => item.color === color && item.size === size);
    if (exists) {
      alert(`Variant ${color} - ${size} is already added to the list!`);
      return;
    }

    setVariantQueue([...variantQueue, { color, size, price, lorryStock }]);
    
    // Clear / unselect the color and size fields, and reset price and stock!
    setProductForm(prev => ({
      ...prev,
      color: '',
      size: undefined,
      price: undefined,
      lorryStock: undefined
    }));
  };

  // --- Product CRUD Actions ---
  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name) return;

    try {
      if (editingProduct) {
        // Delete removed variants
        for (const delId of deletedVariantIds) {
          await deleteProductLocal(delId);
        }

        const newNameClean = productForm.name.trim();
        const originalNameClean = editingProduct.name;
        const nameChanged = newNameClean !== originalNameClean;

        for (const item of variantQueue) {
          let finalId = item.id;
          if (nameChanged && item.id) {
            // Delete old variant record
            await deleteProductLocal(item.id);
            // Recompute new ID
            const cleanName = newNameClean.replace(/\s+/g, '_');
            const cleanColor = item.color.replace(/\s+/g, '_');
            finalId = `prod_${cleanName}_${cleanColor}_${item.size}`.toLowerCase();
          }

          const prod: Product = {
            id: finalId || `prod_${newNameClean.replace(/\s+/g, '_')}_${item.color.replace(/\s+/g, '_')}_${item.size}`.toLowerCase(),
            name: newNameClean,
            color: item.color,
            size: item.size,
            price: Number(item.price),
            lorryStock: Number(item.lorryStock),
            category: productForm.category || 'Teddy',
            updatedAt: Date.now()
          };
          await saveProductLocal(prod);
        }
      } else {
        let finalQueue = [...variantQueue];
        if (finalQueue.length === 0 && productForm.color && productForm.size && productForm.price) {
          finalQueue.push({
            color: productForm.color,
            size: productForm.size as any,
            price: Number(productForm.price),
            lorryStock: Number(productForm.lorryStock || 0)
          });
        }

        if (finalQueue.length === 0) {
          alert('Please configure and add at least one variant to the list!');
          return;
        }

        for (const item of finalQueue) {
          const cleanName = productForm.name.trim().replace(/\s+/g, '_');
          const cleanColor = item.color.replace(/\s+/g, '_');
          const variantId = `prod_${cleanName}_${cleanColor}_${item.size}`.toLowerCase();
          
          const prod: Product = {
            id: variantId,
            name: productForm.name.trim(),
            color: item.color,
            size: item.size,
            price: Number(item.price),
            lorryStock: Number(item.lorryStock),
            category: productForm.category || 'Teddy',
            updatedAt: Date.now()
          };
          await saveProductLocal(prod);
        }
      }
      setShowProductModal(false);
      setEditingProduct(null);
      setProductForm({ name: '', color: '', size: undefined, price: undefined, lorryStock: undefined, category: 'Teddy' });
      setVariantQueue([]);
      setDeletedVariantIds([]);
      await loadStoreData();
    } catch (err: any) {
      alert('Failed to save product changes: ' + err.message);
    }
  };

  const handleEditProduct = (prod: Product) => {
    const siblings = products.filter(p => p.name === prod.name);
    setEditingProduct(prod);
    setProductForm({ name: prod.name, category: prod.category });
    setVariantQueue(siblings.map(s => ({
      id: s.id,
      color: s.color,
      size: s.size,
      price: s.price,
      lorryStock: s.lorryStock
    })));
    setDeletedVariantIds([]);
    setShowProductModal(true);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await deleteProductLocal(id);
      await loadStoreData();
    } catch (err: any) {
      alert('Failed to delete product: ' + err.message);
    }
  };

  // --- User CRUD Actions ---
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userForm.username || !userForm.name || !userForm.passwordHash) return;

    const usr: User = {
      username: userForm.username.trim().toLowerCase(),
      name: userForm.name.trim(),
      role: userForm.role as any,
      passwordHash: userForm.passwordHash,
      updatedAt: Date.now()
    };

    try {
      await saveUserLocal(usr);
      setShowUserModal(false);
      setUserForm({ username: '', name: '', role: 'seller', passwordHash: '' });
      await loadStoreData();
    } catch (err: any) {
      alert('Failed to register user: ' + err.message);
    }
  };

  const handleDeleteUser = async (username: string) => {
    if (user?.username === username) {
      alert('You cannot delete yourself!');
      return;
    }
    if (!confirm(`Are you sure you want to delete user "${username}"?`)) return;

    try {
      await deleteUserLocal(username);
      await loadStoreData();
    } catch (err: any) {
      alert('Failed to delete user: ' + err.message);
    }
  };

  // Filter Catalog
  const filteredProducts = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.color.toLowerCase().includes(searchQuery.toLowerCase());
    
    let matchesPrice = true;
    if (priceRangeFilter === 'Under500') matchesPrice = p.price < 500;
    else if (priceRangeFilter === '500-1000') matchesPrice = p.price >= 500 && p.price <= 1000;
    else if (priceRangeFilter === '1000-1500') matchesPrice = p.price > 1000 && p.price <= 1500;
    else if (priceRangeFilter === 'Above1500') matchesPrice = p.price > 1500;

    return matchesSearch && matchesPrice;
  });

  // Group products by unique name for Option 2 Grid View (Now also collecting unique colors)
  const groupedCatalog = React.useMemo(() => {
    const map = new Map<string, { product: Product; totalLorryStock: number; sizes: string[]; colors: string[] }>();
    filteredProducts.forEach(p => {
      const existing = map.get(p.name);
      if (existing) {
        existing.totalLorryStock += p.lorryStock;
        if (!existing.sizes.includes(p.size)) existing.sizes.push(p.size);
        if (!existing.colors.includes(p.color)) existing.colors.push(p.color);
      } else {
        map.set(p.name, {
          product: p,
          totalLorryStock: p.lorryStock,
          sizes: [p.size],
          colors: [p.color]
        });
      }
    });
    return Array.from(map.values());
  }, [filteredProducts]);

  // Memoized Filtered Reports Datasets
  const filteredSales = React.useMemo(() => {
    return sales.filter(s => {
      const date = new Date(s.createdAt);
      if (reportsFilterType === 'all') return true;
      
      const now = new Date();
      if (reportsFilterType === 'today') {
        return date.toDateString() === now.toDateString();
      }
      if (reportsFilterType === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
      }
      if (reportsFilterType === '7days') {
        const limit = new Date();
        limit.setDate(now.getDate() - 6);
        limit.setHours(0,0,0,0);
        return date.getTime() >= limit.getTime();
      }
      if (reportsFilterType === 'month') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }
      if (reportsFilterType === 'custom') {
        if (reportsStartDate) {
          const start = new Date(reportsStartDate);
          start.setHours(0,0,0,0);
          if (date.getTime() < start.getTime()) return false;
        }
        if (reportsEndDate) {
          const end = new Date(reportsEndDate);
          end.setHours(23,59,59,999);
          if (date.getTime() > end.getTime()) return false;
        }
        return true;
      }
      return true;
    });
  }, [sales, reportsFilterType, reportsStartDate, reportsEndDate]);

  const filteredExpenses = React.useMemo(() => {
    return expensesLogs.filter(e => {
      const date = new Date(e.createdAt);
      if (reportsFilterType === 'all') return true;
      
      const now = new Date();
      if (reportsFilterType === 'today') {
        return date.toDateString() === now.toDateString();
      }
      if (reportsFilterType === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
      }
      if (reportsFilterType === '7days') {
        const limit = new Date();
        limit.setDate(now.getDate() - 6);
        limit.setHours(0,0,0,0);
        return date.getTime() >= limit.getTime();
      }
      if (reportsFilterType === 'month') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }
      if (reportsFilterType === 'custom') {
        if (reportsStartDate) {
          const start = new Date(reportsStartDate);
          start.setHours(0,0,0,0);
          if (date.getTime() < start.getTime()) return false;
        }
        if (reportsEndDate) {
          const end = new Date(reportsEndDate);
          end.setHours(23,59,59,999);
          if (date.getTime() > end.getTime()) return false;
        }
        return true;
      }
      return true;
    });
  }, [expensesLogs, reportsFilterType, reportsStartDate, reportsEndDate]);

  const filteredShrinkage = React.useMemo(() => {
    return shrinkageLogs.filter(s => {
      const date = new Date(s.createdAt);
      if (reportsFilterType === 'all') return true;
      
      const now = new Date();
      if (reportsFilterType === 'today') {
        return date.toDateString() === now.toDateString();
      }
      if (reportsFilterType === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(now.getDate() - 1);
        return date.toDateString() === yesterday.toDateString();
      }
      if (reportsFilterType === '7days') {
        const limit = new Date();
        limit.setDate(now.getDate() - 6);
        limit.setHours(0,0,0,0);
        return date.getTime() >= limit.getTime();
      }
      if (reportsFilterType === 'month') {
        return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
      }
      if (reportsFilterType === 'custom') {
        if (reportsStartDate) {
          const start = new Date(reportsStartDate);
          start.setHours(0,0,0,0);
          if (date.getTime() < start.getTime()) return false;
        }
        if (reportsEndDate) {
          const end = new Date(reportsEndDate);
          end.setHours(23,59,59,999);
          if (date.getTime() > end.getTime()) return false;
        }
        return true;
      }
      return true;
    });
  }, [shrinkageLogs, reportsFilterType, reportsStartDate, reportsEndDate]);

  // Analytics Stats
  const statsRevenue = filteredSales.reduce((sum, s) => sum + s.total, 0);
  const statsDiscount = filteredSales.reduce((sum, s) => sum + (s.discount || 0), 0);
  const statsExpenses = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);
  const statsLorryStock = products.reduce((sum, p) => sum + p.lorryStock, 0);
  const statsShrinkageCount = filteredShrinkage.reduce((sum, s) => sum + s.quantity, 0);
  const statsNetCash = statsRevenue - statsExpenses;

  // Quick Checkout Helpers (Dynamic lists based on DB variants of active product name)
  const availableQuickSizes = React.useMemo(() => {
    if (!activeQuickProduct) return [];
    const siblings = products.filter(p => p.name === activeQuickProduct.name);
    return Array.from(new Set(siblings.map(s => s.size)));
  }, [activeQuickProduct, products]);

  const availableQuickColors = React.useMemo(() => {
    if (!activeQuickProduct) return [];
    const siblings = products.filter(p => p.name === activeQuickProduct.name && p.size === quickSize);
    return Array.from(new Set(siblings.map(s => s.color)));
  }, [activeQuickProduct, quickSize, products]);

  const activeQuickTotal = activeQuickProduct
    ? Math.max(0, (activeQuickProduct.price * quickQty) - Number(quickDiscount || 0))
    : 0;

  return (
    <div className="flex-1 flex flex-col md:flex-row min-h-screen bg-[#f8f9fc] dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans pb-20 md:pb-0">
      
      {/* SIDEBAR - Desktop */}
      <aside className="hidden md:flex w-72 flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800/80 p-6 gap-6 shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🧸</span>
            <div>
              <h2 className="font-extrabold text-zinc-900 dark:text-zinc-50 leading-tight">Teddy Stall</h2>
              <span className="text-xs text-zinc-400 font-medium">POS & Stock Manager</span>
            </div>
          </div>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-850 text-zinc-500 dark:text-zinc-400 cursor-pointer transition-colors"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-500/10 to-orange-500/10 border border-amber-500/20">
          <p className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Active User Node</p>
          <p className="font-bold text-zinc-800 dark:text-zinc-200 text-sm truncate">{user?.name || 'Loading...'}</p>
          <div className="mt-2">
            {user?.role === 'admin' && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">👑 Admin</span>}
            {user?.role === 'stock_manager' && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">📦 Stock Manager</span>}
            {user?.role === 'seller' && <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400">💼 Seller</span>}
          </div>
        </div>

        {/* Database status */}
        <div className="px-4 py-2 bg-zinc-55 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl flex items-center gap-2 text-xs">
          <div className={`w-2 h-2 rounded-full ${!mounted ? 'bg-amber-500' : isFirebaseConfigured ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`}></div>
          <span className="font-semibold text-zinc-500 truncate">
            {!mounted ? 'Checking database...' : isFirebaseConfigured ? 'Connected to Firestore' : 'Running on LocalDB'}
          </span>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col gap-1.5 flex-1">
          {(isAdmin || isSeller) && (
            <button
              onClick={() => setActiveTab('pos')}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'pos'
                  ? 'bg-[#5334ac] text-white shadow-lg shadow-[#5334ac]/20'
                  : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <ShoppingCart className="w-4 h-4" /> POS Cash Register
            </button>
          )}

          {(isAdmin || isStockManager) && (
            <button
              onClick={() => setActiveTab('stock')}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'stock'
                  ? 'bg-[#5334ac] text-white shadow-lg shadow-[#5334ac]/20'
                  : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Package className="w-4 h-4" /> Stall Lorry Stock
            </button>
          )}

          <button
            onClick={() => setActiveTab('stock_details')}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'stock_details'
                ? 'bg-[#5334ac] text-white shadow-lg shadow-[#5334ac]/20'
                : 'text-zinc-650 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <FileText className="w-4 h-4" /> Stock Details
          </button>

          <button
            onClick={() => setActiveTab('expenses')}
            className={`flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
              activeTab === 'expenses'
                ? 'bg-[#5334ac] text-white shadow-lg shadow-[#5334ac]/20'
                : 'text-zinc-655 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
            }`}
          >
            <DollarSign className="w-4 h-4" /> Stall Expenses Logs
          </button>

          {(isAdmin || isStockManager) && (
            <button
              onClick={() => setActiveTab('reports')}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-[#5334ac] text-white shadow-lg shadow-[#5334ac]/20'
                  : 'text-zinc-655 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <TrendingUp className="w-4 h-4" /> Revenue Dashboard
            </button>
          )}

          {isAdmin && (
            <button
              onClick={() => setActiveTab('users')}
              className={`flex items-center gap-3 py-3 px-4 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeTab === 'users'
                  ? 'bg-[#5334ac] text-white shadow-lg shadow-[#5334ac]/20'
                  : 'text-zinc-655 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800/50'
              }`}
            >
              <Users className="w-4 h-4" /> User Directory
            </button>
          )}
        </nav>

        {/* Logout */}
        <button
          onClick={logout}
          className="mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-sm border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-955/20 transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Log Out
        </button>
      </aside>

      {/* HEADER - Mobile */}
      <header className="md:hidden flex items-center justify-between p-4 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧸</span>
          <span className="font-extrabold text-zinc-900 dark:text-zinc-50 text-sm">Teddy Bear POS</span>
        </div>
        <button
          onClick={toggleTheme}
          className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-650 dark:text-zinc-400 rounded-xl"
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </header>

      {/* MOBILE BOTTOM NAVIGATION BAR (5 items matching mockup: POS, Stock, Stock Details, Expenses, More) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-zinc-900/95 backdrop-blur border-t border-zinc-200 dark:border-zinc-800/80 px-1 py-2 flex justify-around items-center shadow-lg">
        <button
          onClick={() => { setCheckoutScreenActive(false); setMobileCartOpen(false); setActiveTab('pos'); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'pos' && !checkoutScreenActive && !mobileCartOpen ? 'text-[#5334ac] font-extrabold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <ShoppingCart className="w-5.5 h-5.5" />
          <span className="text-[8px] mt-0.5 font-bold">POS</span>
        </button>

        <button
          onClick={() => { setCheckoutScreenActive(false); setMobileCartOpen(false); setActiveTab('stock'); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'stock' ? 'text-[#5334ac] font-extrabold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <Package className="w-5.5 h-5.5" />
          <span className="text-[8px] mt-0.5 font-bold">Stock</span>
        </button>

        <button
          onClick={() => { setCheckoutScreenActive(false); setMobileCartOpen(false); setActiveTab('stock_details'); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'stock_details' ? 'text-[#5334ac] font-extrabold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <FileText className="w-5.5 h-5.5" />
          <span className="text-[8px] mt-0.5 font-bold">Details</span>
        </button>

        <button
          onClick={() => { setCheckoutScreenActive(false); setMobileCartOpen(false); setActiveTab('expenses'); }}
          className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all cursor-pointer ${
            activeTab === 'expenses' ? 'text-[#5334ac] font-extrabold' : 'text-zinc-400 dark:text-zinc-500'
          }`}
        >
          <DollarSign className="w-5.5 h-5.5" />
          <span className="text-[8px] mt-0.5 font-bold">Expenses</span>
        </button>

        <button
          onClick={() => setMobileMenuOpen(true)}
          className="flex flex-col items-center justify-center py-1 px-3 rounded-xl text-zinc-400 dark:text-zinc-500 hover:text-[#5334ac] transition-all cursor-pointer"
        >
          <Menu className="w-5.5 h-5.5" />
          <span className="text-[8px] mt-0.5 font-bold">More</span>
        </button>
      </nav>

      {/* MOBILE SIDEBAR DRAWER OVERLAY */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          ></div>
          <div className="relative flex w-full max-w-xs flex-col bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-6 gap-6 shadow-2xl transition-transform">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🧸</span>
                <span className="font-extrabold text-zinc-955 dark:text-zinc-50 text-sm">Stall Drawer</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="p-1 hover:bg-zinc-100 rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800">
              <p className="text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1">Active profile</p>
              <p className="font-bold text-zinc-800 dark:text-zinc-200 text-xs truncate">{user?.name || 'Loading...'}</p>
              <p className="text-[9px] text-zinc-400 mt-1 font-semibold">Role: {user?.role?.toUpperCase() || ''}</p>
            </div>
            <div className="p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-855 rounded-xl flex items-center gap-2 text-[10px]">
              <div className={`w-2 h-2 rounded-full ${isFirebaseConfigured ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
              <span className="font-bold text-zinc-500">
                {isFirebaseConfigured ? 'Connected to Firestore' : 'Running on LocalDB'}
              </span>
            </div>
            <nav className="flex flex-col gap-1.5 flex-1">
              {(isAdmin || isStockManager) && (
                <button
                  onClick={() => { setActiveTab('reports'); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-2.5 py-2.5 px-3 rounded-lg font-bold text-xs ${
                    activeTab === 'reports' ? 'bg-[#5334ac]/10 text-[#5334ac]' : 'text-zinc-500'
                  }`}
                >
                  <TrendingUp className="w-4.5 h-4.5" /> Revenue Dashboard
                </button>
              )}
              {isAdmin && (
                <button
                  onClick={() => { setActiveTab('users'); setMobileMenuOpen(false); }}
                  className={`flex items-center gap-2.5 py-2.5 px-3 rounded-lg font-bold text-xs ${
                    activeTab === 'users' ? 'bg-[#5334ac]/10 text-[#5334ac]' : 'text-zinc-500'
                  }`}
                >
                  <Users className="w-4.5 h-4.5" /> User Settings
                </button>
              )}
            </nav>
            <button
              onClick={() => { setMobileMenuOpen(false); logout(); }}
              className="mt-auto flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs border border-red-200 dark:border-red-900/40 text-red-600 dark:text-red-400 hover:bg-red-50 transition-all cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Log Out
            </button>
          </div>
        </div>
      )}

      {/* FLOATING MOBILE CART BUTTON */}
      {cart.length > 0 && activeTab === 'pos' && !checkoutScreenActive && !mobileCartOpen && (
        <button
          onClick={() => setMobileCartOpen(true)}
          className="xl:hidden fixed bottom-20 right-4 z-40 bg-[#5334ac] hover:bg-[#482b9c] text-white py-3.5 px-5 rounded-full shadow-2xl flex items-center gap-2 text-xs font-black cursor-pointer active:scale-95 transition-transform"
        >
          <ShoppingCart className="w-4.5 h-4.5" />
          <span>Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)}) • Rs. {cartTotal}</span>
        </button>
      )}

      {/* FLOATING MOBILE CART DRAWER OVERLAY */}
      {mobileCartOpen && (
        <div className="fixed inset-0 z-50 flex xl:hidden">
          <div
            onClick={() => setMobileCartOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
          ></div>
          <div className="relative flex w-full max-w-sm flex-col bg-white dark:bg-zinc-900 p-6 gap-6 shadow-2xl transition-transform ml-auto h-full overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-150 dark:border-zinc-800">
              <h3 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-sm">
                Multi-Item Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)})
              </h3>
              <button onClick={() => setMobileCartOpen(false)} className="p-1 hover:bg-zinc-100 rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-3">
              {cart.map(item => (
                <div key={item.product.id} className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 border border-zinc-150 dark:border-zinc-800 rounded-2xl">
                  <ToyIcon category={item.product.category} color={item.product.color} className="w-8 h-8" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-xs truncate leading-tight">{item.product.name}</p>
                    <p className="text-[9px] text-zinc-400 mt-1">{item.product.color} • {item.product.size}</p>
                    <p className="text-[10px] font-black text-[#5334ac] mt-1">Rs. {item.product.price}</p>
                  </div>
                  <div className="flex flex-col items-end justify-between">
                    <button onClick={() => removeFromCart(item.product.id)} className="text-[9px] text-red-500 font-bold">Remove</button>
                    <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-0.5 mt-2">
                      <button onClick={() => updateCartQty(item.product.id, -1)} className="text-xs font-bold hover:text-[#5334ac] cursor-pointer">-</button>
                      <span className="text-xs font-bold">{item.quantity}</span>
                      <button onClick={() => updateCartQty(item.product.id, 1)} className="text-xs font-bold hover:text-[#5334ac] cursor-pointer">+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Discounts */}
            <div className="space-y-4 pt-4 border-t border-zinc-150 dark:border-zinc-800 text-xs">
              <div className="flex justify-between font-bold">
                <span className="text-zinc-400">Subtotal:</span>
                <span>Rs. {cartSubtotal}</span>
              </div>

              {/* Discount selection row */}
              <div className="space-y-2">
                <label className="block text-[9px] font-bold text-zinc-450 uppercase tracking-wider pl-0.5">Apply Stall Discount</label>
                <div className="grid grid-cols-5 gap-1">
                  {[
                    { key: '0', label: 'Rs. 0' },
                    { key: '100', label: '100' },
                    { key: '200', label: '200' },
                    { key: '300', label: '300' },
                    { key: 'custom', label: 'Custom' }
                  ].map(d => (
                    <button
                      key={d.key}
                      type="button"
                      onClick={() => setCartDiscountType(d.key as any)}
                      className={`py-2 rounded-lg text-[10px] font-black cursor-pointer transition-all active:scale-95 text-center ${
                        cartDiscountType === d.key
                          ? 'bg-[#5334ac] text-white shadow-xs'
                          : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-650'
                      }`}
                    >
                      {d.label}
                    </button>
                  ))}
                </div>
                {cartDiscountType === 'custom' && (
                  <input
                    type="number"
                    value={discountAmt}
                    onChange={e => setDiscountAmt(e.target.value)}
                    placeholder="Enter custom Rs. discount"
                    className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold mt-1.5 focus:outline-none"
                  />
                )}
              </div>

              <div className="flex justify-between items-center text-xs pt-3 border-t border-dashed border-zinc-200 dark:border-zinc-850">
                <span className="text-zinc-450 font-bold">Total Bill:</span>
                <span className="text-xl font-black text-[#5334ac]">Rs. {cartTotal}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-4">
                <button
                  onClick={() => { setCashReceived(cartTotal.toString()); setCheckoutScreenActive(true); }}
                  className="py-3 border border-[#5334ac] text-[#5334ac] font-bold rounded-2xl text-xs uppercase"
                >
                  💸 CASH
                </button>
                <button
                  onClick={() => setCheckoutScreenActive(true)}
                  className="py-3 bg-[#5334ac] text-white font-bold rounded-2xl shadow-lg text-xs uppercase"
                >
                  CHECKOUT →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CHECKOUT OVERLAY SCREEN - FLOW B (Multi-item / Cash checkout) */}
      {checkoutScreenActive && (
        <div className="flex-1 flex flex-col bg-white dark:bg-zinc-950 p-6 min-h-screen">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => setCheckoutScreenActive(false)}
              className="p-2.5 bg-zinc-100 dark:bg-zinc-900 text-zinc-650 hover:bg-zinc-200 rounded-xl cursor-pointer"
            >
              ← Back
            </button>
            <h1 className="text-xl font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">Checkout</h1>
          </div>

          <div className="max-w-md mx-auto w-full bg-[#f8f9fc] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Amount</p>
                <p className="text-2xl font-black text-[#5334ac]">Rs. {cartTotal}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Total Items</p>
                <p className="text-2xl font-black text-zinc-850 dark:text-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </p>
              </div>
            </div>

            {/* Cash input */}
            <div className="space-y-2">
              <label className="block text-xs font-extrabold text-zinc-600 dark:text-zinc-400">Cash Received</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-zinc-500 font-extrabold">Rs.</span>
                <input
                  type="number"
                  value={cashReceived}
                  onChange={e => setCashReceived(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-sm focus:outline-none font-bold"
                />
              </div>
            </div>

            {/* Quick suggestion notes */}
            <div className="grid grid-cols-4 gap-2">
              {[cartTotal, cartTotal + 50, cartTotal + 100, Math.ceil(cartTotal / 500) * 500].map((sug, idx) => {
                const roundedSug = Math.ceil(sug);
                return (
                  <button
                    key={idx}
                    onClick={() => setCashReceived(roundedSug.toString())}
                    className="py-2.5 bg-white dark:bg-zinc-850 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 rounded-xl font-bold text-xs cursor-pointer active:scale-95 transition-all"
                  >
                    Rs. {roundedSug}
                  </button>
                );
              })}
            </div>

            {/* Change box */}
            {cashReceived && (
              <div className="bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40 p-4 rounded-2xl">
                <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider">Change</p>
                <p className="text-lg font-black text-emerald-700 dark:text-emerald-400 mt-1">Rs. {changeDue}</p>
              </div>
            )}

            <button
              onClick={handlePOSCheckout}
              disabled={!cashReceived || Number(cashReceived) < cartTotal}
              className="w-full py-4 bg-[#5334ac] hover:bg-[#482b9c] text-white font-bold rounded-2xl shadow-lg active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider disabled:opacity-40 disabled:pointer-events-none"
            >
              ✓ Confirm Sale
            </button>
          </div>
        </div>
      )}

      {/* MAIN CONTAINER */}
      {!checkoutScreenActive && (
        <main className="flex-1 flex flex-col min-w-0 p-4 md:p-8 gap-6 overflow-y-auto">
          
          {loadingData ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
              <p className="text-sm font-semibold text-zinc-400 mt-3">Fetching database values...</p>
            </div>
          ) : (
            <>
              {/* ---------------------------------------------------- */}
              {/* TAB: POS REGISTER */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'pos' && (isAdmin || isSeller) && (
                <div className="flex-1 flex flex-col xl:flex-row gap-6">
                  
                  {/* Left panel - catalog */}
                  <div className="flex-1 flex flex-col gap-6">
                    <div>
                      <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight uppercase">Stall POS</h1>
                      <p className="text-xs text-zinc-500 mt-1">Interactive toy cash register. Tapping bear opens instant checkout modal.</p>
                    </div>

                    {/* Search bar */}
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                      <input
                        type="text"
                        placeholder="Search teddy bear..."
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5334ac] w-full shadow-xs"
                      />
                    </div>

                    {/* PRICE FILTER BADGES */}
                    <div className="flex flex-col gap-2">
                      <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Price Filter</p>
                      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none whitespace-nowrap">
                        {[
                          { key: 'All', label: 'All' },
                          { key: 'Under500', label: '< 500' },
                          { key: '500-1000', label: '500 - 1000' },
                          { key: '1000-1500', label: '1000 - 1500' },
                          { key: 'Above1500', label: '> 1500' }
                        ].map(f => (
                          <button
                            key={f.key}
                            onClick={() => setPriceRangeFilter(f.key as any)}
                            className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all active:scale-95 shrink-0 ${
                              priceRangeFilter === f.key
                                ? 'bg-[#5334ac] text-white shadow-md'
                                : 'bg-white dark:bg-zinc-900 text-zinc-650 dark:text-zinc-400 hover:bg-zinc-100 border border-zinc-150/60 dark:border-zinc-800'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Bear Catalog Grid (Grouped by name) */}
                    {groupedCatalog.length === 0 ? (
                      <div className="flex-1 flex flex-col items-center justify-center p-12 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 text-center">
                        <span className="text-4xl">🧸</span>
                        <p className="text-zinc-500 font-semibold mt-3">No matching bears in stall catalog.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {groupedCatalog.map(item => {
                          const prod = item.product;
                          const isOutOfStall = item.totalLorryStock <= 0;

                          return (
                            <div
                              key={prod.name}
                              onClick={() => {
                                if (!isOutOfStall) {
                                  setActiveQuickProduct(prod);
                                  setQuickSize(prod.size);
                                  setQuickColor(prod.color);
                                  setQuickQty(1);
                                  setQuickDiscount('0');
                                  setQuickDiscountType('0');
                                }
                              }}
                              className={`p-4 bg-white dark:bg-zinc-900 border rounded-3xl text-left cursor-pointer transition-all hover:shadow-md hover:border-[#5334ac] select-none flex flex-col gap-2 relative overflow-hidden group border-zinc-200/60 dark:border-zinc-800/80 shadow-xs ${
                                isOutOfStall ? 'opacity-50' : ''
                              }`}
                            >
                              <div className="flex justify-center mb-2">
                                <ToyIcon category={prod.category} color={prod.color} className="w-16 h-16 group-hover:scale-105 transition-transform" />
                              </div>

                              <div>
                                <h4 className="font-extrabold text-zinc-955 dark:text-zinc-50 text-xs truncate leading-tight">{prod.name}</h4>
                                <p className="text-[9px] text-zinc-400 mt-1">Sizes: {item.sizes.join(', ')}</p>
                                
                                {/* Visual Color Dots Indicators */}
                                <div className="flex gap-1 mt-1.5 flex-wrap">
                                  {item.colors.map(c => (
                                    <span
                                      key={c}
                                      title={c}
                                      className="w-3.5 h-3.5 rounded-full border border-zinc-200 dark:border-zinc-700/60 block shrink-0"
                                      style={{ backgroundColor: getColorHex(c) }}
                                    ></span>
                                  ))}
                                </div>

                                <p className="text-xs font-black text-zinc-955 dark:text-white mt-2">
                                  {item.sizes.length > 1 ? `From Rs. ${Math.min(...products.filter(p=>p.name===prod.name).map(p=>p.price))}` : `Rs. ${prod.price}`}
                                </p>
                              </div>

                              <div className="w-full pt-2 mt-auto border-t border-zinc-100 dark:border-zinc-800 flex justify-between items-center text-[9px]">
                                <span className={`font-bold ${isOutOfStall ? 'text-red-500' : 'text-emerald-600'}`}>
                                  Total Stock: {item.totalLorryStock}
                                </span>
                                <button
                                  onClick={e => {
                                    e.stopPropagation();
                                    if (!isOutOfStall) {
                                      addToCart(prod);
                                    }
                                  }}
                                  disabled={isOutOfStall}
                                  className="w-6 h-6 rounded-full bg-[#5334ac] hover:bg-[#482b9c] text-white flex items-center justify-center font-bold text-sm cursor-pointer active:scale-90 transition-transform"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right panel - checkout sidebar (Desktop only) */}
                  <div className="hidden xl:flex w-96 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm flex-col shrink-0">
                    <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-855 mb-6">
                      <h3 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-sm">Cart ({cart.reduce((sum, item) => sum + item.quantity, 0)} Items)</h3>
                      <button
                        onClick={() => setCart([])}
                        className="text-[10px] font-extrabold text-red-500 hover:underline cursor-pointer"
                      >
                        Clear
                      </button>
                    </div>

                    {/* Cart Items list */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                      {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center text-zinc-400">
                          <ShoppingBag className="w-12 h-12 text-zinc-300 dark:text-zinc-700 mb-2" />
                          <p className="text-xs font-bold">Cart is empty</p>
                          <p className="text-[9px] mt-1 max-w-[200px]">Tap cards to open options, or click "+" to add directly to cart</p>
                        </div>
                      ) : (
                        cart.map(item => (
                          <div key={item.product.id} className="flex gap-3 p-3 bg-zinc-50 dark:bg-zinc-950 rounded-2xl border border-zinc-100 dark:border-zinc-800">
                            <ToyIcon category={item.product.category} color={item.product.color} className="w-8 h-8" />
                            <div className="flex-1 min-w-0">
                              <p className="font-bold text-xs text-zinc-850 dark:text-zinc-200 truncate leading-tight">{item.product.name}</p>
                              <p className="text-[10px] text-zinc-400 mt-1">{item.product.color} • {item.product.size}</p>
                              <p className="text-[10px] font-extrabold text-[#5334ac] mt-1">Rs. {item.product.price}</p>
                            </div>
                            <div className="flex flex-col items-end justify-between">
                              <button onClick={() => removeFromCart(item.product.id)} className="text-[9px] text-red-500 font-bold hover:underline">
                                Remove
                              </button>
                              <div className="flex items-center gap-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg px-2 py-0.5 mt-2">
                                <button onClick={() => updateCartQty(item.product.id, -1)} className="text-xs font-bold hover:text-amber-500 cursor-pointer">-</button>
                                <span className="text-xs font-bold">{item.quantity}</span>
                                <button onClick={() => updateCartQty(item.product.id, 1)} className="text-xs font-bold hover:text-amber-500 cursor-pointer">+</button>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>

                    <div className="border-t border-zinc-150 dark:border-zinc-800 pt-4 mt-6 space-y-4 text-xs">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-zinc-400 font-medium">Subtotal:</span>
                        <span className="font-bold text-zinc-850 dark:text-zinc-200">Rs. {cartSubtotal}</span>
                      </div>

                      {/* Stall discount button row */}
                      <div className="space-y-2">
                        <label className="block text-[9px] font-bold text-zinc-450 uppercase tracking-wider pl-0.5">Apply Stall Discount</label>
                        <div className="grid grid-cols-5 gap-1">
                          {[
                            { key: '0', label: 'Rs. 0' },
                            { key: '100', label: '100' },
                            { key: '200', label: '200' },
                            { key: '300', label: '300' },
                            { key: 'custom', label: 'Custom' }
                          ].map(d => (
                            <button
                              key={d.key}
                              type="button"
                              onClick={() => setCartDiscountType(d.key as any)}
                              className={`py-2 rounded-lg text-[10px] font-black cursor-pointer transition-all active:scale-95 text-center ${
                                cartDiscountType === d.key
                                  ? 'bg-[#5334ac] text-white shadow-xs'
                                  : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-650'
                              }`}
                            >
                              {d.label}
                            </button>
                          ))}
                        </div>
                        {cartDiscountType === 'custom' && (
                          <input
                            type="number"
                            value={discountAmt}
                            onChange={e => setDiscountAmt(e.target.value)}
                            placeholder="Enter custom Rs. discount"
                            className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl font-bold mt-1.5 focus:outline-none"
                          />
                        )}
                      </div>

                      <div className="flex justify-between items-center text-xs pt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                        <span className="text-zinc-400 font-bold">Total Amount:</span>
                        <span className="text-lg font-black text-[#5334ac]">Rs. {cartTotal}</span>
                      </div>

                      {/* Bottom Cart buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-4">
                        <button
                          onClick={() => { setCashReceived(cartTotal.toString()); setCheckoutScreenActive(true); }}
                          disabled={cart.length === 0}
                          className="py-3 border border-[#5334ac] hover:bg-[#5334ac]/5 text-[#5334ac] rounded-2xl font-bold transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none text-xs text-center"
                        >
                          💸 CASH
                        </button>
                        <button
                          onClick={() => setCheckoutScreenActive(true)}
                          disabled={cart.length === 0}
                          className="py-3 bg-[#5334ac] hover:bg-[#482b9c] text-white rounded-2xl font-bold shadow-md transition-all cursor-pointer disabled:opacity-40 disabled:pointer-events-none text-xs text-center"
                        >
                          CHECKOUT →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB: LORRY STOCK INVENTORY (Stock Manager / Admin) */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'stock' && (isAdmin || isStockManager) && (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50">STALL CATALOG INVENTORY</h1>
                      <p className="text-xs text-zinc-500 mt-1">Manage bear attributes and lorry stock quantities directly</p>
                    </div>
                    <button
                      onClick={() => {
                        setEditingProduct(null);
                        setProductForm({ name: '', color: '', size: undefined, price: undefined, lorryStock: undefined, category: 'Teddy' });
                        setVariantQueue([]);
                        setShowProductModal(true);
                      }}
                      className="px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl shadow-md text-xs active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Plus className="w-4.5 h-4.5" /> Register Bear Type
                    </button>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-955/50 text-zinc-400 text-[10px] font-extrabold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                            <th className="py-4 px-6">Model Details</th>
                            <th className="py-4 px-6">Attributes</th>
                            <th className="py-4 px-6">Daily Price</th>
                            <th className="py-4 px-6">Lorry Stall Stock</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                          {products.map(prod => (
                            <tr key={prod.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10">
                              <td className="py-4 px-6 flex items-center gap-3">
                                <ToyIcon category={prod.category} color={prod.color} className="w-8 h-8" />
                                <span className="font-extrabold text-zinc-955 dark:text-zinc-100">{prod.name}</span>
                              </td>
                              <td className="py-4 px-6">
                                <div className="flex gap-2">
                                  <span className="px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 font-bold flex items-center gap-1">
                                    <span className="w-2 h-2 rounded-full border border-zinc-300 block" style={{ backgroundColor: getColorHex(prod.color) }}></span>
                                    {prod.color}
                                  </span>
                                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-955/20 text-amber-600 font-bold">{prod.size}</span>
                                </div>
                              </td>
                              <td className="py-4 px-6 font-bold text-zinc-800 dark:text-zinc-200">Rs. {prod.price}</td>
                              <td className="py-4 px-6 font-semibold">
                                <span className={prod.lorryStock === 0 ? 'text-red-500 font-bold' : 'text-emerald-600 font-bold'}>
                                  {prod.lorryStock} units available
                                </span>
                              </td>
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button onClick={() => handleEditProduct(prod)} className="p-1.5 text-zinc-400 hover:text-amber-500 transition-colors cursor-pointer">
                                    <Edit2 className="w-4 h-4" />
                                  </button>
                                  <button onClick={() => handleDeleteProduct(prod.id)} className="p-1.5 text-zinc-400 hover:text-red-500 transition-colors cursor-pointer">
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB: STOCK DETAILS */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'stock_details' && (
                <div className="flex flex-col gap-6">
                  <div>
                    <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 tracking-tight uppercase">Stock Details</h1>
                    <p className="text-xs text-zinc-500 mt-1">Review quantities, daily prices, and size distributions.</p>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
                    <input
                      type="text"
                      placeholder="Search teddy bear..."
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="pl-10 pr-4 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl text-xs focus:outline-none focus:ring-2 focus:ring-[#5334ac] w-full shadow-xs"
                    />
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden flex-1 flex flex-col">
                    <div className="overflow-y-auto flex-1">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-950/50 text-zinc-450 text-[10px] font-extrabold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                            <th className="py-4 px-6">Teddy Bear Model</th>
                            <th className="py-4 px-6">Daily Price</th>
                            <th className="py-4 px-6 text-right">Lorry Stock</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-150 dark:divide-zinc-800 text-xs">
                          {filteredProducts.map(prod => (
                            <tr key={prod.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10">
                              <td className="py-4 px-6 flex items-center gap-3">
                                <ToyIcon category={prod.category} color={prod.color} className="w-10 h-10" />
                                <div>
                                  <p className="font-extrabold text-zinc-900 dark:text-zinc-100">{prod.name}</p>
                                  <p className="text-[10px] text-zinc-400 mt-0.5">{prod.color} • {prod.size}</p>
                                </div>
                              </td>
                              <td className="py-4 px-6 font-bold text-zinc-850 dark:text-zinc-200">Rs. {prod.price}</td>
                              <td className="py-4 px-6 text-right font-black text-zinc-855 dark:text-zinc-200">
                                {prod.lorryStock}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="bg-zinc-50 dark:bg-zinc-955 p-4 border-t border-zinc-200 dark:border-zinc-800 flex justify-between items-center text-xs font-bold">
                      <div>
                        <span className="text-zinc-400">Total Types</span>
                        <p className="text-lg font-black text-zinc-855 dark:text-white">{filteredProducts.length}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-zinc-400">Total Stock</span>
                        <p className="text-lg font-black text-emerald-600">{filteredProducts.reduce((sum, p) => sum + p.lorryStock, 0)}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB: DAILY EXPENSES LOGGING */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'expenses' && (
                <div className="flex flex-col lg:flex-row gap-6">
                  <div className="w-full lg:w-96 shrink-0 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 shadow-sm h-fit">
                    <div className="flex items-center gap-2 mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
                      <DollarSign className="w-5 h-5 text-[#5334ac]" />
                      <h3 className="font-extrabold text-zinc-900 dark:text-zinc-50 text-sm">Add Expense</h3>
                    </div>

                    <form onSubmit={handleSaveExpense} className="space-y-4 text-xs">
                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Expense Name</label>
                        <input
                          type="text"
                          required
                          value={expenseName}
                          onChange={e => setExpenseName(e.target.value)}
                          placeholder="e.g. Transport, Food, Salary"
                          className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none font-bold"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Amount (Rs.)</label>
                          <input
                            type="number"
                            required
                            value={expenseAmountVal}
                            onChange={e => setExpenseAmountVal(e.target.value)}
                            placeholder="Enter amount"
                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Category</label>
                          <select
                            value={expenseCategory}
                            onChange={e => setExpenseCategory(e.target.value)}
                            className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none cursor-pointer"
                          >
                            <option value="Food">Food</option>
                            <option value="Transport">Transport</option>
                            <option value="Salary">Salary</option>
                            <option value="Rent">Rent</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Date</label>
                        <input
                          type="date"
                          required
                          value={expenseDate}
                          onChange={e => setExpenseDate(e.target.value)}
                          className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Notes (Optional)</label>
                        <textarea
                          value={expenseNotes}
                          onChange={e => setExpenseNotes(e.target.value)}
                          placeholder="Add notes..."
                          rows={2}
                          className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        className="w-full py-3 bg-[#5334ac] hover:bg-[#482b9c] text-white font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer text-xs"
                      >
                        SAVE EXPENSE
                      </button>
                    </form>
                  </div>

                  <div className="flex-1 flex flex-col gap-6">
                    <div>
                      <h2 className="text-xl font-extrabold text-zinc-900 dark:text-zinc-50">STALL EXPENSE RECORD LEDGER</h2>
                      <p className="text-xs text-zinc-500 mt-1">Audit log of cash payments deducted from the register</p>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="bg-zinc-50 dark:bg-zinc-955/50 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                            <th className="py-4 px-6">Description</th>
                            <th className="py-4 px-6">Amount</th>
                            <th className="py-4 px-6">Logged By</th>
                            <th className="py-4 px-6">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                          {expensesLogs.map(log => (
                            <tr key={log.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-800/10">
                              <td className="py-4 px-6 font-bold text-zinc-950 dark:text-zinc-100">{log.description}</td>
                              <td className="py-4 px-6 font-extrabold text-red-500">Rs. {log.amount}</td>
                              <td className="py-4 px-6 text-zinc-650 dark:text-zinc-400">{log.loggedBy}</td>
                              <td className="py-4 px-6 text-zinc-505">{new Date(log.createdAt).toLocaleDateString()}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB: REVENUE & ANALYTICS DASHBOARD */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'reports' && (isAdmin || isStockManager) && (
                <div className="flex flex-col gap-6">
                  {/* Title & Date Filters */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div>
                      <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50 uppercase tracking-tight">Stall Revenue & Analytics</h1>
                      <p className="text-xs text-zinc-500 mt-1">Live tracking of transactions, cash flow, and expenses</p>
                    </div>

                    {/* Date filter preset selection */}
                    <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
                      <div className="flex gap-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-1 rounded-2xl w-full md:w-auto overflow-x-auto whitespace-nowrap scrollbar-none">
                        {[
                          { key: 'all', label: 'All' },
                          { key: 'today', label: 'Today' },
                          { key: 'yesterday', label: 'Yesterday' },
                          { key: '7days', label: '7 Days' },
                          { key: 'month', label: 'Month' },
                          { key: 'custom', label: 'Custom' }
                        ].map(f => (
                          <button
                            key={f.key}
                            type="button"
                            onClick={() => setReportsFilterType(f.key as any)}
                            className={`px-3 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer transition-all active:scale-95 shrink-0 ${
                              reportsFilterType === f.key
                                ? 'bg-[#5334ac] text-white shadow-sm'
                                : 'text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800'
                            }`}
                          >
                            {f.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Custom Calendar date inputs row */}
                  {reportsFilterType === 'custom' && (
                    <div className="p-4 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl grid grid-cols-2 md:grid-cols-4 gap-4 items-end text-xs font-bold">
                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">Start Date</label>
                        <input
                          type="date"
                          value={reportsStartDate}
                          onChange={e => setReportsStartDate(e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-1.5">End Date</label>
                        <input
                          type="date"
                          value={reportsEndDate}
                          onChange={e => setReportsEndDate(e.target.value)}
                          className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => { setReportsStartDate(''); setReportsEndDate(''); }}
                        className="py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-650 dark:text-zinc-300 rounded-xl transition-all cursor-pointer"
                      >
                        Reset Filter
                      </button>
                    </div>
                  )}

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex items-center gap-4">
                      <div className="p-3 bg-amber-500/10 text-amber-500 rounded-2xl">
                        <DollarSign className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider leading-none">Gross Sales</p>
                        <p className="text-base font-black text-zinc-955 dark:text-white mt-1">Rs. {statsRevenue}</p>
                      </div>
                    </div>

                    <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex items-center gap-4">
                      <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl">
                        <Percent className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider leading-none">Discounts</p>
                        <p className="text-base font-black text-zinc-955 dark:text-white mt-1">Rs. {statsDiscount}</p>
                      </div>
                    </div>

                    <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex items-center gap-4">
                      <div className="p-3 bg-red-500/10 text-red-500 rounded-2xl">
                        <TrendingDown className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider leading-none">Stall Expenses</p>
                        <p className="text-base font-black text-red-500 mt-1">Rs. {statsExpenses}</p>
                      </div>
                    </div>

                    <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex items-center gap-4">
                      <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl">
                        <ShoppingCart className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider leading-none">Net Profit (Cash)</p>
                        <p className={`text-base font-black mt-1 ${statsNetCash < 0 ? 'text-red-500' : 'text-emerald-600'}`}>Rs. {statsNetCash}</p>
                      </div>
                    </div>

                    <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex items-center gap-4">
                      <div className="p-3 bg-zinc-500/10 text-zinc-500 rounded-2xl">
                        <Package className="w-5.5 h-5.5" />
                      </div>
                      <div>
                        <p className="text-[9px] text-zinc-400 font-bold uppercase tracking-wider leading-none">Lorry / Lost Qty</p>
                        <p className="text-base font-black text-zinc-955 dark:text-white mt-1">{statsLorryStock} / {statsShrinkageCount}</p>
                      </div>
                    </div>
                  </div>

                  {/* Responsive Visual Charts Section */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Sales Timeline chart (Spans 2 cols on lg) */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs lg:col-span-2 flex flex-col">
                      <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mb-1">POS Sales Frequency</h3>
                      <p className="text-[10px] text-zinc-400 mb-6">Sales transactions plotted chronologically over selected range</p>
                      
                      <div className="w-full flex-1 min-h-[220px] flex items-center justify-center">
                        {filteredSales.length === 0 ? (
                          <span className="text-zinc-400 text-xs font-semibold">No sales transactions logged in this range</span>
                        ) : (
                          <svg viewBox="0 0 400 200" className="w-full h-full text-zinc-200 dark:text-zinc-850">
                            {/* Grid Guidelines */}
                            <line x1="35" y1="20" x2="385" y2="20" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
                            <line x1="35" y1="65" x2="385" y2="65" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
                            <line x1="35" y1="110" x2="385" y2="110" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3" />
                            <line x1="35" y1="155" x2="385" y2="155" stroke="currentColor" strokeWidth="0.8" />
                            <line x1="35" y1="20" x2="35" y2="155" stroke="currentColor" strokeWidth="0.8" />

                            {(() => {
                              const plotSales = [...filteredSales].slice(0, 8).reverse();
                              const highestVal = Math.max(...plotSales.map(s => s.total), 100);

                              const points = plotSales.map((s, idx) => {
                                const x = 35 + (idx * (350 / Math.max(1, plotSales.length - 1)));
                                const y = 155 - ((s.total / highestVal) * 125);
                                const dObj = new Date(s.createdAt);
                                const dateLabel = reportsFilterType === 'today' || reportsFilterType === 'yesterday'
                                  ? `${String(dObj.getHours()).padStart(2, '0')}:${String(dObj.getMinutes()).padStart(2, '0')}`
                                  : `${dObj.getMonth() + 1}/${dObj.getDate()}`;
                                return { x, y, total: s.total, label: dateLabel };
                              });

                              const linePath = points.map((p, idx) => idx === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`).join(' ');
                              const areaPath = points.length > 0 ? `${linePath} L ${points[points.length - 1].x} 155 L ${points[0].x} 155 Z` : '';

                              return (
                                <>
                                  {areaPath && <path d={areaPath} fill="url(#dashGrad)" opacity="0.15" />}
                                  {linePath && <path d={linePath} fill="none" stroke="#5334ac" strokeWidth="2.5" strokeLinecap="round" />}
                                  {points.map((p, idx) => (
                                    <g key={idx} className="group/hotspot">
                                      <circle cx={p.x} cy={p.y} r="4" className="fill-[#5334ac] stroke-white dark:stroke-zinc-900 cursor-pointer hover:r-6 transition-all" strokeWidth="1.5" />
                                      <text x={p.x} y={p.y - 8} textAnchor="middle" className="text-[7px] font-black fill-zinc-900 dark:fill-zinc-200 bg-white dark:bg-zinc-900 p-0.5 rounded shadow-sm opacity-0 group-hover/hotspot:opacity-100 transition-opacity">
                                        Rs.{p.total}
                                      </text>
                                      <text x={p.x} y="172" textAnchor="middle" className="text-[6.5px] fill-zinc-400 dark:fill-zinc-500 font-bold">
                                        {p.label}
                                      </text>
                                    </g>
                                  ))}
                                  <defs>
                                    <linearGradient id="dashGrad" x1="0" y1="0" x2="0" y2="1">
                                      <stop offset="0%" stopColor="#5334ac" />
                                      <stop offset="100%" stopColor="#5334ac" stopOpacity="0" />
                                    </linearGradient>
                                  </defs>
                                </>
                              );
                            })()}
                          </svg>
                        )}
                      </div>
                    </div>

                    {/* Category-wise breakdown progress chart */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex flex-col">
                      <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mb-1">Sales by Category</h3>
                      <p className="text-[10px] text-zinc-400 mb-6">Revenue share logged per product category</p>
                      
                      <div className="flex-1 flex flex-col justify-center gap-4">
                        {(() => {
                          const categoryRev: Record<string, number> = {
                            Teddy: 0, Dino: 0, Unicorn: 0, Elephant: 0, Penguin: 0
                          };
                          filteredSales.forEach(s => {
                            s.items.forEach(item => {
                              const prodObj = products.find(p => p.id === item.productId);
                              const cat = prodObj?.category || 'Teddy';
                              categoryRev[cat] = (categoryRev[cat] || 0) + (item.price * item.quantity);
                            });
                          });

                          const totalCategorySales = Object.values(categoryRev).reduce((sum, v) => sum + v, 0);
                          const sortedCategories = Object.entries(categoryRev).map(([name, rev]) => ({ name, rev }));

                          if (totalCategorySales === 0) {
                            return <span className="text-zinc-400 text-xs text-center font-semibold">No category metrics logged</span>;
                          }

                          return sortedCategories.map((item, idx) => {
                            const pct = totalCategorySales > 0 ? (item.rev / totalCategorySales) * 100 : 0;
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                  <span className="text-zinc-700 dark:text-zinc-300">{item.name}</span>
                                  <span className="text-zinc-500">Rs.{item.rev} ({Math.round(pct)}%)</span>
                                </div>
                                <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div
                                    style={{ width: `${pct}%` }}
                                    className="h-full bg-gradient-to-r from-indigo-500 to-[#5334ac] rounded-full"
                                  ></div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>
                  </div>

                  {/* Shrinkage & Recent sales logs block */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Shrinkage Loss Logs */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex flex-col">
                      <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mb-1">Leakage Distribution</h3>
                      <p className="text-[10px] text-zinc-400 mb-6">Quantity comparison of lost / stolen items per category</p>
                      
                      <div className="flex-1 flex flex-col justify-center gap-4">
                        {(() => {
                          const leakageByProd: Record<string, number> = {};
                          filteredShrinkage.forEach(log => {
                            leakageByProd[log.name] = (leakageByProd[log.name] || 0) + log.quantity;
                          });

                          const dataArr = Object.entries(leakageByProd).map(([name, qty]) => ({ name, qty }));
                          const maxQty = Math.max(...dataArr.map(d => d.qty), 1);

                          if (dataArr.length === 0) {
                            return <span className="text-zinc-400 text-xs text-center font-semibold">No leakage losses logged in this range</span>;
                          }

                          return dataArr.map((item, idx) => {
                            const percentage = (item.qty / maxQty) * 100;
                            return (
                              <div key={idx} className="space-y-1">
                                <div className="flex justify-between text-xs font-bold">
                                  <span className="text-zinc-700 dark:text-zinc-300">{item.name}</span>
                                  <span className="text-red-500">-{item.qty} units</span>
                                </div>
                                <div className="w-full h-2.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                                  <div style={{ width: `${percentage}%` }} className="h-full bg-gradient-to-r from-red-400 to-red-650 rounded-full"></div>
                                </div>
                              </div>
                            );
                          });
                        })()}
                      </div>
                    </div>

                    {/* Recent Transaction Log Ledger */}
                    <div className="p-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xs flex flex-col">
                      <h3 className="font-extrabold text-zinc-900 dark:text-zinc-100 text-sm mb-1">Recent Transactions</h3>
                      <p className="text-[10px] text-zinc-400 mb-4">Latest cash checkout invoices in this range</p>
                      
                      <div className="flex-1 overflow-x-auto">
                        {filteredSales.length === 0 ? (
                          <div className="h-full flex items-center justify-center p-8">
                            <span className="text-zinc-400 text-xs font-semibold">No invoices recorded</span>
                          </div>
                        ) : (
                          <table className="w-full text-left">
                            <thead>
                              <tr className="text-[9px] uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-850 pb-2">
                                <th className="pb-2">Items</th>
                                <th className="pb-2 text-right">Total</th>
                                <th className="pb-2 text-right">Date</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-850 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                              {filteredSales.slice(0, 5).map(log => (
                                <tr key={log.id}>
                                  <td className="py-2.5 truncate max-w-[150px]">
                                    {log.items.map(i => `${i.name} (${i.quantity})`).join(', ')}
                                  </td>
                                  <td className="py-2.5 text-right text-emerald-600">Rs.{log.total}</td>
                                  <td className="py-2.5 text-right text-zinc-400 font-semibold">{new Date(log.createdAt).toLocaleDateString()}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ---------------------------------------------------- */}
              {/* TAB: SYSTEM USERS */}
              {/* ---------------------------------------------------- */}
              {activeTab === 'users' && isAdmin && (
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1 className="text-2xl font-black text-zinc-900 dark:text-zinc-50">USER ACCOUNTS</h1>
                      <p className="text-xs text-zinc-500 mt-1">Configure role credentials for Stall accounts</p>
                    </div>
                    <button
                      onClick={() => { setUserForm({ username: '', name: '', role: 'seller', passwordHash: '' }); setShowUserModal(true); }}
                      className="px-4 py-2.5 bg-gradient-to-r from-[#5334ac] to-indigo-500 text-white font-bold rounded-xl shadow-md text-xs active:scale-[0.98] transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <UserPlus className="w-4.5 h-4.5" /> Register Profile
                    </button>
                  </div>

                  <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-sm overflow-hidden">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-zinc-50 dark:bg-zinc-955/50 text-zinc-400 text-[10px] font-bold uppercase tracking-wider border-b border-zinc-100 dark:border-zinc-800">
                          <th className="py-4 px-6">Name</th>
                          <th className="py-4 px-6">Username handle</th>
                          <th className="py-4 px-6">Role / Permission</th>
                          <th className="py-4 px-6 text-right">Delete Node</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800 text-xs">
                        {usersList.map(usr => (
                          <tr key={usr.username} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-805/10">
                            <td className="py-4 px-6 font-extrabold text-zinc-955 dark:text-zinc-100">{usr.name}</td>
                            <td className="py-4 px-6 text-zinc-505">@{usr.username}</td>
                            <td className="py-4 px-6">
                              {usr.role === 'admin' && <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full font-bold uppercase text-[9px]">👑 Admin</span>}
                              {usr.role === 'stock_manager' && <span className="px-2.5 py-1 bg-blue-100 text-blue-800 rounded-full font-bold uppercase text-[9px]">📦 Stock Manager</span>}
                              {usr.role === 'seller' && <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full font-bold uppercase text-[9px]">💼 Seller</span>}
                            </td>
                            <td className="py-4 px-6 text-right">
                              <button
                                onClick={() => handleDeleteUser(usr.username)}
                                disabled={user?.username === usr.username}
                                className="p-1.5 text-zinc-400 hover:text-red-500 disabled:opacity-30 disabled:pointer-events-none cursor-pointer transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      )}

      {/* --- FLOW A: QUICK SINGLE-ITEM CHECKOUT MODAL (WITH INTERACTIVE SIZE & COLOR SELECTORS) --- */}
      {activeQuickProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-sm w-full rounded-3xl p-6 shadow-2xl space-y-4">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-2 border-b border-zinc-150 dark:border-zinc-800">
              <div>
                <h3 className="font-extrabold text-zinc-950 dark:text-white text-sm">Configure Item</h3>
                <p className="text-[10px] text-zinc-450 mt-0.5">{activeQuickProduct.name} Details</p>
              </div>
              <button
                onClick={() => setActiveQuickProduct(null)}
                className="p-1 hover:bg-zinc-100 rounded-lg cursor-pointer"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* SIZE SELECTOR BUTTONS */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider pl-0.5">
                Select Size
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {(['Small', 'Medium', 'Large', 'Giant'] as const).map(size => {
                  const isAvailable = (availableQuickSizes as string[]).includes(size);
                  return (
                    <button
                      key={size}
                      type="button"
                      disabled={!isAvailable}
                      onClick={() => {
                        setQuickSize(size);
                        const match = products.find(p => p.name === activeQuickProduct.name && p.size === size);
                        if (match) {
                          setQuickColor(match.color);
                        }
                      }}
                      className={`py-2 rounded-xl text-[10px] font-bold transition-all cursor-pointer disabled:opacity-30 disabled:pointer-events-none ${
                        quickSize === size
                          ? 'bg-[#5334ac] text-white shadow-sm'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                      }`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* COLOR SELECTOR BUTTONS */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider pl-0.5">
                Select Color (available for {quickSize})
              </label>
              <div className="flex flex-wrap gap-1.5">
                {availableQuickColors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setQuickColor(color)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold cursor-pointer transition-all active:scale-95 flex items-center gap-1.5 ${
                      quickColor === color
                        ? 'bg-[#5334ac] text-white shadow-sm font-black'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-650'
                    }`}
                  >
                    <span className="w-2.5 h-2.5 rounded-full border border-zinc-200 block shrink-0" style={{ backgroundColor: getColorHex(color) }}></span>
                    <span>{color}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Available stock and price display */}
            <div className="flex justify-between items-center text-xs p-3 bg-zinc-50 dark:bg-zinc-800/50 rounded-2xl border border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] text-zinc-400 block">Unit Price</span>
                <span className="font-extrabold text-zinc-800 dark:text-zinc-200">Rs. {activeQuickProduct.price}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-zinc-400 block">Stall Stock</span>
                <span className={`font-black ${activeQuickProduct.lorryStock === 0 ? 'text-red-500' : 'text-emerald-600'}`}>
                  {activeQuickProduct.lorryStock} left
                </span>
              </div>
            </div>

            {/* QUANTITY SELECTOR (1 to 5) */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider">Quantity</label>
                {quickQty > 5 && <span className="text-[10px] font-extrabold text-zinc-550">Custom: {quickQty}</span>}
              </div>
              <div className="grid grid-cols-6 gap-1">
                {[1, 2, 3, 4, 5].map(qty => (
                  <button
                    key={qty}
                    type="button"
                    disabled={qty > activeQuickProduct.lorryStock}
                    onClick={() => setQuickQty(qty)}
                    className={`py-2 rounded-xl text-xs font-black transition-all cursor-pointer disabled:opacity-20 disabled:pointer-events-none ${
                      quickQty === qty
                        ? 'bg-[#5334ac] text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
                {/* Custom input toggle */}
                <input
                  type="number"
                  min="1"
                  max={activeQuickProduct.lorryStock}
                  value={quickQty || ''}
                  onChange={e => setQuickQty(Math.min(activeQuickProduct.lorryStock, parseInt(e.target.value || '1')))}
                  placeholder="+"
                  className="px-1 py-2 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-850 rounded-xl font-bold focus:outline-none text-center text-xs"
                />
              </div>
            </div>

            {/* STALL DISCOUNT SHORTCUT BUTTONS (Default Rs. 0) */}
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-zinc-400 uppercase tracking-wider pl-0.5">
                Stall Discount (Rs.)
              </label>
              <div className="grid grid-cols-5 gap-1">
                {[
                  { key: '0', label: 'Rs. 0' },
                  { key: '100', label: '100' },
                  { key: '200', label: '200' },
                  { key: '300', label: '300' },
                  { key: 'custom', label: 'Custom' }
                ].map(d => (
                  <button
                    key={d.key}
                    type="button"
                    onClick={() => setQuickDiscountType(d.key as any)}
                    className={`py-2 rounded-lg text-[10px] font-black cursor-pointer transition-all active:scale-95 text-center ${
                      quickDiscountType === d.key
                        ? 'bg-[#5334ac] text-white shadow-xs'
                        : 'bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 text-zinc-650'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
              {quickDiscountType === 'custom' && (
                <input
                  type="number"
                  value={quickDiscount}
                  onChange={e => setQuickDiscount(e.target.value)}
                  placeholder="Enter custom Rs. discount"
                  className="w-full px-3 py-2 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded-xl font-bold mt-1.5 focus:outline-none"
                />
              )}
            </div>

            {/* Total display */}
            <div className="flex justify-between items-center text-xs border-t border-dashed border-zinc-200 dark:border-zinc-800 pt-3">
              <span className="text-zinc-400 font-bold">Total Bill:</span>
              <span className="text-lg font-black text-[#5334ac]">Rs. {activeQuickTotal}</span>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
              <button
                type="button"
                onClick={() => {
                  const existing = cart.find(item => item.product.id === activeQuickProduct.id);
                  const addedQty = quickQty;
                  if (existing) {
                    setCart(cart.map(item =>
                      item.product.id === activeQuickProduct.id
                        ? { ...item, quantity: Math.min(activeQuickProduct.lorryStock, item.quantity + addedQty) }
                        : item
                    ));
                  } else {
                    setCart([...cart, { product: activeQuickProduct, quantity: addedQty }]);
                  }
                  setActiveQuickProduct(null);
                }}
                className="py-2.5 border border-[#5334ac] hover:bg-[#5334ac]/5 text-[#5334ac] font-bold rounded-2xl cursor-pointer text-[10px] text-center"
              >
                + MULTI-CART
              </button>
              <button
                type="button"
                onClick={handleQuickCheckoutConfirm}
                disabled={activeQuickProduct.lorryStock <= 0}
                className="py-2.5 bg-[#5334ac] hover:bg-[#482b9c] text-white font-bold rounded-2xl shadow-sm cursor-pointer text-[10px] text-center disabled:opacity-40"
              >
                CONFIRM SALE ✓
              </button>
            </div>

          </div>
        </div>
      )}

      {/* --- SUCCESS / ERROR TOAST NOTIFICATION --- */}
      {toast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2.5 px-4 py-3 bg-emerald-600 text-white font-bold text-xs rounded-2xl shadow-xl animate-bounce-short">
          <CheckCircle className="w-4 h-4" />
          <span>{toast.message}</span>
        </div>
      )}

      {/* --- ADD/EDIT PRODUCT ATTRS MODAL --- */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">
                {editingProduct ? 'Edit Teddy Bear Details' : 'Register New Toy Model'}
              </h3>
              <button onClick={() => setShowProductModal(false)} className="p-1 hover:bg-zinc-100 rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Model Name</label>
                <input
                  type="text"
                  required
                  value={productForm.name}
                  onChange={e => setProductForm({ ...productForm, name: e.target.value })}
                  placeholder="e.g. Classic Cuddle Bear"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none font-bold"
                />

                {/* DYNAMIC SEARCH OF EXISTING REGISTERED COLORS */}
                {productForm.name && (() => {
                  const existingColors = Array.from(new Set(
                    products
                      .filter(p => p.name.toLowerCase() === (productForm.name || '').trim().toLowerCase())
                      .map(p => p.color)
                  ));
                  if (existingColors.length === 0) return null;
                  return (
                    <div className="mt-2.5 p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-xl">
                      <p className="text-[9px] font-bold text-zinc-400 uppercase tracking-wider mb-1">Already Registered Colors:</p>
                      <div className="flex gap-1.5 items-center flex-wrap">
                        {existingColors.map(c => (
                          <div key={c} className="flex items-center gap-1 bg-white dark:bg-zinc-900 px-2 py-0.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[9px] font-bold">
                            <span className="w-2.5 h-2.5 rounded-full border border-zinc-200 block shrink-0" style={{ backgroundColor: getColorHex(c) }}></span>
                            <span>{c}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>

              {/* DYNAMIC CLICKABLE COLOR PICKER CIRCLES (Only for new registrations) */}
              {!editingProduct ? (
                <>
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Select Color</label>
                    <div className="grid grid-cols-5 gap-1.5">
                      {['Brown', 'Pink', 'White', 'Blue', 'Purple', 'Beige', 'Gold', 'Black', 'Green', 'Grey'].map(c => {
                        const isActive = productForm.color === c;
                        return (
                          <button
                            type="button"
                            key={c}
                            onClick={() => setProductForm({ ...productForm, color: c })}
                            className={`py-2 rounded-xl text-[10px] font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer border ${
                              isActive
                                ? 'border-[#5334ac] bg-[#5334ac]/5 text-[#5334ac] font-black'
                                : 'border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-650 hover:bg-zinc-50'
                            }`}
                          >
                            <span className="w-2.5 h-2.5 rounded-full border border-zinc-150 block shrink-0" style={{ backgroundColor: getColorHex(c) }}></span>
                            <span>{c}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* DYNAMIC SIZE PICKER */}
                  <div>
                    <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Select Size</label>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['Small', 'Medium', 'Large', 'Giant'] as const).map(sz => {
                        const isActive = productForm.size === sz;
                        return (
                          <button
                            type="button"
                            key={sz}
                            onClick={() => setProductForm({ ...productForm, size: sz })}
                            className={`py-2.5 rounded-xl text-xs font-black transition-all cursor-pointer border ${
                              isActive
                                ? 'bg-[#5334ac] border-[#5334ac] text-white shadow-sm'
                                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-50'
                            }`}
                          >
                            {sz}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Price (Rs.)</label>
                      <input
                        type="number"
                        required={variantQueue.length === 0}
                        value={productForm.price !== undefined ? productForm.price : ''}
                        onChange={e => setProductForm({ ...productForm, price: parseFloat(e.target.value || '0') })}
                        placeholder="1500"
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Stall Stock Quantity</label>
                      <input
                        type="number"
                        required={variantQueue.length === 0}
                        value={productForm.lorryStock !== undefined ? productForm.lorryStock : ''}
                        onChange={e => setProductForm({ ...productForm, lorryStock: parseInt(e.target.value || '0') })}
                        placeholder="50"
                        className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none font-bold"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={addVariantToQueue}
                    className="w-full py-2.5 border border-[#5334ac] hover:bg-[#5334ac]/5 text-[#5334ac] font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer text-xs uppercase"
                  >
                    + Add Variant to List
                  </button>

                  {/* VARIANT QUEUE LIST FOR REGISTRATION */}
                  {variantQueue.length > 0 && (
                    <div className="space-y-2 border-t border-zinc-150 dark:border-zinc-800 pt-3">
                      <label className="block text-[10px] font-extrabold text-[#5334ac] dark:text-[#a78bfa] uppercase tracking-wider pl-0.5">
                        Variants to be Registered ({variantQueue.length})
                      </label>
                      <div className="max-h-48 overflow-y-auto space-y-2 pr-1">
                        {variantQueue.map((item, idx) => (
                          <div key={idx} className="flex gap-2 items-center p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl">
                            <div className="flex-1 min-w-0 flex items-center gap-1.5">
                              <span className="w-3 h-3 rounded-full border border-zinc-200 block shrink-0" style={{ backgroundColor: getColorHex(item.color) }}></span>
                              <span className="text-[10px] font-bold truncate leading-tight">{item.color} - {item.size}</span>
                            </div>
                            <div className="text-[10px] font-semibold text-zinc-500">Rs. {item.price}</div>
                            <div className="text-[10px] font-black text-emerald-600 px-2">{item.lorryStock} units</div>
                            <button
                              type="button"
                              onClick={() => setVariantQueue(variantQueue.filter((_, i) => i !== idx))}
                              className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* EDIT MODE - BULK VARIANT EDITOR GRID */
                <div className="space-y-2 border-t border-zinc-150 dark:border-zinc-800 pt-3">
                  <label className="block text-[10px] font-extrabold text-[#5334ac] dark:text-[#a78bfa] uppercase tracking-wider pl-0.5">
                    Edit Product Variants ({variantQueue.length})
                  </label>
                  <div className="max-h-60 overflow-y-auto space-y-2 pr-1">
                    {variantQueue.map((item, idx) => (
                      <div key={idx} className="flex gap-2 items-center p-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-2xl">
                        <div className="flex-1 min-w-0 flex items-center gap-1.5">
                          <span className="w-3 h-3 rounded-full border border-zinc-200 block shrink-0" style={{ backgroundColor: getColorHex(item.color) }}></span>
                          <span className="text-[10px] font-bold truncate leading-tight">{item.color} - {item.size}</span>
                        </div>
                        <div className="w-24 flex items-center gap-1">
                          <span className="text-[9px] text-zinc-400 font-bold">Rs.</span>
                          <input
                            type="number"
                            value={item.price !== undefined ? item.price : ''}
                            onChange={e => {
                              const val = parseFloat(e.target.value || '0');
                              setVariantQueue(prev => prev.map((q, i) => i === idx ? { ...q, price: val } : q));
                            }}
                            className="w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-bold text-center focus:outline-none"
                          />
                        </div>
                        <div className="w-20 flex items-center gap-1">
                          <span className="text-[9px] text-zinc-400 font-bold">Qty</span>
                          <input
                            type="number"
                            value={item.lorryStock !== undefined ? item.lorryStock : ''}
                            onChange={e => {
                              const val = parseInt(e.target.value || '0');
                              setVariantQueue(prev => prev.map((q, i) => i === idx ? { ...q, lorryStock: val } : q));
                            }}
                            className="w-full px-2 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg text-[10px] font-bold text-center focus:outline-none"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            if (item.id) {
                              setDeletedVariantIds(prev => [...prev, item.id!]);
                            }
                            setVariantQueue(prev => prev.filter((_, i) => i !== idx));
                          }}
                          className="text-red-500 hover:text-red-700 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Toy Icon Category</label>
                <select
                  value={productForm.category || 'Teddy'}
                  onChange={e => setProductForm({ ...productForm, category: e.target.value })}
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none cursor-pointer font-bold"
                >
                  <option value="Teddy">🧸 Teddy Bear</option>
                  <option value="Dino">🦖 Dinosaur</option>
                  <option value="Unicorn">🦄 Unicorn</option>
                  <option value="Elephant">🐘 Elephant</option>
                  <option value="Penguin">🐧 Penguin</option>
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer mt-4 text-xs uppercase tracking-wider"
              >
                {editingProduct ? 'Save Product Changes' : 'Register Product Attrs'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD USER MODAL --- */}
      {showUserModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-lg text-zinc-900 dark:text-zinc-50">Create User Credentials</h3>
              <button onClick={() => setShowUserModal(false)} className="p-1 hover:bg-zinc-100 rounded-lg cursor-pointer">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            <form onSubmit={handleUserSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={userForm.name}
                  onChange={e => setUserForm({ ...userForm, name: e.target.value })}
                  placeholder="e.g. Sunil Perera"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Username Handle</label>
                  <input
                    type="text"
                    required
                    value={userForm.username}
                    onChange={e => setUserForm({ ...userForm, username: e.target.value })}
                    placeholder="e.g. sunil"
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Role Permissions</label>
                  <select
                    value={userForm.role}
                    onChange={e => setUserForm({ ...userForm, role: e.target.value as any })}
                    className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-955 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none cursor-pointer"
                  >
                    <option value="admin">Admin</option>
                    <option value="stock_manager">Stock Manager</option>
                    <option value="seller">Seller</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mb-2">Password</label>
                <input
                  type="password"
                  required
                  value={userForm.passwordHash}
                  onChange={e => setUserForm({ ...userForm, passwordHash: e.target.value })}
                  placeholder="••••••••"
                  className="w-full px-4 py-2.5 bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded-xl focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl active:scale-[0.98] transition-all cursor-pointer mt-4"
              >
                Register Account Profile
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
