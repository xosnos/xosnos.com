import Image from 'next/image';
import { User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="bg-primary text-gray-800 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold uppercase flex items-center justify-center gap-4 mb-6 text-gray-800">
            <User className="w-8 h-8" />
            <span>About</span>
            <User className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-gray-800"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-gray-800"></div>
            </div>
            <div className="h-1 w-20 bg-gray-800"></div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="lg:order-1">
            <div className="text-lg leading-relaxed space-y-6 text-gray-800">
              <p>
                Hi folks, I&apos;m a recent graduate from the University of Michigan with a B.S.E. in Computer Science.
              </p>
              <p>
                Project management and creating accessible applications to help people in their daily lives are two things I&apos;m highly interested in. I have a solid technical background in user-interface design, full-stack web and mobile development, and software engineering.
              </p>
              <p>
                I like to be active in my free time by going to the gym, boxing, bouldering, hiking, and visiting new areas. I also enjoy volunteering for local communities and serving as a mentor to students.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="lg:order-2 flex justify-center">
            <div className="relative">
              <Image
                src="/assets/img/about-me-picture.jpeg"
                alt="Steven Nguyen"
                width={400}
                height={400}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About; 