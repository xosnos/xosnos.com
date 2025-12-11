'use client';

import { useState } from 'react';
import Image from 'next/image';
import { GraduationCap, X, HelpCircle } from 'lucide-react';

interface EducationItem {
  id: string;
  name: string;
  shortName: string;
  image: string;
  courses?: string[];
  activities?: string[];
  awards?: string[];
}

const educationItems: EducationItem[] = [
  {
    id: 'ekhs',
    name: 'East Kentwood High School',
    shortName: 'East Kentwood',
    image: '/assets/img/schools/ekhs-logo.png',
    courses: [
      'AP Computer Science',
      'AP Statistics',
      'AP Calculus BC',
    ],
    activities: [
      'National Honor Society',
      'National Art Honors Society',
      'Symphony Orchestra',
      'Junior Varsity Tennis',
      'Tutoring (Math & Science)',
    ],
    awards: [
      'National Qualifier & State Champion in C++ Programming in 2018',
      'AP Scholar with Distinction',
      'Bosch and Society of Automotive Engineers Scholarship',
      'Chuck Karston Memorial Award',
    ],
  },
  {
    id: 'umich',
    name: 'University of Michigan',
    shortName: 'University of Michigan',
    image: '/assets/img/schools/umich-logo.png',
    courses: [
      'EECS 481: Software Engineering',
      'EECS 497: Human-Centered Software Design and Development',
      'EECS 441: Mobile App Development for Entrepreneurs',
      'EECS 493: User Interface Development',
      'EECS 482: Operating Systems',
      'EECS 485: Web Systems',
      'EECS 388: Computer Security',
      'EECS 281: Data Structures & Algorithms',
    ],
    activities: [
      'EECS Course Grader',
      'UVSA-Midwest',
      'Vietnamese Student Association',
      'HackBlue',
      'Michigan Hackers',
    ],
    awards: [
      'HAIL Scholarship',
      'University Honors',
      'Dean\'s List',
    ],
  },
  {
    id: 'stay-tuned',
    name: 'Stay Tuned',
    shortName: 'Stay Tuned',
    image: '/assets/img/schools/stay-tuned.svg',
  },
];

const Education = () => {
  const [selectedItem, setSelectedItem] = useState<EducationItem | null>(null);

  return (
    <section id="education" className="py-20 bg-primary">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-secondary uppercase flex items-center justify-center gap-4 mb-6">
            <GraduationCap className="w-8 h-8" />
            <span>Education</span>
            <GraduationCap className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-secondary"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-secondary"></div>
            </div>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>

        {/* Education Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {educationItems.filter(item => item.id !== 'stay-tuned').map((item) => (
            <div
              key={item.id}
              className="project-item cursor-pointer group btn-animated"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="project-item-caption absolute inset-0 flex items-center justify-center rounded-lg">
                  {item.id === 'stay-tuned' ? (
                    <HelpCircle className="w-16 h-16 text-white" />
                  ) : (
                    <GraduationCap className="w-16 h-16 text-white" />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="bg-white rounded-lg max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex justify-end p-4 border-b">
              <button
                onClick={() => setSelectedItem(null)}
                className="text-gray-500 hover:text-gray-700 btn-animated"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-8 text-center">
              <h2 className="text-3xl font-montserrat font-bold text-secondary uppercase mb-6">
                {selectedItem.name}
              </h2>

              <div className="flex items-center justify-center mb-8">
                <div className="h-1 w-20 bg-secondary"></div>
                <div className="mx-4">
                  <div className="w-4 h-4 bg-secondary"></div>
                </div>
                <div className="h-1 w-20 bg-secondary"></div>
              </div>

              <Image
                src={selectedItem.id === 'stay-tuned' ? selectedItem.image : `/assets/img/schools/${selectedItem.id}.png`}
                alt={selectedItem.name}
                width={400}
                height={300}
                className="mx-auto mb-8 rounded-lg"
              />

              {selectedItem.id === 'stay-tuned' ? (
                <p className="text-gray-700 text-lg leading-relaxed mb-8">
                  TBA
                </p>
              ) : (
                <div className="text-left max-w-3xl mx-auto space-y-6">
                  {selectedItem.courses && (
                    <div>
                      <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">
                        Relevant Courses
                      </h3>
                      <ul className="space-y-1 text-gray-700">
                        {selectedItem.courses.map((course, index) => (
                          <li key={index}>{course}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.activities && (
                    <div>
                      <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">
                        Activities
                      </h3>
                      <ul className="space-y-1 text-gray-700">
                        {selectedItem.activities.map((activity, index) => (
                          <li key={index}>{activity}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedItem.awards && (
                    <div>
                      <h3 className="text-xl font-montserrat font-bold text-secondary mb-4">
                        Awards
                      </h3>
                      <ul className="space-y-1 text-gray-700">
                        {selectedItem.awards.map((award, index) => (
                          <li key={index}>{award}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}


            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Education; 