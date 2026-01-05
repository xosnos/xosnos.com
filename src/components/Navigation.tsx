'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';

  useEffect(() => {
    if (!isHome) {
      setActiveSection('');
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Check which section is currently in view
      const sections = ['about', 'experience', 'projects', 'skills', 'education', 'contact'];
      const scrollPosition = window.scrollY + 100; // Offset for navbar height

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }

      // If we're at the top, clear active section
      if (window.scrollY < 100) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  const navItems = [
    { href: isHome ? '#projects' : '/#projects', label: 'Projects' },

    { href: isHome ? '#experience' : '/#experience', label: 'Experience' },
    { href: isHome ? '#skills' : '/#skills', label: 'Skills' },
    { href: isHome ? '#education' : '/#education', label: 'Education' },
    { href: isHome ? '#about' : '/#about', label: 'About' },
    { href: isHome ? '#contact' : '/#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled || !isHome ? 'bg-secondary shadow-lg' : 'bg-secondary'
      }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="text-white font-montserrat font-bold text-xl uppercase tracking-wider nav-link-animated"
          >
            xosnos
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex space-x-4">
            {navItems.map((item) => {
              const isActive = (isHome && activeSection === item.href.slice(1)) || pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-white font-montserrat font-bold uppercase text-sm tracking-wider py-3 px-4 rounded nav-item-hover nav-link-animated ${isActive ? 'text-primary' : ''
                    }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 rounded-sm mobile-menu-btn-animated text-on-primary"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-secondary border-t border-gray-600">
            <div className="py-4 space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block text-white font-montserrat font-bold uppercase text-sm tracking-wider py-3 px-4 rounded-sm nav-link-animated"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation; 