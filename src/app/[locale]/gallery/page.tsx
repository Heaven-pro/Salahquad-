import GalleryPage from '@/components/GalleryPage';
import { getLocale, type Locale } from '@/lib/quad/i18n';

export const dynamic = 'force-dynamic';

export default function LocaleGalleryPage({ params }: { params: { locale: string } }) {
  const locale = getLocale(params.locale as Locale);
  return <GalleryPage locale={locale} />;
}