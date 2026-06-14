import Link from 'next/link';
import { ShieldCheck, Wrench, Truck, ArrowRight, MessageCircle } from 'lucide-react';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

export const revalidate = 60;

export default async function ProductDetails({ params }: { params: { id: string } }) {
    // In Next.js 15+, params is a promise and must be awaited
    const resolvedParams = await params;
    const { data: product } = await supabase
        .from('products')
        .select('*, images:product_images(*), category:categories(name)')
        .eq('id', resolvedParams.id)
        .single()

    if (!product) {
        return (
            <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-10">
                <h2 className="text-3xl font-bold text-blue-950 mb-4">عذراً، المنتج غير موجود!</h2>
                <Link href="/" className="text-amber-600 font-bold hover:underline">العودة للرئيسية</Link>
            </div>
        );
    }

    return (
        <div className="bg-gray-50 py-12 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                <Link href="/" className="inline-flex items-center gap-2 text-slate-500 hover:text-amber-600 transition-colors mb-8 font-medium">
                    <ArrowRight size={20} />
                    <span>العودة للمنتجات</span>
                </Link>

                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-0 md:gap-8">

                        <div className="h-[400px] md:h-[600px] relative">
                            <Image src={product.images?.[0]?.image_url || '/placeholder.jpg'} alt={product.name} fill className="object-cover" />
                            <div className="absolute top-6 right-6 bg-white/90 backdrop-blur text-blue-950 font-bold px-4 py-2 rounded-xl text-lg shadow-lg">
                                {product.price.toLocaleString()} ر.س
                            </div>
                        </div>

                        <div className="p-8 md:p-12 flex flex-col justify-center">

                            <span className="inline-block py-1 px-3 rounded-full bg-blue-50 text-blue-700 font-medium text-sm mb-4 w-max border border-blue-100">
                                {product.category?.name}
                            </span>

                            <h1 className="text-3xl md:text-4xl font-bold text-blue-950 mb-6 leading-tight">
                                {product.name}
                            </h1>

                            <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                {product.description}
                            </p>

                            <div className="flex gap-6 mb-8 text-sm text-gray-600">
                                {product.wood_type && (
                                    <div><span className="font-bold text-blue-950">نوع الخشب: </span>{product.wood_type}</div>
                                )}
                                {product.pieces && (
                                    <div><span className="font-bold text-blue-950">عدد القطع: </span>{product.pieces}</div>
                                )}
                            </div>

                            <div className="space-y-4 mb-10">
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-950"><ShieldCheck size={20} /></div>
                                    <span className="font-medium">ضمان مصنعي شامل على الخشب والإكسسوارات</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600"><Truck size={20} /></div>
                                    <span className="font-medium">توصيل مجاني داخل مدينة الرياض</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600"><Wrench size={20} /></div>
                                    <span className="font-medium">التركيب مجاني بأيدي فنيين متخصصين</span>
                                </div>
                            </div>

                            <a
                                href={`https://wa.me/966539404559?text=مرحباً مؤسسة رؤية، أريد الاستفسار عن المنتج: ${product.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full bg-amber-600 hover:bg-amber-700 text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 font-bold text-lg transition-all shadow-lg shadow-amber-600/20 active:scale-95"
                            >
                                <MessageCircle size={24} />
                                <span>اطلب الآن عبر واتساب</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}