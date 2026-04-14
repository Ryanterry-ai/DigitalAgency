'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const services = [
  { name: 'Haircut & Styling', price: '₹500', time: '45 min' },
  { name: 'Hair Coloring', price: '₹2,500', time: '2 hr' },
  { name: 'Facial Treatment', price: '₹1,200', time: '1 hr' },
  { name: 'Manicure & Pedicure', price: '₹800', time: '1 hr' },
  { name: 'Bridal Makeup', price: '₹8,000', time: '3 hr' },
  { name: 'Hair Spa', price: '₹1,500', time: '1.5 hr' },
];

const gallery = [
  'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1519415510236-718bdfcd89c8?w=400&h=400&fit=crop',
];

const testimonials = [
  { name: 'Priya S.', text: 'Best salon in Mathura! Amazing service and very hygienic.', rating: 5 },
  { name: 'Neha K.', text: 'Loved my bridal makeup. Everyone complimented my look!', rating: 5 },
  { name: 'Anita M.', text: 'Professional staff and reasonable prices. Highly recommend.', rating: 5 },
];

export default function GlowUpSalonDemo() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <nav className="sticky top-0 bg-white/80 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
              <Icons.Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">GlowUp Salon</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="text-dark-700 hover:text-pink-600 transition-colors">Services</a>
            <a href="#gallery" className="text-dark-700 hover:text-pink-600 transition-colors">Gallery</a>
            <a href="#reviews" className="text-dark-700 hover:text-pink-600 transition-colors">Reviews</a>
            <button onClick={() => setShowBooking(true)} className="px-6 py-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Book Now
            </button>
          </div>
          <button className="md:hidden p-2 text-pink-600">
            <Icons.Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-rose-500/20" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-pink-300/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-rose-300/30 rounded-full blur-3xl" />
        <div className="relative text-center px-4">
          <span className="inline-block px-4 py-2 bg-pink-100 text-pink-700 rounded-full text-sm font-medium mb-6">
            ✨ Mathura&apos;s Premier Beauty Destination
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-dark-900 mb-6">
            Your Beauty, <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">Our Passion</span>
          </h1>
          <p className="text-xl text-dark-600 max-w-2xl mx-auto mb-8">
            Experience luxury beauty services with our expert stylists. Book your appointment today!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowBooking(true)} className="px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Book Appointment
            </button>
            <a href="https://wa.me/919557513017" target="_blank" className="px-8 py-4 bg-white border-2 border-pink-500 text-pink-600 font-bold rounded-full text-lg hover:bg-pink-50 transition-all flex items-center justify-center gap-2">
              <Icons.MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold">Our Services</span>
            <h2 className="text-4xl font-bold text-dark-900 mt-2">Premium Beauty Services</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-bold text-dark-900">{service.name}</h3>
                  <span className="text-2xl font-bold text-pink-600">{service.price}</span>
                </div>
                <div className="flex items-center text-dark-500 mb-4">
                  <Icons.Clock className="w-4 h-4 mr-2" />
                  <span className="text-sm">{service.time}</span>
                </div>
                <button onClick={() => setShowBooking(true)} className="w-full py-3 bg-pink-100 text-pink-700 font-semibold rounded-xl hover:bg-pink-500 hover:text-white transition-all">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 text-white">
            <span className="font-semibold opacity-90">Our Work</span>
            <h2 className="text-4xl font-bold mt-2">Beautiful Transformations</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {gallery.map((img, i) => (
              <div key={i} className="aspect-square rounded-2xl overflow-hidden shadow-xl hover:scale-105 transition-transform cursor-pointer">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-pink-600 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold text-dark-900 mt-2">What Our Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(t.rating)].map((_, j) => (
                    <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-dark-600 mb-4">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-400 to-rose-400 rounded-full flex items-center justify-center text-white font-bold">
                    {t.name.charAt(0)}
                  </div>
                  <span className="font-semibold text-dark-900">{t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-dark-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Visit Us Today!</h2>
        <p className="text-dark-400 mb-8">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-dark-400 mb-8">Open: 9 AM - 8 PM (All Days)</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBooking(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-dark-900 mb-6">Book Appointment</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none">
                <option>Select Service</option>
                {services.map((s, i) => <option key={i}>{s.name}</option>)}
              </select>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-pink-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Confirm Booking
              </button>
            </form>
            <button onClick={() => setShowBooking(false)} className="mt-4 w-full py-2 text-dark-500 hover:text-dark-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
