export const LOCALES = ['fr', 'en', 'es', 'nl', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'fr';

export const LANGUAGE_LABELS: Record<Locale, string> = {
  fr: 'Franéais',
  en: 'English',
  es: 'Espaéol',
  nl: 'Nederlands',
  de: 'Deutsch',
};

export const LOCALE_CODES: Record<Locale, string> = {
  fr: 'fr',
  en: 'en',
  es: 'es',
  nl: 'nl',
  de: 'de',
};

export const getLocale = (value: string): Locale => {
  if (!value) return DEFAULT_LOCALE;
  const candidate = value.toLowerCase();
  return LOCALES.includes(candidate as Locale) ? (candidate as Locale) : DEFAULT_LOCALE;
};

export interface Translations {
  nav: {
    excursions: string;
    categories: string;
    gallery: string;
    reviews: string;
    reserve: string;
    contact: string;
  };
  hero: {
    badge: string;
    titleBefore: string;
    titleHighlight: string;
    subtitle: string;
    ctaBook: string;
    ctaCategories: string;
    ctaVideo: string;
  };
  why: {
    label: string;
    title: string;
    desc: string;
    features: { icon: 'shield' | 'guide' | 'transfer' | 'price'; title: string; desc: string }[];
  };
  offers: {
    label: string;
    title: string;
    desc: string;
    items: { title: string; price: string; subtitle: string; points: string[] }[];
  };
  categories: {
    label: string;
    title: string;
    desc: string;
    categoryMeta: Record<
      'quad' | 'buggy' | 'cross',
      { title: string; description: string; icon: 'quad' | 'buggy' | 'cross' }
    >;
    cta: string;
  };
  experiences: {
    label: string;
    title: string;
  };
  gallery: {
    label: string;
    title: string;
    desc: string;
    locationTitle: string;
    locationDesc: string;
    videoLabel: string;
  };
  contact: {
    label: string;
    title: string;
    whatsapp: string;
    phone: string;
    email: string;
    instagram: string;
    location: string;
    locationDesc: string;
  };
  reservation: {
    label: string;
    title: string;
    desc: string;
    total: string;
    successTitle: string;
    successSubtitle: string;
    successRef: string;
    successMessage: string;
    helpText: string;
    confirmButton: string;
    whatsappButton: string;
    form: {
      experience: string;
      date: string;
      time: string;
      duration: string;
      pilots: string;
      passengers: string;
      children: string;
      addCamel: string;
      hotelPickup: string;
      address: string;
      name: string;
      phone: string;
      message: string;
      errorMissing: string;
      placeholderName: string;
      placeholderPhone: string;
      placeholderMessage: string;
    };
  };
  categoryCard: {
    perVehicle: string;
    perPerson: string;
    reserveCategory: string;
  };
  bookingInfo: {
    items: string[];
    paymentTitle: string;
    paymentDesc: string;
    contactTitle: string;
    contactPhone: string;
    contactDesc: string;
    confirmation: string;
  };
  bookingWidget: {
    priceLabel: string;
    whatsapp: {
      intro: string;
      activity: string;
      duration: string;
      dateAt: string;
      people: string;
      camel: string;
      totalEstimate: string;
      thanks: string;
      confirmAvailability: string;
    };
  };
}

export const TRANSLATIONS: Record<Locale, Translations> = {
  fr: {
    nav: {
      excursions: 'Excursions',
      categories: 'Catégories',
      gallery: 'Galerie',
      reviews: 'Avis',
      reserve: 'Réservation',
      contact: 'Contact',
    },
    hero: {
      badge: 'Agence né1 à Marrakech',
      titleBefore: "L'aventure vous attend,",
      titleHighlight: 'vivez-la pleinement',
      subtitle: 'Quad / Buggy 1000cc / Cross Moto / Excursions premium dans la Palmeraie de Marrakech. Encadrement professionnel, sensations garanties.',
      ctaBook: 'Réserver mon aventure',
      ctaCategories: 'Voir les catégories',
      ctaVideo: 'Voir la vidéo',
    },
    why: {
      label: 'Pourquoi nous choisir',
      title: "Une expérience d'exception",
      desc: "Choisissez l'expertise, les machines haut de gamme et un service local taillé pour Marrakech.",
      features: [
        { icon: 'shield', title: 'Sécurité maximale', desc: 'équipement complet fourni, machinerie inspectée avant chaque sortie, assurance incluse.' },
        { icon: 'guide', title: 'Encadrement pro', desc: 'Guides certifiés, briefing personnalisé et suivi permanent sur le terrain.' },
        { icon: 'transfer', title: 'Transfert inclus', desc: 'Prise en charge gratuite depuis votre hôtel ou riad, aller-retour compris.' },
        { icon: 'price', title: 'Meilleur prix garanti', desc: 'Tarifs directs sans intermédiaires, paiement sur place, annulation possible 24h avant.' },
      ],
    },
    offers: {
      label: 'Offre officielle',
      title: 'Tarifs clairs quad, buggy et cross',
      desc: 'Forfaits clairs : quad 2h avec chameau et thé, buggy/cross 1h, transport inclus.',
      items: [
        { title: 'Quad officiel', price: '200 MAD / 20 €', subtitle: 'par personne', points: ['2h de quad + 20 min chameau', 'Pause thé incluse', 'Transfert hôtel / riad inclus'] },
        { title: 'Quad duo', price: '250 MAD / 25 €', subtitle: 'pour 2 personnes dans le même quad', points: ['2h de quad + 20 min chameau', 'Pause thé incluse', 'Prix total pour le véhicule'] },
        { title: 'Buggy 1000cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h de buggy 1000cc', 'Guide et assurance inclus', 'Arrêts photo et transfert inclus'] },
        { title: 'Buggy Premium', price: '1200 MAD / 120 €', subtitle: '1h premium buggy', points: ['1h de buggy premium', 'Guide et assurance inclus', 'Transfert hôtel / riad inclus'] },
        { title: 'Cross Yamaha 80cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h de cross Yamaha 80cc', 'Circuit encadré et équipement complet', 'Transfert hôtel / riad inclus'] },
        { title: 'Cross Premium - Kawasaki KX 250', price: '1200 MAD / 120 €', subtitle: '1h', points: ['1h de cross premium 250cc', 'Circuit technique et équipement complet', 'Transfert hôtel / riad inclus'] },
      ],
    },
    categories: {
      label: 'Nos catégories',
      title: '3 univers, 1 passion',
      desc: "Choisissez votre machine, on s'occupe du reste.",
      categoryMeta: {
        quad: { title: 'Quad', icon: 'quad', description: 'Du quad familial 300cc automatique au Yamaha Raptor 700R sportif. Palmeraie de Marrakech, villages berbéres et pistes de sable.' },
        buggy: { title: 'Buggy 1000cc', icon: 'buggy', description: 'Can-Am Maverick X3 Turbo RR : 1000cc, 200ch. Traversée de la Palmeraie de Marrakech ou exploration des villages.' },
        cross: { title: 'Cross Moto', icon: 'cross', description: 'Yamaha YZ et Kawasaki KX sur circuit privé. Bosses, virages techniques et adrénaline sous encadrement pro.' },
      },
      cta: 'Réserver cette catégorie',
    },
    experiences: {
      label: 'Nos expériences',
      title: 'Des aventures pour tous les profils',
    },
    gallery: {
      label: 'Galerie',
      title: "Images et vidéos de l'activité, et notre point de départ",
      desc: 'Découvrez notre base à Palmeraie Marrakech et revivez les sensations avant de réserver.',
      locationTitle: 'Palmeraie, Marrakech',
      locationDesc: 'Point de rendez-vous officiel pour nos sorties quad, buggy et cross.',
      videoLabel: "Vidéo d'aventure",
    },
    contact: {
      label: 'Contact',
      title: 'Parlons de votre aventure',
      whatsapp: 'WhatsApp',
      phone: 'Téléphone',
      email: 'Email',
      instagram: 'Instagram',
      location: 'Localisation',
      locationDesc: 'Voir sur Google Maps',
    },
    reservation: {
      label: 'Réservation en direct',
      title: 'Composez votre sortie, obtenez votre prix',
      desc: 'Prix affiché en euros et en dirhams marocains.',
      total: 'Total estimé',
      successTitle: 'Demande envoyée !',
      successSubtitle: 'Votre réfürence :',
      successRef: 'Votre réfürence :',
      successMessage: 'Votre demande est reçue. Notre équipe vous recontacte très rapidement par WhatsApp.',
      helpText: "Besoin d'aide ",
      confirmButton: 'Confirmer ma réservation',
      whatsappButton: 'Réserver via WhatsApp',
      form: {
        experience: 'Expérience',
        date: 'Date',
        time: 'Créneau',
        duration: 'Durée',
        pilots: 'Pilotes',
        passengers: 'Passagers',
        children: 'Enfants',
        addCamel: 'Ajouter une balade à dromadaire (+90 MAD / 9 € par pers.)',
        hotelPickup: 'Transfert depuis mon hôtel / riad (inclus)',
        address: 'Adresse de prise en charge',
        name: 'Nom complet',
        phone: 'Téléphone / WhatsApp',
        message: 'Message (optionnel)',
        errorMissing: 'Veuillez remplir nom, téléphone et date.',
        placeholderName: 'Nom complet',
        placeholderPhone: 'Téléphone / WhatsApp',
        placeholderMessage: 'Message (optionnel)',
      },
    },
    categoryCard: {
      perVehicle: 'par véhicule',
      perPerson: 'par personne',
      reserveCategory: 'Réserver cette catégorie',
    },
    bookingInfo: {
      items: [
        "Départs tous les jours, créneaux matin et coucher de soleil",
        "Transport aller-retour hôtel / riad inclus sur toutes les offres",
        "Enfants de moins de 12 ans à -50 %",
        "Annulation gratuite jusqu'à 24h avant",
        "Paiement sur place le jour de l'activité",
      ],
      paymentTitle: "Moyens de paiement",
      paymentDesc: "Espèces (EUR / MAD) ou virement bancaire. Paiement sur place le jour de votre activité.",
      contactTitle: "Contact direct",
      contactPhone: "WhatsApp : 0610818391",
      contactDesc: "Réponse en moins de 30 minutes",
      confirmation: "Confirmation par WhatsApp 7j/7",
    },
    bookingWidget: {
      priceLabel: 'Total estimé',
      whatsapp: {
        intro: 'Bonjour Salah Quad Marrakech ! =K',
        activity: 'Je souhaite réserver :',
        duration: 'Durée',
        dateAt: 'Date',
        people: 'Personnes',
        camel: 'Dromadaire',
        totalEstimate: 'Total estimé',
        thanks: 'Merci de confirmer la disponibilité !',
        confirmAvailability: 'Merci de confirmer la disponibilité !',
      },
    },
  },
  en: {
    nav: {
      excursions: 'Excursions',
      categories: 'Categories',
      gallery: 'Gallery',
      reviews: 'Reviews',
      reserve: 'Booking',
      contact: 'Contact',
    },
    hero: {
      badge: 'Number 1 agency in Marrakech',
      titleBefore: 'Adventure awaits you,',
      titleHighlight: 'live it fully',
      subtitle: 'Quad / Buggy 1000cc / Cross Moto / Premium excursions in the Palmeraie of Marrakech. Professional guidance, guaranteed thrills.',
      ctaBook: 'Book my adventure',
      ctaCategories: 'See categories',
      ctaVideo: 'Watch video',
    },
    why: {
      label: 'Why choose us',
      title: 'An exceptional experience',
      desc: 'Choose expertise, premium vehicles and local service built for Marrakech.',
      features: [
        { icon: 'shield', title: 'Maximum safety', desc: 'Full equipment provided, machines checked before every ride, insurance included.' },
        { icon: 'guide', title: 'Professional guidance', desc: 'Certified guides, personalized briefing and constant track support.' },
        { icon: 'transfer', title: 'Transfer included', desc: 'Free pickup from your hotel or riad, round-trip included.' },
        { icon: 'price', title: 'Best price guarantee', desc: 'Direct rates with no intermediaries. Pay on site, free cancellation 24h before.' },
      ],
    },
    offers: {
      label: 'Official offer',
      title: 'Clear pricing for quad, buggy and cross',
      desc: 'Transparent packages: 2h quad with camel and tea, 1h buggy/cross, transport included.',
      items: [
        { title: 'Official quad', price: '200 MAD / 20 €', subtitle: 'per person', points: ['2h quad + 20 min camel', 'Tea break included', 'Hotel / riad transfer included'] },
        { title: 'Quad duo', price: '250 MAD / 25 €', subtitle: 'for 2 people in the same quad', points: ['2h quad + 20 min camel', 'Tea break included', 'Total price per vehicle'] },
        { title: 'Buggy 1000cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h buggy 1000cc', 'Guide and insurance included', 'Photo stops and transfer included'] },
        { title: 'Premium buggy', price: '1200 MAD / 120 €', subtitle: '1h premium buggy', points: ['1h premium buggy', 'Guide and insurance included', 'Hotel / riad transfer included'] },
        { title: 'Cross Yamaha 80cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h cross Yamaha 80cc', 'Supervised track and full equipment', 'Hotel / riad transfer included'] },
        { title: 'Premium Cross - Kawasaki KX 250', price: '1200 MAD / 120 €', subtitle: '1h', points: ['1h premium 250cc cross', 'Technical track and full equipment', 'Hotel / riad transfer included'] },
      ],
    },
    categories: {
      label: 'Our categories',
      title: '3 worlds, 1 passion',
      desc: 'Choose your machine, we take care of the rest.',
      categoryMeta: {
        quad: { title: 'Quad', icon: 'quad', description: 'From family 300cc automatic quad to Yamaha Raptor 700R sport model. Palmeraie of Marrakech, Berber villages and sand tracks.' },
        buggy: { title: 'Buggy 1000cc', icon: 'buggy', description: 'Can-Am Maverick X3 Turbo RR: 1000cc, 200hp. Crossing the Palmeraie of Marrakech or exploring the villages.' },
        cross: { title: 'Cross Moto', icon: 'cross', description: 'Yamaha YZ and Kawasaki KX on private track. Jumps, technical turns and adrenaline with pro supervision.' },
      },
      cta: 'Book this category',
    },
    experiences: {
      label: 'Our experiences',
      title: 'Adventures for every profile',
    },
    gallery: {
      label: 'Gallery & location',
      title: 'Images and videos of the activity, and our meeting point',
      desc: 'Discover our base in Palmeraie Marrakech and relive the sensations before booking.',
      locationTitle: 'Palmeraie, Marrakech',
      locationDesc: 'Official meeting point for our quad, buggy and cross tours.',
      videoLabel: 'Adventure video',
    },
    contact: {
      label: 'Contact',
      title: "Let's talk about your adventure",
      whatsapp: 'WhatsApp',
      phone: 'Phone',
      email: 'Email',
      instagram: 'Instagram',
      location: 'Location',
      locationDesc: 'View on Google Maps',
    },
    reservation: {
      label: 'Direct booking',
      title: 'Build your tour, get your price',
      desc: 'Price shown in euros and Moroccan dirhams.',
      total: 'Estimated total',
      successTitle: 'Request sent!',
      successSubtitle: 'Your reference:',
      successRef: 'Your reference:',
      successMessage: 'Your request has been received. Our team will contact you quickly by WhatsApp.',
      helpText: 'Need help',
      confirmButton: 'Confirm my booking',
      whatsappButton: 'Book via WhatsApp',
      form: {
        experience: 'Experience',
        date: 'Date',
        time: 'Time slot',
        duration: 'Duration',
        pilots: 'Pilots',
        passengers: 'Passengers',
        children: 'Children',
        addCamel: 'Add a camel ride (+90 MAD / 9 € per person)',
        hotelPickup: 'Hotel / riad transfer included',
        address: 'Pickup address',
        name: 'Full name',
        phone: 'Phone / WhatsApp',
        message: 'Message (optional)',
        errorMissing: 'Please fill name, phone and date.',
        placeholderName: 'Full name',
        placeholderPhone: 'Phone / WhatsApp',
        placeholderMessage: 'Message (optional)',
      },
    },
    categoryCard: {
      perVehicle: 'per vehicle',
      perPerson: 'per person',
      reserveCategory: 'Book this category',
    },
    bookingInfo: {
      items: [
        'Daily departures, morning and sunset slots',
        'Hotel / riad round-trip transport included on all offers',
        'Children under 12 at -50%',
        'Free cancellation until 24h before',
        'Pay on site on the day of activity',
      ],
      paymentTitle: 'Payment methods',
      paymentDesc: 'Cash (EUR / MAD) or bank transfer. Pay on site the day of your activity.',
      contactTitle: 'Direct contact',
      contactPhone: 'WhatsApp: 0610818391',
      contactDesc: 'Response within 30 minutes',
      confirmation: 'Confirmation via WhatsApp 7/7',
    },
    bookingWidget: {
      priceLabel: 'Estimated total',
      whatsapp: {
        intro: 'Hello Salah Quad Marrakech! =K',
        activity: 'I would like to book:',
        duration: 'Duration',
        dateAt: 'Date',
        people: 'People',
        camel: 'Camel ride',
        totalEstimate: 'Estimated total',
        thanks: 'Please confirm availability!',
        confirmAvailability: 'Please confirm availability!',
      },
    },
  },
  es: {
    nav: {
      excursions: 'Excursiones',
      categories: 'Categoréas',
      gallery: 'Galeréa',
      reviews: 'Reseéas',
      reserve: 'Reserva',
      contact: 'Contacto',
    },
    hero: {
      badge: 'Agencia n.é 1 en Marrakech',
      titleBefore: 'La aventura te espera,',
      titleHighlight: 'vévela al méximo',
      subtitle: 'Quad é Buggy 1000cc é Excursiones premium en la Palmeraie de Marrakech. Guías profesionales, emociones garantizadas.',
      ctaBook: 'Reserva mi aventura',
      ctaCategories: 'Ver categoréas',
      ctaVideo: 'Ver video',
    },
    why: {
      label: 'Por qué elegirnos',
      title: 'Una experiencia excepcional',
      desc: 'Elige experiencia, vehículos premium y un servicio local pensado para Marrakech.',
      features: [
        { icon: 'shield', title: 'Seguridad total', desc: 'Equipo completo incluido, méquinas revisadas antes de cada salida, seguro incluido.' },
        { icon: 'guide', title: 'Guías expertos', desc: 'Guías certificados, briefing personalizado y seguimiento permanente en el terreno.' },
        { icon: 'transfer', title: 'Traslado incluido', desc: 'Recogida gratuita desde tu hotel o riad, ida y vuelta incluidos.' },
        { icon: 'price', title: 'Mejor precio garantizado', desc: 'Tarifas directas sin intermediarios. Pago en el lugar, cancelacién gratis hasta 24h antes.' },
      ],
    },
    offers: {
      label: 'Oferta oficial',
      title: 'Precios claros quad, buggy y cross',
      desc: 'Paquetes transparentes: 2h de quad con camello y té, 1h buggy/cross, transporte incluido.',
      items: [
        { title: 'Quad oficial', price: '200 MAD / 20 €', subtitle: 'por persona', points: ['2h de quad + 20 min camello', 'Pausa de té incluida', 'Traslado hotel / riad incluido'] },
        { title: 'Quad déo', price: '250 MAD / 25 €', subtitle: 'para 2 personas en el mismo quad', points: ['2h de quad + 20 min camello', 'Pausa de té incluida', 'Precio total por vehículo'] },
        { title: 'Buggy 1000cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h de buggy 1000cc', 'Guía y seguro incluidos', 'Paradas para fotos y traslado incluido'] },
        { title: 'Buggy Premium', price: '1200 MAD / 120 €', subtitle: '1h buggy premium', points: ['1h buggy premium', 'Guía y seguro incluidos', 'Traslado hotel / riad incluido'] },
        { title: 'Cross Yamaha 80cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h de cross Yamaha 80cc', 'Circuito supervisado y equipo completo', 'Traslado hotel / riad incluido'] },
        { title: 'Cross Premium - Kawasaki KX 250', price: '1200 MAD / 120 €', subtitle: '1h', points: ['1h cross premium 250cc', 'Circuito técnico y equipo completo', 'Traslado hotel / riad incluido'] },
      ],
    },
    categories: {
      label: 'Nuestras categoréas',
      title: '3 mundos, 1 pasién',
      desc: 'Elige tu méquina, nosotros nos ocupamos del resto.',
      categoryMeta: {
        quad: { title: 'Quad', icon: 'quad', description: 'Desde quad familiar 300cc automético hasta Yamaha Raptor 700R deportivo. Palmeraie de Marrakech, pueblos bereberes y pistas de arena.' },
        buggy: { title: 'Buggy 1000cc', icon: 'buggy', description: 'Can-Am Maverick X3 Turbo RR: 1000cc, 200cv. Cruce por la Palmeraie de Marrakech o exploracién de los pueblos.' },
        cross: { title: 'Cross Moto', icon: 'cross', description: 'Yamaha YZ y Kawasaki KX en circuito privado. Saltos, curvas técnicas y adrenalina con supervisién profesional.' },
      },
      cta: 'Reservar esta categoréa',
    },
    experiences: {
      label: 'Nuestras experiencias',
      title: 'Aventuras para todos los perfiles',
    },
    gallery: {
      label: 'Galeréa y ubicacién',
      title: 'Imégenes y védeos de la actividad, y nuestro punto de encuentro',
      desc: 'Descubre nuestra base en Palmeraie Marrakech y revive las sensaciones antes de reservar.',
      locationTitle: 'Palmeraie, Marrakech',
      locationDesc: 'Punto de encuentro oficial para nuestras salidas de quad, buggy y cross.',
      videoLabel: 'Védeo de aventura',
    },
    contact: {
      label: 'Contacto',
      title: 'Hablemos de tu aventura',
      whatsapp: 'WhatsApp',
      phone: 'Teléfono',
      email: 'Email',
      instagram: 'Instagram',
      location: 'Ubicacién',
      locationDesc: 'Ver en Google Maps',
    },
    reservation: {
      label: 'Reserva directa',
      title: 'Diseéa tu salida, obtén tu precio',
      desc: 'Precio mostrado en euros y dirhams marroquées.',
      total: 'Total estimado',
      successTitle: 'Solicitud enviada!',
      successSubtitle: 'Tu referencia:',
      successRef: 'Tu referencia:',
      successMessage: 'Tu solicitud ha sido recibida. Nuestro equipo te contactaré muy pronto por WhatsApp.',
      helpText: 'éNecesitas ayuda',
      confirmButton: 'Confirmar mi reserva',
      whatsappButton: 'Reservar via WhatsApp',
      form: {
        experience: 'Experiencia',
        date: 'Fecha',
        time: 'Horario',
        duration: 'Duracién',
        pilots: 'Pilotos',
        passengers: 'Pasajeros',
        children: 'Niéos',
        addCamel: 'Añadir paseo en camello (+90 MAD / 9 € por pax)',
        hotelPickup: 'Traslado desde mi hotel / riad (incluido)',
        address: 'Direccién de recogida',
        name: 'Nombre completo',
        phone: 'Teléfono / WhatsApp',
        message: 'Mensaje (opcional)',
        errorMissing: 'Por favor completa nombre, teléfono y fecha.',
        placeholderName: 'Nombre completo',
        placeholderPhone: 'Teléfono / WhatsApp',
        placeholderMessage: 'Mensaje (opcional)',
      },
    },
    categoryCard: {
      perVehicle: 'por vehículo',
      perPerson: 'por persona',
      reserveCategory: 'Reservar esta categoréa',
    },
    bookingInfo: {
      items: [
        'Salidas diarias, maéana y atardecer',
        'Transporte ida y vuelta hotel / riad incluido en todas las ofertas',
        'Niéos menores de 12 aéos al -50 %',
        'Cancelacién gratuita hasta 24h antes',
        'Pago en el lugar el déa de la actividad',
      ],
      paymentTitle: 'Medios de pago',
      paymentDesc: 'Efectivo (EUR / MAD) o transferencia bancaria. Pago en el lugar el déa de tu actividad.',
      contactTitle: 'Contacto directo',
      contactPhone: 'WhatsApp: 0610818391',
      contactDesc: 'Respuesta en menos de 30 minutos',
      confirmation: 'Confirmacién por WhatsApp 7/7',
    },
    bookingWidget: {
      priceLabel: 'Total estimado',
      whatsapp: {
        intro: 'Hola Salah Quad Marrakech! =K',
        activity: 'Quiero reservar:',
        duration: 'Duracién',
        dateAt: 'Fecha',
        people: 'Personas',
        camel: 'Camello',
        totalEstimate: 'Total estimado',
        thanks: 'éPor favor confirma la disponibilidad!',
        confirmAvailability: 'éPor favor confirma la disponibilidad!',
      },
    },
  },
  nl: {
    nav: {
      excursions: 'Excursies',
      categories: 'Categorieén',
      gallery: 'Galerij',
      reviews: 'Reviews',
      reserve: 'Boeking',
      contact: 'Contact',
    },
    hero: {
      badge: 'Nr. 1 bureau in Marrakech',
      titleBefore: 'Het avontuur wacht op je,',
      titleHighlight: 'beleef het volledig',
      subtitle: 'Quad é Buggy 1000cc é Premium excursies in de Palmeraie van Marrakech. Professionele begeleiding, gegarandeerde sensaties.',
      ctaBook: 'Boek mijn avontuur',
      ctaCategories: 'Bekijk categorieén',
      ctaVideo: 'Video bekijken',
    },
    why: {
      label: 'Waarom ons kiezen',
      title: 'Een uitzonderlijke ervaring',
      desc: 'Kies expertise, premium voertuigen en lokale service voor Marrakech.',
      features: [
        { icon: 'shield', title: 'Maximale veiligheid', desc: 'Volledige uitrusting inbegrepen, machines gecontroleerd voor elke rit, verzekering inbegrepen.' },
        { icon: 'guide', title: 'Professionele begeleiding', desc: 'Gecertificeerde gidsen, persoonlijk briefing en permanente begeleiding op het parcours.' },
        { icon: 'transfer', title: 'Transfer inbegrepen', desc: 'Gratis ophaalservice vanaf je hotel of riad, heen en terug inbegrepen.' },
        { icon: 'price', title: 'Beste prijs garantie', desc: 'Directe tarieven zonder tussenpersonen. Betaal ter plaatse, gratis annuleren tot 24u eerder.' },
      ],
    },
    offers: {
      label: 'Officieel aanbod',
      title: 'Duidelijke prijzen voor quad, buggy en cross',
      desc: 'Transparante pakketten: 2u quad met kameel en thee, 1u buggy/cross, transport inbegrepen.',
      items: [
        { title: 'Officiële quad', price: '200 MAD / 20 €', subtitle: 'per persoon', points: ['2u quad + 20 min kameel', 'Theepauze inbegrepen', 'Hotel / riad transfer inbegrepen'] },
        { title: 'Quad duo', price: '250 MAD / 25 €', subtitle: 'voor 2 personen in dezelfde quad', points: ['2u quad + 20 min kameel', 'Theepauze inbegrepen', 'Totale prijs per voertuig'] },
        { title: 'Buggy 1000cc', price: '1000 MAD / 100 €', subtitle: '1u', points: ['1u buggy 1000cc', 'Gids en verzekering inbegrepen', 'Fotostops en transfer inbegrepen'] },
        { title: 'Premium buggy', price: '1200 MAD / 120 €', subtitle: '1u premium buggy', points: ['1u premium buggy', 'Gids en verzekering inbegrepen', 'Hotel / riad transfer inbegrepen'] },
        { title: 'Cross Yamaha 80cc', price: '1000 MAD / 100 €', subtitle: '1u', points: ['1u cross Yamaha 80cc', 'Supervised circuit en volledige uitrusting', 'Hotel / riad transfer inbegrepen'] },
        { title: 'Premium Cross - Kawasaki KX 250', price: '1200 MAD / 120 €', subtitle: '1u', points: ['1u premium 250cc cross', 'Technisch circuit en volledige uitrusting', 'Hotel / riad transfer inbegrepen'] },
      ],
    },
    categories: {
      label: 'Onze categorieén',
      title: '3 werelden, 1 passie',
      desc: 'Kies je machine, wij regelen de rest.',
      categoryMeta: {
        quad: { title: 'Quad', icon: 'quad', description: 'Van familiekwad 300cc automatisch tot Yamaha Raptor 700R sportief. Palmeraie van Marrakech, Berberdorpen en zandpaden.' },
        buggy: { title: 'Buggy 1000cc', icon: 'buggy', description: 'Can-Am Maverick X3 Turbo RR: 1000cc, 200pk. Oversteek door de Palmeraie van Marrakech of verkenning van de dorpen.' },
        cross: { title: 'Cross Moto', icon: 'cross', description: 'Yamaha YZ en Kawasaki KX op privécircuit. Sprongen, technische bochten en adrenaline met professionele begeleiding.' },
      },
      cta: 'Boek deze categorie',
    },
    experiences: {
      label: 'Onze ervaringen',
      title: 'Avonturen voor elk profiel',
    },
    gallery: {
      label: 'Galerij & locatie',
      title: "Foto's en video's van de activiteit en onze vertrekbasis",
      desc: 'Ontdek onze basis in Palmeraie Marrakech en beleef de sensaties opnieuw voor je boekt.',
      locationTitle: 'Palmeraie, Marrakech',
      locationDesc: 'Officieel ontmoetingspunt voor onze quad-, buggy- en crossritjes.',
      videoLabel: 'Avontuurvideo',
    },
    contact: {
      label: 'Contact',
      title: 'Laten we je avontuur bespreken',
      whatsapp: 'WhatsApp',
      phone: 'Telefoon',
      email: 'E-mail',
      instagram: 'Instagram',
      location: 'Locatie',
      locationDesc: 'Bekijk op Google Maps',
    },
    reservation: {
      label: 'Direct boeken',
      title: 'Stel je uitstap samen, ontvang je prijs',
      desc: "Prijs weergegeven in euro's en Marokkaanse dirhams.",
      total: 'Geschat totaal',
      successTitle: 'Aanvraag verstuurd!',
      successSubtitle: 'Je referentie:',
      successRef: 'Je referentie:',
      successMessage: 'Je aanvraag is ontvangen. Ons team neemt snel contact op via WhatsApp.',
      helpText: 'Hulp nodig',
      confirmButton: 'Bevestig mijn boeking',
      whatsappButton: 'Boek via WhatsApp',
      form: {
        experience: 'Ervaring',
        date: 'Datum',
        time: 'Tijdvak',
        duration: 'Duur',
        pilots: 'Piloten',
        passengers: 'Passagiers',
        children: 'Kinderen',
        addCamel: 'Voeg een kameelrit toe (+90 MAD / 9 € per p.p.)',
        hotelPickup: 'Transfer vanaf mijn hotel / riad (inbegrepen)',
        address: 'Ophaaladres',
        name: 'Volledige naam',
        phone: 'Telefoon / WhatsApp',
        message: 'Bericht (optioneel)',
        errorMissing: 'Vul naam, telefoon en datum in.',
        placeholderName: 'Volledige naam',
        placeholderPhone: 'Telefoon / WhatsApp',
        placeholderMessage: 'Bericht (optioneel)',
      },
    },
    categoryCard: {
      perVehicle: 'per voertuig',
      perPerson: 'per persoon',
      reserveCategory: 'Boek deze categorie',
    },
    bookingInfo: {
      items: [
        'Dagelijkse vertrekken, ochtend- en zonsondergangtijden',
        'Hotel / riad vervoer heen en terug inbegrepen op alle aanbiedingen',
        'Kinderen onder 12 jaar met -50%',
        'Gratis annuleren tot 24 uur van tevoren',
        'Betalen op locatie op de dag van de activiteit',
      ],
      paymentTitle: 'Betaalmethoden',
      paymentDesc: 'Contant (EUR / MAD) of bankoverschrijving. Betaal ter plaatse op de dag van je activiteit.',
      contactTitle: 'Direct contact',
      contactPhone: 'WhatsApp: 0610818391',
      contactDesc: 'Antwoord binnen 30 minuten',
      confirmation: 'Bevestiging via WhatsApp 7/7',
    },
    bookingWidget: {
      priceLabel: 'Geschat totaal',
      whatsapp: {
        intro: 'Hallo Salah Quad Marrakech! =K',
        activity: 'Ik wil graag boeken:',
        duration: 'Duur',
        dateAt: 'Datum',
        people: 'Mensen',
        camel: 'Kameelrit',
        totalEstimate: 'Geschat totaal',
        thanks: 'Bevestig de beschikbaarheid, alstublieft!',
        confirmAvailability: 'Bevestig de beschikbaarheid, alstublieft!',
      },
    },
  },
  de: {
    nav: {
      excursions: 'Ausflége',
      categories: 'Kategorien',
      gallery: 'Galerie',
      reviews: 'Bewertungen',
      reserve: 'Buchung',
      contact: 'Kontakt',
    },
    hero: {
      badge: 'Agentur Nr. 1 in Marrakesch',
      titleBefore: 'Das Abenteuer erwartet dich,',
      titleHighlight: 'lebe es voll aus',
      subtitle: 'Quad é Buggy 1000cc é Premium-Ausflége in der Palmeraie von Marrakesch. Professionelle Betreuung, garantierte Action.',
      ctaBook: 'Buche mein Abenteuer',
      ctaCategories: 'Kategorien ansehen',
      ctaVideo: 'Video ansehen',
    },
    why: {
      label: 'Warum uns wéhlen',
      title: 'Ein auéergewéhnliches Erlebnis',
      desc: 'Wähle Expertise, Premium-Fahrzeuge und lokalen Service für Marrakesch.',
      features: [
        { icon: 'shield', title: 'Maximale Sicherheit', desc: 'Komplette Ausrüstung inklusive, Fahrzeuge vor jeder Fahrt éberpréft, Versicherung inklusive.' },
        { icon: 'guide', title: 'Professionelle Betreuung', desc: 'Zertifizierte Guides, persénliches Briefing und permanente Begleitung im Gelénde.' },
        { icon: 'transfer', title: 'Transfer inklusive', desc: 'Kostenloser Transfer von Ihrem Hotel oder Riad, Hin- und Réckfahrt inklusive.' },
        { icon: 'price', title: 'Bestpreis-Garantie', desc: 'Direktpreise ohne Zwischenhéndler. Bezahlung vor Ort, kostenlose Stornierung bis 24h vorher.' },
      ],
    },
    offers: {
      label: 'Offizielles Angebot',
      title: 'Klare Preise für Quad, Buggy und Cross',
      desc: 'Transparente Pakete: 2h Quad mit Kamel und Tee, 1h Buggy/Cross, Transport inklusive.',
      items: [
        { title: 'Offizielles Quad', price: '200 MAD / 20 €', subtitle: 'pro Person', points: ['2h Quad + 20 Min. Kamel', 'Tee-Pause inklusive', 'Hotel / Riad Transfer inklusive'] },
        { title: 'Quad Duo', price: '250 MAD / 25 €', subtitle: 'für 2 Personen im selben Quad', points: ['2h Quad + 20 Min. Kamel', 'Tee-Pause inklusive', 'Gesamtpreis pro Fahrzeug'] },
        { title: 'Buggy 1000cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h Buggy 1000cc', 'Guide und Versicherung inklusive', 'Foto-Stops und Transfer inklusive'] },
        { title: 'Premium Buggy', price: '1200 MAD / 120 €', subtitle: '1h Premium Buggy', points: ['1h Premium Buggy', 'Guide und Versicherung inklusive', 'Hotel / Riad Transfer inklusive'] },
        { title: 'Cross Yamaha 80cc', price: '1000 MAD / 100 €', subtitle: '1h', points: ['1h Cross Yamaha 80cc', 'Beaufsichtigte Strecke und komplette Ausrüstung', 'Hotel / Riad Transfer inklusive'] },
        { title: 'Premium Cross - Kawasaki KX 250', price: '1200 MAD / 120 €', subtitle: '1h', points: ['1h Premium Cross 250cc', 'Technische Strecke und komplette Ausrüstung', 'Hotel / Riad Transfer inklusive'] },
      ],
    },
    categories: {
      label: 'Unsere Kategorien',
      title: '3 Welten, 1 Leidenschaft',
      desc: 'Wähle dein Fahrzeug, wir kémmern uns um den Rest.',
      categoryMeta: {
        quad: { title: 'Quad', icon: 'quad', description: 'Vom Familienquad 300cc Automatik bis zum Yamaha Raptor 700R Sportmodell. Palmeraie von Marrakesch, berberische Dérfer und Sandpisten.' },
        buggy: { title: 'Buggy 1000cc', icon: 'buggy', description: 'Can-Am Maverick X3 Turbo RR: 1000cc, 200 PS. Durchquerung der Palmeraie von Marrakesch oder Erkundung der Dérfer.' },
        cross: { title: 'Cross Moto', icon: 'cross', description: 'Yamaha YZ und Kawasaki KX auf privater Strecke. Sprénge, technische Kurven und Adrenalin unter professioneller Anleitung.' },
      },
      cta: 'Diese Kategorie buchen',
    },
    experiences: {
      label: 'Unsere Erlebnisse',
      title: 'Abenteuer für jedes Profil',
    },
    gallery: {
      label: 'Galerie',
      title: 'Bilder und Videos der Aktivitét und unseres Treffpunkts',
      desc: 'Entdecke unsere Basis in Palmeraie Marrakech und erlebe die Atmosphére vor der Buchung.',
      locationTitle: 'Palmeraie, Marrakech',
      locationDesc: 'Offizieller Treffpunkt für unsere Quad-, Buggy- und Cross-Touren.',
      videoLabel: 'Abenteuer-Video',
    },
    contact: {
      label: 'Kontakt',
      title: 'Lass uns éber dein Abenteuer sprechen',
      whatsapp: 'WhatsApp',
      phone: 'Telefon',
      email: 'Email',
      instagram: 'Instagram',
      location: 'Standort',
      locationDesc: 'Auf Google Maps ansehen',
    },
    reservation: {
      label: 'Direkte Buchung',
      title: 'Stelle deine Tour zusammen, erhalte deinen Preis',
      desc: 'Preis in Euro und marokkanischen Dirham angezeigt.',
      total: 'Geschétzter Gesamtpreis',
      successTitle: 'Anfrage gesendet!',
      successSubtitle: 'Deine Referenz:',
      successRef: 'Deine Referenz:',
      successMessage: 'Deine Anfrage wurde empfangen. Unser Team kontaktiert dich schnell per WhatsApp.',
      helpText: 'Brauchst du Hilfe',
      confirmButton: 'Meine Buchung bestétigen',
      whatsappButton: 'Per WhatsApp buchen',
      form: {
        experience: 'Erlebnis',
        date: 'Datum',
        time: 'Zeitfenster',
        duration: 'Dauer',
        pilots: 'Piloten',
        passengers: 'Passagiere',
        children: 'Kinder',
        addCamel: 'Kamelritt hinzufügen (+90 MAD / 9 € pro Person)',
        hotelPickup: 'Transfer von meinem Hotel / Riad (inklusive)',
        address: 'Abholadresse',
        name: 'Vollsténdiger Name',
        phone: 'Telefon / WhatsApp',
        message: 'Nachricht (optional)',
        errorMissing: 'Bitte félle Name, Telefon und Datum aus.',
        placeholderName: 'Vollständiger Name',
        placeholderPhone: 'Telefon / WhatsApp',
        placeholderMessage: 'Nachricht (optional)',
      },
    },
    categoryCard: {
      perVehicle: 'pro Fahrzeug',
      perPerson: 'pro Person',
      reserveCategory: 'Diese Kategorie buchen',
    },
    bookingInfo: {
      items: [
        'Tégliche Abfahrten, Morgen- und Sonnenuntergangszeiten',
        'Hotel / Riad Hin- und Récktransfer bei allen Angeboten inklusive',
        'Kinder unter 12 Jahren mit -50 %',
        'Kostenlose Stornierung bis 24 Stunden vorher',
        'Bezahlung vor Ort am Tag der Aktivitét',
      ],
      paymentTitle: 'Zahlungsmethoden',
      paymentDesc: 'Bar (EUR / MAD) oder Bankéberweisung. Bezahlung vor Ort am Tag deiner Aktivitét.',
      contactTitle: 'Direkter Kontakt',
      contactPhone: 'WhatsApp: 0610818391',
      contactDesc: 'Antwort innerhalb von 30 Minuten',
      confirmation: 'Bestétigung via WhatsApp 7/7',
    },
    bookingWidget: {
      priceLabel: 'Geschétzter Gesamtpreis',
      whatsapp: {
        intro: 'Hallo Salah Quad Marrakech! =K',
        activity: 'Ich méchte buchen:',
        duration: 'Dauer',
        dateAt: 'Datum',
        people: 'Personen',
        camel: 'Kamelritt',
        totalEstimate: 'Geschétzter Gesamtpreis',
        thanks: 'Bitte bestétige die Verfégbarkeit!',
        confirmAvailability: 'Bitte bestétige die Verfégbarkeit!',
      },
    },
  },
};




