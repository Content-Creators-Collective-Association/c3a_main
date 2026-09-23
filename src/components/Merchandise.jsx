import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ShoppingCart, Heart, Shirt, ShoppingBag, Star, TrendingUp } from 'lucide-react';

const CATEGORIES = ['All', 'Apparel', 'Accessories', 'Limited Edition', 'Digital'];

const MOCK_PRODUCTS = [
    {
        id: 1,
        name: 'C3A Pro Creator Hoodie',
        category: 'Apparel',
        price: '₹1,499',
        rating: 4.9,
        reviews: 128,
        badge: 'Bestseller',
        icon: <Shirt size={64} className="text-saffron" />
    },
    {
        id: 2,
        name: 'Vlogger Essentials Backpack',
        category: 'Accessories',
        price: '₹2,999',
        rating: 4.8,
        reviews: 84,
        badge: 'New',
        icon: <ShoppingBag size={64} className="text-india-green" />
    },
    {
        id: 3,
        name: 'Classic C3A Logo Tee',
        category: 'Apparel',
        price: '₹999',
        rating: 4.7,
        reviews: 256,
        badge: null,
        icon: <Shirt size={64} className="text-blue-600" />
    },
    {
        id: 4,
        name: 'Creator "On-Air" Neon Sign',
        category: 'Accessories',
        price: '₹1,299',
        rating: 4.9,
        reviews: 42,
        badge: 'Limited Edition',
        icon: <Star size={64} className="text-amber-500" />
    },
    {
        id: 5,
        name: 'Exclusive Preset Pack 2026',
        category: 'Digital',
        price: '₹499',
        rating: 5.0,
        reviews: 310,
        badge: 'Digital Download',
        icon: <TrendingUp size={64} className="text-purple-600" />
    },
    {
        id: 6,
        name: 'Studio Coffee Mug',
        category: 'Accessories',
        price: '₹399',
        rating: 4.6,
        reviews: 112,
        badge: null,
        icon: <ShoppingBag size={64} className="text-rose-500" />
    }
];

export default function Merchandise() {
    const { t } = useLanguage();
    const [activeCategory, setActiveCategory] = useState('All');
    
    const filteredProducts = activeCategory === 'All' 
        ? MOCK_PRODUCTS 
        : MOCK_PRODUCTS.filter(p => p.category === activeCategory || p.badge === activeCategory);

    return (
        <div className="min-h-screen bg-sand">
            {/* Hero Section */}
            <section className="relative pt-24 pb-20 overflow-hidden bg-charcoal text-white">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-saffron via-charcoal to-charcoal"></div>
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <span className="inline-flex items-center gap-2 py-1.5 px-4 rounded-full bg-white/10 text-saffron text-xs font-bold tracking-widest uppercase mb-6 border border-saffron/20">
                        Official Store
                    </span>
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                        {t('membership.merchandise') || 'Creator Merch'}
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed">
                        {t('membership.merchandiseDesc') || 'Gear up with the official C3A collection. Designed exclusively for creators who want to stand out.'}
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-16 px-6">
                
                {/* Categories */}
                <div className="flex flex-wrap items-center justify-center gap-3 mb-16">
                    {CATEGORIES.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all ${
                                activeCategory === category 
                                    ? 'bg-saffron text-white shadow-lg shadow-saffron/30' 
                                    : 'bg-white text-charcoal/70 hover:bg-charcoal/5 border border-charcoal/10'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredProducts.map(product => (
                        <div key={product.id} className="group bg-white rounded-3xl border border-charcoal/10 overflow-hidden hover:shadow-2xl hover:shadow-charcoal/5 transition-all duration-300 transform hover:-translate-y-2">
                            
                            {/* Image Placeholder area */}
                            <div className="relative aspect-square bg-gradient-to-br from-charcoal/5 to-charcoal/10 flex items-center justify-center p-8 overflow-hidden">
                                {product.badge && (
                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={`text-xs font-bold px-3 py-1.5 rounded-full text-white ${
                                            product.badge === 'Bestseller' ? 'bg-amber-500' :
                                            product.badge === 'New' ? 'bg-india-green' : 'bg-saffron'
                                        }`}>
                                            {product.badge}
                                        </span>
                                    </div>
                                )}
                                <button className="absolute top-4 right-4 z-10 p-2 bg-white/50 hover:bg-white rounded-full text-charcoal/40 hover:text-rose-500 transition-colors backdrop-blur-sm">
                                    <Heart size={20} />
                                </button>
                                
                                <div className="transform group-hover:scale-110 transition-transform duration-500">
                                    {product.icon}
                                </div>
                            </div>

                            {/* Product Details */}
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-xs font-bold text-charcoal/40 uppercase tracking-widest mb-1">{product.category}</p>
                                        <h3 className="text-xl font-extrabold text-charcoal group-hover:text-saffron transition-colors">{product.name}</h3>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-1 mb-6">
                                    <Star size={16} className="text-amber-400 fill-amber-400" />
                                    <span className="text-sm font-bold text-charcoal/80">{product.rating}</span>
                                    <span className="text-sm text-charcoal/40">({product.reviews})</span>
                                </div>

                                <div className="flex items-center justify-between pt-4 border-t border-charcoal/10">
                                    <span className="text-2xl font-extrabold text-charcoal">{product.price}</span>
                                    <button 
                                        onClick={() => alert('Checkout flow coming soon!')}
                                        className="flex items-center gap-2 bg-charcoal text-white px-5 py-2.5 rounded-xl font-bold hover:bg-saffron transition-colors"
                                    >
                                        <ShoppingCart size={18} />
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                
                {filteredProducts.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-charcoal/50 font-semibold text-lg">No products found in this category.</p>
                        <button onClick={() => setActiveCategory('All')} className="mt-4 text-saffron font-bold hover:underline">View all merchandise</button>
                    </div>
                )}

                <div className="mt-20 text-center">
                    <p className="text-sm text-charcoal/50 font-bold uppercase tracking-widest">
                        {t('membership.dropsAnnouncedSoon') || 'More drops coming soon. Stay tuned!'}
                    </p>
                </div>
            </main>
        </div>
    );
}
