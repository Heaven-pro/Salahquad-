import type { MetadataRoute } from 'next';
const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.salahquadmarrakech.com';
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  return [
    { url: base, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
  ];
}
