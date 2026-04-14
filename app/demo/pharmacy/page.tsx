'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const medicines = [
  { name: 'Paracetamol 500mg', price: '₹30', pack: 'Strip of 10', category: 'Pain Relief' },
  { name: 'Azithromycin 500mg', price: '₹120', pack: 'Strip of 3', category: 'Antibiotics' },
  { name: 'Vitamin D3 60K', price: '₹150', pack: 'Pack of 4', category: 'Vitamins' },
  { name: 'Cetirizine 10mg', price: '₹25', pack: 'Strip of 10', category: 'Allergy' },
  { name: 'Pantoprazole 40mg', price: '₹80', pack: 'Strip of 10', category: 'Gastric' },
  { name: 'Cough Syrup 200ml', price: '₹95', pack: 'Bottle', category: 'Cold & Cough' },
  { name: 'ORS Sachets', price: '₹50', pack: 'Pack of 10', category: 'Rehydration' },
  { name: 'Multivitamin Tablets', price: '₹250', pack: 'Bottle of 30', category: 'Vitamins' },
];

const services = [
  { icon: 'Pill', title: 'Medicine Delivery', desc: 'Get medicines delivered at your doorstep' },
  { icon: 'FileText', title: 'Prescription Upload', desc: 'Upload prescription for quick service' },
  { icon: 'Truck', title: 'Express Delivery', desc: 'Same-day delivery within Mathura' },
  { icon: 'Phone', title: 'Free Consultation', desc: 'Talk to our pharmacist anytime' },
];

export default function MediCareDemo() {
  const [search, setSearch] = useState('');
  const [showOrder, setShowOrder] = useState(false);

  const filteredMeds = medicines.filter(m => 
    m.name.toLowerCase().includes(search.toLowerCase()) || 
    m.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center">
              <Icons.Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">MediCare Pharmacy</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#medicines" className="text-gray-700 hover:text-green-600 transition-colors">Medicines</a>
            <a href="#services" className="text-gray-700 hover:text-green-600 transition-colors">Services</a>
            <button onClick={() => setShowOrder(true)} className="px-6 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Order Now
            </button>
          </div>
        </div>
      </nav>

      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-3xl p-8 md:p-12 text-white text-center">
            <span className="inline-block px-4 py-2 bg-white/20 rounded-full text-sm font-medium mb-4">
              💊 Trusted Pharmacy in Mathura
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Your Health, Our Priority</h1>
            <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
              Genuine medicines, fast delivery, and expert guidance. All your healthcare needs in one place.
            </p>
            <div className="max-w-xl mx-auto relative">
              <input
                type="text"
                placeholder="Search medicines..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-6 py-4 rounded-full text-gray-900 shadow-xl focus:outline-none"
              />
              <Icons.Search className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      </section>

      <section id="medicines" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold">Available Medicines</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Popular Products</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {filteredMeds.map((med, i) => (
              <div key={i} className="bg-white p-5 rounded-2xl shadow-md hover:shadow-xl transition-all">
                <span className="text-xs text-green-600 font-medium bg-green-50 px-2 py-1 rounded">{med.category}</span>
                <h3 className="font-bold text-gray-900 mt-3 mb-1">{med.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{med.pack}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-green-600">{med.price}</span>
                  <button onClick={() => setShowOrder(true)} className="px-4 py-2 bg-green-100 text-green-700 font-medium rounded-lg hover:bg-green-500 hover:text-white transition-all">
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-gradient-to-br from-green-50 to-teal-50 p-6 rounded-2xl text-center">
                <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-teal-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icons.Zap className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                <p className="text-sm text-gray-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Upload Your Prescription</h2>
          <p className="opacity-90 mb-8">Send your prescription on WhatsApp and get medicines delivered</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="https://wa.me/919557513017" className="px-8 py-4 bg-white text-green-600 font-bold rounded-full text-lg hover:shadow-xl transition-all flex items-center justify-center gap-2">
              <Icons.MessageCircle className="w-5 h-5" /> WhatsApp Us
            </a>
            <a href="tel:+919557513017" className="px-8 py-4 bg-green-600 border-2 border-white font-bold rounded-full text-lg hover:bg-green-700 transition-all flex items-center justify-center gap-2">
              <Icons.Phone className="w-5 h-5" /> Call Now
            </a>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Visit MediCare Pharmacy</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open: 8 AM - 10 PM (All Days) • Emergency: 24/7</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowOrder(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Order Medicines</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
              <input type="text" placeholder="Medicine Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
              <textarea placeholder="Upload prescription image URL (optional)" rows={2} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-green-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-green-500 to-teal-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
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
