export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  publishedAt: string; // ISO string
  tags?: string[];
  readingTime?: string;
  heroImage?: string;
  canonicalUrl?: string;
  content?: string;
  published?: boolean;
}

const blogs: BlogPost[] = [
  {
    slug: 'welcome-to-my-portfolio-blog',
    title: 'Welcome to my portfolio blog',
    summary:
      'Short updates about projects, learnings, and behind-the-scenes notes will live here!',
    publishedAt: '2025-12-9',
    tags: ['portfolio', 'announcement'],
    readingTime: '1 min',
    published: true,
  },
  {
    slug: 'staying-motivated-engineer-recession',
    title: 'Staying motivated as an engineer during a recession',
    summary:
      'Practical ways I keep momentum when the market tightens: focus on outcomes, narrow the signal, ship small wins, and invest in compounding skills.',
    publishedAt: '2025-02-01',
    tags: ['career', 'mindset', 'productivity'],
    readingTime: '4 min',
    heroImage: '/assets/img/portfolio/almond-travel.png',
    content: `
Recessions can shrink opportunities and amplify uncertainty. Here are practices I lean on to stay motivated and make progress even when the market cools.

**Anchor on outcomes, not hours.**
Measure progress by shipped impact: a merged PR, a performance win, a de-risked spike, a doc that unblocks others. A weekly “impact log” beats a time log.

**Reduce the noise floor.**
Throttle news and doomscrolling. Curate 2–3 trusted sources, skim weekly, and mute the rest. Replace infinite feeds with deliberate reading or building.

**Ship in slices.**
Break work into “thin verticals”: a working migration script, a feature flag, a single endpoint with tests. Small completions keep morale up and create option value.

**Deliberate practice with constraints.**
Pick one constraint (latency, cost, reliability) and build a micro-project around it. Track before/after metrics. Constraints sharpen skills and portfolios.

**Invest in compounding skills.**
- Systems thinking: write postmortems, model dependencies, diagram failure domains.
- Automation: scripts, CI pipelines, repeatable environments.
- Communication: crisp PRs, ADRs, and status updates earn trust fast.

**Find your feedback loop.**
If work feedback is slow, add a personal loop: record a quick demo, ask for code review trades, or ship an internal newsletter with “what changed this week.”

**Rest is part of the plan.**
Fatigue compounds negatively. Protect sleep, take walks, and pause when the marginal return drops. Sustainable pace beats sprint-then-crash.

**What to do this week (a mini-plan).**
- Ship one small improvement with a measurable metric (e.g., -50ms p99 or -5% build time).
- Write one short design note or ADR for a decision you made.
- Learn one tool deeper (profilers, tracing, or a CI trick) and apply it.
- Reach out to one peer for a review or pairing session.

Turbulence passes. The skills and habits you build now compound when the market rebounds.
    `,
    published: false,
  },
];

export function listPublishedBlogs(): BlogPost[] {
  return blogs
    .filter((post) => post.published !== false)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogBySlug(slug: string): BlogPost | undefined {
  return blogs.find((post) => post.slug === slug);
}

