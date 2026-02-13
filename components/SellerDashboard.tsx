
import React, { useState } from 'react';
import { Package, Plus, Trash2, Edit3, DollarSign, BarChart3, Tag, Image as ImageIcon } from 'lucide-react';
import { Product, Currency } from '../types';
import { EXCHANGE_RATES, CURRENCY_SYMBOLS } from '../services/translationService';

interface SellerDashboardProps {
  sellerProducts: Product[];
  onAddProduct: (product: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  sellerCurrency: Currency;
}

const SellerDashboard: React.FC<SellerDashboardProps> = ({ 
  sellerProducts, onAddProduct, onDeleteProduct, sellerCurrency 
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    category: 'Electronics',
    image: 'https://picsum.photos/seed/new/600/600',
    stock: 10,
    tags: []
  });

  const [localPrice, setLocalPrice] = useState<string>('0');

  const handlePriceChange = (val: string) => {
    setLocalPrice(val);
    const numericVal = parseFloat(val) || 0;
    // Normalize to USD for internal storage
    const usdPrice = numericVal / EXCHANGE_RATES[sellerCurrency];
    setNewProduct({ ...newProduct, price: usdPrice });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddProduct(newProduct);
    setShowAddModal(false);
    setNewProduct({ name: '', description: '', price: 0, category: 'Electronics', stock: 10 });
    setLocalPrice('0');
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-800">Seller Studio</h1>
          <p className="text-slate-500">Manage your global inventory from Nepal</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200"
        >
          <Plus size={20} /> Add New Product
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl"><Package size={24}/></div>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Active Listings</p>
          </div>
          <h2 className="text-3xl font-black text-slate-800">{sellerProducts.length}</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl"><BarChart3 size={24}/></div>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Store Currency</p>
          </div>
          <h2 className="text-3xl font-black text-slate-800">{sellerCurrency} ({CURRENCY_SYMBOLS[sellerCurrency]})</h2>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl"><Tag size={24}/></div>
            <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Inventory Value</p>
          </div>
          <h2 className="text-3xl font-black text-slate-800">
            {CURRENCY_SYMBOLS[sellerCurrency]} {(sellerProducts.reduce((a, b) => a + b.price, 0) * EXCHANGE_RATES[sellerCurrency]).toFixed(2)}
          </h2>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-100">
            <tr>
              <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Product</th>
              <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Price ({sellerCurrency})</th>
              <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Stock</th>
              <th className="p-6 text-xs font-black uppercase text-slate-400 tracking-widest">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {sellerProducts.map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="p-6">
                  <div className="flex items-center gap-4">
                    <img src={p.image} className="w-12 h-12 rounded-lg object-cover" alt="" />
                    <div>
                      <p className="font-bold text-slate-800">{p.name}</p>
                      <p className="text-xs text-slate-400">{p.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-6 font-bold text-slate-900">
                  {CURRENCY_SYMBOLS[sellerCurrency]} {(p.price * EXCHANGE_RATES[sellerCurrency]).toFixed(2)}
                </td>
                <td className="p-6">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${p.stock > 5 ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                    {p.stock} units
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex gap-2">
                    <button className="p-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"><Edit3 size={18}/></button>
                    <button onClick={() => onDeleteProduct(p.id)} className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 size={18}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {sellerProducts.length === 0 && (
          <div className="p-20 text-center">
            <Package size={48} className="mx-auto text-slate-200 mb-4" />
            <p className="text-slate-400 font-bold">You haven't listed any products yet.</p>
          </div>
        )}
      </div>

      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-xl shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="p-8">
              <h2 className="text-2xl font-black text-slate-800 mb-6">List New Product</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">Product Name</label>
                    <input required className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} placeholder="e.g. Kathmandu Coffee" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase text-slate-400">Price ({sellerCurrency})</label>
                    <div className="relative">
                      <input required type="number" className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={localPrice} onChange={e => handlePriceChange(e.target.value)} />
                      <div className="absolute right-4 top-4 text-slate-300 font-bold">{CURRENCY_SYMBOLS[sellerCurrency]}</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400">Category</label>
                  <select className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                    <option>Electronics</option>
                    <option>Home & Kitchen</option>
                    <option>Food & Groceries</option>
                    <option>Fashion</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400">Image URL</label>
                  <input className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} placeholder="https://..." />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-black uppercase text-slate-400">Description</label>
                  <textarea required className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 h-24" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} placeholder="Describe your product..." />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="button" onClick={() => setShowAddModal(false)} className="flex-grow py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all">Cancel</button>
                  <button type="submit" className="flex-grow bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 shadow-lg transition-all">Publish Listing</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
