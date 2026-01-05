import { Send } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-primary text-secondary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-secondary uppercase flex items-center justify-center gap-4 mb-6">
            <Send className="w-8 h-8" />
            <span>Contact</span>
            <Send className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-secondary"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-secondary"></div>
            </div>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>

        {/* Contact Button */}
        <div className="text-center">
          <a
            href="mailto:steven@xosnos.com"
            className="px-8 py-4 rounded-full font-montserrat font-bold text-xl uppercase tracking-wider bg-white text-secondary btn-pulse-white inline-flex items-center gap-3 shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:brightness-95"
          >
            Shoot me an email
            <Send className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 