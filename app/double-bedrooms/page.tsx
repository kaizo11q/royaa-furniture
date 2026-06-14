import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import ProductTabs from '@/components/ProductTabs';

import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "غرف نوم نفرين (زوجي) | مؤسسة رؤية للأثاث",
  description: "اكتشف الفخامة مع تشكيلة غرف نوم نفرين (ماستر) من مؤسسة رؤية للأثاث بالرياض. تفصيل وتصميم على أعلى مستوى بأسعار المصنع مع تركيب مجاني.",
};

export default async function DoubleBedrooms() {
    const { data: products } = await supabase
        .from('products')
        .select('*, images:product_images(*)')
        .eq('category_id', 2)

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-blue-950 mb-10 text-center">غرف نوم نفرين</h1>

                <ProductTabs products={products || []} />
            </div>
        </div>
    );
}