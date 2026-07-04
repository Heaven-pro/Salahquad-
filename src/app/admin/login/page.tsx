'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErr('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    setLoading(false);
    if (res.ok) router.push('/admin');
    else setErr('Identifiants incorrects');
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={submit} className="w-full max-w-sm rounded-2xl border border-dune/20 bg-ink-2 p-8">
        <h1 className="font-display text-2xl text-dune-soft mb-1">Administration</h1>
        <p className="text-muted text-sm mb-6">Salah Quad Marrakech</p>
        <input
          className="w-full bg-ink border border-dune/20 rounded-xl px-4 py-3 mb-3 outline-none focus:border-dune"
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="w-full bg-ink border border-dune/20 rounded-xl px-4 py-3 mb-4 outline-none focus:border-dune"
          placeholder="Mot de passe"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {err && <p className="text-saffron text-sm mb-3">{err}</p>}
        <button disabled={loading} className="w-full rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold py-3">
          {loading ? '…' : 'Se connecter'}
        </button>
      </form>
    </div>
  );
}
