import type { Metadata } from 'next';
import './globals.css';

const url = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.salahquadmarrakech.com';
const ogImage = 'https://images.unsplash.com/photo-1519817650390-64a93db511aa?auto=format&fit=crop&w=1200&q=80';

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: 'Salah Quad Marrakech | Quad, Buggy 1000cc & Cross Moto - Aventures Premium',
    template: '%s | Salah Quad Marrakech',
  },
  description:
    'Aventures premium à Marrakech : Quad dans la Palmeraie, Buggy Can-Am X3 Turbo 1000cc dans la Palmeraie de Marrakech, Cross Moto Yamaha & Kawasaki. Transfert hôtel inclus, meilleur prix garanti.',
  keywords: [
    'quad marrakech',
    'buggy marrakech',
    'buggy 1000cc marrakech',
    'can-am x3 marrakech',
    'cross moto marrakech',
    'motocross marrakech',
    'excursion palmeraie',
    'palmeraie marrakech',
    'activités marrakech',
    'quad palmeraie',
    'raptor 700 marrakech',
    'yamaha yz marrakech',
    'kawasaki kx marrakech',
    'aventure marrakech',
    'location quad marrakech',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: 'Salah Quad Marrakech',
    title: 'Salah Quad Marrakech | Quad · Buggy 1000cc · Cross Moto',
    description: 'Excursions premium en quad, buggy Can-Am 1000cc et cross moto dans la Palmeraie de Marrakech.',
    url,
    images: [ogImage],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Salah Quad Marrakech | Aventures Premium',
    description: 'Quad, Buggy 1000cc & Cross Moto - Palmeraie de Marrakech.',
    images: [ogImage],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
