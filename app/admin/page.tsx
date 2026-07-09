'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, Toaster } from 'react-hot-toast';

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        localStorage.setItem('adminAuth', 'true');
        toast.success('Login successful!');
        router.push('/admin/dashboard');
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Invalid credentials');
      }
    } catch (error) {
      toast.error('Network error during login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-[#FFEDE0] p-4 select-none">
      <Toaster position="top-center" reverseOrder={false} />
      
      <div className="w-full max-w-md bg-white border-2 border-[#252525] rounded-[34px] shadow-[8px_8px_0_0_#252525] p-8 sm:p-10">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold uppercase tracking-wider text-[#252525] mb-2 font-roboto-condensed">
            Admin Login
          </h1>
          <p className="text-sm font-bold uppercase text-[#72388f] tracking-wide">
            Jigisha 5.0 Event Management
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="username" className="text-xs font-bold uppercase text-gray-700 tracking-wider">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={credentials.username}
              onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-[#252525] font-semibold outline-none focus:border-[#72388f] transition-colors"
              placeholder="Enter username"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="password" className="text-xs font-bold uppercase text-gray-700 tracking-wider">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={credentials.password}
              onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-3 rounded-xl border-2 border-gray-300 bg-white text-[#252525] font-semibold outline-none focus:border-[#72388f] transition-colors"
              placeholder="Enter password"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 px-6 bg-[#72388f] text-white font-bold uppercase tracking-wider rounded-lg hover:bg-[#361152] transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer shadow-md mt-2"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </main>
  );
}
