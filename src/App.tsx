/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Products } from './pages/Products';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

export default function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          
          {/* Placeholders for other requested routes to prevent 404s on obvious links */}
          <Route path="/categories" element={<Products />} />
          <Route path="/categories/:slug" element={<Products />} />
          <Route path="/signup" element={<Login />} />
          <Route path="/profile" element={<div className="p-32 text-center font-display text-2xl">Profile Page (Mock)</div>} />
          <Route path="/orders" element={<div className="p-32 text-center font-display text-2xl">Orders Page (Mock)</div>} />
          <Route path="/admin" element={<div className="p-32 text-center font-display text-2xl">Admin Dashboard (Mock)</div>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </Router>
  );
}
