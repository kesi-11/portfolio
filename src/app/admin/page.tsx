'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'richkid2026';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      document.cookie = 'admin_auth=valid; path=/; max-age=86400';
      router.push('/admin/dashboard');
    } else {
      setError('Invalid password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505]">
      <div className="w-full max-w-md p-8 bg-[#0a0a0a] rounded-3xl border border-white/10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-[#C9A84C] to-[#8B7355] rounded-2xl flex items-center justify-center mx-auto mb-4">
            👑
          </div>
          <h1 className="text-2xl font-bold font-['Playfair_Display']">Admin Login</h1>
          <p className="text-gray-400 mt-2">Enter password to access dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full bg-white/10 border border-white/20 focus:border-[#C9A84C] rounded-2xl px-6 py-4 text-white placeholder-gray-500 outline-none"
            />
          </div>
          
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          
          <button
            type="submit"
            className="w-full py-4 bg-[#C9A84C] text-black font-bold rounded-2xl hover:bg-[#E5D4A1] transition-colors"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}