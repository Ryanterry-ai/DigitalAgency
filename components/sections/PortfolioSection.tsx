'use client';

import Link from 'next/link';
import { Icons } from '@/components/ui/Icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { portfolio, WHATSAPP_URL } from '@/lib/data';

const categoryImages: Record<string, string> = {
  salon: 'from-pink-500 to-rose-500',
  dental: 'from-blue-500 to-cyan-500',
  gym: 'from-orange-500 to-red-500',
  restaurant: 'from-yellow-500 to-orange-500',
  fashion: 'from-purple-500 to-pink-500',
  cafe: 'from-amber-500 to-yellow-500',
  pharmacy: 'from-green-500 to-emerald-500',
  tech: 'from-blue-600 to-indigo-600',
  tiffin: 'from-green-500 to-teal-500',
  pet: 'from-amber-400 to-orange-400',
  education: 'from-indigo-500 to-purple-500',
  auto: 'from-gray-600 to-gray-800',
};

export default function PortfolioSection() {
  const featuredProjects = portfolio.slice(0, 6);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 bg-primary-100 text-primary-600 rounded-full text-sm font-semibold mb-4">
            Our Work
          </span>
          <h2 className="heading-2 text-dark-900 mt-3 mb-4">
            Results That Speak for <span className="text-gradient">Themselves</span>
          </h2>
          <p className="subheading text-dark-600">
            See how we&apos;ve helped 150+ businesses across India achieve their digital goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project, index) => {
            const gradient = categoryImages[project.image] || 'from-gray-500 to-gray-600';
            return (
              <Card 
                key={index} 
                hover 
                className="group overflow-hidden"
              >
                <div className={`aspect-[4/3] bg-gradient-to-br ${gradient} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center transform transition-transform duration-500 group-hover:scale-110">
                      <Icons.Building2 className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-500 flex items-center justify-center">
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

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-dark-900 text-xs font-semibold rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>
                
                <div className="p-5">
                  <h3 className="text-lg font-bold text-dark-900 mb-1 group-hover:text-primary-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-dark-600 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-dark-600 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600 font-medium">
                    <Icons.TrendingUp className="w-4 h-4 mr-1" />
                    {project.results[0]}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <Link href="/portfolio">
            <Button size="lg" className="shadow-lg shadow-primary-500/25">
              View All 150+ Projects
              <Icons.ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
