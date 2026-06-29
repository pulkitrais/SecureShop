import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../api';
import { Product, Category } from '../types';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          ProductService.getFeaturedProducts(),
          ProductService.getCategories()
        ]);
        setFeaturedProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Failed to load home data", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=2000" 
            alt="Hero background" 
            className="w-full h-full object-cover opacity-80"
          />
        </div>
        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-5xl md:text-7xl font-semibold tracking-tight text-black mb-6 leading-tight">
              Design<br/>engineered.
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-md font-light">
              Premium minimalist commerce. Crafted with absolute precision for the modern aesthetic.
            </p>
            <Link 
              to="/products" 
              className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-black/90 transition-colors group"
            >
              SHOP COLLECTION
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-4">Featured</h2>
              <p className="text-gray-500 max-w-md">Our most iconic pieces, defining the intersection of form and function.</p>
            </div>
            <Link to="/products" className="text-sm font-medium uppercase tracking-widest hover:text-gray-500 transition-colors inline-flex items-center">
              View All <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-100 aspect-square mb-6"></div>
                  <div className="h-6 bg-gray-100 w-2/3 mb-2"></div>
                  <div className="h-4 bg-gray-100 w-1/3"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {featuredProducts.slice(0, 3).map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Bento Grid */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-12">
          <h2 className="font-display text-3xl md:text-4xl font-semibold tracking-tight mb-16 text-center">Shop by Category</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 md:h-[600px] gap-4">
            {categories.slice(0,4).map((category, index) => (
              <Link 
                key={category.id} 
                to={`/categories/${category.slug}`}
                className={cn(
                  "relative group overflow-hidden bg-white",
                  index === 0 ? "md:col-span-2 md:row-span-2 aspect-square md:aspect-auto" : 
                  index === 1 ? "md:col-span-2 md:row-span-1 aspect-video md:aspect-auto" :
                  "md:col-span-1 md:row-span-1 aspect-square md:aspect-auto"
                )}
              >
                <img 
                  src={category.imageUrl} 
                  alt={category.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
                <div className="absolute inset-0 p-8 flex flex-col justify-end">
                  <h3 className="text-white font-display text-2xl md:text-3xl font-medium tracking-tight mb-2">
                    {category.name}
                  </h3>
                  <span className="text-white/80 text-sm font-medium uppercase tracking-widest flex items-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    Explore <ArrowRight className="w-4 h-4 ml-2" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Editorial Newsletter */}
      <section className="py-32">
        <div className="container mx-auto px-6 md:px-12 text-center max-w-3xl">
          <h2 className="font-display text-3xl md:text-5xl font-semibold tracking-tight mb-6">Stay ahead.</h2>
          <p className="text-gray-500 mb-12 text-lg">Subscribe to receive early access to new releases, exclusive editorial content, and design insights.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Email address" 
              className="flex-1 px-6 py-4 bg-gray-50 border border-gray-100 focus:border-black focus:ring-0 outline-none transition-colors"
              required
            />
            <button type="submit" className="bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-black/90 transition-colors whitespace-nowrap">
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
