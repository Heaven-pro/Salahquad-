import Image, { type StaticImageData } from 'next/image';
import { formatDualPrice } from '@/lib/pricing';
import AppIcon, { type IconName } from '@/components/AppIcon';

interface CategoryCardProps {
  title: string;
  description: string;
  icon: IconName;
  gradientClass: string;
  reserveLabel: string;
  perVehicleLabel: string;
  perPersonLabel: string;
  image: StaticImageData;
  imageAlt: string;
  excursions: {
    title: string;
    priceCents: number;
    unit: 'PERSON' | 'VEHICLE';
    tag: string | null;
  }[];
}

export default function CategoryCard({
  title,
  description,
  icon,
  gradientClass,
  reserveLabel,
  perVehicleLabel,
  perPersonLabel,
  image,
  imageAlt,
  excursions,
}: CategoryCardProps) {
  return (
    <div className="category-card group rounded-3xl overflow-hidden border border-dune/10 bg-gradient-to-b from-[#24180f] to-[#130d09] shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
      <div className="relative aspect-[16/9] overflow-hidden bg-black/20">
        <Image
          src={image}
          alt={imageAlt}
          fill
          className="object-cover brightness-125 contrast-110 saturate-110 transition-transform duration-700 group-hover:scale-105"
          style={{ objectPosition: 'center 58%' }}
        />
        <div className={`absolute inset-0 ${gradientClass} opacity-0`} />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/28 via-transparent to-transparent" />
        <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-dune-soft backdrop-blur-md shadow-lg shadow-black/20">
          <AppIcon name={icon} className="h-7 w-7" />
        </div>
      </div>

      <div className="relative p-8 md:p-10">
        <h3 className="font-display text-2xl md:text-3xl text-bone mb-3">{title}</h3>
        <p className="text-muted text-sm leading-relaxed mb-6 max-w-md">{description}</p>

        <div className="space-y-3">
          {excursions.map((exc) => (
            <div key={exc.title} className="flex items-center justify-between gap-4 p-4 rounded-xl glass card-hover">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-bone font-semibold text-sm truncate">{exc.title}</p>
                  {exc.tag && (
                    <span className="shrink-0 text-[10px] font-bold uppercase tracking-wider bg-dune/10 text-dune border border-dune/20 rounded-full px-2 py-0.5">
                      {exc.tag}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-muted mt-0.5">{exc.unit === 'VEHICLE' ? perVehicleLabel : perPersonLabel}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-display text-lg text-dune-soft">{formatDualPrice(exc.priceCents)}</p>
              </div>
            </div>
          ))}
        </div>

        <a
          href="#reserver"
          className="inline-flex items-center gap-2 mt-6 rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold text-sm px-6 py-3 btn-shine transition-transform hover:scale-105"
        >
          {reserveLabel}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
