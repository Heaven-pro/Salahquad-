import Image from 'next/image';
import { LOCALES, LANGUAGE_LABELS, TRANSLATIONS, type Locale } from '@/lib/i18n';
import Navbar from '@/components/Navbar';
import WhatsAppButton from '@/components/WhatsAppButton';
import {
  instagramEntries,
  instagramEmbedUrl,
  localGalleryImages,
  localGalleryVideos,
} from '@/lib/gallery-content';
import coverImage from '@/lib/image de garde.png';

interface GalleryPageProps {
  locale: Locale;
}

function MediaImageCard({ title, description, src }: (typeof localGalleryImages)[number]) {
  return (
    <article className="group glass rounded-3xl overflow-hidden border border-dune/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] card-hover">
      <div className="relative aspect-[4/3]">
        <Image
          src={src}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/25 to-transparent" />
        <div className="absolute left-4 right-4 bottom-4 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-dune backdrop-blur-md border border-white/10">
            Photo
          </div>
          <h3 className="font-display text-2xl text-bone">{title}</h3>
          <p className="text-sm text-white/78 leading-relaxed">{description}</p>
        </div>
      </div>
    </article>
  );
}

function MediaVideoCard({ title, description, src }: (typeof localGalleryVideos)[number]) {
  return (
    <article className="group glass rounded-3xl overflow-hidden border border-dune/10 shadow-[0_24px_60px_rgba(0,0,0,0.22)] card-hover bg-black/20">
      <div className="relative aspect-[4/3] bg-black">
        <video
          controls
          playsInline
          preload="metadata"
          src={src}
          className="h-full w-full object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
        <div className="pointer-events-none absolute left-4 right-4 bottom-4 space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-black/50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.22em] text-dune backdrop-blur-md border border-white/10">
            Vidéo
          </div>
          <h3 className="font-display text-2xl text-bone">{title}</h3>
          <p className="text-sm text-white/78 leading-relaxed">{description}</p>
        </div>
      </div>
    </article>
  );
}

export default function GalleryPage({ locale }: GalleryPageProps) {
  const t = TRANSLATIONS[locale];
  const localeLinks = LOCALES.map((code) => ({ code, label: LANGUAGE_LABELS[code] }));

  return (
    <main>
      <Navbar locale={locale} labels={t.nav} languages={localeLinks} />
      <WhatsAppButton locale={locale} />

      <section className="relative overflow-hidden pt-28 pb-16">
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink-2 to-ink" />
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr] items-center">
            <div className="space-y-6">
              <div className="hero-badge inline-flex items-center gap-2 rounded-full px-5 py-2.5 animate-fade-in">
                <span className="w-2 h-2 rounded-full bg-zellige animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-dune">Galerie</span>
              </div>
              <h1 className="font-display text-4xl md:text-6xl leading-[0.95] text-bone">
                Photos et vidéos
                <span className="block text-gradient">Salah Quad Marrakech</span>
              </h1>
              <p className="text-muted text-base md:text-lg max-w-2xl leading-relaxed">
                {t.gallery.desc}
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`/${locale}`}
                  className="rounded-full bg-gradient-to-br from-dune-soft to-dune text-[#211a10] font-bold px-7 py-3 text-sm btn-shine transition-transform hover:scale-105"
                >
                  {locale === 'fr'
                    ? "Retour à l'accueil"
                    : locale === 'en'
                      ? 'Back to home'
                      : locale === 'es'
                        ? 'Volver al inicio'
                        : locale === 'nl'
                          ? 'Terug naar start'
                          : 'Zurück zur Startseite'}
                </a>
                <a
                  href={`/${locale}#reserver`}
                  className="rounded-full border border-white/20 bg-black/30 text-bone px-7 py-3 font-bold text-sm hover:bg-black/45 transition-all backdrop-blur-sm"
                >
                  {t.reservation.label}
                </a>
              </div>
            </div>

            <div className="glass rounded-[2rem] overflow-hidden border border-dune/10 shadow-[0_30px_80px_rgba(0,0,0,0.25)]">
              <div className="relative aspect-[4/3]">
                <Image src={coverImage} alt="Salah Quad Marrakech" fill className="object-cover object-center" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
                <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-black/45 border border-white/10 backdrop-blur-md p-4">
                  <p className="text-xs uppercase tracking-[0.22em] text-dune mb-1">Galerie locale</p>
                  <p className="text-bone font-semibold">Photos et vidéos du dossier <span className="text-dune">src/lib</span> avant Instagram.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(202,162,74,0.08),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(45,139,121,0.05),transparent_35%)]" />
        <div className="mx-auto max-w-7xl px-6 relative z-10 space-y-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-dune mb-3">Contenu local</p>
              <h2 className="font-display text-3xl md:text-4xl text-bone">Médias disponibles avant Instagram</h2>
            </div>
            <p className="text-sm text-muted max-w-xl leading-relaxed">
              Ces médias viennent du dossier <span className="text-bone">src/lib</span> et sont affichés en premier pour une navigation plus claire.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-display text-2xl text-bone">Photos locales</h3>
                <span className="text-xs uppercase tracking-[0.22em] text-muted">{localGalleryImages.length} éléments</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {localGalleryImages.map((item) => (
                  <MediaImageCard key={item.title} {...item} />
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 mb-4">
                <h3 className="font-display text-2xl text-bone">Vidéos locales</h3>
                <span className="text-xs uppercase tracking-[0.22em] text-muted">{localGalleryVideos.length} éléments</span>
              </div>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {localGalleryVideos.map((item) => (
                  <MediaVideoCard key={item.title} {...item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 relative z-10">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
            <div>
              <p className="text-xs uppercase tracking-[0.26em] text-dune mb-3">Instagram</p>
              <h2 className="font-display text-3xl md:text-4xl text-bone">Publications et reels Instagram</h2>
            </div>
            <p className="text-sm text-muted max-w-xl leading-relaxed">
              Le contenu Instagram reste disponible en complément des médias locaux.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {instagramEntries.map((item, index) =>
              item.kind === 'profile' ? (
                <a
                  key={item.url}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass rounded-3xl border border-dune/10 p-6 card-hover flex flex-col justify-between min-h-[520px]"
                >
                  <div>
                    <p className="text-dune uppercase text-xs tracking-[0.22em] mb-4">Profil</p>
                    <h3 className="font-display text-2xl text-bone mb-3">Salah Quad Marrakech</h3>
                    <p className="text-muted text-sm leading-relaxed">Accède au compte Instagram officiel pour voir toutes les publications, stories et vidéos récentes.</p>
                  </div>
                  <div className="rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-dune/10 via-transparent to-transparent p-6">
                    <p className="text-3xl font-display text-bone">@quad_marrakech_salah</p>
                    <p className="text-muted mt-2 text-sm">Ouvrir le profil officiel</p>
                  </div>
                </a>
              ) : (
                <div key={item.url} className="glass rounded-3xl overflow-hidden border border-dune/10 card-hover">
                  <iframe
                    src={instagramEmbedUrl(item.url)}
                    className="w-full h-[560px] border-0 bg-ink"
                    loading="lazy"
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    title={item.label}
                  />
                  <div className="p-4">
                    <p className="font-semibold text-bone">{item.label}</p>
                    <p className="text-xs text-muted mt-1">Publication Instagram {index + 1}</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </main>
  );
}
