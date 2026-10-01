import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaTruck, FaRoute, FaFileInvoiceDollar, FaHeadset, FaArrowRight } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { Button } from './shared/Button';
import { reducedMotion } from '../config/constants';

const SERVICES_PREVIEW = [
  { icon: FaTruck, title: 'Load Booking', description: 'We find and book the most profitable loads for your trucks.' },
  { icon: FaRoute, title: 'Route Optimization', description: 'Smart route planning to reduce empty miles and increase profits.' },
  { icon: FaFileInvoiceDollar, title: 'Rate Negotiation', description: 'Expert negotiation to secure the best rates for every load.' },
  { icon: FaHeadset, title: '24/7 Support', description: 'Round-the-clock dispatch support to keep your trucks moving.' }
];

const servicesContainerVariants = reducedMotion() ? {
  animate: { opacity: 1 }
} : {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const serviceCardVariants = reducedMotion() ? {} : {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const ServicesPreview = () => {
  const prefersReducedMotion = reducedMotion();

  return (
    <section id="services" className="py-16 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Our Dispatch Services"
          subtitle="Professional dispatch solutions to maximize your trucking business"
        />

        <motion.div
          initial={prefersReducedMotion ? 'animate' : 'initial'}
          whileInView="animate"
          viewport={{ once: true }}
          variants={servicesContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES_PREVIEW.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </motion.div>

        <motion.div
          initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="text-center mt-10"
        >
          <Link to="/services">
            <Button variant="primary" size="lg">
              View All Services
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

const ServiceCard = memo(({ service }) => {
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.article
      variants={serviceCardVariants}
      whileHover={prefersReducedMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="bg-blue-50 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
        <service.icon className="text-2xl text-[#2C5F8A]" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{service.title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{service.description}</p>
    </motion.article>
  );
});

ServiceCard.displayName = 'ServiceCard';

export default memo(ServicesPreview);
