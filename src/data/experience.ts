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
      'Designed and shipped CI/CD pipelines with Jenkins and Kubernetes that served 200+ engineers, reducing deployment cycle time across 8 regional data centers.',
      'Drove automated rollouts of microservices across multiple production data centers, establishing canary deployment patterns to minimize blast radius during releases.',
      'Embedded with product and infrastructure teams to unblock multi-region delivery, directly owning the pipeline from code merge to production.',
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
      'Triaged and remediated 15+ critical CVEs under SLA pressure, coordinating with security and platform teams to patch production services with zero downtime.',
      'Built a vulnerability analytics dashboard adopted by the security operations team as their primary triage tool, reducing mean-time-to-remediation across services.',
      'Strengthened backend infrastructure security across the dependency stack, establishing repeatable audit processes for third-party library risk assessment.',
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
      'Modernized an internal CLI validator by migrating from shell scripts to Python, improving maintainability and reducing onboarding time for new engineers.',
      'Optimized validation runtime via caching strategies, significantly reducing execution time on repeated configuration checks.',
      'Tested across bare-metal servers with varied configurations to catch environment-specific errors, building a regression suite for platform validation.',
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

