import { Link } from 'react-router-dom';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { motion } from 'motion/react';

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/products/${product.id}`} className="group block">
      <div className="relative aspect-square overflow-hidden bg-gray-50 mb-6">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        {product.stock < 10 && product.stock > 0 && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-4 left-4 bg-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white">
            Sold Out
          </div>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </div>
      
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-display font-medium text-lg text-black mb-1">{product.name}</h3>
          <p className="text-sm text-gray-500">{product.category}</p>
        </div>
        <p className="font-medium text-black">{formatCurrency(product.price)}</p>
      </div>
    </Link>
  );
}
