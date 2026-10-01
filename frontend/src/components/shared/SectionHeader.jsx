import { motion } from 'framer-motion';
import { ANIMATION_VARIANTS } from '../../config/constants';

export const SectionHeader = ({ title, subtitle, className = '' }) => {
  return (
    <motion.div
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      variants={ANIMATION_VARIANTS.fadeInUp}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[var(--color-text)] mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-500 max-w-3xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};
