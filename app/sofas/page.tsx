import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import ProductTabs from '@/components/ProductTabs';

import { Metadata } from 'next';

export const revalidate = 60;

export const metadata: Metadata = {
  title: "كنب جاهز وتفصيل | مؤسسة رؤية للأثاث",
  description: "أرقى موديلات الكنب الجاهز والتفصيل حسب الطلب بمقاسات وألوان مخصصة من مؤسسة رؤية للأثاث بالرياض. أقمشة فاخرة وإسفنج مريح عالي الجودة مع توصيل مجاني.",
};

export default async function Sofas() {
    const { data: products } = await supabase
        .from('products')
        .select('*, images:product_images(*)')
        .eq('category_id', 4)

    return (
        <div className="py-16 bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h1 className="text-4xl font-bold text-blue-950 mb-10 text-center">كنب جاهز وتفصيل</h1>

                <ProductTabs products={products || []} />
            </div>
        </div>
    );
}