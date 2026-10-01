import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaFileAlt, FaHandshake, FaTruck, FaChartLine, FaArrowRight } from 'react-icons/fa';
import { SectionHeader } from '../components/shared/SectionHeader';
import { Button } from '../components/shared/Button';
import { ANIMATION_VARIANTS } from '../config/constants';

const STEPS = [
  {
    icon: FaFileAlt, title: 'Submit Application', step: '01',
    description: 'Fill out our simple carrier application form with your MC/DOT numbers and truck information.',
    details: ['Complete online application', 'Provide MC/DOT numbers', 'Submit truck specifications', 'Share current operation details']
  },
  {
    icon: FaHandshake, title: 'Quick Approval', step: '02',
    description: 'Our team reviews your application and gets back to you within 24 hours.',
    details: ['Application review process', 'Authority verification', 'Insurance confirmation', 'Approval notification']
  },
  {
    icon: FaTruck, title: 'Start Hauling', step: '03',
    description: 'We immediately start finding the best loads for your truck and keeping it moving.',
    details: ['Dedicated dispatcher assigned', 'Load booking begins', 'Route optimization', 'Continuous support']
  },
  {
    icon: FaChartLine, title: 'Grow Your Business', step: '04',
    description: 'Watch your revenue grow while we handle all dispatch operations and negotiations.',
    details: ['Track performance metrics', 'Receive weekly reports', 'Revenue optimization', 'Business expansion support']
  }
];

const HowItWorksPage = () => {
  return (
    <main className="pt-20">
      <ProcessSection />
      <TimelineSection />
      <CTASection />
    </main>
  );
};

const ProcessSection = memo(() => (
  <section className="py-20 bg-[#0F1B2E] text-white">
    <div className="container-custom">
      <SectionHeader
        title="How It Works"
        subtitle="Getting started with NEXMOVE is simple and straightforward"
        className="[&_h2]:text-white [&_p]:text-gray-300"
      />
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {STEPS.map((step, index) => (
          <StepCard key={step.step} step={step} index={index} isLast={index === STEPS.length - 1} />
        ))}
      </div>
    </div>
  </section>
));
ProcessSection.displayName = 'ProcessSection';

const StepCard = memo(({ step, index, isLast }) => (
  <motion.article
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.fadeInUp}
    transition={{ delay: index * 0.15 }}
    className="relative"
  >
    <div className="bg-white/10 backdrop-blur-sm p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 h-full">
      <div className="text-6xl font-bold text-white/20 mb-4" aria-label={`Step ${step.step}`}>{step.step}</div>
      <div className="bg-[#2C5F8A]/20 w-16 h-16 rounded-full flex items-center justify-center mb-6">
        <step.icon className="text-3xl text-[#2C5F8A]" aria-hidden="true" />
      </div>
      <h3 className="text-xl font-bold mb-3">{step.title}</h3>
      <p className="text-gray-300 leading-relaxed">{step.description}</p>
    </div>
    {!isLast && (
      <div className="hidden lg:block absolute top-1/2 -right-4 -translate-y-1/2 z-10" aria-hidden="true">
        <div className="w-8 h-0.5 bg-white/40"></div>
      </div>
    )}
  </motion.article>
));
StepCard.displayName = 'StepCard';

const TimelineSection = memo(() => (
  <section className="py-20 bg-white">
    <div className="container-custom">
      <SectionHeader
        title="Detailed Process Timeline"
        subtitle="A step-by-step breakdown of your journey with NEXMOVE"
      />
      <div className="max-w-4xl mx-auto">
        {STEPS.map((step, index) => (
          <TimelineItem key={step.step} step={step} index={index} />
        ))}
      </div>
    </div>
  </section>
));
TimelineSection.displayName = 'TimelineSection';

const TimelineItem = memo(({ step, index }) => (
  <motion.div
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ delay: index * 0.2 }}
    className="flex gap-6 mb-12 last:mb-0"
  >
    <div className="flex flex-col items-center">
      <div className="bg-[#2C5F8A] w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
        {step.step}
      </div>
      {index < STEPS.length - 1 && (
        <div className="w-0.5 h-full bg-blue-100 mt-4"></div>
      )}
    </div>
    <div className="flex-1 pb-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-3">{step.title}</h3>
      <p className="text-gray-600 mb-4">{step.description}</p>
      <ul className="space-y-2">
        {step.details.map((detail, idx) => (
          <li key={idx} className="flex items-center text-gray-700">
            <FaArrowRight className="text-[#2C5F8A] mr-3 flex-shrink-0" />
            {detail}
          </li>
        ))}
      </ul>
    </div>
  </motion.div>
));
TimelineItem.displayName = 'TimelineItem';

const CTASection = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="container-custom">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="bg-[#0F1B2E] rounded-2xl p-12 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-xl mb-8 text-gray-300">Join our network of successful carriers today</p>
        <Link to="/contact">
          <Button variant="primary" size="lg">
            Start Your Application
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
));
CTASection.displayName = 'CTASection';

export default memo(HowItWorksPage);
