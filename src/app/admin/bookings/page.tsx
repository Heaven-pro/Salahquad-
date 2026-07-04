import { prisma } from '@/lib/prisma';
import { formatDualPrice } from '@/lib/pricing';
import BookingRow from '@/components/BookingRow';

export const dynamic = 'force-dynamic';

export default async function AdminBookings() {
  const bookings = await prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { excursion: { select: { titleFr: true } } },
    take: 200,
  });

  return (
    <div>
      <h1 className="font-display text-3xl mb-8">Réservations</h1>
      <div className="overflow-x-auto rounded-2xl border border-dune/20">
        <table className="w-full text-sm">
          <thead className="bg-ink-2 text-muted text-left">
            <tr>
              <th className="p-3">Réf.</th><th className="p-3">Client</th><th className="p-3">Activité</th>
              <th className="p-3">Date</th><th className="p-3">Pers.</th><th className="p-3">Total</th>
              <th className="p-3">Statut</th><th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <BookingRow key={b.id} b={{
                id: b.id, reference: b.reference, customerName: b.customerName,
                customerPhone: b.customerPhone, title: b.excursion.titleFr,
                date: b.date.toISOString().split('T')[0], timeSlot: b.timeSlot,
                people: b.pilots + b.passengers + b.children,
                total: formatDualPrice(b.totalCents), status: b.status,
              }} />
            ))}
            {bookings.length === 0 && (
              <tr><td colSpan={8} className="p-6 text-center text-muted">Aucune réservation pour l&apos;instant.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
