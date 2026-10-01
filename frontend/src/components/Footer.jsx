import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaTruck, FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { NAV_ITEMS, CONTACT_INFO, SOCIAL_LINKS, reducedMotion } from '../config/constants';

const SERVICES_LIST = [
  'Load Booking', 'Route Optimization', 'Rate Negotiation',
  '24/7 Dispatch Support', 'Business Analytics', 'Compliance Assistance'
];

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms of Service', href: '#' },
  { label: 'Cookie Policy', href: '#' }
];

const Footer = () => {
  const prefersReducedMotion = reducedMotion();

  return (
    <footer className="bg-[#0F1B2E] text-gray-300">
      <div className="container-custom py-10">
        <motion.div
          initial={prefersReducedMotion ? 'animate' : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="grid md:grid-cols-4 gap-6 mb-6">
            <BrandSection />
            <QuickLinks />
            <ServicesSection />
            <ContactSection />
          </div>
          <FooterBottom />
        </motion.div>
      </div>
    </footer>
  );
};

const BrandSection = memo(() => (
  <div>
    <div className="flex items-center space-x-2 mb-3">
      <FaTruck className="text-2xl text-[#2C5F8A]" aria-hidden="true" />
      <span className="text-xl font-bold text-white">NEXMOVE</span>
    </div>
    <p className="mb-3 text-gray-400 text-sm">
      Professional truck dispatch services helping carriers maximize their revenue nationwide.
    </p>
    <SocialLinks />
  </div>
));
BrandSection.displayName = 'BrandSection';

const SocialLinks = memo(() => (
  <div className="flex space-x-3" role="list">
    {Object.entries(SOCIAL_LINKS).map(([platform, url]) => {
      const Icon = { facebook: FaFacebook, twitter: FaTwitter, linkedin: FaLinkedin, instagram: FaInstagram }[platform];
      return (
        <a
          key={platform}
          href={url}
          className="text-gray-400 hover:text-[#2C5F8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] rounded-md p-1 min-h-[44px] min-w-[44px] flex items-center justify-center"
          aria-label={`Follow us on ${platform}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon className="text-xl" aria-hidden="true" />
        </a>
      );
    })}
  </div>
));
SocialLinks.displayName = 'SocialLinks';

const QuickLinks = memo(() => (
  <div>
    <h3 className="text-white font-bold text-base mb-3">Quick Links</h3>
    <nav aria-label="Footer navigation">
      <ul className="space-y-1.5 text-sm">
        {NAV_ITEMS.map((item) => (
          <li key={item.id}>
            <Link to={item.path} className="hover:text-[#2C5F8A] transition-colors focus:outline-none focus:text-[#2C5F8A] min-h-[44px] flex items-center">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  </div>
));
QuickLinks.displayName = 'QuickLinks';

const ServicesSection = memo(() => (
  <div>
    <h3 className="text-white font-bold text-base mb-3">Services</h3>
    <ul className="space-y-1.5 text-sm">
      {SERVICES_LIST.map((service) => (
        <li key={service} className="text-gray-400">{service}</li>
      ))}
    </ul>
  </div>
));
ServicesSection.displayName = 'ServicesSection';

const ContactSection = memo(() => (
  <div>
    <h3 className="text-white font-bold text-base mb-3">Contact Info</h3>
    <address className="not-italic space-y-2 text-sm">
      <div className="flex items-start">
        <FaMapMarkerAlt className="mr-2 mt-0.5 text-[#2C5F8A] flex-shrink-0 text-sm" aria-hidden="true" />
        <span className="text-gray-400">
          {CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}
        </span>
      </div>
      <div className="flex items-center">
        <FaPhone className="mr-2 text-[#2C5F8A] text-sm" aria-hidden="true" />
        <a href={CONTACT_INFO.phoneHref} className="hover:text-[#2C5F8A] transition-colors focus:outline-none min-h-[44px] flex items-center">
          {CONTACT_INFO.phone}
        </a>
      </div>
      <div className="flex items-center">
        <FaEnvelope className="mr-2 text-[#2C5F8A] text-sm" aria-hidden="true" />
        <a href={CONTACT_INFO.emailHref} className="hover:text-[#2C5F8A] transition-colors focus:outline-none break-all">
          {CONTACT_INFO.email}
        </a>
      </div>
    </address>
  </div>
));
ContactSection.displayName = 'ContactSection';

const FooterBottom = memo(() => (
  <div className="border-t border-white/10 pt-6">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      <p className="text-gray-400 text-xs">© 2026 NEXMOVE Dispatch Services. All rights reserved.</p>
      <nav aria-label="Legal navigation">
        <div className="flex space-x-5 text-xs">
          {LEGAL_LINKS.map((link) => (
            <a key={link.label} href={link.href} className="text-gray-400 hover:text-[#2C5F8A] transition-colors focus:outline-none focus:text-[#2C5F8A]">
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  </div>
));
FooterBottom.displayName = 'FooterBottom';

export default memo(Footer);
