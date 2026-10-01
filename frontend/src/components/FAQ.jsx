import { memo, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown, FaSearch, FaTimes } from 'react-icons/fa';
import { SectionHeader } from './shared/SectionHeader';
import { ANIMATION_VARIANTS, reducedMotion } from '../config/constants';

const FAQS = [
  { id: 1, question: 'How much does NEXMOVE charge?', answer: 'Our dispatch fees start at 5% for Semi Trucks and Hotshot operations and 7% for Box Trucks. Rates are negotiable depending on volume and fleet size.' },
  { id: 2, question: 'What truck types do you dispatch?', answer: 'We dispatch Semi Trucks, Dry Vans, Reefers, Flatbeds, Box Trucks, Power Only units, and Hotshot carriers.' },
  { id: 3, question: 'How quickly can I get started?', answer: 'Most carriers are approved and onboarded within 24 hours after authority, insurance, and paperwork verification.' },
  { id: 4, question: 'Do I need a long-term contract?', answer: 'No. We operate with transparent terms and no long-term commitments.' },
  { id: 5, question: 'Do you negotiate rates with brokers?', answer: 'Yes. Our dispatchers actively negotiate with brokers and shippers to secure the highest possible rates.' },
  { id: 6, question: 'How do you help increase revenue?', answer: 'We focus on higher-paying freight, route optimization, reducing deadhead miles, and consistent load planning.' },
  { id: 7, question: 'Do you provide after-hours support?', answer: 'Yes. Dispatch support is available 24/7 to assist carriers on the road.' }
];

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [openId, setOpenId] = useState(null);

  const filteredFaqs = useMemo(() => {
    if (!searchTerm.trim()) return FAQS;
    const term = searchTerm.toLowerCase();
    return FAQS.filter(faq =>
      faq.question.toLowerCase().includes(term) ||
      faq.answer.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  const handleToggle = (id) => setOpenId(openId === id ? null : id);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container-custom">
        <SectionHeader
          title="Frequently Asked Questions"
          subtitle="Answers to common questions from carriers and owner-operators."
        />

        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={reducedMotion() ? {} : ANIMATION_VARIANTS.fadeInUp}
          className="max-w-2xl mx-auto mb-10"
        >
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-12 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2C5F8A] focus:border-transparent outline-none text-sm shadow-sm min-h-[44px]"
              aria-label="Search frequently asked questions"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Clear search"
              >
                <FaTimes />
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="text-sm text-gray-500 mt-2 text-center">
              Found {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}
            </p>
          )}
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <AnimatePresence mode="wait">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  index={index}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              ))
            ) : (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10">
                <p className="text-gray-500">No FAQs found matching your search.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

const FAQItem = memo(({ faq, index, isOpen, onToggle }) => {
  const prefersReducedMotion = reducedMotion();

  return (
    <motion.div
      initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="mb-4"
    >
      <button
        onClick={onToggle}
        className="w-full bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-5 text-left focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] focus:ring-offset-2 min-h-[44px]"
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${faq.id}`}
      >
        <div className="flex justify-between items-center">
          <h3 className="text-base font-bold text-gray-900 pr-4">{faq.question}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="flex-shrink-0"
          >
            <FaChevronDown className="text-[#2C5F8A] text-lg" aria-hidden="true" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={`faq-answer-${faq.id}`}
            initial={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            animate={prefersReducedMotion ? {} : { height: 'auto', opacity: 1 }}
            exit={prefersReducedMotion ? {} : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="bg-white px-5 pb-5 pt-2 rounded-b-lg shadow-md">
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FAQItem.displayName = 'FAQItem';

export default memo(FAQ);
