'use client'
import { useState, useEffect } from 'react';
import { LayoutDashboard, Package, PlusCircle, Trash2, X, LogOut, Lock } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { Product, Category } from '@/types';

export default function AdminDashboard() {
    const [view, setView] = useState<'list' | 'add'>('list');
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [imageFile, setImageFile] = useState<File | null>(null);

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category_id: '',
        description: '',
        wood_type: '',
        pieces: '',
    });

    const [session, setSession] = useState<any>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            setAuthLoading(false);
            if (session) {
                fetchProducts();
                fetchCategories();
            }
        });

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                fetchProducts();
                fetchCategories();
            }
        });

        return () => subscription.unsubscribe();
    }, []);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setAuthLoading(true);
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });
        if (error) {
            alert('البريد الإلكتروني أو كلمة المرور غير صحيحة!');
        }
        setAuthLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
    };

    const fetchProducts = async () => {
        const { data } = await supabase
            .from('products')
            .select('*, category:categories(name), images:product_images(*)')
        setProducts(data || []);
        setLoading(false);
    };

    const fetchCategories = async () => {
        const { data } = await supabase.from('categories').select('*');
        setCategories(data || []);
    };

    const handleDelete = async (id: number) => {
        if (confirm('هل أنت متأكد من حذف هذا المنتج؟')) {
            await supabase.from('products').delete().eq('id', id);
            fetchProducts();
        }
    };

    const handleAddProduct = async (e: React.FormEvent) => {
        e.preventDefault();

        let image_url = '';

        if (imageFile) {
            const fileName = `${Date.now()}-${imageFile.name}`;
            const { data, error: uploadError } = await supabase.storage
                .from('product-images')
                .upload(fileName, imageFile);

            if (uploadError) {
                console.error("Upload Error:", uploadError);
                alert(`فشل رفع الصورة! تأكد من إعدادات الـ Storage Policy في Supabase. الخطأ: ${uploadError.message}`);
                setAuthLoading(false);
                return; // Stop the product insertion
            }

            if (data) {
                const { data: urlData } = supabase.storage
                    .from('product-images')
                    .getPublicUrl(fileName);
                image_url = urlData.publicUrl;
            }
        }

        const { data: product } = await supabase
            .from('products')
            .insert({
                name: newProduct.name,
                price: Number(newProduct.price),
                category_id: Number(newProduct.category_id),
                description: newProduct.description,
                wood_type: newProduct.wood_type,
                pieces: Number(newProduct.pieces),
            })
            .select()
            .single();

        if (product && image_url) {
            await supabase.from('product_images').insert({
                product_id: product.id,
                image_url,
                is_main: true,
            });
        }

        alert('تم إضافة المنتج بنجاح! ✅');
        setNewProduct({ name: '', price: '', category_id: '', description: '', wood_type: '', pieces: '' });
        setImageFile(null);
        setView('list');
        fetchProducts();
    };

    if (authLoading) {
        return <div className="min-h-screen bg-gray-50 flex items-center justify-center text-blue-950 font-bold text-xl">جاري التحميل...</div>;
    }

    if (!session) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 text-blue-950">
                        <Lock size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-blue-950 mb-2">لوحة التحكم</h1>
                    <p className="text-gray-500 mb-8">الرجاء تسجيل الدخول للمتابعة</p>

                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <input 
                                type="email" 
                                required 
                                placeholder="البريد الإلكتروني"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                className="w-full border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-amber-500 outline-none text-right" 
                            />
                        </div>
                        <div>
                            <input 
                                type="password" 
                                required 
                                placeholder="كلمة المرور"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                className="w-full border border-gray-200 rounded-xl px-4 py-4 focus:ring-2 focus:ring-amber-500 outline-none text-right" 
                            />
                        </div>
                        <button 
                            type="submit" 
                            disabled={authLoading}
                            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 rounded-xl transition-colors shadow-lg shadow-amber-500/30"
                        >
                            تسجيل الدخول
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row" dir="rtl">
            <aside className="w-full md:w-64 bg-blue-950 text-white flex-shrink-0 flex flex-col min-h-screen">
                <div className="p-6 border-b border-blue-900">
                    <h2 className="text-xl font-bold flex items-center gap-2"><LayoutDashboard className="text-amber-500" /> لوحة التحكم</h2>
                </div>
                <nav className="p-4 space-y-2 flex-grow">
                    <button onClick={() => setView('list')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'list' ? 'bg-amber-500 text-white' : 'hover:bg-blue-900 text-blue-200'}`}><Package size={20} /> إدارة المنتجات</button>
                    <button onClick={() => setView('add')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${view === 'add' ? 'bg-amber-500 text-white' : 'hover:bg-blue-900 text-blue-200'}`}><PlusCircle size={20} /> إضافة منتج جديد</button>
                </nav>
                <div className="p-4 border-t border-blue-900">
                    <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                        <LogOut size={20} /> تسجيل الخروج
                    </button>
                </div>
            </aside>

            <main className="flex-grow p-6 md:p-10">
                {view === 'list' && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-50">
                            <h2 className="text-xl font-bold text-blue-950">المنتجات الحالية ({products.length})</h2>
                        </div>
                        {loading ? (
                            <div className="p-10 text-center text-gray-400">جاري التحميل...</div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-right">
                                    <thead className="bg-gray-50 text-gray-600 text-sm font-bold">
                                        <tr>
                                            <th className="px-6 py-4">اسم المنتج</th>
                                            <th className="px-6 py-4">القسم</th>
                                            <th className="px-6 py-4">السعر</th>
                                            <th className="px-6 py-4">نوع الخشب</th>
                                            <th className="px-6 py-4">عدد القطع</th>
                                            <th className="px-6 py-4">حذف</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100">
                                        {products.map((p) => (
                                            <tr key={p.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 font-bold text-blue-950">
                                                    <div className="flex items-center gap-3">
                                                        {p.images?.[0] && <img src={p.images[0].image_url} alt={p.name} className="w-10 h-10 rounded object-cover bg-gray-100" />}
                                                        <span className="line-clamp-1">{p.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-gray-500 text-sm">{p.category?.name}</td>
                                                <td className="px-6 py-4 text-amber-600 font-bold">{p.price?.toLocaleString()} ر.س</td>
                                                <td className="px-6 py-4 text-gray-500">{p.wood_type}</td>
                                                <td className="px-6 py-4 text-gray-500">{p.pieces}</td>
                                                <td className="px-6 py-4">
                                                    <button onClick={() => handleDelete(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18} /></button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {view === 'add' && (
                    <div className="max-w-2xl bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-6 bg-blue-950 text-white flex justify-between items-center">
                            <h2 className="text-xl font-bold">إضافة منتج جديد</h2>
                            <X className="cursor-pointer" onClick={() => setView('list')} />
                        </div>
                        <form className="p-8 space-y-6" onSubmit={handleAddProduct}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="col-span-2">
                                    <label className="block text-gray-700 font-bold mb-2">اسم المنتج</label>
                                    <input type="text" required value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-gray-700 font-bold mb-2">وصف المنتج</label>
                                    <textarea rows={3} value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none resize-none" />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">القسم</label>
                                    <select required value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none bg-white">
                                        <option value="">اختر القسم</option>
                                        {categories.map((cat) => (
                                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">السعر (ر.س)</label>
                                    <input type="number" required min="1" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none" />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">نوع الخشب</label>
                                    <input type="text" value={newProduct.wood_type} onChange={(e) => setNewProduct({ ...newProduct, wood_type: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none" placeholder="مثال: تايلاندي، MDF" />
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-bold mb-2">عدد القطع</label>
                                    <input type="number" min="1" value={newProduct.pieces} onChange={(e) => setNewProduct({ ...newProduct, pieces: e.target.value })} className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:ring-2 focus:ring-amber-500 outline-none" />
                                </div>

                                <div className="col-span-2">
                                    <label className="block text-gray-700 font-bold mb-2">صورة المنتج</label>
                                    <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files?.[0] || null)} className="w-full border border-gray-200 rounded-xl px-4 py-3 outline-none" />
                                </div>
                            </div>
                            <button type="submit" className="w-full bg-amber-500 text-white font-bold py-4 rounded-xl hover:bg-amber-600 transition-colors">حفظ وإضافة المنتج</button>
                        </form>
                    </div>
                )}
            </main>
        </div>
    );
}