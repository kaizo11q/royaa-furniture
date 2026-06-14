'use client';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Wrench, ChevronLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface ProductImage {
    id: number;
    product_id: number;
    image_url: string;
    is_main: boolean;
}

interface Product {
    id: number;
    name: string;
    price: number;
    category_id: number;
    images?: ProductImage[];
}

interface Tab {
    href: string;
    label: string;
}

const tabs: Tab[] = [
    { href: '/double-bedrooms', label: 'غرف نوم نفرين' },
    { href: '/single-bedrooms', label: 'غرف نوم نفر' },
    { href: '/kids-bedrooms', label: 'غرف نوم أطفال' },
    { href: '/sofas', label: 'كنب' },
];

export default function ProductTabs({ products }: { products: Product[] }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    return (
        <>
            {/* Tabs */}
            {isHome && (
                <div className="flex flex-wrap justify-center gap-3 mb-12">
                    {tabs.map((tab) => {
                        const isActive = pathname === tab.href;
                        return (
                            <Link
                                key={tab.href}
                                href={tab.href}
                                className={`px-8 py-2.5 rounded-full font-medium text-sm transition-colors duration-200 flex items-center justify-center ${
                                    isActive
                                        ? 'bg-blue-950 text-white shadow-md shadow-blue-950/20'
                                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                                }`}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </div>
            )}

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {!products?.length ? (
                    <div className="col-span-full text-center text-gray-500 py-10">لا توجد منتجات في هذا القسم حالياً.</div>
                ) : (
                    products.map((product) => (
                        <div
                            key={product.id}
                            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group border border-gray-100 flex flex-col"
                        >
                            <div className="relative h-64 overflow-hidden shrink-0">
                                <Image
                                    src={product.images?.[0]?.image_url || '/placeholder.jpg'}
                                    alt={product.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
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
                                <Link
                                    href={`/product/${product.id}`}
                                    className="w-full bg-blue-950 hover:bg-blue-900 text-white rounded-xl py-3 px-4 flex items-center justify-center gap-2 font-bold transition-colors shadow-md shadow-blue-950/20"
                                >
                                    <span>عرض التفاصيل</span>
                                    <ChevronLeft size={20} />
                                </Link>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </>
    );
}
