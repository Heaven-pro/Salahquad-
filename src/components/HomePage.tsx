'use client';

import Image from 'next/image';
import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import { formatDualPrice } from '@/lib/pricing';
import { LOCALES, LANGUAGE_LABELS, TRANSLATIONS, getLocale, type Locale } from '@/lib/i18n';
import BookingWidget from '@/components/BookingWidget';
import Navbar from '@/components/Navbar';
import CategoryCard from '@/components/CategoryCard';
import TestimonialCarousel from '@/components/TestimonialCarousel';
import StatsCounter from '@/components/StatsCounter';
import WhatsAppButton from '@/components/WhatsAppButton';
import AppIcon from '@/components/AppIcon';
import { WHATSAPP_NUMBER } from '@/lib/contact';
import { INSTAGRAM_PROFILE_URL } from '@/lib/gallery-content';
import logoImage from '@/lib/Logo.png';
import coverImage from '@/lib/image de garde.jpeg';
import categoryQuadImage from '@/lib/4 quads.png';
import categoryBuggyImage from '@/lib/2 buggy.png';
import categoryCrossImage from '@/lib/2 cross.png';
import quadOfferImage from '@/lib/quad.png';
import duoQuadImage from '@/lib/duo quad.png';
import raptorImage from '@/lib/raptor.png';
import buggyPImage from '@/lib/buggy p.png';
import buggyPremiumImage from '@/lib/buggy premium.png';
import cross80Image from '@/lib/cross 80.png';
import cross250Image from '@/lib/cross 250.png';

export type ExcursionItem = {
  id: string;
  slug: string;
  category: string;
  titleFr: string;
  titleEn: string;
  descFr: string;
  descEn: string;
  priceCents: number;
  unit: 'PERSON' | 'VEHICLE';
  tagFr: string | null;
  tagEn: string | null;
  durations: { label: string; mult: number }[];
  includesFr: string[];
  includesEn: string[];
};

export type ReviewItem = {
  name: string;
  location: string;
  textFr: string;
  textEn: string;
  rating: number;
};

interface HomePageProps {
  excursions: ExcursionItem[];
  reviews: ReviewItem[];
}

export default function HomePage({ excursions, reviews }: HomePageProps) {
  const pathname = usePathname() || '/';
  const maybeLocale = pathname.split('/')[1] || 'fr';
  const locale = getLocale(maybeLocale as Locale);
  const t = TRANSLATIONS[locale];
  const galleryPath = `/${locale}/gallery`;

  const currentPath = useMemo(
    () => pathname.replace(new RegExp(`^/(${LOCALES.join('|')})`), '') || '/',
    [pathname]
  );

  const localeLinks = LOCALES.map((code) => ({ code, label: LANGUAGE_LABELS[code] }));

  const byCategory = useMemo(() => {
    const map = new Map<string, ExcursionItem[]>();
    excursions.forEach((exc) => {
      if (!map.has(exc.category)) map.set(exc.category, []);
      map.get(exc.category)!.push(exc);
    });
    return map;
  }, [excursions]);

  const categoryKeys = ['quad', 'buggy', 'cross'] as const;
  const categoryImages = { quad: categoryQuadImage, buggy: categoryBuggyImage, cross: categoryCrossImage } as const;
  const excursionImages: Record<string, typeof coverImage> = {
    'quad-palmeraie': quadOfferImage,
    'quad-duo': duoQuadImage,
    'quad-raptor-700': raptorImage,
    'buggy-1000-desert': buggyPImage,
    'buggy-1000-palmeraie': buggyPremiumImage,
    'cross-yamaha-yz': cross80Image,
    'cross-kawasaki-kx': cross250Image,
  };

  const heroHighlights = {
    fr: [
      { icon: 'guide', title: 'Encadrement', subtitle: 'professionnel' },
      { icon: 'quad', title: 'Matériel', subtitle: 'haut de gamme' },
      { icon: 'shield', title: 'Sécurité', subtitle: 'garantie' },
      { icon: 'price', title: 'Meilleurs', subtitle: 'prix' },
      { icon: 'transfer', title: 'Satisfaction', subtitle: 'clients' },
    ],
    en: [
      { icon: 'guide', title: 'Guidance', subtitle: 'professional' },
      { icon: 'quad', title: 'Equipment', subtitle: 'premium' },
      { icon: 'shield', title: 'Safety', subtitle: 'guaranteed' },
      { icon: 'price', title: 'Best', subtitle: 'price' },
      { icon: 'transfer', title: 'Customer', subtitle: 'satisfaction' },
    ],
    es: [
      { icon: 'guide', title: 'Guía', subtitle: 'profesional' },
      { icon: 'quad', title: 'Material', subtitle: 'premium' },
      { icon: 'shield', title: 'Seguridad', subtitle: 'garantizada' },
      { icon: 'price', title: 'Mejor', subtitle: 'precio' },
      { icon: 'transfer', title: 'Clientes', subtitle: 'satisfechos' },
    ],
    nl: [
      { icon: 'guide', title: 'Begeleiding', subtitle: 'professioneel' },
      { icon: 'quad', title: 'Materiaal', subtitle: 'premium' },
      { icon: 'shield', title: 'Veiligheid', subtitle: 'gegarandeerd' },
      { icon: 'price', title: 'Beste', subtitle: 'prijs' },
      { icon: 'transfer', title: 'Klant', subtitle: 'tevredenheid' },
    ],
    de: [
      { icon: 'guide', title: 'Betreuung', subtitle: 'professionell' },
      { icon: 'quad', title: 'Ausrüstung', subtitle: 'premium' },
      { icon: 'shield', title: 'Sicherheit', subtitle: 'garantiert' },
      { icon: 'price', title: 'Bester', subtitle: 'Preis' },
      { icon: 'transfer', title: 'Kunden', subtitle: 'zufriedenheit' },
    ],
  } as const;

  return (
    <main>
      <Navbar locale={locale} labels={t.nav} languages={localeLinks} />
      <WhatsAppButton locale={locale} />

      <section className="relative min-h-screen flex items-center overflow-hidden bg-ink">
        <Image
          src={coverImage}
          alt="Salah Quad Marrakech - image de garde"
          fill
          priority
          sizes="100vw"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 hero-overlay" />
        <div className="absolute inset-0 hero-overlay-soft" />

        <div className="hero-particles" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pt-24 pb-10">
          <div className="mx-auto max-w-[980px] text-center">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2.5 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-zellige animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-dune">{t.hero.badge}</span>
            </div>

            <h1 className="mx-auto mb-6 animate-fade-in-up leading-[0.9] text-bone">
              <span className="hero-title-main block text-[clamp(3rem,5.2vw,5.6rem)] lg:whitespace-nowrap uppercase font-black tracking-[-0.04em] text-white">{t.hero.titleBefore}</span>
              <span className="hero-title-accent mt-2 block text-[#f0c158] text-[clamp(2.8rem,4.8vw,5.2rem)] lg:whitespace-nowrap leading-[0.9] -rotate-1">{t.hero.titleHighlight}</span>
            </h1>

            <p className="hero-subtitle text-base md:text-lg text-white/90 max-w-[780px] mx-auto mb-10 animate-fade-in-up font-medium leading-relaxed text-balance" style={{ animationDelay: '0.15s' }}>
              {t.hero.subtitle}
            </p>

            <div className="flex flex-wrap justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <a
                href="#reserver"
                className="rounded-full bg-gradient-to-br from-[#f4d27c] via-dune-soft to-dune text-[#211a10] font-bold px-8 py-4 text-sm btn-shine transition-transform hover:scale-105 shadow-lg shadow-black/25"
              >
                {t.hero.ctaBook}
              </a>
              <a
                href={galleryPath}
                className="rounded-full border border-white/25 bg-black/35 text-bone px-8 py-4 font-bold text-sm hover:bg-black/45 transition-all backdrop-blur-sm shadow-lg shadow-black/20 inline-flex items-center gap-2"
              >
                <svg className="h-4 w-4 text-current" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M10 8l6 4-6 4V8z" /></svg>
                {t.hero.ctaVideo}
              </a>
            </div>

            <div className="mx-auto mt-12 md:mt-14 max-w-[26rem] sm:max-w-[36rem] lg:max-w-6xl rounded-[1.5rem] bg-black/36 border border-white/12 px-3 sm:px-4 py-3 sm:py-4 backdrop-blur-sm animate-fade-in-up" style={{ animationDelay: '0.45s' }}>
              <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 justify-items-stretch items-center">
                {heroHighlights[locale].map((item, index) => (
                  <div key={item.title} className={`hero-stat rounded-2xl px-4 py-3 flex items-center gap-3 min-h-[72px] ${index === heroHighlights[locale].length - 1 ? 'sm:col-span-2 lg:col-span-1' : ''}`}>
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-dune/20 bg-dune/10 text-dune-soft">
                      <AppIcon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div className="leading-tight">
                      <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-dune">{item.title}</p>
                      <p className="text-xs text-bone/90">{item.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 md:mt-10 max-w-5xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.55s' }}>
              <StatsCounter />
            </div>
          </div>
        </div>
      </section>
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-30" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.why.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.why.title}</h2>
            <p className="text-muted mt-4">{t.why.desc}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {t.why.features.map((feature, index) => (
              <div
                key={feature.title}
                className="glass rounded-2xl p-6 card-hover text-center"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-dune/20 bg-dune/10 text-dune-soft shadow-lg shadow-black/10">
                  <AppIcon name={feature.icon} className="h-8 w-8" />
                </div>
                <h3 className="font-display text-lg text-bone mb-2">{feature.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 shimmer opacity-20" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.offers.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.offers.title}</h2>
            <p className="text-muted mt-4">{t.offers.desc}</p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {t.offers.items.map((offer) => (
              <div key={offer.title} className="glass rounded-3xl p-6 card-hover border border-dune/10">
                <div className="text-sm uppercase tracking-[0.24em] text-dune mb-4 font-bold">{offer.subtitle}</div>
                <h3 className="font-display text-2xl text-bone mb-4">{offer.title}</h3>
                <p className="font-display text-3xl text-dune-soft mb-6">{offer.price}</p>
                <ul className="space-y-3 text-sm text-muted mb-6">
                  {offer.points.map((point) => (
                    <li key={point} className="flex items-start gap-2"><span className="mt-1 text-zellige">•</span>{point}</li>
                  ))}
                </ul>
                <p className="text-xs uppercase tracking-[0.22em] text-dune/70">
                  {locale === 'fr' ? 'Offre valable à Marrakech.' : locale === 'en' ? 'Offer valid in Marrakech.' : locale === 'es' ? 'Oferta vélida en Marrakech.' : locale === 'nl' ? 'Aanbieding geldig in Marrakech.' : 'Angebot géltig in Marrakesch.'}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider-dune mx-auto max-w-4xl" />

      <section id="categories" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.categories.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.categories.title}</h2>
            <p className="text-muted mt-4">{t.categories.desc}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {categoryKeys.map((cat) => {
              const categoryMeta = t.categories.categoryMeta[cat];
              const catExcursions = byCategory.get(cat) || [];
              return (
                <CategoryCard
                  key={cat}
                  title={categoryMeta.title}
                  description={categoryMeta.description}
                  icon={categoryMeta.icon}
                  gradientClass={cat === 'quad' ? 'gradient-quad' : cat === 'buggy' ? 'gradient-buggy' : 'gradient-cross'}
                  reserveLabel={t.categoryCard.reserveCategory}
                  perVehicleLabel={t.categoryCard.perVehicle}
                  perPersonLabel={t.categoryCard.perPerson}
                  image={categoryImages[cat]}
                  imageAlt={categoryMeta.title}
                  excursions={catExcursions.map((e) => ({
                    title: locale === 'fr' ? e.titleFr : e.titleEn,
                    priceCents: e.priceCents,
                    unit: e.unit,
                    tag: locale === 'fr' ? e.tagFr : e.tagEn,
                  }))}
                />
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-dune mx-auto max-w-4xl" />

      <section id="galerie" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.gallery.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.gallery.title}</h2>
            <p className="text-muted mt-4">{t.gallery.desc}</p>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1fr_0.95fr] items-stretch">
            <div className="glass rounded-[2rem] border border-dune/10 p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div>
                <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">Instagram</p>
                <h3 className="font-display text-2xl md:text-3xl text-bone mb-4">Photos et vidéos Instagram</h3>
                <p className="text-muted text-sm leading-relaxed max-w-xl">
                  Toutes les publications, photos et vidéos sont maintenant regroupées dans une page dédiée pour un affichage plus propre et plus rapide.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 mt-8">
                <a
                  href={galleryPath}
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold text-sm px-6 py-3 btn-shine transition-transform hover:scale-105"
                >
                  Ouvrir la galerie
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
                <a
                  href={galleryPath}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-black/25 text-bone font-bold text-sm px-6 py-3 hover:bg-black/40 transition-all backdrop-blur-sm"
                >
                  Voir la vidéo
                </a>
              </div>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-dune/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div className="relative aspect-[16/10]">
                <Image src={coverImage} alt="Galerie Instagram Salah Quad Marrakech" fill className="object-cover object-center" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/18 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-black/45 border border-white/10 backdrop-blur-md p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-dune mb-1">Galerie dédiée</p>
                  <p className="text-bone font-semibold">Une page propre pour découvrir les photos et les vidéos Instagram.</p>
                </div>
              </div>
              <div className="p-6 border-t border-white/8">
                <p className="text-muted text-sm">{t.gallery.locationDesc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>      <section id="excursions" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.experiences.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.experiences.title}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {excursions.map((e) => {
              const durations = e.durations as { label: string; mult: number }[];
              const title = locale === 'fr' ? e.titleFr : e.titleEn;
              const description = locale === 'fr' ? e.descFr : e.descEn;
              const includes = locale === 'fr' ? e.includesFr : e.includesEn;
              const tag = locale === 'fr' ? e.tagFr : e.tagEn;
              const categoryLabel = t.categories.categoryMeta[e.category as keyof typeof t.categories.categoryMeta]?.title ?? e.category;
              const reserveLabel = locale === 'fr' ? 'Réserver' : locale === 'en' ? 'Book' : locale === 'es' ? 'Reservar' : locale === 'nl' ? 'Boek' : 'Buchen';
              const cardImage = excursionImages[e.slug] ?? categoryImages[e.category as keyof typeof categoryImages];
                            const perUnit = e.unit === 'VEHICLE'
                ? locale === 'fr'
                  ? 'par véhicule'
                  : locale === 'en'
                    ? 'per vehicle'
                    : locale === 'es'
                      ? 'por vehículo'
                      : locale === 'nl'
                        ? 'per voertuig'
                        : 'pro Fahrzeug'
                : locale === 'fr'
                  ? 'par personne'
                  : locale === 'en'
                    ? 'per person'
                    : locale === 'es'
                      ? 'por persona'
                      : locale === 'nl'
                        ? 'per persoon'
                        : 'pro Person';

              return (
                <article key={e.id} className="rounded-2xl border border-dune/15 bg-gradient-to-b from-ink-2 to-ink-3 overflow-hidden card-hover group">
                  <div className={`relative aspect-[16/9] overflow-hidden bg-black/20 ${e.category === 'quad' ? 'from-cat-quad/20' : e.category === 'buggy' ? 'from-cat-buggy/20' : 'from-cat-cross/20'}`}>
                    <Image src={cardImage} alt={title} fill className="object-cover brightness-125 contrast-110 saturate-110 transition-transform duration-700 group-hover:scale-105" style={{ objectPosition: 'center 58%' }} />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/22 via-transparent to-transparent" />
                    {tag && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-ink/70 text-dune-soft border border-dune/20 rounded-full px-3 py-1.5 backdrop-blur-sm">
                        {tag}
                      </span>
                    )}
                    <span className="absolute top-3 right-3 text-[10px] font-bold uppercase tracking-wider bg-ink/70 text-muted border border-dune/10 rounded-full px-3 py-1.5 backdrop-blur-sm">
                      {categoryLabel}
                    </span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-display text-lg mb-2 text-bone group-hover:text-dune-soft transition-colors">{title}</h3>
                    <p className="text-muted text-sm mb-3 line-clamp-2">{description}</p>

                    <div className="flex gap-2 mb-4">
                      {durations.map((d) => (
                        <span key={d.label} className="text-xs bg-ink/60 border border-dune/10 rounded-lg px-2 py-1 text-muted">
                          • {d.label}
                        </span>
                      ))}
                    </div>

                    <div className="space-y-1 mb-4">
                      {includes.slice(0, 3).map((inc) => (
                        <p key={inc} className="text-xs text-muted flex items-center gap-1.5">
                          <span className="text-zellige">"</span> {inc}
                        </p>
                      ))}
                      {includes.length > 3 && (
                        <p className="text-xs text-dune">
                          +{includes.length - 3} {locale === 'fr' ? 'inclus' : locale === 'en' ? 'included' : locale === 'es' ? 'incluidos' : locale === 'nl' ? 'inbegrepen' : 'inklusive'}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-dune/10">
                      <div>
                        <span className="font-display text-xl text-dune-soft">{formatDualPrice(e.priceCents)}</span>
                        <span className="block text-[10px] text-muted">{perUnit}</span>
                      </div>
                      <a href="#reserver" className="rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold text-xs px-5 py-2.5 btn-shine transition-transform hover:scale-105">
                        {reserveLabel}
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <div className="divider-dune mx-auto max-w-4xl" />

      <section id="avis" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.nav.reviews}</p>
            <h2 className="font-display text-3xl md:text-5xl">{locale === 'fr' ? 'Ce que disent ' : locale === 'en' ? 'What our ' : locale === 'es' ? 'Lo que dicen ' : locale === 'nl' ? 'Wat onze ' : 'Was unsere '}<span className="text-gradient">{locale === 'fr' ? 'clients' : locale === 'en' ? 'customers' : locale === 'es' ? 'clientes' : locale === 'nl' ? 'klanten' : 'Kunden'}</span></h2>
          </div>

          <TestimonialCarousel reviews={reviews} locale={locale} />
        </div>
      </section>

      <div className="divider-dune mx-auto max-w-4xl" />

      <section id="reserver" className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-2 to-ink" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.reservation.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.reservation.title}</h2>
            <p className="text-muted mt-4">{t.reservation.desc}</p>
          </div>

          <BookingWidget
            locale={locale}
            reservationLabels={t.reservation}
            bookingLabels={t.bookingWidget}
            bookingInfo={t.bookingInfo}
            excursions={excursions.map((e) => ({
              slug: e.slug,
              titleFr: e.titleFr,
              titleEn: e.titleEn,
              priceCents: e.priceCents,
              unit: e.unit,
              durations: e.durations,
              category: e.category,
            }))}
          />
        </div>
      </section>

      <div className="divider-dune mx-auto max-w-4xl" />

      <section id="location" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] items-stretch">
            <div className="glass rounded-[2rem] border border-dune/10 p-8 md:p-10 flex flex-col justify-between shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div>
                <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.gallery.label}</p>
                <h2 className="font-display text-3xl md:text-5xl text-bone mb-4">{t.gallery.locationTitle}</h2>
                <p className="text-muted text-sm md:text-base leading-relaxed max-w-xl">{t.gallery.locationDesc}</p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://maps.google.com/?q=31.700163,-7.967231"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold text-sm px-6 py-3 btn-shine transition-transform hover:scale-105"
                >
                  Voir sur Google Maps
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-dune/10 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">
              <div className="relative min-h-[420px]">
                <iframe
                  title={t.gallery.locationTitle}
                  src="https://www.google.com/maps?q=31.700163,-7.967231&z=15&output=embed"
                  className="absolute inset-0 h-full w-full border-0"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <p className="text-dune font-bold tracking-[0.22em] uppercase text-xs mb-4">{t.contact.label}</p>
            <h2 className="font-display text-3xl md:text-5xl">{t.contact.title}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-6 text-center card-hover group"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#1FA855]/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-[#1FA855]" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              </div>
              <p className="font-bold text-bone text-sm">{t.contact.whatsapp}</p>
              <p className="text-dune text-sm mt-1">0610818391</p>
              <p className="text-muted text-xs mt-1">{locale === 'fr' ? 'Réponse en < 30 min' : locale === 'en' ? 'Response in < 30 min' : locale === 'es' ? 'Respuesta en < 30 min' : locale === 'nl' ? 'Antwoord binnen < 30 min' : 'Antwort in < 30 Min.'}</p>
            </a>

<a href="tel:+212610818391" className="glass rounded-2xl p-6 text-center card-hover group">
              <div className="w-14 h-14 rounded-2xl bg-saffron/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-saffron" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" /></svg>
              </div>
              <p className="font-bold text-bone text-sm">{t.contact.phone}</p>
              <p className="text-dune text-sm mt-1">0610818391</p>
              <p className="text-muted text-xs mt-1">{locale === 'fr' ? '7j/7 de 8h à 20h' : locale === 'en' ? '7d/7 from 8am to 8pm' : locale === 'es' ? '7d/7 de 8h a 20h' : locale === 'nl' ? '7d/7 van 8u tot 20u' : '7 Tage/Woche von 8 bis 20 Uhr'}</p>
            </a>

            <a href="mailto:salahquad@gmail.com" className="glass rounded-2xl p-6 text-center card-hover group">
              <div className="w-14 h-14 rounded-2xl bg-dune/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-dune" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" /></svg>
              </div>
              <p className="font-bold text-bone text-sm">{t.contact.email}</p>
              <p className="text-dune text-sm mt-1">salahquad@gmail.com</p>
              <p className="text-muted text-xs mt-1">{locale === 'fr' ? 'Réponse sous 24h' : locale === 'en' ? 'Response within 24h' : locale === 'es' ? 'Respuesta en 24h' : locale === 'nl' ? 'Antwoord binnen 24u' : 'Antwort innerhalb 24h'}</p>
            </a>

            <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="glass rounded-2xl p-6 text-center card-hover group">
              <div className="w-14 h-14 rounded-2xl bg-purple-500/15 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <svg className="w-7 h-7 text-purple-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324z"/></svg>
              </div>
              <p className="font-bold text-bone text-sm">{t.contact.instagram}</p>
              <p className="text-dune text-sm mt-1">@quad_marrakech_salah</p>
              <p className="text-muted text-xs mt-1">{locale === 'fr' ? 'Photos & vidéos' : locale === 'en' ? 'Photos & videos' : locale === 'es' ? 'Fotos y védeos' : locale === 'nl' ? 'Fotoés & videoés' : 'Fotos & Videos'}</p>
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-dune/10 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-10 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl overflow-hidden border border-dune/15 bg-ink/60">
                  <Image src={logoImage} alt="Salah Quad Marrakech" width={40} height={40} className="h-full w-full object-contain" priority />
                </div>
                <div>
                  <span className="font-display text-lg text-bone">Salah Quad</span>
                  <span className="block text-[10px] tracking-[0.25em] uppercase text-dune font-semibold">Marrakech</span>
                </div>
              </div>
              <p className="text-muted text-sm leading-relaxed">
                Aventures premium en quad, buggy et cross moto dans la Palmeraie de Marrakech. Depuis 2018.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-bone text-sm uppercase tracking-wider mb-4">Navigation</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li><a href="#categories" className="hover:text-dune transition-colors">{t.categories.label}</a></li>
                <li><a href="#excursions" className="hover:text-dune transition-colors">{t.experiences.label}</a></li>
                <li><a href={galleryPath} className="hover:text-dune transition-colors">{t.gallery.label}</a></li>
                <li><a href="#avis" className="hover:text-dune transition-colors">{t.nav.reviews}</a></li>
                <li><a href="#reserver" className="hover:text-dune transition-colors">{t.reservation.label}</a></li>
                <li><a href="#contact" className="hover:text-dune transition-colors">{t.contact.label}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-bone text-sm uppercase tracking-wider mb-4">{t.contact.label}</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li> +212 610 818 391</li>
                <li> salahquad@gmail.com</li>
                <li> Palmeraie, Marrakech</li>
                <li><a href="https://maps.google.com/?q=31.700163,-7.967231" target="_blank" rel="noopener noreferrer" className="hover:text-dune transition-colors">{t.contact.locationDesc}</a></li>
                <li> @quad_marrakech_salah</li>
              </ul>
            </div>
          </div>

          <div className="divider-dune my-10" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
            <p>© {new Date().getFullYear()} Salah Quad Marrakech. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="hover:text-dune transition-colors">WhatsApp</a>
              <a href={INSTAGRAM_PROFILE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-dune transition-colors">Instagram</a>
              <a href="mailto:salahquad@gmail.com" className="hover:text-dune transition-colors">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}















