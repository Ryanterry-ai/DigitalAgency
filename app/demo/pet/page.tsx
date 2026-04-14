'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const products = [
  { name: 'Premium Dog Food 5kg', price: '₹1,800', category: 'Food', image: 'https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=400&h=400&fit=crop' },
  { name: 'Cat Litter 10kg', price: '₹650', category: 'Care', image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=400&h=400&fit=crop' },
  { name: 'Dog Collar + Leash', price: '₹450', category: 'Accessories', image: 'https://images.unsplash.com/photo-1596492784531-6e6eb5ea9993?w=400&h=400&fit=crop' },
  { name: 'Pet Bed Medium', price: '₹1,200', category: 'Bedding', image: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=400&h=400&fit=crop' },
  { name: 'Flea & Tick Shampoo', price: '₹350', category: 'Grooming', image: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=400&h=400&fit=crop' },
  { name: 'Interactive Toy Set', price: '₹599', category: 'Toys', image: 'https://images.unsplash.com/photo-1535294435445-d7249524ef2e?w=400&h=400&fit=crop' },
];

const groomingServices = [
  { name: 'Full Grooming (Dog)', price: '₹800', desc: 'Bath, haircut, nail trim, ear cleaning' },
  { name: 'Full Grooming (Cat)', price: '₹700', desc: 'Bath, brush, nail trim, ear cleaning' },
  { name: 'Bath Only', price: '₹400', desc: 'Deep clean with premium shampoo' },
  { name: 'Nail Trim', price: '₹150', desc: 'Quick and safe nail clipping' },
];

const reviews = [
  { name: 'Ankit S.', pet: 'Golden Retriever - Bruno', rating: 5, text: 'Best pet store in Mathura! Bruno loves their food.' },
  { name: 'Priya M.', pet: 'Persian Cat - Mittens', rating: 5, text: 'Amazing grooming service. Mittens looks so pretty!' },
  { name: 'Rahul K.', pet: 'Labrador - Max', rating: 5, text: 'Great variety of toys and accessories. Fair prices.' },
];

export default function PetParadiseDemo() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <Icons.Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">PetParadise</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#shop" className="text-gray-700 hover:text-purple-600 transition-colors">Shop</a>
            <a href="#grooming" className="text-gray-700 hover:text-purple-600 transition-colors">Grooming</a>
            <button onClick={() => setShowBooking(true)} className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Book Grooming
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
              🐾 Everything for Your Furry Friend
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Happy Pets, <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Happy Life</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Premium pet food, toys, accessories, and professional grooming services. Your pet deserves the best!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#shop" className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Shop Now
              </a>
              <button onClick={() => setShowBooking(true)} className="px-8 py-4 bg-white border-2 border-purple-500 text-purple-600 font-bold rounded-full hover:bg-purple-50 transition-all flex items-center justify-center gap-2">
                <Icons.Scissors className="w-5 h-5" /> Book Grooming
              </button>
            </div>
          </div>
        </div>
      </section>

      <section id="shop" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-purple-600 font-semibold">Our Shop</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Featured Products</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {products.map((p, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group">
                <div className="relative aspect-square overflow-hidden">
                  <img src={p.image} alt={p.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                  <span className="absolute top-4 left-4 px-3 py-1 bg-purple-500 text-white text-sm font-medium rounded-full">{p.category}</span>
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 mb-2">{p.name}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-purple-600">{p.price}</span>
                    <button className="px-4 py-2 bg-purple-100 text-purple-600 font-medium rounded-lg hover:bg-purple-500 hover:text-white transition-all">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="grooming" className="py-20 px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-semibold opacity-90">Professional Services</span>
            <h2 className="text-4xl font-bold mt-2">Grooming & Care</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {groomingServices.map((s, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-2">{s.name}</h3>
                <p className="text-sm opacity-80 mb-4">{s.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold">{s.price}</span>
                  <button onClick={() => setShowBooking(true)} className="px-4 py-2 bg-white text-purple-600 font-bold rounded-lg hover:bg-purple-100 transition-all">
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-purple-600 font-semibold">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">The PetParadise Promise</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🏆', title: 'Premium Brands', desc: 'Only the best pet food & products' },
              { icon: '✂️', title: 'Expert Groomers', desc: 'Trained professionals for all breeds' },
              { icon: '🚗', title: 'Free Delivery', desc: 'On orders above ₹500' },
              { icon: '💊', title: 'Vet Consultation', desc: 'Free health advice available' },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-bold text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-500 mt-2">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-purple-600 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Happy Pet Parents</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="text-sm text-gray-500">{r.pet}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Visit PetParadise Store</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open: 10 AM - 8 PM (All Days)</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBooking(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Grooming</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" />
              <input type="text" placeholder="Pet Name & Breed" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none">
                <option>Select Service</option>
                {groomingServices.map((s, i) => <option key={i}>{s.name} - {s.price}</option>)}
              </select>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-purple-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Confirm Booking
              </button>
            </form>
            <button onClick={() => setShowBooking(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
