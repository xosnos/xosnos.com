'use client';

import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { navItems } from '@/data/navigation';
import { ThemeToggle } from '@/components/theme-toggle';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';

  // Derive display values when not on home to avoid setState in effect
  const displayScrolled = isHome ? isScrolled : true;
  const displayActiveSection = isHome ? activeSection : '';

  useEffect(() => {
    if (!isHome) return;

    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setIsScrolled(scrolled);
      }

      const sections = navItems.map((item) => item.section);
      let currentSection = '';
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            currentSection = section;
            break;
          }
        }
      }

      if (window.scrollY < 200) {
        currentSection = '';
      }

      if (activeSection !== currentSection) {
        setActiveSection(currentSection);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome, isScrolled, activeSection, pathname]);

  const navClasses = `fixed w-full top-0 z-50 transition-all duration-300 ${displayScrolled ? 'bg-background/80 backdrop-blur-md shadow-sm border-b border-border' : 'bg-transparent'
    }`;

  return (
    <nav className={navClasses}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link
            href="/"
            className="text-foreground font-montserrat font-bold text-xl uppercase tracking-wider transition-colors hover:text-accent"
            onClick={() => isMenuOpen && setIsMenuOpen(false)}
          >
            @xosnos
          </Link>

          <div className="flex items-center space-x-4">
            <div className="hidden lg:flex space-x-1">
              {navItems.map((item) => {
                const href = isHome ? `#${item.section}` : `/#${item.section}`;
                const isActive = displayActiveSection === item.section;
                return (
                  <Link
                    key={item.section}
                    href={href}
                    className={`font-montserrat font-bold uppercase text-sm tracking-wider py-2 px-4 rounded-md transition-all duration-200 ${isActive
                      ? 'text-accent'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            <ThemeToggle />

            <button
              className="lg:hidden p-2 rounded-md text-foreground hover:bg-muted transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle navigation"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden bg-background/95 backdrop-blur-md border-t border-border">
            <div className="flex flex-col p-4 space-y-2">
              {navItems.map((item) => {
                const href = isHome ? `#${item.section}` : `/#${item.section}`;
                const isActive = displayActiveSection === item.section;
                return (
                  <Link
                    key={item.section}
                    href={href}
                    className={`block font-montserrat font-bold uppercase text-sm tracking-wider py-3 px-4 rounded-md transition-colors ${isActive ? 'text-accent bg-accent/10' : 'text-foreground hover:bg-muted'
                      }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
