export type ExperienceType = 'work' | 'volunteer' | 'project';

export interface ExperienceItem {
  id: string;
  organization: string;
  role: string;
  type: ExperienceType;
  location?: string;
  startDate: string;
  endDate?: string;
  description?: string;
  highlights?: string[];
  link?: string;
  logo?: string;
  published?: boolean;
}

const experiences: ExperienceItem[] = [
  {
    id: 'workday-sde-2',
    organization: 'Workday',
    role: 'Software Development Engineer II 🪴',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2024-5',
    endDate: '2025-3',
    description: 'Platform engineering with CI/CD, multi-region delivery, and service rollout safety.',
    highlights: [
      'Architected scalable CI/CD pipelines with Jenkins and Kubernetes, increasing deployment efficiency.',
      'Enabled automated rollouts of microservices across multiple regional data centers to streamline ops.',
      'Partnered with cross-functional teams to ensure seamless integrations and deployments.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  {
    id: 'workday-sde-1',
    organization: 'Workday',
    role: 'Software Development Engineer I 🌿',
    type: 'work',
    location: 'Pleasanton, CA, United States',
    startDate: '2023-2',
    endDate: '2024-4',
    description: 'Security and reliability engineering across backend services and dependency stack.',
    highlights: [
      'Identified and patched 15+ critical CVEs across third-party libraries to harden services.',
      'Built evaluation and analytics dashboards to streamline vulnerability management workflows.',
      'Strengthened backend infrastructure security to improve overall system resilience.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  {
    id: 'workday-intern',
    organization: 'Workday',
    role: 'Software Development Engineer Intern 🌱',
    type: 'work',
    location: 'Pleasanton, CA, United States (Hybrid)',
    startDate: '2022-5',
    endDate: '2022-8',
    description: 'Internal tooling and performance improvements for platform validation.',
    highlights: [
      'Modernized an internal CLI validator by migrating from shell scripts to Python for maintainability.',
      'Improved runtime via caching, significantly reducing execution time on repeated validations.',
      'Tested across bare-metal servers with varied configs to catch errors and mismatches.',
    ],
    link: 'https://www.workday.com',
    published: true,
  },
  {
    id: 'placeholder-role',
    organization: 'Your Organization',
    role: 'Your Role',
    type: 'work',
    location: 'City, Country',
    startDate: '2025-01-01',
    endDate: undefined,
    description:
      'Replace this placeholder by editing src/data/experience.ts to add your real roles and volunteering work.',
    highlights: ['Add concise bullet points for impact and metrics'],
    published: false,
  },
];

export function listPublishedExperiences(): ExperienceItem[] {
  return experiences
    .filter((exp) => exp.published !== false)
    .sort(
      (a, b) =>
        new Date(b.startDate).getTime() -
        new Date(a.startDate).getTime(),
    );
}

