'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const membershipPlans = [
  { name: 'Basic', price: '₹1,500', duration: '/month', features: ['Gym Access', 'Locker', '1 Free PT Session'] },
  { name: 'Premium', price: '₹3,000', duration: '/month', features: ['24/7 Gym Access', 'All Classes', 'Sauna Access', 'Free PT (4 sessions)'], popular: true },
  { name: 'Elite', price: '₹5,000', duration: '/month', features: ['Everything in Premium', 'Personal Chef Access', 'Monthly Body Scan', 'Unlimited PT'] },
];

const classes = [
  { name: 'HIIT Blast', time: '6:00 AM', trainer: 'Amit Sir', icon: 'Zap' },
  { name: 'Yoga Flow', time: '7:00 AM', trainer: 'Priya Ma\'am', icon: 'Heart' },
  { name: 'CrossFit', time: '5:00 PM', trainer: 'Ravi Bhai', icon: 'Star' },
  { name: 'Zumba Party', time: '6:30 PM', trainer: 'Neha Ma\'am', icon: 'Music' },
  { name: 'Weight Training', time: '7:30 PM', trainer: 'Amit Sir', icon: 'Dumbbell' },
  { name: 'Cardio Kick', time: '8:30 PM', trainer: 'Ravi Bhai', icon: 'Flame' },
];

const trainers = [
  { name: 'Amit Singh', specialization: 'CrossFit & HIIT', exp: '8 years', cert: 'ACE Certified' },
  { name: 'Priya Sharma', specialization: 'Yoga & Pilates', exp: '6 years', cert: 'RYT 500' },
  { name: 'Ravi Kumar', specialization: 'Bodybuilding', exp: '10 years', cert: 'IFBB Pro' },
];

export default function FlexFitGymDemo() {
  const [showJoin, setShowJoin] = useState(false);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="sticky top-0 bg-gray-900/90 backdrop-blur-md z-40 border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
              <Icons.Zap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">FlexFit Gym</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#plans" className="hover:text-orange-400 transition-colors">Membership</a>
            <a href="#classes" className="hover:text-orange-400 transition-colors">Classes</a>
            <a href="#trainers" className="hover:text-orange-400 transition-colors">Trainers</a>
            <button onClick={() => setShowJoin(true)} className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Join Now
            </button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/80 to-gray-900/60" />
        <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1600&h=900&fit=crop" alt="Gym" className="w-full h-full object-cover opacity-30" />
        </div>
        <div className="relative text-center px-4 max-w-4xl mx-auto">
          <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-medium mb-6">
            💪 Mathura&apos;s Most Advanced Gym
          </span>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Transform Your <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Body</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            State-of-the-art equipment, expert trainers, and a motivating environment. Your fitness journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button onClick={() => setShowJoin(true)} className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all transform hover:-translate-y-1">
              Start Your Journey
            </button>
            <a href="#classes" className="px-8 py-4 bg-white/10 backdrop-blur text-white font-bold rounded-full text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
              <Icons.Play className="w-5 h-5" /> View Classes
            </a>
          </div>
        </div>
      </section>

      <section id="classes" className="py-20 px-4 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-semibold">Daily Schedule</span>
            <h2 className="text-4xl font-bold mt-2">Today&apos;s Classes</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {classes.map((c, i) => (
              <div key={i} className="bg-gray-700/50 p-6 rounded-2xl border border-gray-600 hover:border-orange-500 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">{c.name}</h3>
                  <span className="text-orange-400 font-bold">{c.time}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Icons.User className="w-4 h-4" />
                  <span>{c.trainer}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="plans" className="py-20 px-4 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 text-white">
            <span className="font-semibold opacity-90">Membership Plans</span>
            <h2 className="text-4xl font-bold mt-2">Choose Your Plan</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {membershipPlans.map((plan, i) => (
              <div key={i} className={`bg-white rounded-3xl p-8 ${plan.popular ? 'ring-4 ring-yellow-400 transform scale-105' : ''}`}>
                {plan.popular && <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-yellow-400 text-black px-4 py-1 rounded-full text-sm font-bold">POPULAR</div>}
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-4xl font-bold text-orange-600">{plan.price}</span>
                  <span className="text-gray-500">{plan.duration}</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2 text-gray-700">
                      <Icons.Check className="w-5 h-5 text-green-500" /> {f}
                    </li>
                  ))}
                </ul>
                <button onClick={() => setShowJoin(true)} className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white hover:shadow-xl' : 'bg-gray-100 text-gray-900 hover:bg-gray-200'}`}>
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trainers" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-orange-400 font-semibold">Expert Team</span>
            <h2 className="text-4xl font-bold text-white mt-2">Our Trainers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {trainers.map((t, i) => (
              <div key={i} className="bg-gray-800 rounded-2xl p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-3xl font-bold">
                  {t.name.split(' ').slice(-1)[0].charAt(0)}
                </div>
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="text-orange-400">{t.specialization}</p>
                <div className="flex justify-center gap-4 mt-4 text-sm text-gray-400">
                  <span>{t.exp}</span>
                  <span>•</span>
                  <span>{t.cert}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-800 text-center">
        <h2 className="text-3xl font-bold mb-4">Visit FlexFit Gym Today!</h2>
        <p className="text-gray-400 mb-2">A-7, Anand Kunj, Birjapur, Mathura, UP - 281001</p>
        <p className="text-gray-400 mb-8">Open 24/7 • Free Parking Available</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showJoin && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowJoin(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Join FlexFit Gym</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-orange-500 outline-none text-gray-900">
                <option>Select Plan</option>
                {membershipPlans.map((p, i) => <option key={i}>{p.name} - {p.price}/month</option>)}
              </select>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Submit Application
              </button>
            </form>
            <button onClick={() => setShowJoin(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
