'use client';

import { Icons } from '@/components/ui/Icons';
import Card from '@/components/ui/Card';
import { testimonials } from '@/lib/data';

export default function TestimonialsSection() {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="heading-2 text-dark-900 mt-3 mb-4">
            What Our Clients Say
          </h2>
          <p className="subheading text-dark-600">
            Hear from business owners who&apos;ve transformed their online presence with us.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="relative">
              <div className="absolute -top-4 left-8">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-full flex items-center justify-center">
                  <Icons.Quote className="w-5 h-5 text-white" />
                </div>
              </div>
              
              <div className="p-8 pt-6">
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Icons.Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className="text-dark-700 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center text-white font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900">{testimonial.name}</h4>
                    <p className="text-sm text-dark-500">{testimonial.business}</p>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
