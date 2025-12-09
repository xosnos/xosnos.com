import BrandIcon from './BrandIcon';
import { brandIcons } from './brandIcons';

const Footer = () => {
  const socialLinks = [
    {
      href: 'https://github.com/xosnos/',
      icon: brandIcons.github,
      label: 'GitHub',
    },
    {
      href: 'https://www.linkedin.com/in/xosnos/',
      icon: brandIcons.linkedin,
      label: 'LinkedIn',
    },
    {
      href: 'https://x.com/xosnos',
      icon: brandIcons.x,
      label: 'X',
    },
    // Temporarily hidden
    // {
    //   href: 'https://xosnos.medium.com/',
    //   icon: SOME_ICON,
    //   label: 'Medium',
    // },
  ];

  return (
    <footer className="bg-secondary text-white">
      {/* Main Footer */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {/* Location */}
            <div>
              <h4 className="text-xl font-montserrat font-bold uppercase mb-4">
                Location
              </h4>
              <p className="text-lg leading-relaxed">
                <span>San Jose, California</span>
                <br />
                <span>Grand Rapids, Michigan</span>
              </p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-xl font-montserrat font-bold uppercase mb-6">
                Around the Web
              </h4>
              <div className="flex justify-center space-x-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-social btn-outline-light btn-social-animated"
                    aria-label={link.label}
                  >
                    <BrandIcon icon={link.icon} className="w-5 h-5" title={link.label} />
                  </a>
                ))}
              </div>
            </div>

            {/* Credits */}
            <div>
              <h4 className="text-xl font-montserrat font-bold uppercase mb-4">
                Credits & References
              </h4>
              <div className="max-w-xs mx-auto">
                <ul className="space-y-1 text-lg">
                  <li>Codecademy (Self-taught) 🧠</li>
                  <li>My M4 Pro Mac Mini 🖥️</li>
                  <li>Cursor & Claude Code 🤖</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="bg-secondary py-4">
        <div className="container mx-auto px-4 text-center">
          <small className="text-gray-300">
            Copyright © xosnos {new Date().getFullYear()}
          </small>
        </div>
      </div>

      {/* Scroll to Top Button - Only visible on mobile */}
      <div className="fixed bottom-4 right-4 lg:hidden">
        <a
          href="#page-top"
          className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg btn-primary-animated btn-bounce text-on-primary"
          aria-label="Scroll to top"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </a>
      </div>
    </footer>
  );
};

export default Footer; 