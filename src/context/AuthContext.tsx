'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, getUsers, saveUserLocal } from '@/lib/db';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, passwordHash: string) => Promise<boolean>;
  logout: () => void;
  isAdmin: boolean;
  isStockManager: boolean;
  isSeller: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initAuth() {
      try {
        // Load active session from localStorage
        const storedUser = localStorage.getItem('session_user_v2');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }

        // Initialize users check
        const localUsers = await getUsers();
        if (localUsers.length === 0) {
          const defaults: User[] = [
            { username: 'admin', name: 'Pasindu (Admin)', role: 'admin', passwordHash: 'admin123', updatedAt: Date.now() },
            { username: 'manager', name: 'Nimal (Stock Manager)', role: 'stock_manager', passwordHash: 'manager123', updatedAt: Date.now() },
            { username: 'seller', name: 'Kamal (Seller)', role: 'seller', passwordHash: 'seller123', updatedAt: Date.now() },
          ];
          for (const d of defaults) {
            await saveUserLocal(d);
          }
        }
      } catch (err) {
        console.error('Error during Auth initialization:', err);
      } finally {
        setLoading(false);
      }
    }
    initAuth();
  }, []);

  const login = async (username: string, passwordHash: string): Promise<boolean> => {
    try {
      const allUsers = await getUsers();
      const matched = allUsers.find(
        u => u.username.toLowerCase() === username.toLowerCase() && u.passwordHash === passwordHash
      );

      if (matched) {
        setUser(matched);
        localStorage.setItem('session_user_v2', JSON.stringify(matched));
        return true;
      }
      return false;
    } catch (err) {
      console.error('Login error:', err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('session_user_v2');
  };

  const isAdmin = user?.role === 'admin';
  const isStockManager = user?.role === 'stock_manager';
  const isSeller = user?.role === 'seller';

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAdmin,
        isStockManager,
        isSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
