import { AboutSection } from "./_components/about-section";
import { ContactSection } from "./_components/contact-section";
import { CtaSection } from "./_components/cta-section";
import { Footer } from "./_components/footer";
import { HeroSection } from "./_components/hero-section";
import { MenuSection } from "./_components/menu-section";
import { Navbar } from "./_components/navbar";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <MenuSection />
        <CtaSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
