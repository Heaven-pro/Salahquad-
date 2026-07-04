// ============================================================
//  Données initiales — exécuté via `npm run db:seed`
//  3 catégories : Quad · Buggy 1000cc · Cross Moto
// ============================================================
import { PrismaClient, PriceUnit } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const EXCURSIONS = [
  // ═══════════════════════════════════════════════════════════
  //  🏍️ QUAD
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'quad-palmeraie', category: 'quad', priceCents: 2000, unit: PriceUnit.PERSON,
    rating: 4.9, reviews: '450+', tagFr: 'Offre', tagEn: 'Offer',
    titleFr: 'Quad 300cc — Offre officielle', titleEn: 'Quad 300cc — Official Offer',
    descFr: '2h de quad 300cc automatique + 20 min de balade chameau + pause thé. Tous ce qui faut pour une matinée d’aventure à Marrakech, sans permis.',
    descEn: '2h automatic 300cc quad + 20-min camel ride + tea break. The full Marrakech adventure package with no licence required.',
    durations: [{ label: '2h', mult: 1 }],
    includesFr: ['2h de quad 300cc automatique', '20 min de dromadaire incluse', 'Pause thé à la menthe offerte', 'Casque, masque & équipement fournis', 'Navette hôtel / riad incluse', 'Accessible dès 3 ans en passager'],
    includesEn: ['2h 300cc automatic quad', '20-min camel ride included', 'Complimentary mint tea break', 'Helmet, goggles & gear provided', 'Hotel / riad shuttle included', 'Children from age 3 welcome as passengers'],
    sortOrder: 1,
  },
  {
    slug: 'quad-duo', category: 'quad', priceCents: 2500, unit: PriceUnit.VEHICLE,
    rating: 4.8, reviews: '120+', tagFr: 'Duo', tagEn: 'Duo',
    titleFr: 'Quad Duo 2h — 2 personnes', titleEn: 'Quad Duo 2h — 2 people',
    descFr: '2h de quad en duo sur le même engin, 20 min de balade chameau et pause thé offertes. Idéal pour partager l’aventure à Marrakech.',
    descEn: '2h quad ride for two people on the same vehicle, 20-min camel ride and tea break included. Perfect for sharing the Marrakech adventure.',
    durations: [{ label: '2h', mult: 1 }],
    includesFr: ['Quad 300cc automatique — 2 personnes dans le même véhicule', '20 min de dromadaire incluse', 'Pause thé à la menthe offerte', 'Casque, masque & équipement fournis', 'Navette hôtel / riad incluse'],
    includesEn: ['2-person 300cc automatic quad in the same vehicle', '20-min camel ride included', 'Complimentary mint tea break', 'Helmet, goggles & gear provided', 'Hotel / riad shuttle included'],
    sortOrder: 2,
  },
  {
    slug: 'quad-raptor-700', category: 'quad', priceCents: 4000, unit: PriceUnit.PERSON,
    rating: 4.9, reviews: '127', tagFr: 'Sportif', tagEn: 'Sport',
    titleFr: 'Quad Yamaha Raptor 700R — Sensation Sport', titleEn: 'Yamaha Raptor 700R — Sport Thrill',
    descFr: 'Pour les pilotes confirmés : un Raptor 700R 686cc à transmission manuelle, vrai feeling sport sur circuit privé et pistes de la Palmeraie de Marrakech. Encadré par un moniteur expérimenté.',
    descEn: 'For confident riders: a 686cc Raptor 700R with manual transmission, real sport feel on a private track and Marrakech Palmeraie trails. Supervised by an experienced instructor.',
    durations: [{ label: '1h', mult: 1 }, { label: '2h', mult: 1.85 }],
    includesFr: ['Yamaha Raptor 700R — moteur 686cc', 'Transmission manuelle — feeling sport', 'Casque, lunettes, gants & protections', 'Moniteur dédié pendant la session', 'Circuit privé + pause thé', 'Navette hôtel / riad incluse'],
    includesEn: ['Yamaha Raptor 700R — 686cc engine', 'Manual transmission — sport feel', 'Helmet, goggles, gloves & protections', 'Dedicated instructor during session', 'Private track + tea break', 'Hotel / riad shuttle included'],
    sortOrder: 2,
  },
  // ═══════════════════════════════════════════════════════════
  //  🚗 BUGGY 1000cc
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'buggy-1000-desert', category: 'buggy', priceCents: 10000, unit: PriceUnit.VEHICLE,
    rating: 5.0, reviews: '320+', tagFr: 'Offre', tagEn: 'Offer',
    titleFr: 'Buggy 1000cc — 1h', titleEn: 'Buggy 1000cc — 1h',
    descFr: '1h de buggy 1000cc sans balade chameau ni pause thé. Parcours rapide et sensations dans la Palmeraie de Marrakech.',
    descEn: '1h 1000cc buggy ride without camel ride or tea break. Fast track and thrills in the Marrakech Palmeraie.',
    durations: [{ label: '1h', mult: 1 }],
    includesFr: ['Can-Am Maverick X3 Turbo RR — 200ch', 'Transmission auto — facile à conduire', 'Guide professionnel & assurance incluse', 'Arrêts photo dans la Palmeraie de Marrakech', 'Navette hôtel / riad incluse'],
    includesEn: ['Can-Am Maverick X3 Turbo RR — 200hp', 'Automatic — easy to drive', 'Professional guide & insurance included', 'Photo stops in the Marrakech Palmeraie', 'Hotel / riad shuttle included'],
    sortOrder: 3,
  },
  {
    slug: 'buggy-1000-palmeraie', category: 'buggy', priceCents: 12000, unit: PriceUnit.VEHICLE,
    rating: 4.9, reviews: '210+', tagFr: 'Découverte', tagEn: 'Discovery',
    titleFr: 'Buggy Can-Am X3 Turbo — Palmeraie & Villages', titleEn: 'Can-Am X3 Turbo Buggy — Palmeraie & Villages',
    descFr: 'Explorez la Palmeraie et les villages berbères au volant d\'un Can-Am X3 Turbo 1000cc. Paysages verdoyants, pistes de sable et rencontres authentiques. Idéal pour une première expérience buggy premium.',
    descEn: 'Explore the Palmeraie and Berber villages behind the wheel of a Can-Am X3 Turbo 1000cc. Green landscapes, sandy tracks and authentic encounters. Perfect for a first premium buggy experience.',
    durations: [{ label: '1h', mult: 1 }, { label: '1h30', mult: 1.4 }],
    includesFr: ['Can-Am Maverick X3 Turbo RR — 200ch', 'Tarif par buggy (1 pilote + 1 passager)', 'Guide professionnel & assurance incluse', 'Pause thé dans un village berbère', 'Arrêts photo panoramiques', 'Navette hôtel / riad incluse'],
    includesEn: ['Can-Am Maverick X3 Turbo RR — 200hp', 'Price per buggy (1 driver + 1 passenger)', 'Professional guide & insurance included', 'Tea break in a Berber village', 'Panoramic photo stops', 'Hotel / riad shuttle included'],
    sortOrder: 4,
  },
  // ═══════════════════════════════════════════════════════════
  //  🏁 CROSS MOTO
  // ═══════════════════════════════════════════════════════════
  {
    slug: 'cross-yamaha-yz', category: 'cross', priceCents: 10000, unit: PriceUnit.PERSON,
    rating: 4.9, reviews: '95+', tagFr: 'Standard', tagEn: 'Standard',
    titleFr: 'Cross Yamaha 80cc — 1h', titleEn: 'Yamaha 80cc Cross — 1h',
    descFr: '1000 MAD / 100 € pour 1h de cross sur Yamaha 80cc, sans balade chameau ni pause thé. Session accessible et dynamique.',
    descEn: '1000 MAD / 100 € for 1h cross on a Yamaha 80cc, without camel ride or tea break. Accessible and dynamic session.',
    durations: [{ label: '1h', mult: 1 }],
    includesFr: ['Yamaha 80cc cross', 'Équipement complet fourni', 'Moniteur professionnel', 'Circuit privé sécurisé', 'Navette hôtel / riad incluse'],
    includesEn: ['Yamaha 80cc cross bike', 'Full gear provided', 'Professional instructor', 'Secured private track', 'Hotel / riad shuttle included'],
    sortOrder: 5,
  },
  {
    slug: 'cross-kawasaki-kx', category: 'cross', priceCents: 12000, unit: PriceUnit.PERSON,
    rating: 4.9, reviews: '65+', tagFr: 'Premium', tagEn: 'Premium',
    titleFr: 'Cross Premium — Kawasaki KX 250', titleEn: 'Premium Cross — Kawasaki KX 250',
    descFr: '1200 MAD / 120 € pour 1h de cross premium sur Kawasaki KX 250, sans balade chameau ni pause thé. Session haut de gamme pour les riders exigeants.',
    descEn: '1200 MAD / 120 € for 1h premium cross on Kawasaki KX 250, without camel ride or tea break. High-end session for demanding riders.',
    durations: [{ label: '1h', mult: 1 }, { label: '2h', mult: 1.85 }],
    includesFr: ['Kawasaki KX 250 — 250cc mono-cylindre', 'Équipement complet fourni', 'Moniteur expert dédié', 'Circuit technique dans la Palmeraie', 'Arrêts photo', 'Navette hôtel / riad incluse'],
    includesEn: ['Kawasaki KX 250 — 250cc single-cylinder', 'Full gear provided', 'Dedicated expert instructor', 'Technical track in the Marrakech Palmeraie', 'Photo stops', 'Hotel / riad shuttle included'],
    sortOrder: 6,
  },
];

const REVIEWS = [
  { name: 'David Anderson', location: 'Sydney, Australie — Buggy 1000cc', rating: 5, approved: true,
    textFr: 'Le Can-Am X3 dans la Palmeraie de Marrakech était incroyable. 200 chevaux de pure adrénaline, des paysages à couper le souffle et une équipe ultra pro. La meilleure activité de notre séjour !',
    textEn: 'The Can-Am X3 in the Marrakech Palmeraie was incredible. 200hp of pure adrenaline, breathtaking scenery and an ultra-professional team. Best activity of our trip!' },
  { name: 'Sophie Martin', location: 'Lyon, France — Quad Palmeraie', rating: 5, approved: true,
    textFr: 'Balade en quad inoubliable dans la Palmeraie ! Le guide connaissait les meilleurs spots, la pause thé était magique. On reviendra avec les enfants.',
    textEn: 'Unforgettable quad ride in the Palmeraie! The guide knew all the best spots, the tea break was magical. We\'ll be back with the kids.' },
  { name: 'Marco Rossi', location: 'Milan, Italie — Cross Moto', rating: 5, approved: true,
    textFr: 'Session cross sur la Yamaha YZ 250, encadré par un moniteur au top. Le circuit est technique et bien entretenu. Un vrai régal pour les amateurs de moto !',
    textEn: 'Motocross session on the Yamaha YZ 250, supervised by a top instructor. The track is technical and well maintained. A real treat for bike enthusiasts!' },
  { name: 'Emma Williams', location: 'Londres, UK — Buggy Palmeraie', rating: 5, approved: true,
    textFr: "Le buggy Can-Am dans la Palmeraie c'est une expérience unique. Facile à conduire, paysages magnifiques et le transfert depuis notre riad était impeccable.",
    textEn: 'The Can-Am buggy in the Palmeraie is a unique experience. Easy to drive, gorgeous scenery and the transfer from our riad was flawless.' },
  { name: 'Yuki Tanaka', location: 'Tokyo, Japon — Quad Raptor 700', rating: 5, approved: true,
    textFr: 'Le Raptor 700R, c\'est de la vraie sensation sport ! Transmission manuelle, puissance incroyable. Le moniteur m\'a guidé parfaitement. 10/10.',
    textEn: 'The Raptor 700R is a true sport thrill! Manual transmission, incredible power. The instructor guided me perfectly. 10/10.' },
  { name: 'Maria Rodríguez', location: 'Madrid, Espagne — Cross Kawasaki', rating: 5, approved: true,
    textFr: 'La Kawasaki KX 250 dans la Palmeraie, c\'est intense ! Circuit super bien préparé et moniteur très pro. Meilleure expérience motocross de ma vie.',
    textEn: 'The Kawasaki KX 250 in the Palmeraie is intense! Super well-prepared track and very professional instructor. Best motocross experience of my life.' },
];

async function main() {
  console.log('🌱 Seed en cours…');

  // Excursions (upsert pour idempotence)
  for (const e of EXCURSIONS) {
    await prisma.excursion.upsert({
      where: { slug: e.slug },
      update: e,
      create: e,
    });
  }
  console.log(`   ✓ ${EXCURSIONS.length} excursions (3 catégories)`);

  // Désactiver les anciennes excursions hors des 3 catégories
  const activeSlugs = EXCURSIONS.map((e) => e.slug);
  await prisma.excursion.updateMany({
    where: { slug: { notIn: activeSlugs } },
    data: { active: false },
  });
  console.log('   ✓ Anciennes excursions désactivées');

  // Avis (remplacer pour correspondre aux 3 catégories)
  await prisma.review.deleteMany();
  await prisma.review.createMany({ data: REVIEWS });
  console.log(`   ✓ ${REVIEWS.length} avis`);

  // Code promo de démonstration
  await prisma.promotion.upsert({
    where: { code: 'BIENVENUE10' },
    update: {},
    create: { code: 'BIENVENUE10', percent: 10, active: true },
  });
  console.log('   ✓ promotion BIENVENUE10');

  // Administrateur
  const email = process.env.ADMIN_EMAIL || 'salahquad@gmail.com';
  const password = process.env.ADMIN_PASSWORD || 'Marrakech2026!';
  const passwordHash = await bcrypt.hash(password, 12);
  await prisma.adminUser.upsert({
    where: { email },
    update: { passwordHash },
    create: { email, passwordHash, name: 'Salah' },
  });
  console.log(`   ✓ admin : ${email}`);

  console.log('✅ Seed terminé.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());

