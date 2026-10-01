import { useState, memo } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaPhone } from 'react-icons/fa';
import { NAV_ITEMS, CONTACT_INFO } from '../config/constants';
import logo from '../assets/logo.png';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = () => setIsOpen(false);

  return (
    <nav
      className="bg-[#0F1B2E] fixed w-full top-0 z-50 shadow-lg"
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="container-custom">
        <div className="flex justify-between items-center py-3">
          <Logo />
          <DesktopNav items={NAV_ITEMS} />
          <ContactInfo />
          <MobileMenuButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
        </div>
      </div>

      <MobileMenu isOpen={isOpen} items={NAV_ITEMS} onItemClick={handleNavClick} />
    </nav>
  );
};

const Logo = memo(() => (
  <Link to="/">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="flex items-center cursor-pointer"
    >
      <img
        src={logo}
        alt="NEXMOVE Enterprises"
        className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105"
        style={{ 
          filter: 'brightness(0) invert(1)',
          mixBlendMode: 'normal'
        }}
      />
    </motion.div>
  </Link>
));
Logo.displayName = 'Logo';

const DesktopNav = memo(({ items }) => (
  <div className="hidden md:flex items-center space-x-6">
    {items.map((item, index) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
      >
        <NavLink
          to={item.path}
          className={({ isActive }) =>
            `text-gray-300 hover:text-[#2C5F8A] font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] focus:ring-offset-2 focus:ring-offset-[#0F1B2E] rounded-md px-2 py-1.5 text-sm ${
              isActive ? 'text-[#2C5F8A] font-bold' : ''
            }`
          }
          aria-label={`Navigate to ${item.label}`}
        >
          {item.label}
        </NavLink>
      </motion.div>
    ))}
  </div>
));
DesktopNav.displayName = 'DesktopNav';

const ContactInfo = memo(() => (
  <div className="hidden md:flex items-center space-x-3">
    <a
      href={CONTACT_INFO.phoneHref}
      className="flex items-center text-gray-300 hover:text-[#2C5F8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] focus:ring-offset-2 focus:ring-offset-[#0F1B2E] rounded-md px-2 py-1 text-sm min-h-[44px]"
      aria-label="Call us"
    >
      <FaPhone className="mr-1.5 text-sm" aria-hidden="true" />
      <span className="font-medium">{CONTACT_INFO.phone}</span>
    </a>
  </div>
));
ContactInfo.displayName = 'ContactInfo';

const MobileMenuButton = memo(({ isOpen, onClick }) => (
  <button
    onClick={onClick}
    className="md:hidden text-gray-300 hover:text-[#2C5F8A] text-xl focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] rounded-md p-2 min-h-[44px] min-w-[44px]"
    aria-label={isOpen ? 'Close menu' : 'Open menu'}
    aria-expanded={isOpen}
  >
    {isOpen ? <FaTimes /> : <FaBars />}
  </button>
));
MobileMenuButton.displayName = 'MobileMenuButton';

const MobileMenu = memo(({ isOpen, items, onItemClick }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden bg-[#0F1B2E] border-t border-white/10 overflow-hidden"
      >
        <div className="container-custom py-4 space-y-2">
          {items.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              onClick={onItemClick}
              className={({ isActive }) =>
                `block w-full text-left py-3 px-2 text-gray-300 hover:text-[#2C5F8A] font-medium focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] rounded-md min-h-[44px] flex items-center ${
                  isActive ? 'text-[#2C5F8A] font-bold' : ''
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}

          <a
            href={CONTACT_INFO.phoneHref}
            className="flex items-center py-3 px-2 text-gray-300 hover:text-[#2C5F8A] transition-colors focus:outline-none focus:ring-2 focus:ring-[#2C5F8A] rounded-md min-h-[44px]"
          >
            <FaPhone className="mr-2" />
            <span className="font-medium">{CONTACT_INFO.phone}</span>
          </a>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
));
MobileMenu.displayName = 'MobileMenu';

export default memo(Navbar);
