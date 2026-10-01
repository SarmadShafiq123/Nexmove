export const TRUCK_TYPES = [
  { value: 'Dry Van', label: 'Dry Van' },
  { value: 'Reefer', label: 'Reefer' },
  { value: 'Flatbed', label: 'Flatbed' },
  { value: 'Step Deck', label: 'Step Deck' },
  { value: 'Box Truck', label: 'Box Truck' },
  { value: 'Other', label: 'Other' }
];

export const CONTACT_INFO = {
  phone: '+1 (602) 325-3303',
  phoneHref: 'tel:+16023253303',
  email: 'nexmovepro@gmail.com',
  emailHref: 'mailto:nexmovepro@gmail.com',
  address: {
    street: 'San Diego',
    suite: '',
    city: 'San Diego',
    state: 'CA',
    zip: ''
  }
};

export const NAV_ITEMS = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'services', label: 'Services', path: '/services' },
  { id: 'how-it-works', label: 'How It Works', path: '/how-it-works' },
  { id: 'about', label: 'About', path: '/about' },
  { id: 'contact', label: 'Contact', path: '/contact' }
];

export const SOCIAL_LINKS = {
  facebook: 'https://facebook.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
  instagram: 'https://instagram.com'
};

// Animation variants for Framer Motion
export const ANIMATION_VARIANTS = {
  fadeInUp: {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  },
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6 }
  },
  staggerChildren: {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  fadeInScale: {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5 }
  },
  fadeInUpStagger: {
    initial: { opacity: 0, y: 30 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  }
};

// Check for reduced motion preference
export const reducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

// Reduced motion variants
export const getReducedMotionVariants = () => ({
  fadeInUp: {
    initial: { opacity: 1, y: 0 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0 }
  },
  fadeInScale: {
    initial: { opacity: 1, scale: 1 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0 }
  }
});
