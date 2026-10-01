import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaTruck, FaChartLine, FaClock } from 'react-icons/fa';
import { Button } from './shared/Button';
import { reducedMotion } from '../config/constants';
import { useNavigate } from 'react-router-dom';

const STATS = [
  { icon: FaTruck, title: 'Fleet Management', desc: '24/7 Support' },
  { icon: FaChartLine, title: 'Revenue Growth', desc: 'Up to 30% More' },
  { icon: FaClock, title: 'Quick Setup', desc: 'Start in 24hrs' },
  { icon: FaArrowRight, title: 'Best Loads', desc: 'Nationwide Coverage' }
];

const heroContentVariants = reducedMotion() ? {
  animate: { opacity: 1, y: 0 }
} : {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const heroItemVariants = reducedMotion() ? {} : {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
};

const Hero = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-[500px] md:min-h-[700px] flex items-center overflow-hidden"
    >
      <img
        src="/assets/images/nex.png"
        alt="NEXMOVE truck dispatch"
        loading="eager"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 w-full text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <HeroContent />
            <HeroStats />
          </div>
        </div>
      </div>
    </section>
  );
};

const HeroContent = memo(() => {
  const navigate = useNavigate();
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? 'animate' : 'initial'}
      animate="animate"
      variants={heroContentVariants}
    >
      <motion.h1
        variants={heroItemVariants}
        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-5 leading-tight"
      >
        Your Next Move with <span className="text-[#4A90A4]">NexMove</span>
      </motion.h1>

      <motion.p
        variants={heroItemVariants}
        className="text-lg md:text-xl mb-6 text-gray-200"
      >
        Maximize your profits with expert dispatching. We find the best loads for your fleet nationwide.
      </motion.p>

      <motion.div
        variants={heroItemVariants}
        className="flex flex-col sm:flex-row gap-4"
      >
        <Button
          variant="primary"
          size="lg"
          onClick={() => navigate('/contact')}
          aria-label="Get started with NEXMOVE"
        >
          Get Started Today
          <FaArrowRight className="ml-2" aria-hidden="true" />
        </Button>

        <Button
          variant="outline"
          size="lg"
          onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
          aria-label="Learn more about our services"
        >
          Learn More
        </Button>
      </motion.div>
    </motion.div>
  );
});

HeroContent.displayName = 'HeroContent';

const heroStatsVariants = reducedMotion() ? {
  animate: { opacity: 1, y: 0 }
} : {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.4 }
  }
};

const statCardVariants = reducedMotion() ? {} : {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
};

const HeroStats = memo(() => {
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? 'animate' : 'initial'}
      animate="animate"
      variants={heroStatsVariants}
      className="hidden md:block"
    >
      <div className="grid grid-cols-2 gap-6">
        {STATS.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </motion.div>
  );
});

HeroStats.displayName = 'HeroStats';

const StatCard = memo(({ stat }) => {
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.div
      variants={statCardVariants}
      whileHover={prefersReducedMotion ? {} : {
        scale: 1.02,
        backgroundColor: 'rgba(255,255,255,0.15)',
        transition: { duration: 0.2 }
      }}
      className="bg-white/10 backdrop-blur-sm p-5 rounded-lg border border-white/20 cursor-default"
    >
      <stat.icon className="text-accent text-2xl mb-2" aria-hidden="true" />
      <h3 className="font-bold text-base mb-1">{stat.title}</h3>
      <p className="text-gray-200 text-sm">{stat.desc}</p>
    </motion.div>
  );
});

StatCard.displayName = 'StatCard';

export default memo(Hero);
