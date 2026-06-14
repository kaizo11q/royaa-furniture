import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royaa-furniture.com';
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/dashboard', // Keep dashboard admin pages hidden from search engine indexing
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
