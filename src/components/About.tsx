import Image from 'next/image';
import { User } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="bg-white text-gray-900 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold uppercase flex items-center justify-center gap-4 mb-6 text-secondary">
            <User className="w-8 h-8" />
            <span>About</span>
            <User className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-secondary"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-secondary"></div>
            </div>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          {/* Text Content */}
          <div className="lg:order-1">
            <div className="text-lg leading-relaxed space-y-6 text-gray-900">
              <p>
                I’m a passionate Software Engineer and tech enthusiast with over two years of professional experience, primarily at Workday, Inc. My expertise spans the full stack, mobile app development, robust DevOps practices, cybersecurity fundamentals, and the adoption of Generative AI. I’m driven by a keen interest in sustainable technology and building innovative, accessible solutions that truly make a difference in people’s daily lives.
              </p>
              <p>
                My technical background is rooted in a B.S.E. in Computer Science from the University of Michigan while being self-taught. My top three programming languages are Python, TypeScript, and Java. I excel at leveraging all of my technical and soft-skills, including building scalable CI/CD pipelines, developing and deploying multi-platform applications to support diverse users, and ensuring seamless execution of projects.
              </p>
              <p>
                Beyond the code, I thrive as a leader and program manager within my non-profit commitments. I value cross-functional collaboration, whether it’s overseeing long-term strategic planning or mentoring peers and students on various topics. I believe in the power of helping others while ensuring work is achievable and fun.
              </p>
              <p>
                Currently based in San Jose, California, I enjoy the natural and cultural aspects of the area in my free time. I love exploring new restaurants, ordering a cup of the best matcha or coffee, and actively spend time outdoors, making sure to “touch grass”!
              </p>
              <p>
                If you would like to know more about me, please feel free to reach out to me via email (via the contact button below) or on LinkedIn.
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