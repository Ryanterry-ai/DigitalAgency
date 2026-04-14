'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/ui/Icons';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { portfolio, portfolioCategories, WHATSAPP_URL } from '@/lib/data';

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProject, setSelectedProject] = useState<typeof portfolio[0] | null>(null);

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
              Real websites we&apos;ve built for real businesses. Click any project to preview the full design!
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Card 
                key={index} 
                className="overflow-hidden group cursor-pointer transform transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl px-8 py-5 shadow-2xl text-center">
                        <Icons.ExternalLink className="w-10 h-10 text-primary-600 mx-auto mb-2" />
                        <p className="font-bold text-dark-900 text-lg">Click to Preview</p>
                        <p className="text-sm text-dark-500">Full Website Design</p>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/95 backdrop-blur-sm text-dark-900 text-sm font-bold rounded-full shadow-lg flex items-center gap-2">
                      <Icons.ExternalLink className="w-4 h-4" />
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute bottom-4 right-4">
                    <div className="px-3 py-1.5 bg-green-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                      <Icons.CheckCircle className="w-3 h-3" />
                      Live Project
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-dark-900 mb-2 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-600 text-sm mb-5">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.features.slice(0, 3).map((feature, i) => (
                      <span key={i} className="px-3 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="border-t border-gray-100 pt-5">
                    <h4 className="text-xs font-bold text-dark-400 uppercase tracking-wider mb-3">Results Achieved</h4>
                    <div className="grid grid-cols-3 gap-2">
                      {project.results.map((result, i) => (
                        <div key={i} className="text-center p-2 bg-green-50 rounded-lg">
                          <p className="text-xs font-bold text-green-700">{result.split(' ')[0]}</p>
                          <p className="text-[10px] text-green-600">{result.split(' ').slice(1).join(' ')}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="relative max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-dark-900/50 hover:bg-dark-900 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <Icons.X className="w-6 h-6" />
            </button>
            
            <div className="relative aspect-video w-full">
              <Image
                src={selectedProject.image}
                alt={selectedProject.title}
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <span className="px-4 py-1 bg-primary-500 text-sm font-bold rounded-full mb-3 inline-block">
                  {selectedProject.category}
                </span>
                <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                <p className="text-lg opacity-90">{selectedProject.description}</p>
              </div>
            </div>

            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-bold text-dark-900 mb-4">Features Included</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProject.features.map((feature, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Icons.CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-dark-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-dark-900 mb-4">Results Achieved</h3>
                  <div className="space-y-3">
                    {selectedProject.results.map((result, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-green-50 rounded-xl">
                        <Icons.TrendingUp className="w-6 h-6 text-green-500" />
                        <span className="text-dark-700 font-medium">{result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-dark-600">
                  Want a similar website for <strong>your business</strong>? Get a free consultation!
                </p>
                <div className="flex gap-3">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Button className="bg-green-500 hover:bg-green-600">
                      <Icons.MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </Button>
                  </a>
                  <Link href="/contact" onClick={() => setSelectedProject(null)}>
                    <Button variant="gradient">
                      Get Free Quote
                      <Icons.ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="section-padding bg-gradient-to-br from-primary-600 to-accent-600">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="heading-2 mb-6">
              Like What You See?
            </h2>
            <p className="subheading text-white/80 mb-8">
              Get a stunning website like this for YOUR business. Click below for a free consultation!
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-primary-600 hover:bg-gray-100 shadow-xl">
                  Get Free Consultation
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
