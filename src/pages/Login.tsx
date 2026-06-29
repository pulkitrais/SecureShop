import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { AuthService } from '../api';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const setAuth = useAuthStore(state => state.setAuth);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const { user, token } = await AuthService.login(email, password);
      setAuth(user, token);
      navigate('/profile');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-6 py-32 flex items-center justify-center min-h-[70vh]">
      <div className="w-full max-w-md">
        <h1 className="font-display text-4xl font-semibold tracking-tight mb-2 text-center">Welcome Back</h1>
        <p className="text-gray-500 mb-8 text-center">Sign in to your SecureShop account.</p>
        
        {error && (
          <div className="bg-red-50 text-red-600 text-sm p-4 mb-6 text-center border border-red-100">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Email address</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required 
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" 
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <button type="button" className="text-xs text-gray-500 hover:text-black">Forgot password?</button>
            </div>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
              className="w-full px-4 py-3 border border-gray-200 focus:border-black outline-none transition-colors" 
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-black text-white px-8 py-4 font-medium tracking-wide hover:bg-black/90 transition-colors disabled:bg-gray-400 mt-4"
          >
            {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-gray-500">
          Don't have an account? <Link to="/signup" className="text-black font-medium hover:underline">Create one</Link>
        </p>
      </div>
    </div>
  );
}
