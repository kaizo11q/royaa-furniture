'use client'
import { useState } from 'react';
import Link from 'next/link';
import { Phone, MessageCircle, Menu, X } from 'lucide-react';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

    return (
        <>
            <div className="bg-blue-950 text-white py-2 px-4 text-sm">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Phone size={16} className="text-amber-500" />
                        <span dir="ltr" className="font-semibold">0539404559</span>
                    </div>
                    <a href="https://wa.me/966539404559" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-amber-600 hover:bg-amber-700 transition-colors px-4 py-1.5 rounded-full font-medium text-xs sm:text-sm">
                        <MessageCircle size={16} /><span>اطلب عبر الواتساب</span>
                    </a>
                </div>
            </div>

            <header className="bg-white shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <Link href="/" className="flex-shrink-0 flex items-center gap-2">
                            <img src="/logo.png" alt="لوجو مؤسسة رؤية" className="w-12 h-12 rounded-xl object-contain" />
                            <span className="font-bold text-2xl text-blue-950 tracking-tight whitespace-nowrap">مؤسسة رؤية للأثاث</span>
                        </Link>

                        <nav className="hidden lg:flex gap-6 items-center">
                            <Link href="/" className="text-blue-950 font-semibold hover:text-amber-600 transition-colors whitespace-nowrap">الرئيسية</Link>
                            <Link href="/double-bedrooms" className="text-slate-600 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">غرف نوم نفرين</Link>
                            <Link href="/single-bedrooms" className="text-slate-600 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">غرف نوم نفر</Link>
                            <Link href="/kids-bedrooms" className="text-slate-600 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">غرف نوم أطفال</Link>
                            <Link href="/sofas" className="text-slate-600 hover:text-amber-600 transition-colors font-medium whitespace-nowrap">كنب جاهز وتفصيل</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                            <button onClick={toggleMenu} className="lg:hidden text-blue-950 hover:text-amber-600 focus:outline-none">
                                {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                            </button>
                        </div>
                    </div>
                </div>

                {isMobileMenuOpen && (
                    <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg absolute w-full left-0">
                        <nav className="flex flex-col gap-4">
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/" className="text-blue-950 font-bold text-lg border-b border-gray-50 pb-2">الرئيسية</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/double-bedrooms" className="text-slate-600 hover:text-amber-600 font-medium text-lg border-b border-gray-50 pb-2">غرف نوم نفرين</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/single-bedrooms" className="text-slate-600 hover:text-amber-600 font-medium text-lg border-b border-gray-50 pb-2">غرف نوم نفر</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/kids-bedrooms" className="text-slate-600 hover:text-amber-600 font-medium text-lg border-b border-gray-50 pb-2">غرف نوم أطفال</Link>
                            <Link onClick={() => setIsMobileMenuOpen(false)} href="/sofas" className="text-slate-600 hover:text-amber-600 font-medium text-lg">كنب جاهز وتفصيل</Link>
                        </nav>
                    </div>
                )}
            </header>
        </>
    );
}