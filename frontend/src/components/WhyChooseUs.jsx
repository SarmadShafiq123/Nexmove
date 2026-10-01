import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaDollarSign, FaUsers, FaClock, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { reducedMotion } from '../config/constants';

const BENEFITS = [
  { icon: FaDollarSign, title: 'Increase Revenue', description: 'Our carriers see an average 25-30% increase in revenue within the first 3 months.' },
  { icon: FaUsers, title: 'Experienced Team', description: '10+ years of combined experience in the trucking and logistics industry.' },
  { icon: FaClock, title: 'Save Time', description: 'Focus on driving while we handle all dispatch operations, paperwork, and negotiations.' },
  { icon: FaShieldAlt, title: 'Transparent Pricing', description: 'No hidden fees. Simple, transparent pricing structure with no long-term contracts.' },
  { icon: FaChartBar, title: 'Performance Tracking', description: 'Real-time access to your revenue, miles, and performance metrics through our portal.' },
  { icon: FaCheckCircle, title: 'Proven Results', description: 'Over 500+ satisfied carriers nationwide trust us with their dispatch operations.' }
];

const benefitsContainerVariants = reducedMotion() ? {
  animate: { opacity: 1 }
} : {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } }
};

const benefitCardVariants = reducedMotion() ? {} : {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const WhyChooseUs = () => {
  const prefersReducedMotion = reducedMotion();

  return (
    <section id="about" className="py-16 bg-white">
      <div className="container-custom">
        <SectionHeader
          title="Why Choose NEXMOVE?"
          subtitle="We are dedicated to helping carriers maximize their profits and streamline their operations"
        />

        <motion.div
          initial={prefersReducedMotion ? 'animate' : 'initial'}
          whileInView="animate"
          viewport={{ once: true }}
          variants={benefitsContainerVariants}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {BENEFITS.map((benefit) => (
            <BenefitCard key={benefit.title} benefit={benefit} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const BenefitCard = memo(({ benefit }) => {
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.article
      variants={benefitCardVariants}
      whileHover={prefersReducedMotion ? {} : { y: -5, transition: { duration: 0.2 } }}
      className="text-center bg-white p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
    >
      <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
        <benefit.icon className="text-3xl text-[#2C5F8A]" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2">{benefit.title}</h3>
      <p className="text-gray-600 leading-relaxed text-sm">{benefit.description}</p>
    </motion.article>
  );
});

BenefitCard.displayName = 'BenefitCard';

export default memo(WhyChooseUs);
