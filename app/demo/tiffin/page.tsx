'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const plans = [
  { name: 'Basic', meals: '2 meals/day', price: '₹2,500', features: ['Lunch & Dinner', '4-week cycle', 'Basic menu'], popular: false },
  { name: 'Premium', meals: '3 meals/day', price: '₹3,500', features: ['Breakfast, Lunch & Dinner', 'Weekly menu change', 'Customizable options', 'Free delivery'], popular: true },
  { name: 'Family', meals: '4 persons', price: '₹5,000', features: ['2 meals/person', 'Saves ₹500+ vs others', 'Perfect for families', 'Priority support'], popular: false },
];

const menu = [
  { day: 'Monday', lunch: 'Rajma Rice + Roti', dinner: 'Chole Bhature + Rice' },
  { day: 'Tuesday', lunch: 'Kadhi Pakora + Naan', dinner: 'Mix Veg + Roti' },
  { day: 'Wednesday', lunch: 'Paneer Butter Masala + Rice', dinner: 'Dal Fry + Roti' },
  { day: 'Thursday', lunch: 'Aloo Gobi + Roti', dinner: 'Chicken Curry + Rice' },
  { day: 'Friday', lunch: 'Chole + Bhature', dinner: 'Paneer Tikka + Naan' },
  { day: 'Saturday', lunch: 'Biryani + Raita', dinner: 'Mix Veg + Roti' },
];

const reviews = [
  { name: 'Vikram M.', rating: 5, text: 'Tasty food and always on time. Best tiffin service in Mathura!' },
  { name: 'Sunita G.', rating: 5, text: 'My husband works long hours. These homely meals keep him healthy.' },
  { name: 'Rahul S.', rating: 5, text: 'The premium plan is perfect. Fresh food, no MSG. Highly recommended!' },
];

export default function HomeChefDemo() {
  const [showOrder, setShowOrder] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-amber-500 rounded-xl flex items-center justify-center">
              <Icons.ChefHat className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">HomeChef Tiffin</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#plans" className="text-gray-700 hover:text-orange-600 transition-colors">Plans</a>
            <a href="#menu" className="text-gray-700 hover:text-orange-600 transition-colors">Menu</a>
            <button onClick={() => setShowOrder(true)} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Subscribe
            </button>
          </div>
        </div>
      </nav>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-medium mb-6">
              🍱 Homely Food, Delivered Fresh
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Healthy Meals, <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">Zero Hassle</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Fresh, hygienic, home-cooked food delivered to your doorstep. Perfect for working professionals, students, and families.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowOrder(true)} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Start Subscription
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
          <img src="https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&h=500&fit=crop" alt="Fresh Food" className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-xl" />
        </div>
      </section>

      <section id="plans" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">Subscription Plans</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Choose Your Plan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div key={i} className={`bg-white p-8 rounded-3xl shadow-lg ${plan.popular ? 'ring-4 ring-orange-400 relative' : ''}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-bold">MOST POPULAR</div>}
                <h3 className="text-2xl font-bold text-gray-900">{plan.name}</h3>
                <p className="text-gray-500 mb-4">{plan.meals}</p>
                <div className="text-4xl font-bold text-orange-600 mb-6">{plan.price}<span className="text-sm text-gray-400 font-normal">/month</span></div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700">
                      <Icons.Check className="w-5 h-5 text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowOrder(true)} className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:shadow-xl' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Subscribe Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="menu" className="py-20 px-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-semibold opacity-90">This Week&apos;s Menu</span>
            <h2 className="text-4xl font-bold mt-2">Fresh & Varied</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {menu.map((m, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6">
                <h3 className="font-bold text-lg mb-3">{m.day}</h3>
                <div className="space-y-2 text-sm opacity-90">
                  <div><span className="font-semibold">Lunch:</span> {m.lunch}</div>
                  <div><span className="font-semibold">Dinner:</span> {m.dinner}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-600 font-semibold">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">What Makes Us Special</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🍳', title: 'Freshly Cooked', desc: 'Made daily with fresh ingredients' },
              { icon: '🚗', title: 'Free Delivery', desc: 'On-time delivery every day' },
              { icon: '🌿', title: 'Hygienic', desc: '100% clean and safe preparation' },
              { icon: '👨‍🍳', title: 'Homely Taste', desc: 'Like mom-made food' },
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
            <span className="text-orange-600 font-semibold">Testimonials</span>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full flex items-center justify-center text-white font-bold">
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
        <h2 className="text-3xl font-bold mb-4">Start Your Tiffin Subscription</h2>
        <p className="text-gray-400 mb-8">Free trial for first-time customers!</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOrder(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Subscribe Now</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              <input type="text" placeholder="Delivery Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none">
                <option>Select Plan</option>
                {plans.map((p, i) => <option key={i}>{p.name} - {p.price}/month</option>)}
              </select>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Submit Subscription
              </button>
            </form>
            <button onClick={() => setShowOrder(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
