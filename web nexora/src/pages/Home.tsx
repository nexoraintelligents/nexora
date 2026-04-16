import { Hero } from "../components/Hero";
import { Features } from "../components/Features";
import { About } from "../components/About";
import { LeadershipTeam } from "../components/LeadershipTeam";
import { Testimonials } from "../components/Testimonials";
import { CTASection } from "../components/CTASection";
import { FAQ } from "../components/FAQ";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <About />
      <LeadershipTeam />
      <FAQ />
      <Testimonials />
      <CTASection />
    </>
  );
}
