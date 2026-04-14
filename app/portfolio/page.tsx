'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { portfolio, portfolioCategories, WHATSAPP_URL } from '@/lib/data';

const categoryImages: Record<string, { gradient: string; icon: string }> = {
  salon: { gradient: 'from-pink-500 to-rose-500', icon: 'Sparkles' },
  dental: { gradient: 'from-blue-500 to-cyan-500', icon: 'Shield' },
  gym: { gradient: 'from-orange-500 to-red-500', icon: 'Zap' },
  restaurant: { gradient: 'from-yellow-500 to-orange-500', icon: 'Star' },
  fashion: { gradient: 'from-purple-500 to-pink-500', icon: 'Heart' },
  cafe: { gradient: 'from-amber-500 to-yellow-500', icon: 'Coffee' },
  pharmacy: { gradient: 'from-green-500 to-emerald-500', icon: 'Heart' },
  tech: { gradient: 'from-blue-600 to-indigo-600', icon: 'Code' },
  tiffin: { gradient: 'from-green-500 to-teal-500', icon: 'Star' },
  pet: { gradient: 'from-amber-400 to-orange-400', icon: 'Heart' },
  education: { gradient: 'from-indigo-500 to-purple-500', icon: 'Target' },
  auto: { gradient: 'from-gray-600 to-gray-800', icon: 'Rocket' },
};

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === 'All'
    ? portfolio
    : portfolio.filter(p => {
        if (activeCategory === 'Healthcare') return p.category === 'Dental Clinic' || p.category === 'Pharmacy';
        if (activeCategory === 'Food Delivery') return p.category === 'Restaurant' || p.category === 'Cafe & Bakery' || p.category === 'Food Delivery';
        if (activeCategory === 'E-commerce') return p.category === 'Clothing & Fashion' || p.category === 'Pet Care';
        return p.category === activeCategory;
      });

  return (
    <>
      <section className="pt-32 pb-20 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-hero-pattern opacity-30" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1 bg-primary-500/20 border border-primary-500/30 rounded-full text-primary-300 text-sm font-medium mb-4">
              Our Portfolio
            </span>
            <h1 className="heading-1 text-white mb-6">
              Results That Speak for <span className="text-gradient">Themselves</span>
            </h1>
            <p className="subheading text-dark-400">
              See how we&apos;ve helped 150+ businesses across India achieve their digital goals. From local shops to growing brands.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {portfolioCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-gradient-to-r from-primary-600 to-accent-600 text-white shadow-lg shadow-primary-500/25'
                    : 'bg-white text-dark-700 hover:bg-gray-100 shadow-sm border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => {
              const imgConfig = categoryImages[project.image] || { gradient: 'from-gray-500 to-gray-600', icon: 'Globe' };
              return (
                <Card 
                  key={index} 
                  className="overflow-hidden group cursor-pointer transform transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl"
                  onMouseEnter={() => setHoveredProject(index)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  <div className={`aspect-[4/3] bg-gradient-to-br ${imgConfig.gradient} relative overflow-hidden`}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className={`w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-500 ${hoveredProject === index ? 'scale-110' : ''}`}>
                        <Icons.Building2 className="w-10 h-10 text-white" />
                      </div>
                    </div>
                    
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
                      <a 
                        href={project.demo} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button size="sm" className="bg-white text-dark-900 hover:bg-gray-100">
                          <Icons.ExternalLink className="w-4 h-4 mr-2" />
                          View Demo
                        </Button>
                      </a>
                    </div>

                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-dark-900 text-xs font-semibold rounded-full shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-dark-600 text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.features.slice(0, 3).map((feature, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-dark-600 text-xs rounded-full">
                          {feature}
                        </span>
                      ))}
                    </div>
                    
                    <div className="border-t border-gray-100 pt-4">
                      <h4 className="text-xs font-semibold text-dark-500 uppercase tracking-wider mb-3">Results</h4>
                      <div className="space-y-1">
                        {project.results.map((result, i) => (
                          <div key={i} className="flex items-center text-sm text-dark-700">
                            <Icons.CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                            {result}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-dark-500">No projects found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="section-padding bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="heading-2 mb-6">
              Ready to Build Your Success Story?
            </h2>
            <p className="subheading text-white/80 mb-8">
              Join 150+ businesses who trust us with their digital presence. Let&apos;s create something amazing together.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100">
                  Start Your Project
                  <Icons.ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Icons.MessageCircle className="w-5 h-5 mr-2" />
                  Chat on WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
