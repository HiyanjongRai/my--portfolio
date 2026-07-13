import { HeroSection } from '@/components/ui/hero-section';
import { Header } from '@/components/ui/header';
import AboutIntro from '@/components/AboutIntro';
import Expertise from '@/components/Expertise';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Testimonials from '@/components/Testimonials';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import CustomCursor from '@/components/CustomCursor';

export default function Home() {
  return (
    <main className="relative bg-white cursor-none">
      <ScrollProgress />
      <CustomCursor />
      <Header />
      <HeroSection />
      <AboutIntro />
      <Projects />
      <Experience />
      <Expertise />
      <Education />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
