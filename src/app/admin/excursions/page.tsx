import { prisma } from '@/lib/prisma';
import { formatDualPrice } from '@/lib/pricing';

export const dynamic = 'force-dynamic';

export default async function AdminExcursions() {
  const excursions = await prisma.excursion.findMany({ orderBy: { sortOrder: 'asc' } });

  return (
    <div>
      <h1 className="font-display text-3xl mb-2">Excursions</h1>
      <p className="text-muted text-sm mb-8">
        Gérez vos activités, prix et disponibilité. (Création / édition complète via l&apos;API
        <code className="text-dune-soft"> /api/excursions</code> - formulaire visuel à brancher en étape 3.)
      </p>
      <div className="grid gap-4 md:grid-cols-2">
        {excursions.map((e) => (
          <div key={e.id} className="rounded-2xl border border-dune/20 bg-ink-2 p-5 flex justify-between items-start">
            <div>
              <p className="font-display text-lg">{e.titleFr}</p>
              <p className="text-muted text-xs uppercase tracking-wider">
                {e.category} · {e.unit === 'VEHICLE' ? 'par véhicule' : 'par personne'}
              </p>
              <p className="text-dune-soft font-display text-xl mt-2">{formatDualPrice(e.priceCents)}</p>
            </div>
            <span className={`text-xs font-bold px-2 py-1 rounded-md ${e.active ? 'bg-zellige/20 text-zellige' : 'bg-muted/20 text-muted'}`}>
              {e.active ? 'Active' : 'Inactive'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
