import { prisma } from '@/lib/prisma';
import { formatDualPrice } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const [total, pending, confirmed, revenue, excCount] = await Promise.all([
    prisma.booking.count(),
    prisma.booking.count({ where: { status: 'PENDING' } }),
    prisma.booking.count({ where: { status: 'CONFIRMED' } }),
    prisma.booking.aggregate({ _sum: { totalCents: true }, where: { status: { in: ['CONFIRMED', 'COMPLETED'] } } }),
    prisma.excursion.count({ where: { active: true } }),
  ]);

  const cards = [
    { label: 'Réservations totales', value: total },
    { label: 'En attente', value: pending },
    { label: 'Confirmées', value: confirmed },
    { label: 'Chiffre confirmé', value: formatDualPrice(revenue._sum.totalCents ?? 0) },
    { label: 'Excursions actives', value: excCount },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Tableau de bord</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border border-dune/20 bg-ink-2 p-6">
            <p className="text-muted text-xs uppercase tracking-wider mb-2">{c.label}</p>
            <p className="font-display text-3xl text-dune-soft">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
