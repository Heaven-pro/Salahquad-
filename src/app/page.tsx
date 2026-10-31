import HomePage from '@/components/HomePage';
import { loadHomePageContent } from '@/lib/quad/homepage-content';

export const dynamic = 'force-dynamic';

export default async function Page() {
  const { excursions, reviews } = await loadHomePageContent();
  return <HomePage excursions={excursions} reviews={reviews} />;
}
