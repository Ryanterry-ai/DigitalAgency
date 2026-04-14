'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const menuItems = [
  { category: 'Coffee', items: [
    { name: 'Espresso', price: '₹120', desc: 'Rich & bold single shot' },
    { name: 'Cappuccino', price: '₹180', desc: 'Perfect foam, classic taste' },
    { name: 'Latte', price: '₹200', desc: 'Smooth with steamed milk' },
    { name: 'Cold Brew', price: '₹220', desc: '24-hour steeped, smooth finish' },
    { name: 'Mocha', price: '₹250', desc: 'Espresso with chocolate & cream' },
  ]},
  { category: 'Pastries', items: [
    { name: 'Croissant', price: '₹150', desc: 'Buttery, flaky French pastry' },
    { name: 'Blueberry Muffin', price: '₹120', desc: 'Freshly baked with blueberries' },
    { name: 'Chocolate Cake', price: '₹180', desc: 'Rich dark chocolate layers' },
    { name: 'Cheesecake', price: '₹200', desc: 'New York style creamy cheesecake' },
  ]},
  { category: 'Custom Cakes', items: [
    { name: 'Birthday Cake (1kg)', price: '₹800', desc: 'Custom design, 3 flavors' },
    { name: 'Photo Cake', price: '₹1,200', desc: 'Your photo on edible paper' },
    { name: 'Wedding Cake', price: '₹5,000+', desc: 'Multi-tier custom design' },
  ]},
];

const reviews = [
  { name: 'Arjun P.', rating: 5, text: 'Best coffee in Mathura! Cozy ambiance too.' },
  { name: 'Neha S.', rating: 5, text: 'Their custom cakes are work of art. Loved it!' },
  { name: 'Ritu M.', rating: 5, text: 'Perfect place for work. Great WiFi & coffee.' },
];

export default function UrbanBitesDemo() {
  const [showOrder, setShowOrder] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Icons.Coffee className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">UrbanBites Cafe</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-gray-700 hover:text-amber-600 transition-colors">Menu</a>
            <a href="#custom" className="text-gray-700 hover:text-amber-600 transition-colors">Custom Cakes</a>
            <button onClick={() => setShowOrder(true)} className="px-6 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-amber-200/40 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-medium mb-6">
              ☕ Your Neighborhood Cafe
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Good Vibes & <span className="bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">Great Coffee</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Artisan coffee, fresh pastries, and custom cakes. The perfect spot to unwind or get work done.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowOrder(true)} className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Order Online
              </button>
              <a href="tel:+919557513017" className="px-8 py-4 bg-white border-2 border-amber-500 text-amber-600 font-bold rounded-full hover:bg-amber-50 transition-all flex items-center justify-center gap-2">
                <Icons.Phone className="w-5 h-5" /> Call to Order
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <img src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&h=500&fit=crop" alt="Cafe Interior" className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-xl" />
        </div>
      </section>

      <section id="menu" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold">Our Menu</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Fresh & Delicious</h2>
          </div>

          {menuItems.map((section, i) => (
            <div key={i} className="mb-12">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                {section.category === 'Coffee' && <Icons.Coffee className="w-6 h-6 text-amber-600" />}
                {section.category === 'Pastries' && <Icons.Cake className="w-6 h-6 text-amber-600" />}
                {section.category === 'Custom Cakes' && <Icons.Gift className="w-6 h-6 text-amber-600" />}
                {section.category}
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                {section.items.map((item, j) => (
                  <div key={j} className="bg-white p-5 rounded-xl shadow-md flex justify-between items-center hover:shadow-lg transition-all">
                    <div>
                      <h4 className="font-bold text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">{item.desc}</p>
                    </div>
                    <span className="text-lg font-bold text-amber-600">{item.price}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="custom" className="py-20 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="font-semibold opacity-90">Custom Orders</span>
              <h2 className="text-4xl font-bold mt-2 mb-4">Design Your Dream Cake</h2>
              <p className="text-lg opacity-90 mb-6">
                Birthday, wedding, anniversary - we create custom cakes that make your celebrations special. Choose flavors, design, and size.
              </p>
              <button onClick={() => setShowOrder(true)} className="px-8 py-4 bg-white text-amber-600 font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Enquire Now
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=300&h=300&fit=crop" alt="Custom Cake" className="rounded-2xl shadow-xl" />
              <img src="https://images.unsplash.com/photo-1535141192574-5d4897c12f40?w=300&h=300&fit=crop" alt="Custom Cake" className="rounded-2xl shadow-xl mt-8" />
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-amber-600 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">What Customers Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full flex items-center justify-center text-white font-bold">
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
        <h2 className="text-3xl font-bold mb-4">Visit UrbanBites Cafe</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-4">Open: 9 AM - 10 PM (All Days)</p>
        <p className="text-amber-400 mb-8">Free WiFi • Power Outlets • Indoor & Outdoor Seating</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOrder(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Place Your Order</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
              <textarea placeholder="What would you like to order?" rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-amber-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Submit Order
              </button>
            </form>
            <button onClick={() => setShowOrder(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
