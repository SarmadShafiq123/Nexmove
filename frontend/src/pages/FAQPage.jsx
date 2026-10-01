import { memo } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import FAQ from '../components/FAQ';
import { Button } from '../components/shared/Button';
import { ANIMATION_VARIANTS } from '../config/constants';

const FAQPage = () => {
  return (
    <main className="pt-20">
      <HeroSection />
      <FAQ />
      <CTASection />
    </main>
  );
};

const HeroSection = memo(() => (
  <section className="py-16 bg-[#0F1B2E] text-white">
    <div className="container-custom">
      <motion.div
        initial="initial"
        animate="animate"
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-gray-300">Find answers to common questions about our dispatch services</p>
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

const CTASection = memo(() => (
  <section className="py-16 bg-white">
    <div className="container-custom">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="bg-[#0F1B2E] rounded-2xl p-12 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Still Have Questions?</h2>
        <p className="text-xl mb-8 text-gray-300">Our team is ready to help you get started</p>
        <Link to="/contact">
          <Button variant="primary" size="lg">
            Contact Us Now
            <FaArrowRight className="ml-2" />
          </Button>
        </Link>
      </motion.div>
    </div>
  </section>
));
CTASection.displayName = 'CTASection';

export default memo(FAQPage);
