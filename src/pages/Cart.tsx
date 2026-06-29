import { Link } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { formatCurrency } from '../lib/utils';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Cart() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();
  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-6 py-32 text-center max-w-lg">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-6">Your Cart is Empty</h1>
        <p className="text-gray-500 mb-10">You haven't added any items to your cart yet. Discover our premium collection.</p>
        <Link 
          to="/products"
          className="inline-block bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-black/90 transition-colors"
        >
          CONTINUE SHOPPING
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight mb-12">Shopping Cart</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3">
          <div className="hidden md:grid grid-cols-12 gap-4 border-b border-gray-100 pb-4 mb-6 text-sm font-medium uppercase tracking-widest text-gray-400">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-3 text-right">Total</div>
          </div>
          
          <div className="space-y-8">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
                >
                  <div className="md:col-span-6 flex gap-6 items-center relative">
                    <button 
                      onClick={() => removeItem(item.product.id)}
                      className="absolute -top-2 -left-2 md:static p-2 text-gray-400 hover:text-black transition-colors bg-white md:bg-transparent"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Link to={`/products/${item.product.id}`} className="block w-24 h-24 bg-gray-50 shrink-0">
                      <img 
                        src={item.product.imageUrl} 
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                    <div>
                      <Link to={`/products/${item.product.id}`} className="font-medium text-black hover:underline underline-offset-4">
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">{formatCurrency(item.product.price)}</p>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 flex justify-start md:justify-center">
                    <div className="flex items-center justify-between border border-gray-200 px-3 py-2 w-28">
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="text-gray-400 hover:text-black transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-sm">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="text-gray-400 hover:text-black transition-colors"
                        disabled={item.quantity >= item.product.stock}
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="md:col-span-3 text-left md:text-right font-medium">
                    {formatCurrency(item.product.price * item.quantity)}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8">
            <h3 className="font-display text-xl font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4 text-sm border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : formatCurrency(shipping)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-end mb-8">
              <span className="font-medium">Total</span>
              <span className="font-display text-2xl font-semibold">{formatCurrency(total)}</span>
            </div>
            
            <Link 
              to="/checkout"
              className="w-full flex items-center justify-center bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-black/90 transition-colors group"
            >
              PROCEED TO CHECKOUT
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
