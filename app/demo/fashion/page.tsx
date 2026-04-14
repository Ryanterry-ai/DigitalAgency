'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const categories = ['All', 'Sarees', 'Kurtis', 'Lehengas', 'Western', 'Accessories'];

const products = [
  { name: 'Banarasi Silk Saree', price: '₹8,999', original: '₹15,000', category: 'Sarees', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop', tag: 'Bestseller' },
  { name: 'Embroidered Kurti Set', price: '₹2,499', original: '₹4,000', category: 'Kurtis', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop' },
  { name: 'Bridal Lehenga Set', price: '₹45,999', original: '₹75,000', category: 'Lehengas', image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=400&h=500&fit=crop', tag: 'New' },
  { name: 'Designer Palazzo Set', price: '₹1,899', original: '₹3,500', category: 'Western', image: 'https://images.unsplash.com/photo-1485968579169-a6f3a369acae?w=400&h=500&fit=crop' },
  { name: 'Chikankari Kurta', price: '₹3,299', original: '₹5,500', category: 'Kurtis', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop', tag: 'Trending' },
  { name: 'Pearl Jhumka Earrings', price: '₹899', original: '₹1,500', category: 'Accessories', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=500&fit=crop' },
];

const reviews = [
  { name: 'Meera G.', rating: 5, text: 'Amazing collection! The Banarasi saree quality is outstanding.' },
  { name: 'Sunita R.', rating: 5, text: 'Loved the chikankari kurtas. Perfect for festivals!' },
  { name: 'Priya M.', rating: 5, text: 'Fast delivery and beautiful packaging. Will order again!' },
];

export default function StyleKraftDemo() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredProducts = activeCategory === 'All' 
    ? products 
    : products.filter(p => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Icons.Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">StyleKraft</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#shop" className="text-gray-700 hover:text-pink-600 transition-colors">Shop</a>
            <a href="#reviews" className="text-gray-700 hover:text-pink-600 transition-colors">Reviews</a>
            <a href="tel:+919557513017" className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all flex items-center gap-2">
              <Icons.Phone className="w-4 h-4" /> Contact
            </a>
          </div>
        </div>
      </nav>

      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-6">
              👗 Premium Ethnic & Western Wear
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Elevate Your <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">Style</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Discover our handpicked collection of traditional and contemporary fashion. From Banarasi sarees to modern western wear.
            </p>
            <a href="#shop" className="inline-block px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
              Shop Now
            </a>
          </div>
        </div>
      </section>

      <section id="shop" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold">New Arrivals</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Featured Collection</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-pink-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {filteredProducts.map((product, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all group">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  {product.tag && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-pink-500 text-white text-sm font-bold rounded-full">
                      {product.tag}
                    </span>
                  )}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <button className="opacity-0 group-hover:opacity-100 px-6 py-3 bg-white text-gray-900 font-bold rounded-full transition-all transform translate-y-4 group-hover:translate-y-0">
                      View Details
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{product.name}</h3>
                  <div className="flex items-center gap-3">
                    <span className="text-xl font-bold text-pink-600">{product.price}</span>
                    <span className="text-sm text-gray-400 line-through">{product.original}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Free Shipping on Orders Above ₹2,000</h2>
          <p className="opacity-90 mb-8">COD Available • Easy Returns • 100% Quality Guaranteed</p>
          <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-pink-600 font-bold rounded-full text-lg hover:shadow-xl transition-all">
            <Icons.Phone className="w-5 h-5" /> Order via Call: +91 95575 13017
          </a>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Happy Customers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-gray-900">{r.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Visit Our Store</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open: 10 AM - 8 PM (All Days)</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>
    </div>
  );
}
