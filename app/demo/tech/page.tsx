'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const services = [
  { title: 'Web Development', desc: 'Custom websites & web applications built with modern technologies', price: '₹25,000+' },
  { title: 'Mobile App Development', desc: 'Native and cross-platform apps for Android & iOS', price: '₹50,000+' },
  { title: 'SEO & Digital Marketing', desc: 'Rank higher on Google and drive more customers', price: '₹10,000/mo' },
  { title: 'Cloud Solutions', desc: 'AWS, Azure setup and migration services', price: '₹30,000+' },
  { title: 'IT Consulting', desc: 'Technology strategy and implementation guidance', price: '₹5,000/hr' },
  { title: 'Maintenance & Support', desc: '24/7 technical support and system maintenance', price: '₹5,000/mo' },
];

const clients = [
  { name: 'Sharma Electronics', logo: '🏪', industry: 'Retail E-commerce' },
  { name: 'FitLife Gym', logo: '💪', industry: 'Fitness & Health' },
  { name: 'DentCare Clinic', logo: '🦷', industry: 'Healthcare' },
  { name: 'SpiceRoute Restaurant', logo: '🍽️', industry: 'Food & Hospitality' },
];

const reviews = [
  { name: 'Rajesh S.', company: 'Sharma Electronics', rating: 5, text: 'Transformed our online business. Sales increased 300%!' },
  { name: 'Priya P.', company: 'FitLife Gym', rating: 5, text: 'Professional team. Delivered on time and exceeded expectations.' },
  { name: 'Amit K.', company: 'Tech Startup', rating: 5, text: 'Best IT partner in Mathura. Highly recommended!' },
];

export default function TechServDemo() {
  const [showContact, setShowContact] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="sticky top-0 bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
              <Icons.Code className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">TechServ Solutions</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#services" className="hover:text-blue-400 transition-colors">Services</a>
            <a href="#clients" className="hover:text-blue-400 transition-colors">Clients</a>
            <button onClick={() => setShowContact(true)} className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium mb-6">
              🚀 Your Digital Transformation Partner
            </span>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Transform Your Business with <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Technology</span>
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
              We build websites, apps, and digital solutions that help businesses grow. Trusted by 150+ clients across India.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowContact(true)} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Get Free Consultation
              </button>
              <a href="tel:+919557513017" className="px-8 py-4 bg-gray-800 border border-gray-700 text-white font-bold rounded-full text-lg hover:bg-gray-700 transition-all flex items-center justify-center gap-2">
                <Icons.Phone className="w-5 h-5" /> Call Now
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-blue-400">200+</div>
              <div className="text-gray-400 mt-2">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">150+</div>
              <div className="text-gray-400 mt-2">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-400">5+</div>
              <div className="text-gray-400 mt-2">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-purple-400">24/7</div>
              <div className="text-gray-400 mt-2">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-400 font-semibold">What We Do</span>
            <h2 className="text-4xl font-bold mt-2">Our Services</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <div key={i} className="bg-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-blue-500 transition-all group">
                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-400 transition-colors">{s.title}</h3>
                <p className="text-gray-400 mb-4">{s.desc}</p>
                <div className="flex justify-between items-center">
                  <span className="text-blue-400 font-bold">From {s.price}</span>
                  <button onClick={() => setShowContact(true)} className="px-4 py-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="clients" className="py-20 px-4 bg-gradient-to-r from-blue-500 to-purple-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 text-white">
            <span className="font-semibold opacity-90">Trusted By</span>
            <h2 className="text-4xl font-bold mt-2">Our Clients</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {clients.map((c, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <div className="text-5xl mb-4">{c.logo}</div>
                <h3 className="font-bold">{c.name}</h3>
                <p className="text-sm opacity-80">{c.industry}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-blue-400 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold mt-2">What Clients Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-gray-800 p-6 rounded-2xl">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-300 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div className="font-bold">{r.name}</div>
                  <div className="text-sm text-gray-400">{r.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p className="text-gray-400 mb-8">Get a free quote within 24 hours</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showContact && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowContact(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl text-gray-900" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold mb-6">Get Free Quote</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <input type="email" placeholder="Email Address" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none">
                <option>Select Service</option>
                {services.map((s, i) => <option key={i}>{s.title}</option>)}
              </select>
              <textarea placeholder="Tell us about your project..." rows={3} className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none" />
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Submit Enquiry
              </button>
            </form>
            <button onClick={() => setShowContact(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
