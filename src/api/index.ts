import axios from 'axios';
import { Product, User, Order, Category } from '../types';

// Use an environment variable for the API URL when ready, 
// for now this is a placeholder URL structure.
const API_URL = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add interceptor for auth token when implemented
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// --- MOCK DATA FOR DEVELOPMENT ---
const mockProducts: Product[] = [
  { id: '1', name: 'Titanium Chronograph', description: 'Precision-milled titanium casing with a sapphire crystal face. Water-resistant to 100m. Powered by mechanical movement.', price: 1250, category: 'Watches', imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800', stock: 15, featured: true },
  { id: '2', name: 'Aero Backpack', description: 'Minimalist carry-on made from ballistic nylon. Features a dedicated laptop compartment and magnetic closures.', price: 245, category: 'Accessories', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800', stock: 50, featured: true },
  { id: '3', name: 'Neural Headphones', description: 'Active noise cancellation with high-fidelity spatial audio. Crafted from machined aluminum and memory foam.', price: 399, category: 'Audio', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800', stock: 32, featured: true },
  { id: '4', name: 'Monolith Desk', description: 'Standing desk engineered from a single piece of tempered glass and aircraft-grade aluminum legs.', price: 899, category: 'Furniture', imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&q=80&w=800', stock: 5 },
  { id: '5', name: 'Quantum Mechanical Keyboard', description: 'Low-profile tactile switches housed in a unibody aluminum frame. Programmable keys with subtle white backlighting.', price: 185, category: 'Electronics', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800', stock: 120 },
  { id: '6', name: 'Void Coffee Maker', description: 'Pour-over system designed with mathematical precision. Matte black ceramic and stainless steel filter.', price: 120, category: 'Home', imageUrl: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&q=80&w=800', stock: 45 },
];

const mockCategories: Category[] = [
  { id: 'c1', name: 'Watches', slug: 'watches', imageUrl: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&q=80&w=800' },
  { id: 'c2', name: 'Audio', slug: 'audio', imageUrl: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800' },
  { id: 'c3', name: 'Accessories', slug: 'accessories', imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800' },
  { id: 'c4', name: 'Electronics', slug: 'electronics', imageUrl: 'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=800' }
];

// --- API SERVICES ---

export const ProductService = {
  getProducts: async (): Promise<Product[]> => {
    // return (await api.get('/products')).data;
    return new Promise(resolve => setTimeout(() => resolve(mockProducts), 500));
  },
  getProductById: async (id: string): Promise<Product | undefined> => {
    // return (await api.get(`/products/${id}`)).data;
    return new Promise(resolve => setTimeout(() => resolve(mockProducts.find(p => p.id === id)), 300));
  },
  getFeaturedProducts: async (): Promise<Product[]> => {
    // return (await api.get('/products?featured=true')).data;
    return new Promise(resolve => setTimeout(() => resolve(mockProducts.filter(p => p.featured)), 400));
  },
  getCategories: async (): Promise<Category[]> => {
    // return (await api.get('/categories')).data;
    return new Promise(resolve => setTimeout(() => resolve(mockCategories), 300));
  }
};

export const AuthService = {
  login: async (email: string, password: string):Promise<{user: User, token: string}> => {
    // return (await api.post('/auth/login', { email, password })).data;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          resolve({
            user: { id: 'u1', email, firstName: 'Test', lastName: 'User', role: 'user' },
            token: 'mock-jwt-token'
          });
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  },
  // Add other auth methods (signup, profile) here
};

export const OrderService = {
  createOrder: async (orderData: Partial<Order>): Promise<Order> => {
     // return (await api.post('/orders', orderData)).data;
     return new Promise(resolve => setTimeout(() => resolve({
       id: `ord_${Math.floor(Math.random() * 10000)}`,
       ...orderData,
       status: 'pending',
       createdAt: new Date().toISOString()
     } as Order), 800));
  },
  getUserOrders: async (userId: string): Promise<Order[]> => {
    // return (await api.get(`/orders/user/${userId}`)).data;
    return new Promise(resolve => setTimeout(() => resolve([]), 500));
  }
};

export default api;
