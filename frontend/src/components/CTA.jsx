import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaArrowRight, FaPhone } from 'react-icons/fa';
import { Button } from './shared/Button';
import { useNavigate } from 'react-router-dom';
import { CONTACT_INFO, ANIMATION_VARIANTS } from '../config/constants';

const CTA_STATS = [
  { value: '24/7', label: 'Dispatch Support' },
  { value: '30%', label: 'Average Revenue Increase' },
  { value: '24hrs', label: 'Quick Setup Time' }
];

const CTA = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 bg-[#0F1B2E] text-white">
      <div className="container-custom">
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={ANIMATION_VARIANTS.fadeInUp}
          className="text-center max-w-4xl mx-auto"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-5">
            Ready to Maximize Your Trucking Revenue?
          </h2>

          <p className="text-lg md:text-xl mb-6 text-gray-300">
            Join hundreds of carriers who have increased their profits with NEXMOVE dispatch services
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigate('/contact')}
            >
              Get Started Now
              <FaArrowRight className="ml-2" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => window.location.href = CONTACT_INFO.phoneHref}
            >
              <FaPhone className="mr-2" />
              Call Us Today
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {CTA_STATS.map((stat) => (
              <div key={stat.label} className="bg-white/10 backdrop-blur-sm p-5 rounded-lg">
                <div className="text-2xl font-bold text-[#4A90A4] mb-1">{stat.value}</div>
                <div className="text-gray-300 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default memo(CTA);
