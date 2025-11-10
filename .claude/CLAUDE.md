# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Steven Nguyen's personal portfolio website built with Next.js 16 (React 19), TypeScript, and Tailwind CSS. It's a modern, responsive single-page application showcasing projects, experience, and skills with integrated Spotify and GitHub data.

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

The project uses Next.js 15 with the App Router pattern and follows a component-based architecture:

### Directory Structure

- **src/app/**: Next.js App Router files
  - `layout.tsx`: Root layout with font configuration (Montserrat, Lato), metadata, Vercel Analytics and Speed Insights
  - `page.tsx`: Main page that imports and renders all sections in order
  - `globals.css`: Global styles with Tailwind directives, custom CSS variables, utility classes, animations
  - `api/`: API routes for external integrations
    - `spotify/`: Spotify OAuth flow and top track endpoint
    - `skills/`: GitHub README parsing endpoint
- **src/components/**: React components for each section
  - All components are TypeScript with proper interfaces
  - Interactive components (Portfolio, Education) use `'use client'` directive for modal functionality
  - `BrandIcon.tsx` and `brandIcons.ts`: Custom SVG icon system for brand logos
  - `SpotifyPlayer.tsx`: Client component for displaying current top Spotify track
- **src/lib/**: Utility libraries
  - `spotify.ts`: Spotify API integration with OAuth refresh token flow
  - `github-readme.ts`: Parses skills badges from GitHub README using markdown parsing

### Key Components

- **Navigation**: Fixed navigation bar with mobile menu toggle
- **Hero**: Header section with profile image and introduction
- **Portfolio**: Projects grid with modal details showing demo/repo links
- **About**: About section with bio and photo
- **Education**: Education timeline with modal details
- **Skills**: Server component that fetches and displays skill badges dynamically from GitHub README
- **Contact**: Contact section with email link
- **Footer**: Footer with social links and credits

## Key Technologies

- **Next.js 15**: React framework with App Router
- **React 19**: Latest React version
- **TypeScript**: Full type safety throughout
- **Tailwind CSS**: Utility-first styling with custom theme extensions
- **Lucide React**: Icon library used throughout components
- **Framer Motion**: Animation library (imported but minimal usage currently)
- **Vercel Analytics + Speed Insights**: Performance monitoring and analytics

## External Integrations

### Spotify Integration

The site integrates with Spotify API to display the user's current top track:

- OAuth 2.0 flow with refresh tokens
- API routes in `src/app/api/spotify/` handle authentication and data fetching
- Environment variables required: `SPOTIFY_CLIENT_ID`, `SPOTIFY_CLIENT_SECRET`, `SPOTIFY_REFRESH_TOKEN`
- `src/lib/spotify.ts` contains helper functions for token refresh and track fetching
- `SpotifyPlayer.tsx` component displays the track information

### GitHub README Skills

The Skills section dynamically fetches skill badges from the user's GitHub README:

- Fetches from `https://raw.githubusercontent.com/xosnos/xosnos/refs/heads/main/README.md`
- Parses markdown to extract shields.io badges organized by category
- Server component with 1-hour revalidation
- Falls back gracefully if fetch fails
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

- `.btn-animated`: General button hover with scale and shadow
- `.btn-primary-animated`: Primary button with scale and brightness
- `.btn-secondary-animated`: Secondary button with scale and brightness
- `.btn-social-animated`: Social buttons with scale, shadow, and translate
- `.nav-link-animated`: Navigation links with scale and color change
- `.portfolio-item-caption`: Overlay fade-in on hover
- `.nav-item-hover`: Underline animation from center
- `@keyframes pulse-glow`: Pulsing glow effect for CTA buttons
- `@keyframes bounce`: Bounce animation for scroll-to-top

### Responsive Design

- Mobile-first approach
- Tailwind's standard breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- Container component centered with responsive padding

## Component Patterns

### Modal Components

Portfolio and Education components use similar modal patterns:

- State management with `useState` for modal visibility
- Click outside to close functionality (`onClick` on overlay with `stopPropagation` on modal content)
- Close button with X icon
- Fixed positioning with z-50
- Semi-transparent backdrop (`.modal-overlay`)

### Server vs Client Components

- Most components are server components by default for optimal performance
- Client components (marked with `'use client'`) include:
  - `Portfolio.tsx`: For modal state management
  - `Education.tsx`: For modal state management
  - `Navigation.tsx`: For mobile menu toggle
  - `SpotifyPlayer.tsx`: For client-side Spotify data fetching
- `Skills.tsx`: Server component that fetches data at build/revalidation time

### Data Structure

Components contain their own data arrays (portfolioItems, educationItems, etc.) with proper TypeScript interfaces defined inline.

### Image Handling

- Uses Next.js optimized Image component
- Images stored in `/public/assets/img/` directory
- SVG format preferred for portfolio items and icons
- Shields.io badges use `unoptimized` prop for external images

## Configuration Files

- `tailwind.config.ts`: Tailwind configuration with custom theme extensions (fonts, colors, container)
- `eslint.config.mjs`: ESLint configuration extending Next.js rules
- `next.config.ts`: Basic Next.js configuration (currently minimal)
- `tsconfig.json`: TypeScript configuration for Next.js
- `postcss.config.mjs`: PostCSS configuration for Tailwind

## Development Notes

- All interactive components with state require `'use client'` directive
- The site is designed as a single-page application with smooth scrolling navigation (`scroll-smooth` class on html element)
- Components are designed to be self-contained and easily modifiable
- Vercel deployment ready with analytics integration
- SEO optimized with proper metadata and Open Graph tags in layout.tsx
- Skills data is fetched from GitHub README at build time and revalidated hourly
- Spotify integration requires proper environment variables setup

## Code Style

- TypeScript interfaces for all data structures
- Consistent naming: kebab-case for files, PascalCase for components
- Tailwind utilities preferred over custom CSS (custom CSS only in globals.css)
- Clean imports organized by external libraries first, then internal components
- Async server components use `async` function syntax for data fetching
