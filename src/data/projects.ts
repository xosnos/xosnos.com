export interface ProjectItem {
  id: string;
  title: string;
  image: string;
  description: string;
  demoUrl?: string;
  repoUrl?: string;
  published?: boolean;
  tags?: string[];
}

const projectItems: ProjectItem[] = [
  {
    id: 'uvsa-midwest',
    title: 'UVSA-Midwest App',
    image: '/assets/img/projects/uvsamidwest.png',
    description:
      "UVSA-Midwest's official app helps to coordinate flagship events and keeps constituents up-to-date with personalized information during the year and conference-specific information for flagship events.",
    tags: ['React Native', 'Expo', 'Firebase'],
    demoUrl: 'https://app.uvsamidwest.org',
    published: true,
  },
  {
    id: 'vector',
    title: 'Vector',
    image: '/assets/img/projects/vector.png',
    description:
      'Vector is your AI career agent. Capture roles, tailor your materials with local-first AI, score them like an ATS, and keep your portfolio & analytics in sync—without leaving one workspace.',
    tags: ['Next.js', 'AI', 'Tailwind'],
    demoUrl: 'https://vector.xosnos.com/',
    published: true,
  },
  {
    id: 'almond-travel',
    title: 'Almond Travel',
    image: '/assets/img/projects/almond-travel.png',
    description:
      'Almond Travel is a website that makes traveling to America easier for tourists and immigrants. Bundles flights, hotels, and attractions into a seamless experience.',
    tags: ['React', 'API Integration', 'UX Design'],
    demoUrl: 'https://almond-travel.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/almond-travel',
    published: true,
  },
  {
    id: 'jammming',
    title: 'jammming',
    image: '/assets/img/projects/jammming.png',
    description:
      'jammming is a front-end application to create super duper fast playlists and send them directly to your Spotify account.',
    tags: ['React', 'Spotify API', 'Tailwind'],
    demoUrl: 'https://jammming.xosnos.com/',
    repoUrl: 'https://github.com/xosnos/jammming',
    published: true,
  },
];

export function listPublishedProjects(): ProjectItem[] {
  return projectItems.filter((item) => item.published);
}

export { projectItems };
