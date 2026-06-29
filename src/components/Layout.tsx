import { ReactNode, useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { useAuthStore } from '../store/authStore';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export function Layout({ children }: { children: ReactNode }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const cartCount = useCartStore(state => state.getCartCount());
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Products', path: '/products' },
    { name: 'Categories', path: '/categories' },
    { name: 'About', path: '/about' }
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black selection:bg-black selection:text-white">
      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-50 bg-white flex flex-col"
          >
            <div className="container mx-auto px-6 py-6 flex items-center justify-between border-b border-gray-100">
               <div className="flex-1 flex items-center">
                 <Search className="w-5 h-5 text-gray-400 mr-4" />
                 <input 
                   type="text" 
                   autoFocus
                   placeholder="Search products..." 
                   className="w-full text-2xl font-display outline-none placeholder:text-gray-300"
                 />
               </div>
               <button onClick={() => setIsSearchOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                 <X className="w-6 h-6" />
               </button>
            </div>
            <div className="container mx-auto px-6 py-12 flex-1">
              <p className="text-gray-400 text-sm font-medium uppercase tracking-widest mb-6">Popular Searches</p>
              <div className="flex flex-wrap gap-4">
                {['Watches', 'Audio', 'Backpack', 'Minimalist'].map(term => (
                  <button key={term} className="px-4 py-2 border border-gray-200 rounded-full hover:border-black transition-colors">
                    {term}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header 
        className={cn(
          "fixed top-0 w-full z-40 transition-all duration-300",
          isScrolled ? "bg-white/80 backdrop-blur-md border-b border-gray-100 py-4" : "bg-transparent py-6"
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-display font-semibold text-xl tracking-tight">
              SECURESHOP
            </Link>
            <nav className="hidden md:flex gap-8">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="text-sm font-medium text-gray-500 hover:text-black transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="p-2 -m-2 text-gray-600 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <Link to={isAuthenticated ? "/profile" : "/login"} className="p-2 -m-2 text-gray-600 hover:text-black transition-colors">
              <User className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="p-2 -m-2 text-gray-600 hover:text-black transition-colors relative">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-black text-white text-[10px] font-bold flex items-center justify-center rounded-full transform translate-x-1/4 -translate-y-1/4">
                  {cartCount}
                </span>
              )}
            </Link>
            <button 
              className="md:hidden p-2 -m-2 text-gray-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden fixed top-[72px] left-0 w-full bg-white border-b border-gray-100 z-30 overflow-hidden"
          >
            <div className="flex flex-col py-4">
              {navLinks.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  className="px-6 py-4 text-lg font-medium border-b border-gray-50 flex items-center justify-between group"
                >
                  {link.name}
                  <span className="text-gray-300 group-hover:text-black transition-colors">→</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="flex-1 pt-24">
        {children}
      </main>

      <footer className="border-t border-gray-100 mt-24">
        <div className="container mx-auto px-6 md:px-12 py-16 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
             <Link to="/" className="font-display font-semibold text-xl tracking-tight mb-6 block">
              SECURESHOP
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
              Premium minimalist commerce. Designed for the modern aesthetic. Engineering meets design.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-6 uppercase tracking-wider text-xs text-gray-400">Shop</h4>
            <ul className="space-y-4">
              <li><Link to="/products" className="text-sm text-gray-600 hover:text-black transition-colors">All Products</Link></li>
              <li><Link to="/categories/watches" className="text-sm text-gray-600 hover:text-black transition-colors">Watches</Link></li>
              <li><Link to="/categories/audio" className="text-sm text-gray-600 hover:text-black transition-colors">Audio</Link></li>
              <li><Link to="/categories/accessories" className="text-sm text-gray-600 hover:text-black transition-colors">Accessories</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-6 uppercase tracking-wider text-xs text-gray-400">Support</h4>
            <ul className="space-y-4">
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-black transition-colors">FAQ</Link></li>
              <li><Link to="/shipping" className="text-sm text-gray-600 hover:text-black transition-colors">Shipping & Returns</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-black transition-colors">Contact Us</Link></li>
            </ul>
          </div>
           <div>
            <h4 className="font-medium mb-6 uppercase tracking-wider text-xs text-gray-400">Legal</h4>
            <ul className="space-y-4">
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-black transition-colors">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-black transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 py-8 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} SecureShop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
