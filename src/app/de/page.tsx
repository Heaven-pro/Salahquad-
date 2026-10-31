import HomePage from '@/components/HomePage';
import { loadHomePageContent } from '@/lib/quad/homepage-content';

export const dynamic = 'force-dynamic';

export default async function LocalePage({ params }: { params: { locale: string } }) {
  const { excursions, reviews } = await loadHomePageContent();
  return <HomePage excursions={excursions} reviews={reviews} />;
}
