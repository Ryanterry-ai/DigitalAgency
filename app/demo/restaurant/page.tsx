'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const menuCategories = ['Starters', 'Main Course', 'Biryani Special', 'Desserts', 'Beverages'];

const menuItems = {
  Starters: [
    { name: 'Paneer Tikka', price: '₹280', desc: 'Marinated cottage cheese, tandoor grilled' },
    { name: 'Chicken Malai Kebab', price: '₹350', desc: 'Tender chicken with cream & spices' },
    { name: 'Veg Spring Roll', price: '₹180', desc: 'Crispy rolls with vegetable filling' },
    { name: 'Fish Amritsari', price: '₹320', desc: 'Battered fish with traditional spices' },
  ],
  'Main Course': [
    { name: 'Dal Makhani', price: '₹220', desc: 'Slow-cooked black lentils' },
    { name: 'Butter Chicken', price: '₹380', desc: 'Creamy tomato-based curry' },
    { name: 'Paneer Butter Masala', price: '₹300', desc: 'Rich & creamy paneer curry' },
    { name: 'Mutton Rogan Josh', price: '₹420', desc: 'Kashmiri style lamb curry' },
  ],
  'Biryani Special': [
    { name: 'Hyderabadi Chicken Biryani', price: '₹350', desc: 'Aromatic rice with tender chicken' },
    { name: 'Mutton Biryani', price: '₹450', desc: 'Slow-cooked with whole spices' },
    { name: 'Veg Dum Biryani', price: '₹280', desc: 'Fragrant vegetable biryani' },
    { name: 'Paneer Biryani', price: '₹300', desc: 'Spiced rice with paneer' },
  ],
  Desserts: [
    { name: 'Gulab Jamun', price: '₹120', desc: 'Hot milk dumplings in sugar syrup' },
    { name: 'Rasmalai', price: '₹150', desc: 'Soft cheese in sweet saffron milk' },
    { name: 'Ice Cream', price: '₹100', desc: '4 flavors available' },
  ],
  Beverages: [
    { name: 'Masala Chai', price: '₹50', desc: 'Traditional spiced tea' },
    { name: 'Fresh Lime', price: '₹80', desc: 'Sweet or salted' },
    { name: 'Lassi', price: '₹100', desc: 'Sweet or salted yogurt drink' },
  ],
};

const reviews = [
  { name: 'Vikram S.', rating: 5, text: 'Best biryani in Mathura! Authentic taste and great ambiance.' },
  { name: 'Sunita M.', rating: 5, text: 'Celebrated my anniversary here. The staff made it special!' },
  { name: 'Rajesh K.', rating: 5, text: 'Must try their Butter Chicken. Absolutely delicious!' },
];

export default function SpiceRouteDemo() {
  const [activeCategory, setActiveCategory] = useState('Starters');
  const [showReservation, setShowReservation] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Icons.Flame className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">SpiceRoute</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-gray-700 hover:text-orange-600 transition-colors">Menu</a>
            <a href="#reviews" className="text-gray-700 hover:text-orange-600 transition-colors">Reviews</a>
            <button onClick={() => setShowReservation(true)} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Book Table
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-20 right-0 w-96 h-96 bg-orange-200/40 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
              🍽️ Fine Dining in Mathura
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Taste the <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Magic</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Experience authentic North Indian cuisine with our secret recipes passed down through generations. Every dish tells a story.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowReservation(true)} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Reserve a Table
              </button>
              <a href="tel:+919557513017" className="px-8 py-4 bg-white border-2 border-orange-500 text-orange-600 font-bold rounded-full hover:bg-orange-50 transition-all flex items-center justify-center gap-2">
                <Icons.Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7aad87433a?w=1200&h=500&fit=crop" alt="Restaurant Interior" className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-xl" />
        </div>
      </section>

      <section id="menu" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">Our Menu</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Signature Dishes</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {menuCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  activeCategory === cat
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {menuItems[activeCategory as keyof typeof menuItems].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg flex justify-between items-start hover:shadow-xl transition-all">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
                <span className="text-xl font-bold text-orange-600 ml-4">{item.price}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-4xl font-bold">4.8</div>
              <div className="flex justify-center my-2">
                {[...Array(5)].map((_, i) => <Icons.Star key={i} className="w-5 h-5 fill-yellow-300 text-yellow-300" />)}
              </div>
              <div className="text-sm opacity-80">Google Rating</div>
            </div>
            <div>
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-sm opacity-80 mt-2">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold">50+</div>
              <div className="text-sm opacity-80 mt-2">Menu Items</div>
            </div>
            <div>
              <div className="text-4xl font-bold">5+</div>
              <div className="text-sm opacity-80 mt-2">Years Serving</div>
            </div>
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">What Our Guests Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-white font-bold">
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
        <h2 className="text-3xl font-bold mb-4">Make a Reservation</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open: 11 AM - 11 PM (All Days)</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showReservation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowReservation(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book a Table</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
                <input type="time" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              </div>
              <input type="number" placeholder="Number of Guests" min="1" max="20" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Confirm Reservation
              </button>
            </form>
            <button onClick={() => setShowReservation(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
