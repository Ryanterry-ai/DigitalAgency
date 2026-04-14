'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const treatments = [
  { name: 'Teeth Cleaning', price: '₹1,500', time: '30 min', desc: 'Professional cleaning & polishing' },
  { name: 'Dental Checkup', price: '₹500', time: '20 min', desc: 'Complete oral examination' },
  { name: 'Teeth Whitening', price: '₹8,000', time: '1 hr', desc: 'Advanced laser whitening' },
  { name: 'Dental Implants', price: '₹35,000', time: '2 hr', desc: 'Permanent tooth replacement' },
  { name: 'Root Canal', price: '₹5,000', time: '1.5 hr', desc: 'Pain-free RCT treatment' },
  { name: 'Braces & Aligners', price: '₹25,000', time: '45 min', desc: 'Invisible aligners available' },
];

const doctors = [
  { name: 'Dr. Rajesh Gupta', specialization: 'Prosthodontist', exp: '15+ years' },
  { name: 'Dr. Priya Sharma', specialization: 'Orthodontist', exp: '10+ years' },
  { name: 'Dr. Amit Verma', specialization: 'Oral Surgeon', exp: '12+ years' },
];

export default function DentCareDemo() {
  const [showBooking, setShowBooking] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40 border-b border-blue-100">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <Icons.Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">DentCare Clinic</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#treatments" className="text-gray-700 hover:text-blue-600 transition-colors">Treatments</a>
            <a href="#doctors" className="text-gray-700 hover:text-blue-600 transition-colors">Our Doctors</a>
            <a href="#gallery" className="text-gray-700 hover:text-blue-600 transition-colors">Gallery</a>
            <button onClick={() => setShowBooking(true)} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Book Appointment
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-200/30 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium mb-6">
                🦷 Mathura&apos;s Trusted Dental Care
              </span>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Your Smile, <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">Our Priority</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Experience painless dental treatments with state-of-the-art technology. Our expert team ensures comfort and care at every visit.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={() => setShowBooking(true)} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full hover:shadow-xl transition-all">
                  Book Free Consultation
                </button>
                <a href="tel:+919557513017" className="px-8 py-4 bg-white border-2 border-blue-500 text-blue-600 font-bold rounded-full hover:bg-blue-50 transition-all flex items-center gap-2">
                  <Icons.Phone className="w-5 h-5" /> Call Now
                </a>
              </div>
              <div className="flex gap-8 mt-8">
                <div>
                  <div className="text-3xl font-bold text-blue-600">15+</div>
                  <div className="text-sm text-gray-500">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">5000+</div>
                  <div className="text-sm text-gray-500">Happy Patients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600">4.9</div>
                  <div className="text-sm text-gray-500">Google Rating</div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-100 to-cyan-100 rounded-3xl p-8">
                <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=400&fit=crop" alt="Dental Clinic" className="rounded-2xl shadow-xl w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="treatments" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold">Our Services</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Premium Dental Treatments</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {treatments.map((t, i) => (
              <div key={i} className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-100 hover:shadow-xl transition-all hover:-translate-y-1">
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{t.desc}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-2xl font-bold text-blue-600">{t.price}</span>
                  <span className="text-sm text-gray-500 flex items-center gap-1"><Icons.Clock className="w-4 h-4" /> {t.time}</span>
                </div>
                <button onClick={() => setShowBooking(true)} className="w-full py-3 bg-white text-blue-600 font-semibold rounded-xl border-2 border-blue-200 hover:bg-blue-600 hover:text-white transition-all">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="doctors" className="py-20 px-4 bg-gradient-to-r from-blue-500 to-cyan-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 text-white">
            <span className="font-semibold opacity-90">Expert Team</span>
            <h2 className="text-4xl font-bold mt-2">Meet Our Specialists</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {doctors.map((d, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-xl">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {d.name.split(' ').slice(-1)[0].charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-900">{d.name}</h3>
                <p className="text-blue-600">{d.specialization}</p>
                <p className="text-sm text-gray-500 mt-2">{d.exp} Experience</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-600 font-semibold">Before & After</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Our Transformations</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&h=300&fit=crop',
              'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop',
            ].map((img, i) => (
              <div key={i} className="aspect-video rounded-xl overflow-hidden shadow-lg hover:scale-105 transition-transform">
                <img src={img} alt={`Gallery ${i + 1}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Book Your Appointment Today!</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open: 10 AM - 8 PM (Monday - Saturday)</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowBooking(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Appointment</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select Treatment</option>
                {treatments.map((t, i) => <option key={i}>{t.name}</option>)}
              </select>
              <input type="date" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Confirm Booking
              </button>
            </form>
            <button onClick={() => setShowBooking(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
