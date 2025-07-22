import Image from 'next/image';
import { Sparkles, Rocket } from 'lucide-react';

const Hero = () => {
  return (
    <header id="page-top" className="bg-primary text-gray-800 py-32 text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Profile Image */}
          <div className="mb-8">
            <Image
              src="/assets/img/profile.jpg"
              alt="Steven Nguyen"
              width={256}
              height={256}
              className="rounded-full mx-auto border-4 border-gray-800 shadow-lg btn-animated"
              priority
            />
          </div>

          {/* Name */}
          <h1 className="text-5xl md:text-6xl font-montserrat font-bold mb-4 text-gray-800">
            Steven Nguyen
          </h1>

          {/* Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-20 bg-gray-800"></div>
            <div className="mx-4">
              <Sparkles className="w-8 h-8 text-gray-800" />
            </div>
            <div className="h-1 w-20 bg-gray-800"></div>
          </div>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl font-light flex items-center justify-center gap-2 flex-wrap text-gray-800">
            <Sparkles className="w-6 h-6" />
            <span>Hello Universe</span>
            <Rocket className="w-6 h-6" />
          </h2>
        </div>
      </div>
    </header>
  );
};

export default Hero; 