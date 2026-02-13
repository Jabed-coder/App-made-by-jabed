
import { Language } from '../types';

const translations: Record<Language, Record<string, string>> = {
  en: {
    welcome: "Welcome to NexusCart",
    search: "Search products...",
    cart: "Cart",
    wishlist: "Wishlist",
    checkout: "Checkout",
    best_sellers: "Best Sellers",
    categories: "Categories",
    add_to_cart: "Add to Cart",
    buy_now: "Buy Now",
    orders: "My Orders",
    profile: "Profile"
  },
  es: {
    welcome: "Bienvenido a NexusCart",
    search: "Buscar productos...",
    cart: "Carrito",
    wishlist: "Favoritos",
    checkout: "Pagar",
    best_sellers: "Más Vendidos",
    categories: "Categorías",
    add_to_cart: "Añadir al Carrito",
    buy_now: "Comprar Ahora",
    orders: "Mis Pedidos",
    profile: "Perfil"
  },
  fr: {
    welcome: "Bienvenue sur NexusCart",
    search: "Rechercher...",
    cart: "Panier",
    wishlist: "Liste de souhaits",
    checkout: "Paiement",
    best_sellers: "Meilleures ventes",
    categories: "Categories",
    add_to_cart: "Ajouter au panier",
    buy_now: "Acheter maintenant",
    orders: "Mes commandes",
    profile: "Profil"
  },
  hi: {
    welcome: "नेक्ससकार्ट में आपका स्वागत है",
    search: "उत्पाद खोजें...",
    cart: "कार्ट",
    wishlist: "इच्छा सूची",
    checkout: "चेकआउट",
    best_sellers: "बेस्ट सेलर्स",
    categories: "श्रेणियाँ",
    add_to_cart: "कार्ट में जोड़ें",
    buy_now: "अभी खरीदें",
    orders: "मेरे ऑर्डर",
    profile: "प्रोफ़ाइल"
  }
};

export const t = (key: string, lang: Language): string => {
  return translations[lang]?.[key] || key;
};

export const CURRENCY_SYMBOLS: Record<string, string> = {
  USD: '$', EUR: '€', GBP: '£', INR: '₹', NPR: 'रू'
};

export const EXCHANGE_RATES: Record<string, number> = {
  USD: 1, EUR: 0.92, GBP: 0.79, INR: 83.0, NPR: 133.5
};
