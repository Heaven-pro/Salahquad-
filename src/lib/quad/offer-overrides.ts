type OfferOverride = {
  priceCents: number;
  titleFr?: string;
  titleEn?: string;
  descFr?: string;
  descEn?: string;
  includesFr?: string[];
  includesEn?: string[];
};

const OFFER_OVERRIDES: Record<string, OfferOverride> = {
  'buggy-1000-desert': {
    priceCents: 8000,
    titleFr: 'Buggy 800cc — 1h',
    titleEn: '800cc Buggy — 1h',
    descFr: '1h de buggy 800cc sans balade chameau ni pause thé. Parcours rapide et sensations dans la Palmeraie de Marrakech.',
    descEn: '1h 800cc buggy ride without camel ride or tea break. Fast track and thrills in the Marrakech Palmeraie.',
    includesFr: ['Buggy 800cc', 'Transmission automatique — facile à conduire', 'Guide professionnel & assurance incluse', 'Arrêts photo dans la Palmeraie de Marrakech', 'Navette hôtel / riad incluse'],
    includesEn: ['800cc buggy', 'Automatic — easy to drive', 'Professional guide & insurance included', 'Photo stops in the Marrakech Palmeraie', 'Hotel / riad shuttle included'],
  },
  'buggy-1000-palmeraie': { priceCents: 13000 },
  'cross-yamaha-yz': { priceCents: 9000 },
  'cross-kawasaki-kx': { priceCents: 10000 },
};

export function applyOfferOverrides<T extends { slug: string }>(offer: T): T {
  const override = OFFER_OVERRIDES[offer.slug];
  return override ? { ...offer, ...override } : offer;
}
