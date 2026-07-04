'use client';
import Link from 'next/link';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <aside className="md:w-60 shrink-0 border-r border-dune/20 bg-ink-2 p-6">
        <p className="font-display text-lg text-dune-soft mb-8">Salah Quad <span className="block text-xs tracking-[0.2em] uppercase text-dune">Admin</span></p>
        <nav className="flex md:flex-col gap-1 text-sm">
          <Link href="/admin" className="px-3 py-2 rounded-lg hover:bg-dune/10">Tableau de bord</Link>
          <Link href="/admin/bookings" className="px-3 py-2 rounded-lg hover:bg-dune/10">Réservations</Link>
          <Link href="/admin/excursions" className="px-3 py-2 rounded-lg hover:bg-dune/10">Excursions</Link>
          <button
            onClick={async () => { await fetch('/api/admin/login', { method: 'DELETE' }); window.location.href = '/admin/login'; }}
            className="px-3 py-2 rounded-lg text-saffron hover:bg-saffron/10 mt-4 text-left w-full"
          >
            Déconnexion
          </button>
          <a href="/" className="px-3 py-2 rounded-lg text-muted hover:bg-dune/10">← Voir le site</a>
        </nav>
      </aside>
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
