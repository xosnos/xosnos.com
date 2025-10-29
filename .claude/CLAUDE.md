# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is Steven Nguyen's personal portfolio website built with Next.js 15, TypeScript, and Tailwind CSS. It's a modern, responsive single-page application showcasing projects, experience, and skills.

## Development Commands

```bash
# Start development server with turbopack
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

- **src/app/**: Next.js App Router files
  - `layout.tsx`: Root layout with font configuration, metadata, and Vercel analytics
  - `page.tsx`: Main page that imports and renders all sections
  - `globals.css`: Global styles with Tailwind base, custom CSS variables for theming
- **src/components/**: React components for each section
  - All components are TypeScript with proper interfaces
  - Interactive components (Portfolio, Education) use `'use client'` directive for modal functionality
  - Each component is self-contained with its own data and styling

## Key Technologies

- **Next.js 15**: React framework with App Router
- **TypeScript**: Full type safety throughout
- **Tailwind CSS**: Utility-first styling with custom theme extensions
- **Lucide React**: Icon library used throughout components
- **Framer Motion**: Animation library (imported but minimal usage currently)
- **Vercel Analytics**: Performance monitoring and analytics

## Styling System

The project uses a custom design system built on Tailwind:

### Colors (defined in globals.css)

- `--color-primary`: #70cbff (light blue)
- `--color-secondary`: #2C3E50 (dark blue)
- Custom utility classes: `.text-primary`, `.bg-primary`, etc.

### Typography

- **Headings**: Montserrat font (weights: 400, 700)
- **Body text**: Lato font (weights: 400, 700, with italic)
- Fonts loaded via Next.js Google Fonts with CSS variables

### Responsive Design

- Mobile-first approach
- Tailwind's standard breakpoints (sm, md, lg, xl, 2xl)
- Container component centered with responsive padding

## Component Patterns

### Modal Components

Portfolio and Education components use similar modal patterns:

- State management with `useState` for modal visibility
- Keyboard event handling (Escape to close)
- Click outside to close functionality
- Proper focus management and accessibility

### Data Structure

Components contain their own data arrays (portfolioItems, educationItems, etc.) with proper TypeScript interfaces.

### Image Handling

- Uses Next.js optimized Image component
- Images stored in `/public/assets/img/` directory
- SVG format preferred for portfolio items and icons

## Configuration Files

- `tailwind.config.ts`: Tailwind configuration with custom theme extensions
- `eslint.config.mjs`: ESLint configuration extending Next.js rules
- `next.config.ts`: Basic Next.js configuration (currently minimal)
- `tsconfig.json`: TypeScript configuration for Next.js

## Development Notes

- All interactive components require `'use client'` directive
- The site is designed as a single-page application with smooth scrolling navigation
- Components are designed to be self-contained and easily modifiable
- Vercel deployment ready with analytics integration
- SEO optimized with proper metadata in layout.tsx

## Code Style

- TypeScript interfaces for all data structures
- Consistent naming: kebab-case for files, PascalCase for components
- Tailwind utilities preferred over custom CSS
- Clean imports organized by external libraries first, then internal components
