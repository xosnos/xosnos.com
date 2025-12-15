# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Steven Nguyen's personal portfolio website built with Next.js 16 (React 19), TypeScript, and Tailwind CSS. It's a modern, responsive single-page application showcasing projects, blogs, experience, and skills with integrated Apple Music (primary) / Spotify (fallback) now-playing and GitHub data.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Architecture

The project uses Next.js 16 with the App Router pattern and follows a component-based architecture:

### Directory Structure

- **src/app/**: Next.js App Router files
  - `layout.tsx`: Root layout with font configuration (Montserrat, Lato), metadata, Vercel Analytics and Speed Insights
  - `page.tsx`: Main page that imports and renders all sections in order (Hero, About, Blogs, Projects, Experience, Skills, Education, Contact)
  - `globals.css`: Global styles with Tailwind directives, custom CSS variables, utility classes, animations
  - `blogs/`: Blog routes
    - `page.tsx`: Blog index page at `/blogs` with grid layout, tags, and reading time
    - `[slug]/page.tsx`: Dynamic blog detail pages with markdown rendering, hero images, and canonical URL support
  - `api/`: API routes for external integrations
    - `blogs/`: Blog data endpoints
      - `route.ts`: Returns list of published blogs with count
      - `[slug]/route.ts`: Returns single blog post by slug (404 if not found/unpublished)
    - `music/now-playing/`: Unified music endpoint (Apple Music primary, Spotify fallback)
    - `spotify/`: Spotify OAuth flow endpoints (auth, callback, top-track - legacy)
    - `skills/`: GitHub README parsing endpoint
- **src/components/**: React components for each section
  - All components are TypeScript with proper interfaces
  - Client components use `'use client'` directive for interactivity
  - `BrandIcon.tsx` and `brandIcons.ts`: Custom SVG icon system for brand logos (GitHub, LinkedIn, X/Twitter)
  - `SpotifyPlayer.tsx`: Client component with audio preview playback, play/pause controls, and progress bar
  - `Navigation.tsx`: Client component with scroll-based active section tracking and mobile menu
  - `Footer.tsx`: Server component with scroll-to-top button (mobile only), social links, and location info
- **src/data/**: Data files
  - `blogs.ts`: Blog posts with markdown content, tags, reading time, optional `canonicalUrl` and `heroImage` fields
  - `experience.ts`: Experience entries with `published` flag and `type` field ('work' | 'volunteer' | 'project')
- **src/lib/**: Utility libraries
  - `spotify.ts`: Spotify API integration with OAuth refresh token flow
  - `apple-music.ts`: Apple Music helper for now-playing
  - `github-readme.ts`: Parses skills badges from GitHub README using markdown parsing
- **public/**: Static assets
  - `assets/img/`: Images organized by type (profile, about-me, projects/, schools/, icon/)
  - `manifest.json`: PWA manifest for installable web app
  - Legacy assets (unused): Bootstrap CSS, FontAwesome overrides, script.js
- **Configuration files**:
  - `.mcp.json`: MCP server configs for Sentry and Vercel
  - `.cursor/mcp.json`: Additional next-devtools MCP server for Cursor IDE

### Key Components

- **Navigation**: Fixed navigation bar with scroll-based active section tracking, mobile menu toggle, and dynamic shadow effect
- **Hero**: Header section with profile image, animated title banner effect (desktop only), and SpotifyPlayer widget
- **About**: About section with bio text and photo
- **Blogs**: Server component that fetches published posts from `/api/blogs` and displays them in a grid; supports both homepage preview and dedicated `/blogs` index page
- **Projects**: Client component with projects grid (7 total, 4 published) and modal details showing demo/repo links
- **Experience**: Server component that fetches published experiences from API, supports work/volunteer/project types
- **Skills**: Server component that fetches and displays skill badges dynamically from GitHub README with category organization
- **Education**: Client component with education timeline and modal details; filters out "stay-tuned" placeholder items
- **Contact**: Contact section with animated email CTA button using pulse-glow effect
- **Footer**: Footer with social links (GitHub, LinkedIn, X), scroll-to-top button (mobile only with bounce animation), dual location display, and credits
- **SpotifyPlayer**: Advanced music player with audio preview playback, play/pause controls, progress bar, and "Try again" error handling
- **BrandIcon**: Reusable SVG icon component with type-safe brand icon data

### Section Order (page.tsx)

1. Hero (Name / Now Playing)
2. About
3. Blogs
4. Projects
5. Experience
6. Skills
7. Education
8. Contact

### Routes

**Page Routes:**
- `/`: Main single-page application with all sections
- `/blogs`: Dedicated blog index page with grid layout, tags, and reading time
- `/blogs/[slug]`: Individual blog post pages with markdown rendering and hero images

**API Routes:**
- `/api/blogs`: GET - Returns list of published blogs (count + posts array)
- `/api/blogs/[slug]`: GET - Returns single blog post by slug (404 if not found/unpublished)
- `/api/music/now-playing`: GET - Unified music endpoint (Apple Music primary, Spotify fallback)
- `/api/skills`: GET - Fetches and parses skills from GitHub README
- `/api/spotify/auth`: GET - Initiates Spotify OAuth flow (redirects to Spotify)
- `/api/spotify/callback`: GET - Handles OAuth callback, returns tokens for manual .env setup
- `/api/spotify/top-track`: GET - Returns top track from Spotify (legacy, superseded by /api/music/now-playing)

## Key Technologies

- **Next.js 16**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript**: Full type safety throughout
- **Tailwind CSS**: Utility-first styling with custom theme extensions
- **Lucide React**: Icon library used throughout components
- **Framer Motion**: Animation library (imported but minimal usage currently)
- **React Markdown + remark-gfm**: Markdown rendering for blog posts
- **Vercel Analytics + Speed Insights**: Performance monitoring and analytics

## External Integrations

### Music Integration (Apple Music primary, Spotify fallback)

- `/api/music/now-playing` returns Apple Music recent track if `APPLE_MUSIC_DEVELOPER_TOKEN` + `APPLE_MUSIC_USER_TOKEN` are set; otherwise falls back to Spotify top track if Spotify envs are set.
- Apple Music helper: `src/lib/apple-music.ts`
- Spotify helper: `src/lib/spotify.ts`
- UI: `SpotifyPlayer.tsx` consumes `/api/music/now-playing`
- Env vars:
  - Apple: `APPLE_MUSIC_DEVELOPER_TOKEN`, `APPLE_MUSIC_USER_TOKEN`, optional `APPLE_MUSIC_STOREFRONT` (default `us`)
  - Spotify fallback: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`

### GitHub README Skills

- Fetches from `https://raw.githubusercontent.com/xosnos/xosnos/refs/heads/main/README.md`
- Parses shields.io badges organized by category
- Server component with 1-hour revalidation; graceful fallback on error
- Categories mapped: Languages, Frontend, Backend, Databases, Hosting, Tools, DevOps/Cloud/Infrastructure, Design, Organization

## Styling System

The project uses a custom design system built on Tailwind:

### Colors (defined in globals.css)

- `--color-primary`: #70cbff (light blue)
- `--color-secondary`: #2C3E50 (dark blue)
- `--color-light`: #ffffff
- `--color-dark`: #212529
- `--color-text-on-primary`: #333333
- Custom utility classes: `.text-primary`, `.bg-primary`, `.border-primary`, etc.

### Typography

- **Headings**: Montserrat font (weights: 400, 700)
- **Body text**: Lato font (weights: 400, 700, with italic)
- Fonts loaded via Next.js Google Fonts with CSS variables (`--font-montserrat`, `--font-lato`)

### Custom Animations

Defined in `globals.css`:

**Button Animations:**
- `.btn-animated`: General button hover with scale and shadow
- `.btn-primary-animated`: Primary button with scale and brightness
- `.btn-secondary-animated`: Secondary button with scale and brightness
- `.btn-social-animated`: Social buttons with scale, shadow, and translate

**Navigation Animations:**
- `.nav-link-animated`: Navigation links with scale and color change
- `.nav-item-hover`: Underline animation from center

**Special Effects:**
- `.title-banner-effect`: Desktop-only hero title with gradient-shift and shimmer overlay (using `data-text` attribute)
- `.project-item-caption`: Overlay fade-in on hover
- `.modal-overlay`: Semi-transparent backdrop for modals

**Keyframe Animations:**
- `@keyframes pulse-glow`: Pulsing glow effect for CTA buttons
- `@keyframes bounce`: Bounce animation for scroll-to-top button
- `@keyframes gradient-shift`: Animated gradient for title banner background
- `@keyframes shimmer`: Shimmer overlay effect for title banner

### Responsive Design

- Mobile-first approach
- Tailwind's standard breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- Container component centered with responsive padding

## Component Patterns

### Modal Components

Projects and Education components use similar modal patterns:

- State management with `useState` for modal visibility
- Click outside to close functionality (`onClick` on overlay with `stopPropagation` on modal content)
- Close button with X icon
- Fixed positioning with z-50
- Semi-transparent backdrop (`.modal-overlay`)

### Server vs Client Components

- Most components are server components by default for optimal performance
- **Client components** (marked with `'use client'`):
  - `SpotifyPlayer.tsx`: Audio preview playback, play/pause controls, progress bar, client-side music fetching
  - `Navigation.tsx`: Scroll-based active section tracking, mobile menu toggle, scroll event listeners
  - `Projects.tsx`: Modal state management for project details
  - `Education.tsx`: Modal state management for education details
- **Server components** (async data fetching):
  - `Hero.tsx`: Renders SpotifyPlayer but is itself a server component
  - `About.tsx`: Static content rendering
  - `Blogs.tsx`: Fetches published blogs from API with async/await
  - `Experience.tsx`: Fetches published experiences from API with async/await
  - `Skills.tsx`: Fetches and parses GitHub README at build/revalidation time (1-hour revalidation)
  - `Contact.tsx`: Static contact form/CTA
  - `Footer.tsx`: Static footer with links
  - `BrandIcon.tsx`: Reusable SVG icon renderer

### Data Structure

- `src/data/blogs.ts`: Blog posts with the following key fields:
  - `published`: Boolean flag controlling visibility
  - `content`: Markdown content rendered via React Markdown + GFM
  - `canonicalUrl`: Optional field; when set, "Read post" links to external URL instead of local `/blogs/[slug]` page
  - `heroImage`: Optional field; displays hero image at top of blog detail page
  - `tags`: Array of topic tags
  - `readTime`: Estimated reading time in minutes
- `src/data/experience.ts`: Experience entries with:
  - `published`: Boolean flag controlling visibility
  - `type`: 'work' | 'volunteer' | 'project' type classification
  - Optional external link support
  - Emoji indicators in role titles (e.g., 🪴, 🌿, 🌱 for progression)
- Components contain their own data arrays (projectItems with 7 total/4 published, educationItems, etc.) with TypeScript interfaces defined inline

### Image Handling

- Uses Next.js optimized Image component throughout
- Images organized in `/public/assets/img/` subdirectories:
  - `profile.jpg`: Main profile photo
  - `about-me-picture.jpeg`: About section photo
  - `projects/`: Project screenshots (8 images)
  - `schools/`: Education institution logos (5 images)
  - `icon/`: Favicons and app icons for PWA
- SVG format preferred for portfolio items and icons
- Shields.io badges use `unoptimized` prop for external images (Skills component)
- Remote image patterns configured in `next.config.ts` for Spotify CDN (i.scdn.co)

## Configuration Files

- `tailwind.config.ts`: Tailwind configuration with custom theme extensions (fonts, colors, container)
- `eslint.config.mjs`: ESLint configuration extending Next.js core-web-vitals and TypeScript configs
- `next.config.ts`: Next.js configuration with remote image patterns for Spotify CDN (i.scdn.co)
- `tsconfig.json`: TypeScript configuration for Next.js (target ES2017, strict mode, path aliases)
- `postcss.config.mjs`: PostCSS configuration with Tailwind and Autoprefixer
- `manifest.json`: PWA manifest for installable web app (note: URLs may need updating from legacy GitHub Pages hosting)
- `.mcp.json`: MCP server configurations for Sentry and Vercel integrations
- `.cursor/mcp.json`: Additional next-devtools MCP server for Cursor IDE support

## Development Notes

- All interactive components with state require `'use client'` directive
- The site functions as both a single-page application (smooth scrolling navigation) and multi-page app (dedicated `/blogs` and `/blogs/[slug]` routes)
- Components are designed to be self-contained and easily modifiable
- Vercel deployment ready with @vercel/analytics and @vercel/speed-insights integration
- SEO optimized with proper metadata and Open Graph tags in layout.tsx
- Skills data is fetched from GitHub README at build time and revalidated hourly (graceful fallback on error)
- Music integration supports Apple Music (primary) with Spotify fallback; requires proper environment variables
- Navigation component tracks active section on scroll and highlights current section with primary color
- Hero title banner effect (`.title-banner-effect`) only displays on desktop (md: breakpoint and above)
- Footer scroll-to-top button only displays on mobile devices
- Blog posts support both internal pages (`/blogs/[slug]`) and external canonical URLs
- Education component automatically filters out "stay-tuned" placeholder items
- Projects component contains 7 total projects (4 published, 3 unpublished)
- Spotify OAuth callback URL hardcoded to `http://127.0.0.1:3000/api/spotify/callback` in spotify.ts
- Legacy assets (Bootstrap CSS, FontAwesome CSS, script.js) present in `/public/assets/` but unused in current Next.js app
- PWA manifest exists but may contain outdated URLs from previous GitHub Pages hosting

## Code Style

- TypeScript interfaces for all data structures
- Consistent naming: kebab-case for files, PascalCase for components
- Tailwind utilities preferred over custom CSS (custom CSS only in globals.css)
- Clean imports organized by external libraries first, then internal components
- Async server components use `async` function syntax for data fetching

## Known Issues & Technical Debt

- **PWA Manifest URLs**: `manifest.json` contains URLs pointing to old GitHub Pages hosting (`https://xosnos.github.io/`) - should be updated to current domain
- **Unused Legacy Assets**: Bootstrap CSS (`/public/assets/bootstrap/css/bootstrap.min.css`), FontAwesome overrides, and legacy `script.js` are present but not used in the Next.js app - can be safely removed
- **Hardcoded Redirect URI**: Spotify OAuth callback URL is hardcoded to `http://127.0.0.1:3000/api/spotify/callback` in `src/lib/spotify.ts` - should be environment-configurable
- **MCP Config Duplication**: Two MCP configuration files (`.mcp.json` and `.cursor/mcp.json`) with overlapping configurations - consider consolidating
- **Framer Motion**: Dependency is installed but currently has minimal usage - consider either utilizing fully or removing to reduce bundle size
- **Stay-tuned Education Item**: Defined in Education component but filtered out from display - consider removing or implementing when ready
