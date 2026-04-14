'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Icons } from '@/components/ui/Icons';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { portfolio, WHATSAPP_URL } from '@/lib/data';

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredProjects.map((project, index) => (
            <Card 
              key={index} 
              hover 
              className="group overflow-hidden"
            >
              <a 
                href={project.demo} 
                target="_blank" 
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="bg-white rounded-xl px-5 py-3 shadow-xl flex items-center gap-2">
                        <Icons.ExternalLink className="w-5 h-5 text-primary-600" />
                        <span className="font-semibold text-dark-900">View Demo</span>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/95 backdrop-blur-sm text-dark-900 text-xs font-semibold rounded-full shadow-lg">
                      {project.category}
                    </span>
                  </div>
                </div>
              </a>
              
              <div className="p-5">
                <h3 className="text-lg font-bold text-dark-900 mb-1 group-hover:text-primary-600 transition-colors">
                  {project.title}
                </h3>
                <p className="text-dark-600 text-sm mb-3 line-clamp-2">
                  {project.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    {project.features.slice(0, 2).map((feature, i) => (
                      <span key={i} className="px-2 py-0.5 bg-gray-100 text-dark-600 text-xs rounded-full">
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center text-green-600 text-sm font-medium">
                    <Icons.TrendingUp className="w-4 h-4 mr-1" />
                    {project.results[0].split(' ')[0]}
                  </div>
                </div>
              </div>
            </Card>
          ))}
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
