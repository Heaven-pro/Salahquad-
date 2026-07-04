import { prisma } from '@/lib/prisma';
import type { ExcursionItem, ReviewItem } from '@/components/HomePage';

const FALLBACK_EXCURSIONS: ExcursionItem[] = [
  {
    id: 'fallback-quad-palmeraie',
    slug: 'quad-palmeraie',
    category: 'quad',
    titleFr: 'Quad 300cc - Offre officielle',
    titleEn: 'Quad 300cc - Official Offer',
    descFr: '2h de quad automatique 300cc, 20 min de chameau et pause the. L\'experience la plus demandee a Marrakech.',
    descEn: '2h automatic 300cc quad, 20-min camel ride and tea break. The most requested Marrakech experience.',
    priceCents: 2000,
    unit: 'PERSON',
    tagFr: 'Offre',
    tagEn: 'Offer',
    durations: [{ label: '2h', mult: 1 }],
    includesFr: ['Navette hotel / riad incluse', 'Casque et equipement fournis', '20 min de dromadaire', 'Pause the offerte'],
    includesEn: ['Hotel / riad shuttle included', 'Helmet and gear provided', '20-min camel ride', 'Complimentary tea break'],
  },
  {
    id: 'fallback-quad-duo',
    slug: 'quad-duo',
    category: 'quad',
    titleFr: 'Quad Duo 2h - 2 personnes',
    titleEn: 'Quad Duo 2h - 2 people',
    descFr: 'Deux personnes sur le meme quad, avec transfert inclus et un tarif duo avantageux.',
    descEn: 'Two people on the same quad, with transfer included and a great duo rate.',
    priceCents: 2500,
    unit: 'VEHICLE',
    tagFr: 'Duo',
    tagEn: 'Duo',
    durations: [{ label: '2h', mult: 1 }],
    includesFr: ['2 personnes sur le meme quad', 'Navette hotel / riad incluse', 'Casque et equipement fournis'],
    includesEn: ['2 people on the same quad', 'Hotel / riad shuttle included', 'Helmet and gear provided'],
  },
  {
    id: 'fallback-buggy-1000',
    slug: 'buggy-1000-desert',
    category: 'buggy',
    titleFr: 'Buggy 1000cc - 1h',
    titleEn: 'Buggy 1000cc - 1h',
    descFr: 'Buggy Can-Am Maverick X3 Turbo RR 1000cc, experience premium dans la Palmeraie.',
    descEn: 'Can-Am Maverick X3 Turbo RR 1000cc, premium experience in the Palmeraie.',
    priceCents: 10000,
    unit: 'VEHICLE',
    tagFr: 'Premium',
    tagEn: 'Premium',
    durations: [{ label: '1h', mult: 1 }],
    includesFr: ['200ch', 'Guide professionnel', 'Assurance incluse', 'Navette hotel / riad incluse'],
    includesEn: ['200hp', 'Professional guide', 'Insurance included', 'Hotel / riad shuttle included'],
  },
  {
    id: 'fallback-buggy-1000-discovery',
    slug: 'buggy-1000-palmeraie',
    category: 'buggy',
    titleFr: 'Buggy 1000cc - Decouverte',
    titleEn: 'Buggy 1000cc - Discovery',
    descFr: 'Une traversée premium entre la Palmeraie et les villages berberes.',
    descEn: 'A premium ride through the Palmeraie and Berber villages.',
    priceCents: 12000,
    unit: 'VEHICLE',
    tagFr: 'Decouverte',
    tagEn: 'Discovery',
    durations: [{ label: '1h30', mult: 1.4 }],
    includesFr: ['200ch', 'Pause the dans un village berbere', 'Arréts photo', 'Navette hotel / riad incluse'],
    includesEn: ['200hp', 'Tea break in a Berber village', 'Photo stops', 'Hotel / riad shuttle included'],
  },
  {
    id: 'fallback-cross-standard',
    slug: 'cross-yamaha-yz',
    category: 'cross',
    titleFr: 'Cross Yamaha 80cc - 1h',
    titleEn: 'Yamaha 80cc Cross - 1h',
    descFr: 'Session cross accessible, guidee par un moniteur professionnel.',
    descEn: 'Accessible cross session, guided by a professional instructor.',
    priceCents: 10000,
    unit: 'PERSON',
    tagFr: 'Standard',
    tagEn: 'Standard',
    durations: [{ label: '1h', mult: 1 }],
    includesFr: ['Equipement complet fourni', 'Moniteur professionnel', 'Circuit prive securise'],
    includesEn: ['Full gear provided', 'Professional instructor', 'Secured private track'],
  },
  {
    id: 'fallback-cross-premium',
    slug: 'cross-kawasaki-kx',
    category: 'cross',
    titleFr: 'Cross Premium - Kawasaki KX 250',
    titleEn: 'Premium Cross - Kawasaki KX 250',
    descFr: 'Cross premium sur Kawasaki KX 250, parfait pour les riders exigeants.',
    descEn: 'Premium cross on Kawasaki KX 250, perfect for demanding riders.',
    priceCents: 12000,
    unit: 'PERSON',
    tagFr: 'Premium',
    tagEn: 'Premium',
    durations: [{ label: '1h', mult: 1 }],
    includesFr: ['250cc', 'Moniteur expert', 'Circuit technique', 'Navette hotel / riad incluse'],
    includesEn: ['250cc', 'Expert instructor', 'Technical track', 'Hotel / riad shuttle included'],
  },
];

const FALLBACK_REVIEWS: ReviewItem[] = [
  {
    name: 'David Anderson',
    location: 'Sydney, Australia',
    textFr: 'Le buggy et le quad etaient incroyables, avec une equipe tres professionnelle.',
    textEn: 'The buggy and quad were incredible, with a very professional team.',
    rating: 5,
  },
  {
    name: 'Sophie Martin',
    location: 'Lyon, France',
    textFr: 'Service fluide, transferts inclus et experience tres agreable dans la Palmeraie.',
    textEn: 'Smooth service, included transfers and a very pleasant experience in the Palmeraie.',
    rating: 5,
  },
  {
    name: 'Marco Rossi',
    location: 'Milan, Italy',
    textFr: 'Le cross premium etait parfaitement encadre et tres bien organise.',
    textEn: 'The premium cross session was perfectly supervised and very well organized.',
    rating: 5,
  },
];

const toMappedExcursions = (items: Awaited<ReturnType<typeof prisma.excursion.findMany>>): ExcursionItem[] =>
  items.map((e) => ({
    id: e.id,
    slug: e.slug,
    category: e.category,
    titleFr: e.titleFr,
    titleEn: e.titleEn,
    descFr: e.descFr,
    descEn: e.descEn,
    priceCents: e.priceCents,
    unit: e.unit,
    tagFr: e.tagFr,
    tagEn: e.tagEn,
    durations: e.durations as unknown as { label: string; mult: number }[],
    includesFr: e.includesFr,
    includesEn: e.includesEn,
  }));

const toMappedReviews = (items: Awaited<ReturnType<typeof prisma.review.findMany>>): ReviewItem[] =>
  items.map((r) => ({
    name: r.name,
    location: r.location,
    textFr: r.textFr,
    textEn: r.textEn,
    rating: r.rating,
  }));

export async function loadHomePageContent() {
  const query = Promise.all([
    prisma.excursion.findMany({ where: { active: true }, orderBy: { sortOrder: 'asc' } }),
    prisma.review.findMany({ where: { approved: true }, orderBy: { createdAt: 'desc' } }),
  ]);

  const timeout = new Promise<null>((resolve) => setTimeout(() => resolve(null), 1200));
  const result = await Promise.race([query, timeout]);

  if (!result) {
    return { excursions: FALLBACK_EXCURSIONS, reviews: FALLBACK_REVIEWS };
  }

  const [excursions, reviews] = result;
  if (!excursions.length || !reviews.length) {
    return { excursions: FALLBACK_EXCURSIONS, reviews: FALLBACK_REVIEWS };
  }

  return { excursions: toMappedExcursions(excursions), reviews: toMappedReviews(reviews) };
}

