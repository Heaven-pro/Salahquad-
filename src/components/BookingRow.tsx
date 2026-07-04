'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type B = {
  id: string;
  reference: string;
  customerName: string;
  customerPhone: string;
  title: string;
  date: string;
  timeSlot: string;
  people: number;
  total: string;
  status: string;
};

const COLORS: Record<string, string> = {
  PENDING: 'text-saffron',
  CONFIRMED: 'text-zellige',
  CANCELLED: 'text-muted line-through',
  COMPLETED: 'text-dune-soft',
};

export default function BookingRow({ b }: { b: B }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(status: string) {
    if (!window.confirm('Êtes-vous sûr de vouloir changer le statut ?')) return;
    setBusy(true);
    try {
      const res = await fetch(`/api/bookings/${b.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || 'Erreur lors de la mise à jour');
      }
    } catch {
      alert('Erreur réseau, veuillez réessayer');
    }
    setBusy(false);
    router.refresh();
  }

  return (
    <tr className="border-t border-dune/10">
      <td className="p-3 font-mono text-dune-soft">{b.reference}</td>
      <td className="p-3">
        {b.customerName}
        <br />
        <span className="text-muted text-xs">{b.customerPhone}</span>
      </td>
      <td className="p-3">{b.title}</td>
      <td className="p-3">
        {b.date} {b.timeSlot}
      </td>
      <td className="p-3">{b.people}</td>
      <td className="p-3">{b.total}</td>
      <td className={`p-3 font-bold ${COLORS[b.status] || ''}`}>{b.status}</td>
      <td className="p-3">
        <div className="flex gap-2">
          <button disabled={busy} onClick={() => setStatus('CONFIRMED')} className="rounded-md bg-zellige/20 text-zellige px-2 py-1 text-xs">
            Confirmer
          </button>
          <button disabled={busy} onClick={() => setStatus('CANCELLED')} className="rounded-md bg-saffron/15 text-saffron px-2 py-1 text-xs">
            Annuler
          </button>
        </div>
      </td>
    </tr>
  );
}
