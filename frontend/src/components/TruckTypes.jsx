import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from './shared/SectionHeader';
import { reducedMotion } from '../config/constants';

import semiTruckImage from '../assets/semi.png';
import boxTruckImage from '../assets/box.png';
import hotshotImage from '../assets/hotshot.png';

const TRUCK_TYPES = [
  {
    id: 'semi-truck',
    title: 'Semi Truck',
    image: semiTruckImage,
    description: 'Professional dispatch services for owner-operators and fleet owners running semi trucks nationwide.',
    commission: '5% Fees (Negotiable)'
  },
  {
    id: 'box-truck',
    title: 'Box Truck',
    image: boxTruckImage,
    description: 'Dedicated dispatch support for box truck operators seeking consistent and profitable freight opportunities.',
    commission: '7% Fees (Negotiable)'
  },
  {
    id: 'hotshot',
    title: 'Hotshot',
    image: hotshotImage,
    description: 'Fast and reliable dispatch services for hotshot carriers looking to maximize load availability and revenue.',
    commission: '5% Fees (Negotiable)'
  }
];

const truckTypesContainerVariants = reducedMotion() ? {
  animate: { opacity: 1 }
} : {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const truckCardVariants = reducedMotion() ? {} : {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const TruckTypes = () => {
  const prefersReducedMotion = reducedMotion();

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          title="Truck Types We Dispatch"
          subtitle="Professional dispatch services tailored for different trucking operations."
        />

        <motion.div
          initial={prefersReducedMotion ? 'animate' : 'initial'}
          whileInView="animate"
          viewport={{ once: true }}
          variants={truckTypesContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {TRUCK_TYPES.map((truck) => (
            <TruckTypeCard key={truck.id} truck={truck} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const TruckTypeCard = memo(({ truck }) => {
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.article
      initial={prefersReducedMotion ? 'animate' : 'initial'}
      whileInView="animate"
      viewport={{ once: true }}
      variants={truckCardVariants}
      whileHover={prefersReducedMotion ? {} : { scale: 1.03, y: -8, transition: { duration: 0.25 } }}
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-56 overflow-hidden">
        <img
          src={truck.image}
          alt={truck.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-3">{truck.title}</h3>
        <p className="text-gray-600 leading-relaxed mb-5">{truck.description}</p>
        <div className="pt-4 border-t border-gray-100">
          <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 text-[#2C5F8A] font-semibold text-sm">
            {truck.commission}
          </span>
        </div>
      </div>
    </motion.article>
  );
});

TruckTypeCard.displayName = 'TruckTypeCard';

export default memo(TruckTypes);
