import { Navbar } from '@/components/landing/Navbar';
import { HeroSection } from '@/components/landing/HeroSection';
import { FeaturesSection } from '@/components/landing/FeaturesSection';
import { WhyChooseSection } from '@/components/landing/WhyChooseSection';
import { TestimonialsSection } from '@/components/landing/TestimonialsSection';
import { PricingSection } from '@/components/landing/PricingSection';
import { FooterSection } from '@/components/landing/FooterSection';

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-16">
        <HeroSection />
        <section id="features">
          <FeaturesSection />
        </section>
        <WhyChooseSection />
        <section id="testimonials">
          <TestimonialsSection />
        </section>
        <section id="pricing">
          <PricingSection />
        </section>
        <section id="contact">
          <FooterSection />
        </section>
      </main>
    </div>
  );
}
