import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaFileAlt, FaHandshake, FaTruck, FaChartLine } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { ANIMATION_VARIANTS } from '../config/constants';

const STEPS = [
  { icon: FaFileAlt, title: 'Submit Application', step: '01', description: 'Fill out our simple carrier application form with your MC/DOT numbers and truck information.' },
  { icon: FaHandshake, title: 'Quick Approval', step: '02', description: 'Our team reviews your application and gets back to you within 24 hours.' },
  { icon: FaTruck, title: 'Start Hauling', step: '03', description: 'We immediately start finding the best loads for your truck and keeping it moving.' },
  { icon: FaChartLine, title: 'Grow Your Business', step: '04', description: 'Watch your revenue grow while we handle all dispatch operations and negotiations.' }
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 bg-[#0F1B2E] text-white">
      <div className="container-custom">
        <SectionHeader
          title="How It Works"
          subtitle="Getting started with NEXMOVE is simple and straightforward"
          className="[&_h2]:text-white [&_p]:text-gray-300"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step, index) => (
            <StepCard key={step.step} step={step} index={index} isLast={index === STEPS.length - 1} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = memo(({ step, index, isLast }) => (
  <motion.article
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.fadeInUp}
    transition={{ delay: index * 0.15 }}
    className="relative"
  >
    <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
      <div className="text-5xl font-bold text-white/20 mb-3" aria-label={`Step ${step.step}`}>
        {step.step}
      </div>
      <div className="bg-[#2C5F8A]/20 w-14 h-14 rounded-full flex items-center justify-center mb-4">
        <step.icon className="text-2xl text-[#2C5F8A]" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-bold mb-2">{step.title}</h3>
      <p className="text-gray-300 leading-relaxed text-sm">{step.description}</p>
    </div>
    {!isLast && (
      <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10" aria-hidden="true">
        <div className="w-8 h-0.5 bg-white/40"></div>
      </div>
    )}
  </motion.article>
));

StepCard.displayName = 'StepCard';

export default memo(HowItWorks);
