import Navigation from '@/components/Navigation';
import Projects from '@/components/Projects';
import Footer from '@/components/Footer';

export const metadata = {
  title: "Projects - Steven Nguyen",
  description: "Explore my latest software engineering projects, from web apps to mobile development.",
};

export default function ProjectsPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16">
        <Projects />
      </main>
      <Footer />
    </div>
  );
}
