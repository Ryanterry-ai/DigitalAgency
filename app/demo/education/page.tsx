'use client';

import { useState } from 'react';
import { Icons } from '@/components/ui/Icons';

const courses = [
  { name: 'JEE Main + Advanced', duration: '2 Years', price: '₹50,000/yr', students: '500+ enrolled', image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=250&fit=crop' },
  { name: 'NEET Preparation', duration: '2 Years', price: '₹45,000/yr', students: '400+ enrolled', image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=400&h=250&fit=crop' },
  { name: 'Class 10 Boards', duration: '1 Year', price: '₹15,000/yr', students: '300+ enrolled', image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=250&fit=crop' },
  { name: 'Class 12 Boards (PCM)', duration: '1 Year', price: '₹20,000/yr', students: '250+ enrolled', image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=250&fit=crop' },
  { name: 'Foundation Course (8-10)', duration: '1-3 Years', price: '₹12,000/yr', students: '200+ enrolled', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=250&fit=crop' },
  { name: 'Computer Courses', duration: '6 Months', price: '₹8,000', students: '150+ enrolled', image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=400&h=250&fit=crop' },
];

const results = [
  { name: 'Arjun Sharma', exam: 'JEE Advanced 2024', score: 'AIR 1,245', college: 'IIT Bombay' },
  { name: 'Priya Gupta', exam: 'NEET 2024', score: 'AIR 892', college: 'AIIMS Delhi' },
  { name: 'Rahul Verma', exam: 'JEE Main 2024', score: '99.5 percentile', college: 'NIT Trichy' },
];

const reviews = [
  { name: 'Sunita M.', relation: 'Parent of Arjun (JEE Student)', rating: 5, text: 'My son secured IIT Bombay! The faculty here is excellent.' },
  { name: 'Rakesh K.', relation: 'Parent of Priya (NEET Student)', rating: 5, text: 'Best coaching institute in Mathura. Thank you EduLearn!' },
  { name: 'Anita S.', relation: 'Student (Class 10)', rating: 5, text: 'Scored 98% in boards. The teachers are very supportive.' },
];

export default function EduLearnDemo() {
  const [showEnroll, setShowEnroll] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50">
      <nav className="sticky top-0 bg-white/90 backdrop-blur-md shadow-sm z-40">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center">
              <Icons.GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">EduLearn Academy</span>
          </div>
          <div className="hidden md:flex items-center gap-6">
            <a href="#courses" className="text-gray-700 hover:text-indigo-600 transition-colors">Courses</a>
            <a href="#results" className="text-gray-700 hover:text-indigo-600 transition-colors">Results</a>
            <button onClick={() => setShowEnroll(true)} className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-full hover:shadow-lg transition-all">
              Enroll Now
            </button>
          </div>
        </div>
      </nav>

      <section className="relative py-24 px-4 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl" />
        <div className="max-w-6xl mx-auto relative">
          <div className="text-center">
            <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
              🎓 Top Coaching in Mathura
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Shape Your <span className="bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">Future</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Expert coaching for JEE, NEET, Board Exams & Foundation. Join 1000+ successful students who made their dreams come true.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => setShowEnroll(true)} className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
                Start Learning
              </button>
              <a href="tel:+919557513017" className="px-8 py-4 bg-white border-2 border-indigo-500 text-indigo-600 font-bold rounded-full hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                <Icons.Phone className="w-5 h-5" /> Call for Demo
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { num: '1000+', label: 'Students' },
              { num: '50+', label: 'Expert Teachers' },
              { num: '95%', label: 'Success Rate' },
              { num: '10+', label: 'Years Experience' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg">
                <div className="text-3xl font-bold text-indigo-600">{stat.num}</div>
                <div className="text-gray-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="courses" className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-semibold">Our Programs</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">Featured Courses</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
                <div className="relative h-40">
                  <img src={c.image} alt={c.name} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-indigo-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {c.students}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{c.name}</h3>
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span>Duration: {c.duration}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-indigo-600">{c.price}</span>
                    <button onClick={() => setShowEnroll(true)} className="px-4 py-2 bg-indigo-100 text-indigo-600 font-medium rounded-lg hover:bg-indigo-500 hover:text-white transition-all">
                      Enroll
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="results" className="py-20 px-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="font-semibold opacity-90">Our Pride</span>
            <h2 className="text-4xl font-bold mt-2">Top Results 2024</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {results.map((r, i) => (
              <div key={i} className="bg-white/10 backdrop-blur rounded-2xl p-6 text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full mx-auto mb-4 flex items-center justify-center text-3xl">
                  🎓
                </div>
                <h3 className="text-xl font-bold mb-2">{r.name}</h3>
                <p className="opacity-80 mb-2">{r.exam}</p>
                <div className="text-3xl font-bold text-yellow-300 mb-2">{r.score}</div>
                <p className="opacity-80">{r.college}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-indigo-600 font-semibold">Why Choose Us</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">The EduLearn Advantage</h2>
          </div>
          <div className="grid md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '👨‍🏫', title: 'Expert Faculty', desc: 'IIT & AIIMS graduate teachers' },
              { icon: '📚', title: 'Quality Study Material', desc: 'Comprehensive & updated content' },
              { icon: '📝', title: 'Regular Tests', desc: 'Weekly & monthly assessments' },
              { icon: '🎯', title: 'Doubt Sessions', desc: 'Daily doubt clearing classes' },
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
            <span className="text-indigo-600 font-semibold">Testimonials</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-2">What Parents Say</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reviews.map((r, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(r.rating)].map((_, j) => <Icons.Star key={j} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
                </div>
                <p className="text-gray-600 mb-4">&ldquo;{r.text}&rdquo;</p>
                <div>
                  <div className="font-semibold text-gray-900">{r.name}</div>
                  <div className="text-sm text-gray-500">{r.relation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-3xl font-bold mb-4">Join EduLearn Today!</h2>
        <p className="text-gray-400 mb-8">Limited seats available. Book your free demo class now.</p>
        <a href="tel:+919557513017" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-full text-lg hover:shadow-xl transition-all">
          <Icons.Phone className="w-5 h-5" /> Call: +91 95575 13017
        </a>
      </section>

      {showEnroll && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowEnroll(false)}>
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Enroll Now</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Student Name" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input type="tel" placeholder="Parent Phone Number" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <input type="text" placeholder="Current Class" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
              <select className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none">
                <option>Select Course</option>
                {courses.map((c, i) => <option key={i}>{c.name}</option>)}
              </select>
              <button type="submit" className="w-full py-4 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-bold rounded-xl hover:shadow-lg transition-all">
                Submit Enquiry
              </button>
            </form>
            <button onClick={() => setShowEnroll(false)} className="mt-4 w-full py-2 text-gray-500 hover:text-gray-700">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
