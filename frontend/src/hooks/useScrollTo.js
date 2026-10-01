import { useCallback } from 'react';

export const useScrollTo = () => {
  const scrollToSection = useCallback((sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return scrollToSection;
};
