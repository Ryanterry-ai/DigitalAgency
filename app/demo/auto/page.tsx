'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const services = [
  { name: 'Regular Service', price: '₹1,500', time: '2 hrs', desc: 'Oil change, filter check, basic inspection' },
  { name: 'Full Service', price: '₹4,500', time: '4 hrs', desc: 'Complete checkup, oil, filters, brake service' },
  { name: 'Premium Service', price: '₹8,000', time: '6 hrs', desc: 'Full service + wheel alignment, balancing' },
  { name: 'AC Service', price: '₹2,000', time: '2 hrs', desc: 'AC gas top-up, cleaning, vent check' },
  { name: 'Battery Replacement', price: '₹3,500+', time: '1 hr', desc: 'All major brands available' },
  { name: 'Tire Change', price: '₹500/tire', time: '30 min', desc: 'Puncture repair, tire replacement' },
];

const brands = ['Maruti', 'Hyundai', 'Honda', 'Tata', 'Mahindra', 'Toyota', 'Ford', 'BMW', 'Audi', 'All Brands'];

const reviews = [
  { name: 'Vikram S.', car: 'Maruti Swift', rating: 5, text: 'Excellent service! My car runs like new. Fair pricing too.' },
  { name: 'Sunita M.', car: 'Hyundai Creta', rating: 5, text: 'Professional team. They explained everything clearly.' },
  { name: 'Rajesh K.', car: 'Honda City', rating: 5, text: 'Best garage in Mathura. Honest and reliable service.' },
];

export default function AutoFixDemo() {
  const [showBooking, setShowBooking] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 via-slate-100 to-zinc-100">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
              <Icons.Wrench className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">AutoFix Garage</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-gray-700 hover:text-gray-900 transition-colors">Services</a>
            <a href="#brands" className="text-gray-700 hover:text-gray-900 transition-colors">Brands</a>
            <button onClick={() => setShowBooking(true)} className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Book Service
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gray-300/30 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-gray-200 text-gray-700 rounded-full text-sm font-medium mb-6">
              🔧 Trusted Car Service in Mathura
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Expert Car Care, <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">Guaranteed</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Professional car service and repair. Certified mechanics, genuine parts, and transparent pricing. Your car is in safe hands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowBooking(true)} className="px-8 py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Book Service Now
              </button>
              <a href="tel:+919557513017" className="px-8 py-4 bg-white border-2 border-gray-700 text-gray-700 font-bold rounded-full hover:bg-gray-100 transition-all flex items-center justify-center gap-2">
                <Icons.Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=1200&h=500&fit=crop" alt="Auto Garage" className="w-full h-64 md:h-80 object-cover rounded-3xl shadow-xl" />
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gray-600 font-semibold">What We Offer</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-gray-900">{s.name}</h3>
                  <span className="text-2xl font-bold text-gray-700">{s.price}</span>
                </div>
                <p className="text-gray-500 text-sm mb-4">{s.desc}</p>
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <Icons.Clock className="w-4 h-4 mr-2" />
                  <span>{s.time}</span>
                </div>
                <button onClick={() => { setSelectedService(s.name); setShowBooking(true); }} className="w-full py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-700 hover:text-white transition-all">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="brands" className="py-20 px-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-semibold opacity-80">All Car Brands</span>
            <h2 className="text-4xl font-bold mt-2">We Service Everything</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            {brands.map((brand, i) => (
              <div key={i} className="bg-white/10 backdrop-blur px-6 py-3 rounded-full">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-gray-600 font-semibold">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">The AutoFix Promise</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '🔧', title: 'Certified Mechanics', desc: 'Trained & experienced technicians' },
              { icon: '🛡️', title: '90-Day Warranty', desc: 'On all service & parts' },
              { icon: '💰', title: 'Transparent Pricing', desc: 'No hidden charges, ever' },
              { icon: '🚗', title: 'Pickup & Drop', desc: 'Free service within Mathura' },
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
            <span className="text-gray-600 font-semibold">Testimonials</span>
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
                  <div className="w-10 h-10 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white font-bold">
                    {r.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{r.name}</div>
                    <div className="text-sm text-gray-500">{r.car}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Book Your Car Service</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open: 8 AM - 8 PM (Monday - Saturday)</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gray-600 to-gray-800 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBooking(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Service</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-500 outline-none" />
              <input type="text" placeholder="Car Model" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-500 outline-none">
                <option>Select Service</option>
                {services.map((s, i) => <option key={i}>{s.name} - {s.price}</option>)}
              </select>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-gray-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-gray-700 to-gray-900 text-white font-bold rounded-xl hover:shadow-lg transition-all">
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
