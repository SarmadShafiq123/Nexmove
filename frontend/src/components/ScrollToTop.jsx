import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop - A reusable component that automatically scrolls to top on route changes
 * 
 * Usage: Place this component inside BrowserRouter, above Routes
 * Location: App.jsx
 * 
 * Features:
 * - Automatically scrolls to (0, 0) on pathname change
 * - Preserves anchor link scrolling (#section)
 * - No per-page scroll logic needed
 * - Minimal, production-ready implementation
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top when pathname changes
    window.scrollTo(0, 0);
  }, [pathname]);

  // This component doesn't render anything
  return null;
};

export default ScrollToTop;