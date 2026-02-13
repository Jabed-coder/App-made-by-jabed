
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { View, User, UserRole, Product, CartItem, Order, Language, Currency } from './types';
import { MOCK_PRODUCTS, CATEGORIES } from './constants';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import AdminDashboard from './components/AdminDashboard';
import SellerDashboard from './components/SellerDashboard';
import { getSmartRecommendations, getProductSummary } from './services/geminiService';
import { t, CURRENCY_SYMBOLS, EXCHANGE_RATES } from './services/translationService';
import { Star, ChevronRight, ShoppingCart, Trash2, Plus, Minus, CreditCard, CheckCircle, Package, Heart, Sparkles, Filter, SlidersHorizontal, ArrowLeft, Search, LayoutDashboard, Globe, ShieldCheck, Store } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('HOME');
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('nexus_user');
    return saved ? JSON.parse(saved) : {
      id: 'u_seller_1',
      name: 'Binod Nepal',
      email: 'binod@nepal.com',
      role: UserRole.SELLER, // Defaulting to SELLER for the demonstration
      avatar: 'https://picsum.photos/seed/nepalseller/100/100',
      preferences: { currency: 'NPR', language: 'en' }
    };
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexus_products');
    return saved ? JSON.parse(saved) : MOCK_PRODUCTS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('nexus_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('nexus_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('nexus_orders');
    return saved ? JSON.parse(saved) : [];
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [aiSummary, setAiSummary] = useState('');

  // Persistances
  useEffect(() => localStorage.setItem('nexus_user', JSON.stringify(user)), [user]);
  useEffect(() => localStorage.setItem('nexus_cart', JSON.stringify(cart)), [cart]);
  useEffect(() => localStorage.setItem('nexus_wishlist', JSON.stringify(wishlist)), [wishlist]);
  useEffect(() => localStorage.setItem('nexus_orders', JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem('nexus_products', JSON.stringify(products)), [products]);

  const updatePreferences = (currency: Currency, language: Language) => {
    setUser(prev => prev ? { ...prev, preferences: { currency, language } } : null);
  };

  const formatPrice = (priceUSD: number) => {
    const curr = user?.preferences.currency || 'USD';
    const rate = EXCHANGE_RATES[curr];
    return `${CURRENCY_SYMBOLS[curr]} ${(priceUSD * rate).toFixed(2)}`;
  };

  const addToCart = useCallback((product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) return prev.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...prev, { product, quantity: 1 }];
    });
  }, []);

  const handleAddProduct = (p: Partial<Product>) => {
    const newP: Product = {
      id: `prod_${Date.now()}`,
      name: p.name || 'Untitled',
      description: p.description || '',
      price: p.price || 0,
      category: p.category || 'General',
      rating: 5,
      reviewsCount: 0,
      image: p.image || 'https://picsum.photos/seed/new/600/600',
      sellerId: user?.id || 'anonymous',
      stock: p.stock || 0,
      tags: p.tags || []
    };
    setProducts([newP, ...products]);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const toggleWishlist = (product: Product) => {
    setWishlist(prev => prev.some(p => p.id === product.id) ? prev.filter(p => p.id !== product.id) : [...prev, product]);
  };

  useEffect(() => {
    const fetchRecs = async () => {
      const recs = await getSmartRecommendations(searchQuery || 'trending technology', products);
      setRecommendations(recs);
    };
    fetchRecs();
  }, [searchQuery, products]);

  useEffect(() => {
    if (selectedProduct && currentView === 'PRODUCT_DETAIL') {
      getProductSummary(selectedProduct).then(setAiSummary);
    }
  }, [selectedProduct, currentView]);

  const lang = user?.preferences.language || 'en';
  const myProducts = products.filter(p => p.sellerId === user?.id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar 
        onViewChange={setCurrentView} 
        cartCount={cart.length} wishlistCount={wishlist.length} 
        user={user} onSearch={setSearchQuery} 
        onCurrencyChange={(c) => updatePreferences(c, user?.preferences.language || 'en')}
        onLanguageChange={(l) => updatePreferences(user?.preferences.currency || 'USD', l)}
      />
      
      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        {user?.role === UserRole.SELLER && currentView === 'HOME' && (
          <div className="mb-8 p-4 bg-indigo-600 rounded-2xl text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <Store size={24} />
              <div>
                <p className="font-bold">Welcome back, Seller!</p>
                <p className="text-xs text-indigo-100 uppercase font-bold tracking-widest">You have {myProducts.length} live listings</p>
              </div>
            </div>
            <button onClick={() => setCurrentView('SELLER')} className="bg-white text-indigo-600 px-6 py-2 rounded-xl font-bold text-sm shadow-lg hover:bg-slate-50 transition-all">Manage Store</button>
          </div>
        )}

        {currentView === 'HOME' && (
          <div className="space-y-12 pb-20">
            <section className="relative h-[300px] md:h-[400px] rounded-3xl overflow-hidden shadow-2xl bg-indigo-900 group">
              <img src="https://picsum.photos/seed/world/1200/600" className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000" alt="Hero" />
              <div className="absolute inset-0 flex flex-col justify-center px-12 text-white">
                <span className="bg-indigo-500 w-fit px-4 py-1 rounded-full text-[10px] font-black uppercase mb-4 tracking-widest animate-pulse">Global Shipping Enabled</span>
                <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight max-w-3xl">Shop the World from Your Pocket</h1>
                <p className="text-lg text-indigo-100 mb-8 max-w-xl">Support local sellers globally. Now accepting {user?.preferences.currency} in Nepal.</p>
                <button onClick={() => setCurrentView('SEARCH')} className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold hover:shadow-xl hover:translate-y-[-2px] transition-all w-fit">Explore Global Catalog</button>
              </div>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl"><Sparkles size={24} /></div>
                <h2 className="text-2xl font-bold text-slate-800">Smart Picks (Local Context)</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {recommendations.slice(0, 3).map(p => (
                  <ProductCard 
                    key={p.id} product={p} 
                    onAddToCart={addToCart} onToggleWishlist={toggleWishlist}
                    isWishlisted={wishlist.some(w => w.id === p.id)}
                    onClick={(p) => { setSelectedProduct(p); setCurrentView('PRODUCT_DETAIL'); }}
                  />
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-800">Fresh Worldwide Listings</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {products.map(p => (
                  <div key={p.id} className="relative">
                    <ProductCard 
                      product={p} onAddToCart={addToCart} onToggleWishlist={toggleWishlist}
                      isWishlisted={wishlist.some(w => w.id === p.id)}
                      onClick={(p) => { setSelectedProduct(p); setCurrentView('PRODUCT_DETAIL'); }}
                    />
                    <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded text-[10px] font-black text-indigo-600 shadow-sm border border-indigo-50">
                      {formatPrice(p.price)}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {currentView === 'SELLER' && (
          <SellerDashboard 
            sellerProducts={myProducts} 
            onAddProduct={handleAddProduct}
            onDeleteProduct={handleDeleteProduct}
            sellerCurrency={user?.preferences.currency || 'USD'}
          />
        )}

        {currentView === 'PROFILE' && (
           <div className="max-w-4xl mx-auto pb-20">
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 mb-8 flex items-center gap-6">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-indigo-50">
                <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-slate-800">{user?.name}</h1>
                <p className="text-slate-500">{user?.email}</p>
                <div className="flex gap-2 mt-2">
                  <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">{user?.role}</span>
                  <span className="bg-slate-50 text-slate-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-tighter">{user?.preferences.currency}</span>
                </div>
              </div>
              <div className="ml-auto">
                {user?.role === UserRole.SELLER && (
                  <button onClick={() => setCurrentView('SELLER')} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2">
                    <Store size={18} /> Store Panel
                  </button>
                )}
              </div>
            </div>
            {/* Orders section as before */}
          </div>
        )}

        {currentView === 'PRODUCT_DETAIL' && selectedProduct && (
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100 flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2 aspect-square rounded-2xl overflow-hidden shadow-inner">
               <img src={selectedProduct.image} className="w-full h-full object-cover" alt={selectedProduct.name} />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <div className="bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full text-[10px] font-black w-fit uppercase">{selectedProduct.category}</div>
              <h1 className="text-4xl font-black text-slate-800">{selectedProduct.name}</h1>
              <p className="text-3xl font-black text-indigo-600">{formatPrice(selectedProduct.price)}</p>
              <div className="p-4 bg-slate-50 rounded-2xl italic text-slate-600 border border-slate-100">
                 <div className="flex items-center gap-2 mb-2 not-italic"><Sparkles size={14} className="text-indigo-600"/> <span className="text-[10px] font-black uppercase text-indigo-600">AI Concierge Summary</span></div>
                 "{aiSummary || 'Translating product insights...'}"
              </div>
              <p className="text-slate-600 leading-relaxed">{selectedProduct.description}</p>
              <div className="flex gap-4 pt-4">
                <button onClick={() => addToCart(selectedProduct)} className="flex-grow bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"><ShoppingCart size={20}/> {t('add_to_cart', lang)}</button>
                <button onClick={() => toggleWishlist(selectedProduct)} className="p-4 border border-slate-200 rounded-xl"><Heart size={20} fill={wishlist.some(p => p.id === selectedProduct.id) ? 'currentColor' : 'none'} /></button>
              </div>
            </div>
          </div>
        )}

        {currentView === 'CART' && (
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-black mb-8">Global Cart</h1>
            {cart.length === 0 ? <p className="text-center py-20 text-slate-400 font-bold">Your cart is empty.</p> : (
              <div className="space-y-4">
                {cart.map(item => (
                  <div key={item.product.id} className="bg-white p-4 rounded-2xl flex items-center gap-4 shadow-sm">
                    <img src={item.product.image} className="w-20 h-20 object-cover rounded-xl" alt={item.product.name} />
                    <div className="flex-grow">
                      <h4 className="font-bold">{item.product.name}</h4>
                      