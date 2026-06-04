import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export default function Login({ onAuthenticated }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Login failed.');
      }

      localStorage.setItem('godstojie_admin_token', result.token);
      onAuthenticated(result.token);
    } catch (err) {
      setError(err.message || 'Unable to log in.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md rounded-4xl bg-white p-10 shadow-xl ring-1 ring-slate-200">
        <h1 className="text-3xl font-semibold text-slate-900">Admin login</h1>
        <p className="mt-3 text-sm leading-6 text-slate-600">Enter your admin credentials to access the lead dashboard.</p>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-slate-700">
            Username
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
              placeholder="admin"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none ring-1 ring-transparent transition focus:border-slate-300 focus:ring-slate-300"
              placeholder="••••••••"
            />
          </label>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
      </div>
    </main>
  );
}
