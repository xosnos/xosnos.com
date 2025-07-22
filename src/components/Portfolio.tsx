'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Code, X, ExternalLink, Github } from 'lucide-react';

interface PortfolioItem {
  id: string;
  title: string;
  image: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
}

const portfolioItems: PortfolioItem[] = [
  {
    id: 'almond-travel',
    title: 'Almond Travel',
    image: '/assets/img/portfolio/almond-travel.svg',
    description: 'Almond Travel is a website that makes traveling to America easier for tourists and immigrants. The process of going on a trip involves multiple steps, all of which require different apps and websites. Users must book flights on one platform, hotels on another, and information about restaurants and attractions involves painstaking research across multiple web sources. This project aims to bundle these steps into a seamless experience that is accessible and understandable for users of a variety of national origins.',
    demoUrl: 'https://almond-travel.xosnos.com/',
  },
  {
    id: 'rangr',
    title: 'RANGR',
    image: '/assets/img/portfolio/rangr.svg',
    description: 'RANGR is a mobile golf swing tracker that uses computer vision to analyze ball movements to provide metrics and insights. It\'s as simple as set, swing, track! Developed by EECS 441\'s ACE development team.',
    repoUrl: 'https://github.com/xosnos/ACE',
  },
  {
    id: 'jammming',
    title: 'jammming',
    image: '/assets/img/portfolio/jammming.svg',
    description: 'jammming is a front-end application to create super duper fast playlists and send them directly to your Spotify account.',
    demoUrl: 'https://jammming.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/jammming',
  },
  {
    id: 'parstagram',
    title: 'Parstagram',
    image: '/assets/img/portfolio/parstagram.svg',
    description: 'An Instagram clone with a custom Parse backend that allows a user to post photos, view a global photos feed, and add comments!',
    repoUrl: 'https://github.com/xosnos/parstagram',
  },
  {
    id: 'flix',
    title: 'Flix',
    image: '/assets/img/portfolio/flix.svg',
    description: 'Flix is a Flixster clone mobile app that allows users to browse movies from the The Movie Database API.',
    repoUrl: 'https://github.com/xosnos/flixster',
  },
  {
    id: 'taro',
    title: 'Taro',
    image: '/assets/img/portfolio/taro.svg',
    description: 'TBA',
  },
];

const Portfolio = () => {
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  return (
    <section id="portfolio" className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-montserrat font-bold text-secondary uppercase flex items-center justify-center gap-4 mb-6">
            <Code className="w-8 h-8" />
            <span>Portfolio</span>
            <Code className="w-8 h-8" />
          </h2>
          <div className="flex items-center justify-center mb-8">
            <div className="h-1 w-20 bg-secondary"></div>
            <div className="mx-4">
              <div className="w-4 h-4 bg-secondary"></div>
            </div>
            <div className="h-1 w-20 bg-secondary"></div>
          </div>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolioItems.map((item) => (
            <div
              key={item.id}
              className="portfolio-item cursor-pointer group btn-animated"
              onClick={() => setSelectedItem(item)}
            >
              <div className="relative">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className="w-full h-64 object-cover rounded-lg"
                />
                <div className="portfolio-item-caption absolute inset-0 flex items-center justify-center rounded-lg">
                  <Code className="w-16 h-16 text-white" />
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
                {selectedItem.title}
              </h2>

              <div className="flex items-center justify-center mb-8">
                <div className="h-1 w-20 bg-secondary"></div>
                <div className="mx-4">
                  <div className="w-4 h-4 bg-secondary"></div>
                </div>
                <div className="h-1 w-20 bg-secondary"></div>
              </div>

              <Image
                src={selectedItem.image}
                alt={selectedItem.title}
                width={600}
                height={400}
                className="mx-auto mb-8 rounded-lg"
              />

              <p className="text-gray-700 text-lg leading-relaxed mb-8 max-w-3xl mx-auto">
                {selectedItem.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {selectedItem.demoUrl && (
                  <a
                    href={selectedItem.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full font-montserrat font-bold uppercase tracking-wider btn-primary-animated flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-5 h-5" />
                    Working Demo
                  </a>
                )}
                {selectedItem.repoUrl && (
                  <a
                    href={selectedItem.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-3 rounded-full font-montserrat font-bold uppercase tracking-wider btn-secondary-animated flex items-center justify-center gap-2"
                  >
                    <Github className="w-5 h-5" />
                    Repository
                  </a>
                )}

              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Portfolio; 