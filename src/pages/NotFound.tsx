import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function NotFound() {
  return (
    <div className="container mx-auto px-6 py-40 flex flex-col items-center justify-center text-center min-h-[70vh]">
      <h1 className="font-display text-8xl md:text-9xl font-bold tracking-tighter text-gray-100 mb-8">404</h1>
      <h2 className="font-display text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-500 max-w-md mb-10">The page you are looking for doesn't exist or has been moved.</p>
      <Link 
        to="/"
        className="inline-flex items-center justify-center bg-black text-white px-8 py-4 text-sm font-medium tracking-wide hover:bg-black/90 transition-colors group"
      >
        RETURN HOME
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
