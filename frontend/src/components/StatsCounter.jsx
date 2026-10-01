import { memo } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { FaBox, FaMapMarkedAlt, FaChartLine, FaHeadset, FaUsers } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { ANIMATION_VARIANTS, reducedMotion } from '../config/constants';

const STATS = [
  { id: 1, value: 500, suffix: '+', icon: FaUsers, label: 'Active Carriers', description: 'Owner-operators and fleet owners trusting us' },
  { id: 2, value: 10000, suffix: '+', icon: FaBox, label: 'Loads Booked Monthly', description: 'Consistent freight opportunities' },
  { id: 3, value: 48, suffix: '', icon: FaMapMarkedAlt, label: 'States Covered', description: 'Nationwide coverage reach' },
  { id: 4, value: 30, suffix: '%', icon: FaChartLine, label: 'Average Revenue Growth', description: 'Increase within first 3 months' },
  { id: 5, value: 24, suffix: '/7', icon: FaHeadset, label: 'Dispatch Support', description: 'Round-the-clock assistance' }
];

const StatsCounter = () => {
  const prefersReducedMotion = reducedMotion();

  return (
    <section className="py-20 bg-[#0F1B2E] text-white">
      <div className="container-custom">
        <SectionHeader
          title="Trusted by Carriers Across America"
          subtitle="From owner-operators to growing fleets, NEXMOVE helps carriers maximize revenue, reduce deadhead miles, and keep trucks moving nationwide."
          className="[&_h2]:text-white [&_p]:text-gray-300"
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: '-100px' }}
          variants={prefersReducedMotion ? {} : ANIMATION_VARIANTS.fadeInUp}
          className="mt-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6">
            {STATS.map((stat, index) => (
              <StatCard key={stat.id} stat={stat} index={index} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const StatCard = memo(({ stat, index }) => {
  return (
    <motion.div
      initial={reducedMotion() ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="bg-white/10 backdrop-blur-md rounded-xl p-4 md:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300"
    >
      <div className="flex flex-col items-center text-center">
        <div className="bg-[#2C5F8A]/20 w-12 h-12 rounded-lg flex items-center justify-center mb-3">
          <stat.icon className="text-2xl text-[#2C5F8A]" aria-hidden="true" />
        </div>

        <div className="text-2xl md:text-3xl font-bold text-[#4A90A4] mb-1">
          {reducedMotion() ? (
            <span>{stat.value}{stat.suffix}</span>
          ) : (
            <>
              <CountUp
                start={0}
                end={stat.value}
                duration={2}
                separator=","
                useEasing={true}
                useGrouping={true}
              />
              <span className="text-lg ml-0.5">{stat.suffix}</span>
            </>
          )}
        </div>

        <h3 className="text-sm md:text-base font-semibold text-white mb-1">{stat.label}</h3>
        <p className="text-xs text-gray-400 hidden md:block">{stat.description}</p>
      </div>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export default memo(StatsCounter);
