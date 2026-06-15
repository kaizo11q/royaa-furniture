import Link from 'next/link';
import { MapPin, Mail, Phone, ChevronLeft } from 'lucide-react';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-blue-950 text-white pt-16 pb-8 border-t-[6px] border-amber-500 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <img src="/logo.png" alt="لوجو مؤسسة رؤية" className="w-12 h-12 rounded-xl object-contain" />
                            <span className="font-bold text-2xl tracking-tight">مؤسسة رؤية للأثاث</span>
                        </div>
                        <p className="text-blue-200 leading-relaxed mb-6 text-sm">
                            نقدم لكم أرقى تشكيلات غرف النوم والأثاث المنزلي بتصاميم عصرية وكلاسيكية تناسب جميع الأذواق، مع خدمات التوصيل والتركيب الاحترافية.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-amber-600 transition-colors"><FaFacebook size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-amber-600 transition-colors"><FaInstagram size={20} /></a>
                            <a href="#" className="w-10 h-10 rounded-full bg-blue-900 flex items-center justify-center hover:bg-amber-600 transition-colors"><FaTwitter size={20} /></a>
                        </div>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-amber-500 border-b border-blue-900 pb-3">روابط سريعة</h3>
                        <ul className="space-y-3 text-sm text-blue-200">
                            <li><Link href="/double-bedrooms" className="hover:text-white transition-colors flex items-center gap-2"><ChevronLeft size={16} /> غرف نوم نفرين</Link></li>
                            <li><Link href="/single-bedrooms" className="hover:text-white transition-colors flex items-center gap-2"><ChevronLeft size={16} /> غرف نوم نفر</Link></li>
                            <li><Link href="/kids-bedrooms" className="hover:text-white transition-colors flex items-center gap-2"><ChevronLeft size={16} /> غرف نوم أطفال</Link></li>
                            <li><Link href="/sofas" className="hover:text-white transition-colors flex items-center gap-2"><ChevronLeft size={16} /> كنب جاهز وتفصيل</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="font-bold text-lg mb-6 text-amber-500 border-b border-blue-900 pb-3">تواصل معنا</h3>
                        <ul className="space-y-4 text-sm text-blue-200">
                            <li className="flex items-start gap-3">
                                <MapPin size={20} className="text-amber-500 shrink-0" />
                                <span> الرياض العزيزيه حي المصانع</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={20} className="text-amber-500 shrink-0" />
                                <span dir="ltr">0539404559</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={20} className="text-amber-500 shrink-0" />
                                <span>ma7243193@gmail.com</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 text-center text-sm text-blue-300">
                <p>جميع الحقوق محفوظة © 2026 مؤسسة رؤية للأثاث.</p>
            </div>
        </footer>
    );
}