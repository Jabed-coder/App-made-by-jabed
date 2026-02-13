
import React, { useState } from 'react';
import { ShoppingCart, Search, User, Heart, LayoutDashboard, Globe, DollarSign } from 'lucide-react';
import { View, UserRole, User as UserType, Currency, Language } from '../types';
import { t } from '../services/translationService';

interface NavbarProps {
  onViewChange: (view: View) => void;
  cartCount: number;
  wishlistCount: number;
  user: UserType | null;
  onSearch: (query: string) => void;
  onCurrencyChange: (curr: Currency) => void;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  onViewChange, cartCount, wishlistCount, user, onSearch, onCurrencyChange, onLanguageChange 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const lang = user?.preferences.language || 'en';

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <div className="flex items-center cursor-pointer group shrink-0" onClick={() => onViewChange('HOME')}>
            <div className="w-9 h-9 bg-indigo-500 rounded-lg flex items-center justify-center mr-2">
              <span className="text-xl font-bold">N</span>
            </div>
            <span className="text-xl font-bold tracking-tight hidden md:block">NexusCart</span>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); onSearch(searchQuery); }} className="flex-grow max-w-xl relative">
            <input
              type="text"
              placeholder={t('search', lang)}
              className="w-full bg-slate-800 text-slate-100 rounded-full py-2 pl-4 pr-10 focus:outline-none border border-slate-700 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="absolute right-3 top-2 text-slate-400 hover:text-white"><Search size={18} /></button>
          </form>

          <div className="flex items-center gap-4">
            {/* Global Settings */}
            <div className="hidden lg:flex items-center gap-2 border-r border-slate-700 pr-4">
              <select 
                onChange={(e) => onLanguageChange(e.target.value as Language)}
                value={user?.preferences.language || 'en'}
                className="bg-transparent text-xs font-bold uppercase focus:outline-none cursor-pointer hover:text-indigo-400"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
                <option value="fr">FR</option>
                <option value="hi">HI</option>
              </select>
              <select 
                onChange={(e) => onCurrencyChange(e.target.value as Currency)}
                value={user?.preferences.currency || 'USD'}
                className="bg-transparent text-xs font-bold uppercase focus:outline-none cursor-pointer hover:text-indigo-400"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="INR">INR</option>
              </select>
            </div>

            <button onClick={() => onViewChange('WISHLIST')} className="relative p-2 text-slate-300 hover:text-white">
              <Heart size={20} />
              {wishlistCount > 0 && <span className="absolute top-0 right-0 bg-rose-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{wishlistCount}</span>}
            </button>

            <button onClick={() => onViewChange('CART')} className="relative p-2 text-slate-300 hover:text-white">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-indigo-500 text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cartCount}</span>}
            </button>

            <button onClick={() => onViewChange('PROFILE')} className="flex items-center gap-2 p-1 rounded-lg hover:bg-slate-800 transition-colors">
              <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
                <img src={user?.avatar || "https://picsum.photos/seed/guest/100/100"} alt="User" />
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-[10px] text-slate-400 font-bold uppercase">{user ? user.name.split(' ')[0] : 'Guest'}</p>
                <p className="text-xs font-semibold">{t('profile', lang)}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
