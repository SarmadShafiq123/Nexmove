import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  FaTruck, FaRoute, FaFileInvoiceDollar, FaHeadset,
  FaChartLine, FaMapMarkedAlt, FaCheckCircle,
  FaDollarSign, FaUsers, FaClock, FaShieldAlt, FaChartBar
} from 'react-icons/fa';
import { SectionHeader } from '../components/shared/SectionHeader';
import { ANIMATION_VARIANTS } from '../config/constants';

import dryVanImg from '../assets/dry.png';
import reeferImg from '../assets/refer.png';
import stepDeckImg from '../assets/step.png';
import flatbedImg from '../assets/flat.png';
import conestogaImg from '../assets/conn.png';
import rgnImg from '../assets/RGN.png';

const SERVICES = [
  { icon: FaTruck, title: 'Load Booking', description: 'We find and book the most profitable loads for your trucks, ensuring maximum utilization and revenue.' },
  { icon: FaRoute, title: 'Route Optimization', description: 'Smart route planning to reduce empty miles and increase your profit margins significantly.' },
  { icon: FaFileInvoiceDollar, title: 'Rate Negotiation', description: 'Expert negotiation with brokers and shippers to secure the best rates for every load.' },
  { icon: FaHeadset, title: '24/7 Support', description: 'Round-the-clock dispatch support to keep your trucks moving and your business running smoothly.' },
  { icon: FaChartLine, title: 'Business Analytics', description: 'Detailed reports and insights to help you make data-driven decisions for your trucking business.' },
  { icon: FaMapMarkedAlt, title: 'Nationwide Coverage', description: 'Access to loads across all 48 states, ensuring your trucks are always on the move.' }
];

const BENEFITS = [
  { icon: FaDollarSign, title: 'Increase Revenue', description: 'Our carriers see an average 25-30% increase in revenue within the first 3 months.' },
  { icon: FaUsers, title: 'Experienced Team', description: '10+ years of combined experience in the trucking and logistics industry.' },
  { icon: FaClock, title: 'Save Time', description: 'Focus on driving while we handle all dispatch operations, paperwork, and negotiations.' },
  { icon: FaShieldAlt, title: 'Transparent Pricing', description: 'No hidden fees. Simple, transparent pricing structure with no long-term contracts.' },
  { icon: FaChartBar, title: 'Performance Tracking', description: 'Real-time access to your revenue, miles, and performance metrics through our portal.' },
  { icon: FaCheckCircle, title: 'Proven Results', description: 'Over 500+ satisfied carriers nationwide trust us with their dispatch operations.' }
];

const TRAILER_TYPES = [
  {
    id: 'dry-van',
    title: 'Dry Van',
    image: dryVanImg,
    alt: 'Dry van trailer dispatch',
    description: 'Standard enclosed trailer dispatch for general freight nationwide.',
    fee: '5% Fees (Negotiable)'
  },
  {
    id: 'reefer',
    title: 'Reefer',
    image: reeferImg,
    alt: 'Reefer trailer dispatch',
    description: 'Temperature-controlled dispatch for perishable and sensitive cargo.',
    fee: '5% Fees (Negotiable)'
  },
  {
    id: 'step-deck',
    title: 'Step Deck',
    image: stepDeckImg,
    alt: 'Step deck trailer dispatch',
    description: 'Lower deck height dispatch for tall equipment and specialized freight.',
    fee: '5% Fees (Negotiable)'
  },
  {
    id: 'flatbed',
    title: 'Flatbed',
    image: flatbedImg,
    alt: 'Flatbed trailer dispatch',
    description: 'Open-deck dispatch for oversized, machinery, and construction loads.',
    fee: '5% Fees (Negotiable)'
  },
  {
    id: 'conestoga',
    title: 'Conestoga',
    image: conestogaImg,
    alt: 'Conestoga trailer dispatch',
    description: 'Curtain-side trailer dispatch combining flatbed flexibility with weather protection.',
    fee: '5% Fees (Negotiable)'
  },
  {
    id: 'rgn',
    title: 'RGN',
    image: rgnImg,
    alt: 'RGN removable gooseneck trailer dispatch',
    description: 'Removable gooseneck dispatch for heavy equipment and hard-to-load machinery.',
    fee: '5% Fees (Negotiable)'
  }
];

const FEATURE_LIST = [
  'Real-time Load Tracking', 'Automated Rate Confirmation', 'Weekly Performance Reports',
  'Dedicated Dispatcher', 'Back Office Support', 'Fuel Optimization',
  'Compliance Monitoring', 'Invoice Management'
];

const ServicesPage = () => {
  return (
    <main className="pt-20">
      <ServicesSection />
      <BenefitsSection />
      <TrailerTypesSection />
      <FeaturesSection />
    </main>
  );
};

const ServicesSection = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="container-custom">
      <SectionHeader
        title="Our Dispatch Services"
        subtitle="Comprehensive solutions designed to maximize your trucking business efficiency and profitability"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICES.map((service, index) => (
          <ServiceCard key={service.title} service={service} index={index} />
        ))}
      </div>
    </div>
  </section>
));
ServicesSection.displayName = 'ServicesSection';

const ServiceCard = memo(({ service, index }) => (
  <motion.article
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.fadeInUp}
    transition={{ delay: index * 0.1 }}
    className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
  >
    <div className="bg-blue-50 w-16 h-16 rounded-lg flex items-center justify-center mb-6">
      <service.icon className="text-3xl text-[#2C5F8A]" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
    <p className="text-gray-600 leading-relaxed">{service.description}</p>
  </motion.article>
));
ServiceCard.displayName = 'ServiceCard';

const BenefitsSection = memo(() => (
  <section className="py-20 bg-white">
    <div className="container-custom">
      <SectionHeader
        title="Why Choose NEXMOVE?"
        subtitle="We are dedicated to helping carriers maximize their profits and streamline their operations"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BENEFITS.map((benefit, index) => (
          <BenefitCard key={benefit.title} benefit={benefit} index={index} />
        ))}
      </div>
    </div>
  </section>
));
BenefitsSection.displayName = 'BenefitsSection';

const BenefitCard = memo(({ benefit, index }) => (
  <motion.article
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="text-center"
  >
    <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <benefit.icon className="text-4xl text-[#2C5F8A]" aria-hidden="true" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
    <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
  </motion.article>
));
BenefitCard.displayName = 'BenefitCard';

const TrailerTypesSection = memo(() => (
  <section id="trailer-types" className="py-20 bg-gray-50">
    <div className="container-custom">
      <SectionHeader
        title="Trailer Types We Dispatch"
        subtitle="Every trailer type your freight needs, dispatched by our team."
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
        {TRAILER_TYPES.map((trailer, index) => (
          <TrailerCard key={trailer.id} trailer={trailer} index={index} />
        ))}
      </div>
    </div>
  </section>
));
TrailerTypesSection.displayName = 'TrailerTypesSection';

const TrailerCard = memo(({ trailer, index }) => (
  <motion.article
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.08 }}
    className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:border-[#2C5F8A] border border-transparent transition-all duration-300 group"
  >
    <div className="h-[200px] md:h-[250px] w-full overflow-hidden">
      <img
        src={trailer.image}
        alt={trailer.alt}
        loading="lazy"
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        width="400"
        height="250"
      />
    </div>

    <div className="p-4 md:p-5">
      <h3 className="text-sm md:text-base font-bold text-[var(--color-text)] mb-2">
        {trailer.title}
      </h3>
      <p className="text-gray-500 text-xs md:text-sm leading-relaxed mb-3">
        {trailer.description}
      </p>
      <span className="inline-flex items-center px-3 py-1.5 rounded-full bg-blue-50 text-[#2C5F8A] font-semibold text-xs">
        {trailer.fee}
      </span>
    </div>
  </motion.article>
));
TrailerCard.displayName = 'TrailerCard';

const FeaturesSection = memo(() => (
  <section className="py-20 bg-[#0F1B2E] text-white">
    <div className="container-custom">
      <SectionHeader
        title="Service Features"
        subtitle="Everything you need to succeed in the trucking industry"
        className="[&_h2]:text-white [&_p]:text-gray-300"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
        {FEATURE_LIST.map((feature, index) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20"
          >
            <FaCheckCircle className="text-[#2C5F8A] text-2xl mb-3" />
            <p className="font-semibold">{feature}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));
FeaturesSection.displayName = 'FeaturesSection';

export default memo(ServicesPage);
