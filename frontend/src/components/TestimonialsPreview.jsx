import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { ANIMATION_VARIANTS } from '../config/constants';

const TESTIMONIALS = [
  { id: 1, name: 'Mike Johnson', company: 'JJ Transport LLC', rating: 5, text: 'NEXMOVE transformed my business. Revenue increased 35% in two months. Professional and responsive team.', location: 'Texas' },
  { id: 2, name: 'Sarah Williams', company: 'Swift Carriers Inc', rating: 5, text: 'Best decision for my company. Great loads, better rates, and I focus on driving. Highly recommended!', location: 'California' },
  { id: 3, name: 'David Martinez', company: 'Martinez Trucking', rating: 5, text: 'Professional service with excellent communication. No empty miles. My trucks move 24/7.', location: 'Florida' }
];

const TestimonialsPreview = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <SectionHeader title="What Our Carriers Say" subtitle="Trusted by carriers nationwide" />
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = memo(({ testimonial, index }) => (
  <motion.article
    initial="initial"
    whileInView="animate"
    viewport={{ once: true }}
    variants={ANIMATION_VARIANTS.fadeInUp}
    transition={{ delay: index * 0.15 }}
    className="bg-white p-6 rounded-xl shadow-lg relative"
  >
    <FaQuoteLeft className="text-3xl text-blue-100 absolute top-5 right-5" aria-hidden="true" />

    <div className="flex mb-3" aria-label={`${testimonial.rating} star rating`}>
      {Array.from({ length: testimonial.rating }).map((_, i) => (
        <FaStar key={i} className="text-[#4A90A4] text-lg" aria-hidden="true" />
      ))}
    </div>

    <p className="text-gray-700 mb-5 leading-relaxed italic text-sm">"{testimonial.text}"</p>

    <div className="border-t pt-3">
      <h4 className="font-bold text-gray-900 text-sm">{testimonial.name}</h4>
      <p className="text-[#2C5F8A] font-medium text-sm">{testimonial.company}</p>
      <p className="text-gray-500 text-xs">{testimonial.location}</p>
    </div>
  </motion.article>
));
TestimonialCard.displayName = 'TestimonialCard';

export default memo(TestimonialsPreview);
