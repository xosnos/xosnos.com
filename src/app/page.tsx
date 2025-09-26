import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Portfolio from '@/components/Portfolio';
import About from '@/components/About';
import Education from '@/components/Education';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import SpotifyPlayer from '@/components/SpotifyPlayer';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <Portfolio />
        <About />
        
        <section id="spotify" className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold font-montserrat text-secondary mb-4">
                Currently Vibing To
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Here&apos;s my current top track on Spotify - the song I&apos;ve been playing on repeat this month
              </p>
            </div>
            <SpotifyPlayer />
          </div>
        </section>

        <Education />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
