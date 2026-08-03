import { HeroSection } from '@/components/ui/hero-section';
import { Header } from '@/components/ui/header';
import AboutIntro from '@/components/AboutIntro';
import Expertise from '@/components/Expertise';
import Experience from '@/components/Experience';
import Education from '@/components/Education';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import FloatingMobileNav from '@/components/FloatingMobileNav';

export default function Home() {
  return (
    <main className="relative bg-white">
      <ScrollProgress />
      <Header />
      <HeroSection />
      <AboutIntro />
      <Projects />
      <Experience />
      <Expertise />
      <Education />
      <Contact />
      <Footer />
      <FloatingMobileNav />
    </main>
  );
}
