import Image from 'next/image';
import { Code } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      title: '⌨️ Languages',
      badges: [
        { src: 'https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54', alt: 'Python' },
        { src: 'https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E', alt: 'JavaScript' },
        { src: 'https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white', alt: 'C++' },
        { src: 'https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white', alt: 'C' },
        { src: 'https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=java&logoColor=white', alt: 'Java' },
        { src: 'https://img.shields.io/badge/markdown-%23000000.svg?style=for-the-badge&logo=markdown&logoColor=white', alt: 'Markdown' },
        { src: 'https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white', alt: 'HTML5' },
        { src: 'https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white', alt: 'CSS3' },
        { src: 'https://img.shields.io/badge/shell_script-%23121011.svg?style=for-the-badge&logo=gnu-bash&logoColor=white', alt: 'Shell Script' },
        { src: 'https://img.shields.io/badge/swift-F54A2A?style=for-the-badge&logo=swift&logoColor=white', alt: 'Swift' },
        { src: 'https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white', alt: 'Go' },
        { src: 'https://img.shields.io/badge/latex-%23008080.svg?style=for-the-badge&logo=latex&logoColor=white', alt: 'LaTeX' },
      ],
    },
    {
      title: '🤖 Hosting / SaaS',
      badges: [
        { src: 'https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white', alt: 'Vercel' },
        { src: 'https://img.shields.io/badge/netlify-%23000000.svg?style=for-the-badge&logo=netlify&logoColor=#00C7B7', alt: 'Netlify' },
        { src: 'https://img.shields.io/badge/DigitalOcean-%230167ff.svg?style=for-the-badge&logo=digitalOcean&logoColor=white', alt: 'DigitalOcean' },
        { src: 'https://img.shields.io/badge/glitch-%233333FF.svg?style=for-the-badge&logo=glitch&logoColor=white', alt: 'Glitch' },
        { src: 'https://img.shields.io/badge/AWS-%23FF9900.svg?style=for-the-badge&logo=amazon-aws&logoColor=white', alt: 'AWS' },
        { src: 'https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase', alt: 'Firebase' },
        { src: 'https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white', alt: 'Heroku' },
      ],
    },
    {
      title: '🖼️ Frameworks, Platforms, and Libraries',
      badges: [
        { src: 'https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB', alt: 'React' },
        { src: 'https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white', alt: 'React Router' },
        { src: 'https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white', alt: 'Redux' },
        { src: 'https://img.shields.io/badge/bootstrap-%23563D7C.svg?style=for-the-badge&logo=bootstrap&logoColor=white', alt: 'Bootstrap' },
        { src: 'https://img.shields.io/badge/jquery-%230769AD.svg?style=for-the-badge&logo=jquery&logoColor=white', alt: 'jQuery' },
        { src: 'https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D', alt: 'Vue.js' },
        { src: 'https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white', alt: 'Flask' },
        { src: 'https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white', alt: 'SASS' },
        { src: 'https://img.shields.io/badge/NPM-%23000000.svg?style=for-the-badge&logo=npm&logoColor=white', alt: 'NPM' },
        { src: 'https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white', alt: 'NodeJS' },
        { src: 'https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white', alt: 'Django' },
        { src: 'https://img.shields.io/badge/yarn-%232C8EBB.svg?style=for-the-badge&logo=yarn&logoColor=white', alt: 'Yarn' },
      ],
    },
    {
      title: '💻 Servers',
      badges: [
        { src: 'https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white', alt: 'Nginx' },
      ],
    },
    {
      title: '💽 Databases',
      badges: [
        { src: 'https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white', alt: 'SQLite' },
        { src: 'https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white', alt: 'MySQL' },
        { src: 'https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white', alt: 'Postgres' },
      ],
    },
    {
      title: '🎨 Design',
      badges: [
        { src: 'https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white', alt: 'Figma' },
        { src: 'https://img.shields.io/badge/Canva-%2300C4CC.svg?style=for-the-badge&logo=Canva&logoColor=white', alt: 'Canva' },
        { src: 'https://img.shields.io/badge/Adobe%20Audition-9999FF.svg?style=for-the-badge&logo=Adobe%20Audition&logoColor=white', alt: 'Adobe Audition' },
        { src: 'https://img.shields.io/badge/Adobe%20Premiere%20Pro-9999FF.svg?style=for-the-badge&logo=Adobe%20Premiere%20Pro&logoColor=white', alt: 'Adobe Premiere Pro' },
        { src: 'https://img.shields.io/badge/Adobe%20Lightroom-31A8FF.svg?style=for-the-badge&logo=Adobe%20Lightroom&logoColor=white', alt: 'Adobe Lightroom' },
        { src: 'https://img.shields.io/badge/adobephotoshop-%2331A8FF.svg?style=for-the-badge&logo=adobephotoshop&logoColor=white', alt: 'Adobe Photoshop' },
        { src: 'https://img.shields.io/badge/Adobe%20XD-470137?style=for-the-badge&logo=Adobe%20XD&logoColor=#FF61F6', alt: 'Adobe XD' },
      ],
    },
    {
      title: '🛠️ Other',
      badges: [
        { src: 'https://img.shields.io/badge/jira-%230A0FFF.svg?style=for-the-badge&logo=jira&logoColor=white', alt: 'Jira' },
        { src: 'https://img.shields.io/badge/confluence-%23172BF4.svg?style=for-the-badge&logo=confluence&logoColor=white', alt: 'Confluence' },
        { src: 'https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white', alt: 'Notion' },
        { src: 'https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white', alt: 'ESLint' },
        { src: 'https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white', alt: 'Postman' },
        { src: 'https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white', alt: 'Trello' },
      ],
    },
  ];

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
                {skillCategories.map((category, index) => (
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
                ))}
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