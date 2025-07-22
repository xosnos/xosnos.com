# Steven Nguyen's Portfolio

A modern, responsive portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Framework**: Built with Next.js 15 and React 19
- **Type Safety**: Full TypeScript implementation
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Optimized Performance**: Static generation and image optimization
- **Interactive Components**: Modal systems for portfolio and education sections
- **Accessibility**: Semantic HTML and ARIA labels
- **SEO Optimized**: Proper meta tags and structured data

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with fonts and metadata
│   ├── page.tsx            # Main page combining all sections
│   └── globals.css         # Global styles and custom utilities
├── components/
│   ├── Navigation.tsx      # Fixed navigation bar with mobile menu
│   ├── Hero.tsx           # Header section with profile image
│   ├── Portfolio.tsx       # Projects grid with modal details
│   ├── About.tsx          # About section with bio and photo
│   ├── Education.tsx      # Education timeline with modal details
│   ├── Skills.tsx         # Skills badges and technologies
│   ├── Contact.tsx        # Contact section with email link
│   └── Footer.tsx         # Footer with social links and credits
public/
└── assets/               # Migrated from old portfolio
    ├── img/             # Images and logos
    └── fonts/           # Custom fonts (if any)
```

## 🛠 Technologies Used

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better development experience
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Modern icon library
- **Framer Motion** - Animation library (for future enhancements)

## 🎨 Design System

### Colors
- **Primary**: `#18BC9C` (Teal)
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
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/xosnos/xosnos.com.git
cd xosnos.com
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
npm start
```

## 📱 Responsive Breakpoints

- **Mobile**: `< 768px`
- **Tablet**: `768px - 1024px`
- **Desktop**: `> 1024px`

## 🔧 Customization

### Adding New Projects
Edit `src/components/Portfolio.tsx` and add to the `portfolioItems` array:

```typescript
{
  id: 'project-id',
  title: 'Project Name',
  image: '/assets/img/portfolio/project.svg',
  description: 'Project description...',
  demoUrl: 'https://demo.com', // optional
  repoUrl: 'https://github.com/user/repo', // optional
}
```

### Updating Skills
Edit `src/components/Skills.tsx` and modify the `skillCategories` array.

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

This portfolio was migrated from a static HTML/Bootstrap website to Next.js:

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
