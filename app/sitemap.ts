import { MetadataRoute } from 'next';
import { supabase } from '@/lib/supabase';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://royaa-furniture.com';

  // Static routes
  const routes = [
    '',
    '/single-bedrooms',
    '/double-bedrooms',
    '/kids-bedrooms',
    '/sofas',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  // Dynamic product routes from Supabase
  try {
    const { data: products } = await supabase
      .from('products')
      .select('id');

    if (products) {
      const productRoutes = products.map((product) => ({
        url: `${baseUrl}/product/${product.id}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }));
      return [...routes, ...productRoutes];
    }
  } catch (error) {
    console.error('Error generating sitemap dynamic routes:', error);
  }

  return routes;
}
