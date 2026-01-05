import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-16 lg:pt-0">
        <Hero />
        <Projects />
        <Experience />
        <Skills />
        <Education />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
