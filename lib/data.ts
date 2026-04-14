export const WHATSAPP_NUMBER = '919557513017';
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;

export const CONTACT_INFO = {
  name: 'Bijendra',
  email: 'bijendra0509@gmail.com',
  phone: '+91 95575 13017',
  address: 'A-7, Anand Kunj, Birjapur, Mathura, Uttar Pradesh - 281001',
};

export const services = [
  {
    id: 'web-development',
    title: 'Website Development',
    description: 'Custom business websites, landing pages, and eCommerce solutions that convert visitors into customers.',
    icon: 'Globe',
    benefits: ['Responsive Design', 'SEO Optimized', 'Fast Loading', 'Easy to Manage'],
    useCases: ['Business Websites', 'Landing Pages', 'E-commerce Stores', 'Portfolios'],
  },
  {
    id: 'mobile-app',
    title: 'Mobile App Development',
    description: 'Native and cross-platform apps for Android & iOS that deliver exceptional user experiences.',
    icon: 'Smartphone',
    benefits: ['iOS & Android', 'Native Performance', 'Offline Support', 'Push Notifications'],
    useCases: ['E-commerce Apps', 'Business Apps', 'Booking Systems', 'Customer Apps'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Design',
    description: 'User-centered designs that enhance engagement, usability, and conversion rates.',
    icon: 'Palette',
    benefits: ['User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    useCases: ['App Design', 'Website Redesign', 'Brand Identity', 'Design Audit'],
  },
  {
    id: 'seo',
    title: 'SEO & Digital Marketing',
    description: 'Data-driven strategies to improve your visibility and drive organic traffic.',
    icon: 'TrendingUp',
    benefits: ['Keyword Research', 'On-page SEO', 'Content Strategy', 'Analytics'],
    useCases: ['Local SEO', 'Technical SEO', 'Content Marketing', 'PPC Campaigns'],
  },
  {
    id: 'automation',
    title: 'Business Automation',
    description: 'Streamline your operations with WhatsApp automation, CRM systems, and lead management.',
    icon: 'Zap',
    benefits: ['WhatsApp Automation', 'CRM Integration', 'Lead Capture', 'Auto Follow-ups'],
    useCases: ['Lead Generation', 'Customer Support', 'Sales Funnels', 'Reporting'],
  },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: '5K',
    priceEnd: '-10K',
    description: 'Perfect for startups and small businesses needing an online presence.',
    features: [
      '5 Page Responsive Website',
      'Mobile-First Design',
      'Contact Form Integration',
      'Basic SEO Setup',
      'Social Media Links',
      '1 Month Support',
    ],
    popular: false,
  },
  {
    name: 'Growth',
    price: '10K',
    priceEnd: '-25K',
    description: 'Complete business solution with SEO and marketing foundation.',
    features: [
      '10 Page Responsive Website',
      'Advanced SEO Optimization',
      'Lead Capture Forms',
      'Google My Business Setup',
      'Social Media Integration',
      'WhatsApp Integration',
      '3 Months Support',
      'Monthly Analytics Report',
    ],
    popular: true,
  },
  {
    name: 'Premium',
    price: '25K',
    priceEnd: '+',
    description: 'Full digital solution with website, app, and automation.',
    features: [
      'Unlimited Pages Website',
      'Android & iOS App',
      'Business Automation',
      'CRM Integration',
      'WhatsApp Business API',
      'Advanced Analytics Dashboard',
      'Priority Support (12 Months)',
      'Quarterly Strategy Reviews',
      'Dedicated Account Manager',
    ],
    popular: false,
  },
];

export const testimonials = [
  {
    name: 'Rajesh Sharma',
    business: 'Sharma Electronics, Mumbai',
    quote: 'Our online sales increased by 300% after they built our e-commerce website. Professional team, on-time delivery!',
    rating: 5,
  },
  {
    name: 'Priya Patel',
    business: 'FitLife Gym, Ahmedabad',
    quote: 'The mobile app they created for our gym has made member management so much easier. Great communication throughout.',
    rating: 5,
  },
  {
    name: 'Amit Kumar',
    business: 'TechServ Solutions, Bangalore',
    quote: 'Their SEO work put us on page 1 of Google. We now get 50+ qualified leads every month from organic search.',
    rating: 5,
  },
];

export const stats = [
  { value: '200+', label: 'Projects Delivered' },
  { value: '150+', label: 'Happy Clients' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '5+', label: 'Years Experience' },
];

export const portfolio = [
  {
    title: 'GlowUp Salon',
    category: 'Salon & Beauty',
    description: 'Premium beauty salon website with online booking and gallery',
    image: 'https://images.unsplash.com/photo-1560066984-138dadb4c035?w=800&h=600&fit=crop',
    demo: '/demo/salon',
    results: ['200+ weekly bookings', '85% online appointments', '₹3L+ monthly revenue'],
    features: ['Online Booking', 'Service Gallery', 'WhatsApp Integration', 'Reviews Section'],
  },
  {
    title: 'DentCare Clinic',
    category: 'Dental Clinic',
    description: 'Modern dental clinic website with appointment booking',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
    demo: '/demo/dental',
    results: ['150+ appointments/month', 'Page 1 Google ranking', '4.9 star rating'],
    features: ['Online Booking', 'Treatment Info', 'Before/After Gallery', 'Emergency Contact'],
  },
  {
    title: 'FlexFit Gym',
    category: 'Gym & Fitness',
    description: 'High-energy fitness center with membership management',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=600&fit=crop',
    demo: '/demo/gym',
    results: ['500+ active members', '300% social engagement', '₹8L+ monthly memberships'],
    features: ['Membership Plans', 'Class Schedule', 'Trainer Profiles', 'WhatsApp Alerts'],
  },
  {
    title: 'SpiceRoute Restaurant',
    category: 'Restaurant',
    description: 'Fine dining restaurant with online ordering and reservations',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7aad87433a?w=800&h=600&fit=crop',
    demo: '/demo/restaurant',
    results: ['₹5L+ monthly orders', '4.8 Google rating', '1000+ monthly visitors'],
    features: ['Online Ordering', 'Table Reservations', 'Menu with Photos', 'Reviews & Ratings'],
  },
  {
    title: 'StyleKraft Fashion',
    category: 'Clothing & Fashion',
    description: 'Trendy fashion e-commerce store with latest collections',
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=600&fit=crop',
    demo: '/demo/fashion',
    results: ['₹10L+ sales in 6 months', '2000+ products', 'Fast delivery setup'],
    features: ['E-commerce Store', 'Size Guide', ' COD & Online Payment', 'Order Tracking'],
  },
  {
    title: 'UrbanBites Cafe',
    category: 'Cafe & Bakery',
    description: 'Trendy cafe website with custom cake ordering',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
    demo: '/demo/cafe',
    results: ['250+ custom orders/month', '4.7 star reviews', '₹2L+ monthly sales'],
    features: ['Custom Cake Builder', 'Pre-orders', 'Menu & Pricing', 'Location & Hours'],
  },
  {
    title: 'MediCare Pharmacy',
    category: 'Pharmacy',
    description: 'Online pharmacy with medicine delivery tracking',
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&h=600&fit=crop',
    demo: '/demo/pharmacy',
    results: ['500+ monthly orders', 'Same-day delivery', '99% customer satisfaction'],
    features: ['Medicine Delivery', 'Prescription Upload', 'Order Tracking', 'WhatsApp Support'],
  },
  {
    title: 'TechServ Solutions',
    category: 'Professional Services',
    description: 'IT services company with lead generation system',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
    demo: '/demo/tech',
    results: ['50+ qualified leads/month', 'Page 1 Google rankings', '₹25L+ deals closed'],
    features: ['Service Showcase', 'Lead Capture Forms', 'CRM Integration', 'Case Studies'],
  },
  {
    title: 'HomeChef Tiffin',
    category: 'Food Delivery',
    description: 'Tiffin & meal delivery service with subscription plans',
    image: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=600&fit=crop',
    demo: '/demo/tiffin',
    results: ['300+ active subscribers', '95% retention rate', '₹4L+ monthly revenue'],
    features: ['Subscription Plans', 'Menu Updates', 'Delivery Tracking', 'Review System'],
  },
  {
    title: 'PetParadise Store',
    category: 'Pet Care',
    description: 'Pet supplies e-commerce with grooming booking',
    image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=800&h=600&fit=crop',
    demo: '/demo/pet',
    results: ['₹3L+ monthly sales', '200+ grooming bookings', '500+ repeat customers'],
    features: ['Pet Products Store', 'Grooming Booking', 'Vet Consultation', 'Pet Profiles'],
  },
  {
    title: 'EduLearn Academy',
    category: 'Education',
    description: 'Online coaching institute with course enrollment',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    demo: '/demo/education',
    results: ['1000+ enrolled students', '₹15L+ course sales', '4.8 student rating'],
    features: ['Course Enrollment', 'Online Payments', 'Study Materials', 'Demo Videos'],
  },
  {
    title: 'AutoFix Garage',
    category: 'Auto Services',
    description: 'Car service center with online booking and tracking',
    image: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&h=600&fit=crop',
    demo: '/demo/auto',
    results: ['100+ bookings/month', '90% repeat customers', '4.9 star rating'],
    features: ['Service Booking', 'Pickup & Drop', 'Live Updates', 'Service History'],
  },
];

export const portfolioCategories = [
  'All',
  'Salon & Beauty',
  'Gym & Fitness',
  'Restaurant',
  'Healthcare',
  'Fashion',
  'Food Delivery',
  'Professional Services',
  'E-commerce',
];

export const whyChooseUs = [
  {
    title: 'Lightning Fast Delivery',
    description: 'Get your website live in as little as 7 days. We value your time.',
    icon: 'Zap',
  },
  {
    title: 'Premium Quality',
    description: 'Clean code, modern design, and pixel-perfect implementation every time.',
    icon: 'Sparkles',
  },
  {
    title: 'Affordable Pricing',
    description: 'Enterprise-quality work at prices that fit your budget. No hidden costs.',
    icon: 'Wallet',
  },
  {
    title: 'Dedicated Support',
    description: '24/7 support during development. We\'re always here when you need us.',
    icon: 'Headphones',
  },
];

export const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Contact', href: '/contact' },
];
