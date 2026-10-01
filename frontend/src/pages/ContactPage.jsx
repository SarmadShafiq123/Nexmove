import { memo } from 'react';
import { motion } from 'framer-motion';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import CarrierApplicationForm from '../components/CarrierApplicationForm';
import { SectionHeader } from '../components/shared/SectionHeader';
import { CONTACT_INFO, ANIMATION_VARIANTS } from '../config/constants';

const ContactPage = () => {
  return (
    <main className="pt-20">
      <HeroSection />
      <CarrierApplicationForm />
      <ContactInfoSection />
    </main>
  );
};

const HeroSection = memo(() => (
  <section className="py-12 bg-[#0F1B2E] text-white">
    <div className="container-custom">
      <motion.div
        initial="initial"
        animate="animate"
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="text-center max-w-3xl mx-auto"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Get Started Today</h1>
        <p className="text-xl text-gray-300">
          Complete the application below and our dispatch team will contact you within 24 hours
        </p>
      </motion.div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

const ContactInfoSection = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="container-custom">
      <SectionHeader title="Contact Information" subtitle="Reach out to us directly through any of these channels" />

      <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        <ContactInfoCard icon={FaPhone} title="Phone" content={CONTACT_INFO.phone} link={CONTACT_INFO.phoneHref} color="bg-blue-50 text-[#2C5F8A]" />
        <ContactInfoCard icon={FaEnvelope} title="Email" content={CONTACT_INFO.email} link={CONTACT_INFO.emailHref} color="bg-green-50 text-[#0F5C57]" />
        <ContactInfoCard
          icon={FaMapMarkerAlt}
          title="Address"
          content={<>{CONTACT_INFO.address.city}, {CONTACT_INFO.address.state}</>}
          color="bg-blue-50 text-[#4A90A4]"
        />
      </div>

      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="mt-12 bg-white p-8 rounded-xl max-w-3xl mx-auto text-center shadow-md"
      >
        <FaClock className="text-4xl text-[#2C5F8A] mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Business Hours</h3>
        <p className="text-gray-700 text-lg">
          <strong>Dispatch Support:</strong> 24/7 - Available Anytime<br />
          <strong>Office Hours:</strong> Monday - Friday, 8:00 AM - 6:00 PM CST
        </p>
      </motion.div>
    </div>
  </section>
));
ContactInfoSection.displayName = 'ContactInfoSection';

const ContactInfoCard = memo(({ icon: Icon, title, content, link, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-2xl transition-shadow"
  >
    <div className={`${color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
      <Icon className="text-3xl" />
    </div>
    <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
    {link ? (
      <a href={link} className="text-gray-600 hover:text-[#2C5F8A] transition-colors break-words">{content}</a>
    ) : (
      <p className="text-gray-600">{content}</p>
    )}
  </motion.div>
));
ContactInfoCard.displayName = 'ContactInfoCard';

export default memo(ContactPage);
