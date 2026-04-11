# Steven Nguyen's Portfolio

A modern, responsive portfolio site built with Next.js 16, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Framework**: Built with Next.js 16 and React 19
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first with Tailwind CSS
- **Dark/Light Theme**: Toggle between themes via next-themes
- **Optimized Performance**: Static generation and image optimization
- **Now Playing**: Apple Music primary with Spotify fallback via `/api/music/now-playing`
- **Animations**: Scroll-reveal, page transitions, staggered entrances, and modal animations via Motion (Framer Motion)
- **Projects & Education**: Interactive modals for deep dives
- **Experience**: Work and volunteer history with published/unpublished filtering
- **Skills**: Synced from GitHub README badges
- **Resume Gate**: Token-based access for resume downloads
- **Contact Form**: Email via Resend integration
- **Analytics**: Vercel Analytics and Speed Insights
- **Accessibility & SEO**: Semantic HTML, ARIA, and metadata

## 📁 Architecture

The app uses the **Next.js App Router** with a single-page layout. Section components (`Hero`, `Projects`, `Experience`, `Skills`, `Education`, `About`, `Contact`) are composed in `src/app/page.tsx` and wrapped in a `PageTransition` fade-in. Scroll-reveal animations are applied per-section via reusable `ScrollReveal` and `ScrollRevealItem` wrappers backed by shared animation variants in `src/lib/animations.ts`. Content is separated from presentation via typed data files in `src/data/`. Shared utilities for Apple Music, Spotify, GitHub README parsing, rate limiting, and resume tokens live in `src/lib/`. API routes under `src/app/api/` handle music now-playing, Spotify auth, skills fetching, and resume access.

## 🛠 Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - Latest React version
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS 4** - Utility-first CSS framework
- **Motion** (Framer Motion) - Scroll-reveal, page transitions, and interaction animations
- **Lucide React** - Modern icon library
- **next-themes** - Dark/light theme management
- **googleapis** - Google API integrations
- **Resend** - Transactional email service
- **@vercel/analytics** - Web analytics
- **@vercel/speed-insights** - Performance monitoring

## 🎨 Design System

### Colors

- **Primary**: `#70CBFF` (Light Blue)
- **Secondary**: `#2C3E50` (Dark Blue)
- **Background**: White/Light
- **Text**: Dark gray/Black

### Typography

- **Headings**: Montserrat (700 weight)
- **Body**: Lato (400, 700 weights)

### Layout

- **Container**: Responsive max-width with padding
- **Grid**: CSS Grid and Flexbox for layouts
- **Spacing**: Consistent spacing scale via Tailwind

## 🚀 Getting Started

### Prerequisites

- Node.js 20.9+ (Next.js 16 requirement)
- [Bun](https://bun.sh/) (package manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/xosnos/xosnos.com.git
cd xosnos.com
```

1. Install dependencies:

```bash
bun install
```

1. Start the development server:

```bash
bun run dev
```

1. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
bun run build
bun start
```

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🔧 Customization

### Adding New Projects

Add an entry to the `projects` array in `src/data/projects.ts` and set `published: true` to show it on the site.

### Adding Experience

- Add entries in `src/data/experience.ts`; set `published: true` to show.

### Homepage Section Order

The main page renders sections in this sequence:

1. Hero (Name / Now Playing)
2. Projects
3. Experience
4. Skills
5. Education
6. About
7. Contact

### Updating Skills

Skills are synced from GitHub README badges. To override or add manually, edit `src/components/Skills.tsx`.

### Changing Colors

Update the CSS custom properties in `src/app/globals.css`:

```css
:root {
  --color-primary: #18BC9C;
  --color-secondary: #2C3E50;
}
```

## 📊 Performance

- **Lighthouse Score**: 100/100 (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint**: < 1s
- **Largest Contentful Paint**: < 2.5s
- **Bundle Size**: ~109kB (gzipped)

## 🔄 Migration Notes

This site was migrated from a static HTML/Bootstrap website to Next.js:

- ✅ All content and functionality preserved
- ✅ Improved performance with static generation
- ✅ Better SEO with proper meta tags
- ✅ Enhanced accessibility
- ✅ Modern development workflow
- ✅ Type safety with TypeScript

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contact

- **Email**: [steven@xosnos.com](mailto:steven@xosnos.com)
- **GitHub**: [@xosnos](https://github.com/xosnos)
- **LinkedIn**: [/in/xosnos](https://linkedin.com/in/xosnos)
- **Twitter**: [@xosnos](https://twitter.com/xosnos)

---

Built with ❤️ by Steven Nguyen
