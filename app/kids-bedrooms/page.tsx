import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import ProductTabs from '@/components/ProductTabs';

import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "غرف نوم أطفال | مؤسسة رؤية للأثاث",
  description: "أحدث تصاميم غرف نوم أطفال مبهجة وعملية بألوان رائعة وجودة ممتازة من مؤسسة رؤية للأثاث بالرياض. أسعار تنافسية من المصنع مباشرة مع تركيب مجاني.",
};

export default async function KidsBedrooms() {
    const { data: products } = await supabase
        .from('products')
        .select('*, images:product_images(*)')
        .eq('category_id', 3)

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-blue-950 mb-10 text-center">غرف نوم أطفال</h1>

                <ProductTabs products={products || []} />
            </div>
        </div>
    );
}