import { memo } from 'react';
import Hero from '../components/Hero';
import ServicesPreview from '../components/ServicesPreview';
import StatsCounter from '../components/StatsCounter';
import TruckTypes from '../components/TruckTypes';
import WhyChooseUs from '../components/WhyChooseUs';
import CTA from '../components/CTA';
import FAQ from '../components/FAQ';

const Home = () => {
  return (
    <main>
      <Hero />
      <ServicesPreview />
      <StatsCounter />
      <TruckTypes />
      <WhyChooseUs />
      <CTA />
      <FAQ/>
    </main>
  );
};

export default memo(Home);
