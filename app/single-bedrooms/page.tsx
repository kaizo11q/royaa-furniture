import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import ProductTabs from '@/components/ProductTabs';

import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "غرف نوم نفر | مؤسسة رؤية للأثاث",
  description: "تشكيلة رائعة من غرف نوم مفرد (نفر) بتصاميم عصرية وكلاسيكية وخامات عالية الجودة من المصنع مباشرة بالرياض مع توصيل وتركيب مجاني.",
};

export default async function SingleBedrooms() {
    const { data: products } = await supabase
        .from('products')
        .select('*, images:product_images(*)')
        .eq('category_id', 1)

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-blue-950 mb-10 text-center">غرف نوم نفر</h1>

                <ProductTabs products={products || []} />
            </div>
        </div>
    );
}