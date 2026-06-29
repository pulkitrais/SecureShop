import { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { OrderService } from '../api';
import { formatCurrency } from '../lib/utils';
import { Check } from 'lucide-react';
import { motion } from 'motion/react';

export function Checkout() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 200 ? 0 : 15;
  const total = subtotal + shipping;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    try {
      await OrderService.createOrder({
        userId: user?.id || 'guest',
        items,
        total
      });
      setIsSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/orders'); // Or some success page
      }, 3000);
    } catch (error) {
      console.error("Checkout failed", error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !isSuccess) {
    navigate('/cart');
    return null;
  }

  if (isSuccess) {
    return (
      <div className="container mx-auto px-6 py-32 text-center max-w-lg">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8"
        >
          <Check className="w-10 h-10" />
        </motion.div>
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-4">Order Confirmed</h1>
        <p className="text-gray-500 mb-8">Thank you for your purchase. Your order is being processed.</p>
        <p className="text-sm text-gray-400">Redirecting to your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-16">
      <h1 className="font-display text-4xl font-semibold tracking-tight mb-12">Checkout</h1>
      
      <div className="flex flex-col lg:flex-row gap-16">
        <div className="lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-12">
            
            {/* Shipping Details */}
            <section>
              <h2 className="font-display text-2xl font-semibold mb-6 pb-2 border-b border-gray-100">Shipping Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Address</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">City</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Postal Code</label>
                  <input type="text" required className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
              </div>
            </section>
            
            {/* Payment Details */}
             <section>
              <h2 className="font-display text-2xl font-semibold mb-6 pb-2 border-b border-gray-100">Payment Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-medium text-gray-700">Card Number</label>
                  <input type="text" required placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
                 <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">Expiry Date</label>
                  <input type="text" required placeholder="MM/YY" className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">CVC</label>
                  <input type="text" required placeholder="123" className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" />
                </div>
              </div>
            </section>
          </form>
        </div>
        
        <div className="lg:w-1/3">
          <div className="bg-gray-50 p-8 sticky top-32">
            <h3 className="font-display text-xl font-semibold mb-6">Order Summary</h3>
            
            <div className="space-y-4 mb-6">
              {items.map(item => (
                <div key={item.product.id} className="flex justify-between text-sm">
                   <span className="text-gray-600 truncate mr-4">
                     {item.quantity} × {item.product.name}
                   </span>
                   <span className="font-medium shrink-0">
                     {formatCurrency(item.product.price * item.quantity)}
                   </span>
                </div>
              ))}
            </div>
            
            <div className="space-y-4 text-sm border-t border-b border-gray-200 py-6 mb-6">
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
            
            <button 
              form="checkout-form"
              type="submit"
              disabled={isProcessing}
              className="w-full flex items-center justify-center bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-black/90 transition-colors disabled:bg-gray-400"
            >
              {isProcessing ? 'PROCESSING...' : 'COMPLETE ORDER'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
