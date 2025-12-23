import BrandIcon from './BrandIcon';
import { brandIcons } from './brandIcons';
import { Heart } from 'lucide-react';

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
  ];

  return (
    <footer className="bg-secondary text-white py-12 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">

          {/* Brand & Copyright */}
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-montserrat font-bold uppercase tracking-wider mb-2">
              xosnos
            </h2>
            <p className="text-gray-400 text-sm">
              Copyright © {new Date().getFullYear()} Steven Nguyen
            </p>
             <p className="text-gray-500 text-xs mt-1">
              Built with Next.js, Tailwind CSS & Love
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-6">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group p-3 bg-white/5 rounded-full hover:bg-white/20 hover:scale-110 transition-all duration-300"
                aria-label={link.label}
              >
                <BrandIcon icon={link.icon} className="w-5 h-5 fill-gray-300 group-hover:fill-white transition-colors" title={link.label} />
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-white/10 my-8"></div>

        {/* Bottom Message */}
         <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
             <div className="flex items-center gap-1">
                <span>Designed & Developed by Steven Nguyen</span>
             </div>
             <div className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-red-500 animate-pulse" />
                <span>Thanks for visiting!</span>
             </div>
         </div>

      </div>
    </footer>
  );
};

export default Footer;
