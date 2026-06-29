import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductService } from '../api';
import { Product } from '../types';
import { formatCurrency } from '../lib/utils';
import { useCartStore } from '../store/cartStore';
import { ArrowLeft, Plus, Minus } from 'lucide-react';
import { motion } from 'motion/react';

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore(state => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      try {
        const data = await ProductService.getProductById(id);
        if (data) setProduct(data);
      } catch (error) {
        console.error("Failed to fetch product", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-6 md:px-12 py-16 animate-pulse">
        <div className="flex flex-col md:flex-row gap-16">
          <div className="md:w-1/2 aspect-square bg-gray-100" />
          <div className="md:w-1/2 pt-8">
            <div className="h-10 bg-gray-100 w-3/4 mb-4" />
            <div className="h-6 bg-gray-100 w-1/4 mb-8" />
            <div className="h-32 bg-gray-100 w-full mb-8" />
            <div className="h-12 bg-gray-100 w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h2 className="text-2xl font-display font-semibold mb-4">Product not found</h2>
        <Link to="/products" className="text-gray-500 hover:text-black flex items-center justify-center">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to products
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product, quantity);
  };

  return (
    <div className="container mx-auto px-6 md:px-12 py-8 md:py-16">
      <Link to="/products" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-black mb-8 md:mb-16 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>

      <div className="flex flex-col md:flex-row gap-12 md:gap-24">
        {/* Product Image */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="md:w-1/2 relative bg-gray-50"
        >
          <div className="aspect-square w-full">
            <img 
              src={product.imageUrl} 
              alt={product.name}
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        {/* Product Info */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="md:w-1/2 flex flex-col justify-center"
        >
          <div className="mb-2 text-sm font-medium uppercase tracking-widest text-gray-500">
            {product.category}
          </div>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-2xl font-medium text-black mb-8">
            {formatCurrency(product.price)}
          </p>
          
          <div className="w-full h-px bg-gray-100 mb-8" />
          
          <p className="text-gray-600 leading-relaxed mb-12">
            {product.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex items-center justify-between border border-gray-200 px-4 py-3 sm:w-32">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="text-gray-400 hover:text-black transition-colors"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-medium text-sm">{quantity}</span>
              <button 
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="text-gray-400 hover:text-black transition-colors"
                disabled={quantity >= product.stock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            
            <button 
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className="flex-1 bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-black/90 transition-colors disabled:bg-gray-200 disabled:text-gray-400"
            >
              {product.stock === 0 ? 'OUT OF STOCK' : 'ADD TO CART'}
            </button>
          </div>
          
          <div className="text-sm text-gray-500">
            {product.stock > 0 && product.stock < 10 ? (
              <span className="text-amber-600">Only {product.stock} items left in stock.</span>
            ) : product.stock > 0 ? (
              <span>In stock and ready to ship.</span>
            ) : null}
          </div>
          
          <div className="mt-16 pt-8 border-t border-gray-100">
            <div className="grid grid-cols-2 gap-8 text-sm">
              <div>
                <strong className="block font-medium text-black mb-2">Free Shipping</strong>
                <span className="text-gray-500">On all orders over $200.</span>
              </div>
              <div>
                <strong className="block font-medium text-black mb-2">Free Returns</strong>
                <span className="text-gray-500">Within 30 days of delivery.</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
