
export enum UserRole {
  USER = 'USER',
  SELLER = 'SELLER',
  ADMIN = 'ADMIN'
}

export type Currency = 'USD' | 'EUR' | 'GBP' | 'INR' | 'NPR';
export type Language = 'en' | 'es' | 'fr' | 'hi';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  preferences: {
    currency: Currency;
    language: Language;
  };
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number; // Base price in USD
  category: string;
  rating: number;
  reviewsCount: number;
  image: string;
  sellerId: string;
  stock: number;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  currency: Currency;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  shippingAddress: string;
}

export type View = 'HOME' | 'SEARCH' | 'PRODUCT_DETAIL' | 'CART' | 'CHECKOUT' | 'PROFILE' | 'ADMIN' | 'SELLER' | 'WISHLIST' | 'AUTH';
