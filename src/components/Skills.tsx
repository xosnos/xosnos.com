import Image from 'next/image';
import { Code } from 'lucide-react';
import { fetchSkillsFromReadme, type SkillCategory } from '@/lib/github-readme';

const Skills = async () => {
  let skillCategories: SkillCategory[] = [];

  try {
    skillCategories = await fetchSkillsFromReadme();
  } catch (error) {
    console.error('Failed to fetch skills from GitHub README:', error);
    // Fallback to empty array if fetch fails
    skillCategories = [];
  }

  return (
    <section id="skills" className="bg-primary text-gray-800 py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold uppercase flex items-center justify-center gap-4 mb-6 text-gray-800">
            <Code className="w-8 h-8" />
            <span>Skills</span>
            <Code className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-gray-800"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-gray-800"></div>
            </div>
            <div className="h-1 w-20 bg-gray-800"></div>
          </div>
        </div>

        {/* Skills Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-2"></div>
            <div className="xl:col-span-8">
              <div className="skills-section space-y-8">
                {skillCategories.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600 mb-4">
                      Unable to load skills from GitHub README. Please check back later.
                    </p>
                  </div>
                ) : (
                  skillCategories.map((category, index) => (
                    <div key={index} className="text-center">
                      <h3 className="text-2xl font-montserrat font-bold mb-4 text-gray-800">
                        {category.title}
                      </h3>
                      <div className="flex flex-wrap justify-center gap-2">
                        {category.badges.map((badge, badgeIndex) => (
                          <Image
                            key={badgeIndex}
                            src={badge.src}
                            alt={badge.alt}
                            width={120}
                            height={28}
                            className="h-7 w-auto"
                            unoptimized
                          />
                        ))}
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="text-center mt-8">
                <a
                  href="https://github.com/xosnos/xosnos/blob/main/README.md"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-800 hover:text-gray-600 underline transition-colors"
                >
                  Straight from my GitHub README
                </a>
              </div>
            </div>
            <div className="xl:col-span-2"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills; 