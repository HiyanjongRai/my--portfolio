import { HeroSection } from "@/components/ui/hero-section";
import { Header } from "@/components/ui/header";

export default function AltHeroPage() {
  return (
    <div className="flex w-full flex-col bg-white">
      <Header />
      <main className="grow">
        <HeroSection />
      </main>
    </div>
  );
}
