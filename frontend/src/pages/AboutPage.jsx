import { memo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkedAlt, FaCheckCircle, FaArrowRight, FaDollarSign, FaUsers, FaClock, FaShieldAlt, FaChartBar } from 'react-icons/fa';
import { SectionHeader } from '../components/shared/SectionHeader';
import { Button } from '../components/shared/Button';
import { ANIMATION_VARIANTS } from '../config/constants';

const BENEFITS = [
  { icon: FaDollarSign, title: 'Increase Revenue', description: 'Carriers see 25–30% revenue growth in first 3 months.' },
  { icon: FaUsers, title: 'Experienced Team', description: '10+ years of logistics and dispatch experience.' },
  { icon: FaClock, title: 'Save Time', description: 'We handle dispatch so you focus on driving.' },
  { icon: FaShieldAlt, title: 'Transparent Pricing', description: 'No hidden fees, no long-term contracts.' },
  { icon: FaChartBar, title: 'Performance Tracking', description: 'Real-time analytics and reporting dashboard.' },
  { icon: FaCheckCircle, title: 'Proven Results', description: '500+ carriers actively using our service.' }
];

const COVERAGE_STATS = [
  { label: 'States Covered', value: '48' },
  { label: 'Active Carriers', value: '500+' },
  { label: 'Loads Per Month', value: '10K+' },
  { label: 'Years Experience', value: '10+' }
];

const AboutPage = () => {
  return (
    <main className="pt-20">
      <CompanyInfoSection />
      <WhyChooseUsSection />
      <CoverageSection />
      <CTASection />
    </main>
  );
};

export default memo(AboutPage);

const CompanyInfoSection = memo(() => (
  <section className="py-20 bg-[#0F1B2E] text-white">
    <div className="container-custom text-center max-w-4xl mx-auto">
      <motion.div initial="initial" animate="animate" variants={ANIMATION_VARIANTS.fadeInUp}>
        <h1 className="text-4xl md:text-5xl font-bold mb-6">About NEXMOVE Enterprise</h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-10">
          We maximize carrier profitability through expert dispatch, load booking, and 24/7 support.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {COVERAGE_STATS.map((stat) => (
            <div key={stat.label} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg border border-white/20">
              <div className="text-3xl font-bold text-[#4A90A4] mb-2">{stat.value}</div>
              <div className="text-gray-300 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
));

const WhyChooseUsSection = memo(() => (
  <section className="py-20 bg-white">
    <div className="container-custom">
      <SectionHeader title="Why Choose NEXMOVE?" subtitle="We help carriers maximize profit and reduce operational stress" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BENEFITS.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="bg-blue-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <b.icon className="text-3xl text-[#2C5F8A]" />
            </div>
            <h3 className="text-xl font-bold mb-2">{b.title}</h3>
            <p className="text-gray-600">{b.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
));

const CoverageSection = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="container-custom text-center">
      <SectionHeader title="Nationwide Coverage" subtitle="We operate across all 48 states with reliable dispatch support" />
      <div className="bg-gray-100 p-12 rounded-2xl">
        <FaMapMarkedAlt className="text-5xl text-[#2C5F8A] mx-auto mb-6" />
        <h3 className="text-2xl font-bold mb-4">Coast-to-Coast Operations</h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-10">
          From West Coast to East Coast, we ensure continuous load availability for carriers nationwide.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {['West Coast', 'Midwest', 'East Coast'].map((region) => (
            <div key={region} className="bg-white p-6 rounded-lg shadow-sm">
              <FaCheckCircle className="text-[#0F5C57] text-2xl mx-auto mb-3" />
              <p className="font-semibold">{region}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
));

const CTASection = memo(() => (
  <section className="py-20 bg-gray-50">
    <div className="container-custom">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={ANIMATION_VARIANTS.fadeInUp}
        className="bg-[#0F1B2E] text-white rounded-2xl p-12 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Partner With NEXMOVE?</h2>
        <p className="text-gray-300 mb-8">Join hundreds of carriers already growing with us</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact">
            <Button variant="primary" size="lg">
              Get Started Now
              <FaArrowRight className="ml-2" />
            </Button>
          </Link>
          <Link to="/services">
            <Button variant="outline" size="lg">View Services</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </section>
));
