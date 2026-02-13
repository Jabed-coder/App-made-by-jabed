
import React from 'react';
import { Product, UserRole } from './types';

export const CATEGORIES = [
  "Electronics", "Fashion", "Home & Kitchen", "Beauty", "Books", "Toys", "Automotive"
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Nebula Pro Headphones',
    description: 'High-fidelity noise canceling wireless headphones with 40-hour battery life.',
    price: 299.99,
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: 1240,
    image: 'https://picsum.photos/seed/headphone/600/600',
    sellerId: 's1',
    stock: 50,
    tags: ['wireless', 'audio', 'premium']
  },
  {
    id: '2',
    name: 'Zenith Smart Watch',
    description: 'Track your health and stay connected with the most advanced wearable.',
    price: 199.50,
    category: 'Electronics',
    rating: 4.5,
    reviewsCount: 850,
    image: 'https://picsum.photos/seed/watch/600/600',
    sellerId: 's1',
    stock: 25,
    tags: ['fitness', 'wearable', 'smart']
  },
  {
    id: '3',
    name: 'Artisan Coffee Maker',
    description: 'Professional grade pour-over style coffee maker for your kitchen.',
    price: 89.00,
    category: 'Home & Kitchen',
    rating: 4.7,
    reviewsCount: 420,
    image: 'https://picsum.photos/seed/coffee/600/600',
    sellerId: 's2',
    stock: 12,
    tags: ['coffee', 'kitchen', 'artisan']
  },
  {
    id: '4',
    name: 'Eco-Friendly Yoga Mat',
    description: 'Natural rubber mat for superior grip and environmental sustainability.',
    price: 45.00,
    category: 'Fashion',
    rating: 4.9,
    reviewsCount: 2100,
    image: 'https://picsum.photos/seed/yoga/600/600',
    sellerId: 's3',
    stock: 100,
    tags: ['fitness', 'eco-friendly', 'yoga']
  },
  {
    id: '5',
    name: 'Lumina Desk Lamp',
    description: 'Adjustable LED desk lamp with wireless charging base.',
    price: 59.99,
    category: 'Home & Kitchen',
    rating: 4.4,
    reviewsCount: 150,
    image: 'https://picsum.photos/seed/lamp/600/600',
    sellerId: 's2',
    stock: 30,
    tags: ['home', 'office', 'led']
  }
];
