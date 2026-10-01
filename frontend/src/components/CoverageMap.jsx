import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTruck, FaRoad } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { ANIMATION_VARIANTS } from '../config/constants';

const STATS = [
  { icon: FaMapMarkerAlt, value: '48', label: 'States Covered' },
  { icon: FaTruck, value: '500+', label: 'Active Carriers' },
  { icon: FaRoad, value: '10K+', label: 'Loads Per Month' }
];

const SERVICE_AREAS = [
  'Northeast Corridor', 'Southeast Region', 'Midwest Hub', 'Southwest Routes',
  'West Coast', 'Great Plains', 'Rocky Mountains', 'Gulf Coast'
];

const CoverageMap = () => {
  return (
    <section className="py-16 bg-[#0F1B2E] text-white">
      <div className="container-custom">
        <SectionHeader
          title="Nationwide Coverage"
          subtitle="We operate across all 48 continental states, ensuring your trucks are always loaded and moving"
          className="[&_h2]:text-white [&_p]:text-gray-300"
        />

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {STATS.map((stat, index) => (
            <StatCard key={stat.label} stat={stat} index={index} />
          ))}
        </div>

        <ServiceAreas />
      </div>
    </section>
  );
};

const StatCard = memo(({ stat, index }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.1 }}
    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 text-center"
  >
    <stat.icon className="text-4xl text-[#2C5F8A] mx-auto mb-3" aria-hidden="true" />
    <div className="text-3xl font-bold text-[#4A90A4] mb-1">{stat.value}</div>
    <div className="text-gray-300 text-sm">{stat.label}</div>
  </motion.div>
));
StatCard.displayName = 'StatCard';

const ServiceAreas = memo(() => (
  <motion.div
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.fadeInUp}
    className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20"
  >
    <div className="text-center">
      <h3 className="text-xl font-bold mb-5">Key Service Areas</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-300 text-sm">
        {SERVICE_AREAS.map((area) => (
          <div key={area} className="flex items-center justify-center">
            <FaMapMarkerAlt className="mr-1.5 text-[#2C5F8A] flex-shrink-0 text-sm" aria-hidden="true" />
            <span>{area}</span>
          </div>
        ))}
      </div>
    </div>
  </motion.div>
));
ServiceAreas.displayName = 'ServiceAreas';

export default memo(CoverageMap);
