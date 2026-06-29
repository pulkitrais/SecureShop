import { useEffect, useState } from 'react';
import { ProductCard } from '../components/ProductCard';
import { ProductService } from '../api';
import { Product } from '../types';
import { motion } from 'motion/react';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await ProductService.getProducts();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="container mx-auto px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row justify-between items-baseline mb-12">
        <h1 className="font-display text-4xl font-semibold tracking-tight">All Products</h1>
        <div className="mt-4 md:mt-0 flex gap-4 text-sm font-medium text-gray-500">
          <button className="hover:text-black">Sort by: Featured</button>
          <span>|</span>
          <button className="hover:text-black">Filter</button>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
           {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
            <div key={i} className="animate-pulse">
              <div className="bg-gray-100 aspect-square mb-6"></div>
              <div className="h-6 bg-gray-100 w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-100 w-1/3"></div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
