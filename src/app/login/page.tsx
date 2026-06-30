'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';

export default function LoginPage() {
  const { login, user, loading } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If already logged in, redirect to dashboard
  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const success = await login(username, password);
      if (success) {
        router.push('/');
      } else {
        setError('Invalid username or password. Try quick select!');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickSelect = async (u: string, p: string) => {
    setError('');
    setIsSubmitting(true);
    try {
      const success = await login(u, p);
      if (success) {
        router.push('/');
      } else {
        setError('Quick select login failed.');
      }
    } catch (err) {
      setError('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading || user) {
    return (
      <div className="flex flex-1 items-center justify-center min-h-screen bg-amber-50/30 dark:bg-zinc-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-500 dark:text-zinc-400 font-medium">Loading session...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-amber-50 via-zinc-100 to-amber-100/50 dark:from-zinc-950 dark:via-zinc-900 dark:to-amber-950/20 px-4 py-12">
      {/* Decorative Orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-amber-300/30 dark:bg-amber-800/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-200/40 dark:bg-orange-950/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="w-full max-w-md bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl border border-white/20 dark:border-zinc-800/80 rounded-3xl shadow-2xl p-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 mb-4 shadow-inner">
            <span className="text-3xl">🧸</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 flex items-center justify-center gap-2">
            Teddy Bear POS <Sparkles className="w-5 h-5 text-amber-500 animate-pulse" />
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
            Enter details or select a quick role profile
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50 text-sm text-red-600 dark:text-red-400">
            {error}
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 pl-1">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <User className="w-4 h-4" />
              </div>
              <input
                type="text"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="admin, manager, or seller"
                className="w-full pl-11 pr-4 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 rounded-2xl text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-2 pl-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-zinc-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-12 py-3 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/60 rounded-2xl text-zinc-800 dark:text-zinc-200 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white rounded-2xl font-semibold shadow-lg shadow-amber-500/20 active:scale-[0.98] transition-all disabled:opacity-50 disabled:pointer-events-none flex justify-center items-center gap-2"
          >
            {isSubmitting ? (
              <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-zinc-200 dark:border-zinc-800"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-transparent px-3 text-zinc-400 dark:text-zinc-500 font-semibold bg-white/70 dark:bg-zinc-900/70 backdrop-blur-xl">
              Quick Role Login
            </span>
          </div>
        </div>

        {/* Quick select buttons */}
        <div className="grid grid-cols-3 gap-3">
          <button
            onClick={() => handleQuickSelect('admin', 'admin123')}
            disabled={isSubmitting}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/50 hover:bg-amber-100/50 dark:bg-amber-950/20 dark:hover:bg-amber-900/20 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-400/50 dark:hover:border-amber-700/50 transition-all text-center group cursor-pointer"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">👑</span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">Admin</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Pasindu</span>
          </button>

          <button
            onClick={() => handleQuickSelect('manager', 'manager123')}
            disabled={isSubmitting}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/50 hover:bg-amber-100/50 dark:bg-amber-950/20 dark:hover:bg-amber-900/20 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-400/50 dark:hover:border-amber-700/50 transition-all text-center group cursor-pointer"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">📦</span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">Manager</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Nimal</span>
          </button>

          <button
            onClick={() => handleQuickSelect('seller', 'seller123')}
            disabled={isSubmitting}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-amber-50/50 hover:bg-amber-100/50 dark:bg-amber-950/20 dark:hover:bg-amber-900/20 border border-amber-200/50 dark:border-amber-900/30 hover:border-amber-400/50 dark:hover:border-amber-700/50 transition-all text-center group cursor-pointer"
          >
            <span className="text-xl mb-1 group-hover:scale-110 transition-transform">💼</span>
            <span className="text-xs font-bold text-amber-800 dark:text-amber-400">Seller</span>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500">Kamal</span>
          </button>
        </div>
      </div>
    </div>
  );
}
