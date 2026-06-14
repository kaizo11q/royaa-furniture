import Link from 'next/link';
import { ChevronLeft, ShieldCheck, Wrench } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {!products?.length ? (
                        <div className="col-span-full text-center text-gray-500 py-10">لا توجد منتجات في هذا القسم حالياً. سيتم إضافتها قريباً!</div>
                    ) : (
                        products.map((product) => (
                            <div key={product.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group border border-gray-100 flex flex-col">
                                <div className="relative h-64 overflow-hidden shrink-0">
                                    <Image src={product.images?.[0]?.image_url || '/placeholder.jpg'} alt={product.name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur text-blue-950 font-bold px-3 py-1.5 rounded-lg text-sm">
                                        {product.price.toLocaleString()} ر.س
                                    </div>
                                </div>

                                <div className="p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold text-slate-800 mb-4 line-clamp-1">{product.name}</h3>

                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-6 mt-auto">
                                        <span className="flex items-center gap-1"><ShieldCheck size={16} className="text-amber-500" />ضمان مصنعي</span>
                                        <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                                        <span className="flex items-center gap-1"><Wrench size={16} className="text-amber-500" /> تركيب مجاني</span>
                                    </div>

                                    <Link href={`/product/${product.id}`} className="w-full bg-blue-950 hover:bg-blue-900 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold transition-colors shadow-md shadow-blue-950/20">
                                        <span>عرض التفاصيل</span>
                                        <ChevronLeft size={20} />
                                    </Link>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}