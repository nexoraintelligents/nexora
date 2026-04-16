import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Users, Target, Award } from "lucide-react";
import { FeatureCard3D } from "./ui/FeatureCard3D";
import { ParticleField } from "./3d/ParticleField";

const aboutData = [
  {
    title: "Expert Team",
    description: "Our AI researchers and strategists bring decades of experience in machine learning architectures.",
    icon: Users,
    badge: "Engineers"
  },
  {
    title: "Mission-Driven",
    description: "Committed to democratizing autonomous intelligence technology for modern business operations.",
    icon: Target
  },
  {
    title: "Proven Results",
    description: "Clients achieve an average 40% improvement in decision routing and 25% increased ROI.",
    icon: Award,
    badge: "Verified"
  }
];

export function About() {
  const { scrollY } = useScroll(); // Native passive tracking
  const smoothScrollY = useSpring(scrollY, { stiffness: 220, damping: 26, mass: 0.55 });

  const headingText = "Pioneering the future of AI-driven business intelligence.";
  const words = headingText.split(" ");

  return (
    <section id="about" className="relative pt-32 pb-40 z-0" style={{ background: "linear-gradient(to bottom, #04070f, #060d1a)" }}>
      {/* Light Leaks mapped to strict accent variables */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-purple-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-[400px] bg-emerald-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* R3F Layer - Strictly Masked */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ 
          WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 100%)", 
          maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 100%)" 
        }}
      >
        <Canvas 
          camera={{ position: [0, 0, 5], fov: 60 }} 
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        >
          <Suspense fallback={null}>
             <ParticleField scrollY={smoothScrollY} primaryColor="#a78bfa" secondaryColor="#34d399" />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Asymmetrical Typographic Block */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 items-start">
          
          <div className="flex-1 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded bg-white/5 border border-[rgba(255,255,255,0.07)] box-shadow-[0_0_15px_rgba(255,255,255,0.1)] w-fit">
               <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse" />
               <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs tracking-widest text-[rgba(255,255,255,0.92)] uppercase">
                 About Nexora
               </span>
            </div>
            
            <h2 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.2] flex flex-wrap gap-[0.22em]">
               {words.map((word, i) => {
                 const isAccent = word === "future" || word === "AI-driven" || word === "intelligence.";
                 return (
                   <motion.span
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                     className={isAccent ? "bg-clip-text text-transparent bg-gradient-to-r from-[#a78bfa] to-[#34d399]" : "text-[rgba(255,255,255,0.92)]"}
                   >
                     {word}
                   </motion.span>
                 )
               })}
            </h2>
          </div>

          <div className="hidden lg:block w-[1px] h-32 bg-[rgba(255,255,255,0.1)] self-center" />

          <div className="flex-1 lg:max-w-md pt-4">
             <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-[rgba(148,163,184,0.8)] text-sm mb-8 flex flex-col gap-2">
                <span>// Organization Directory</span>
                <span>// Engineers: <span className="text-emerald-400">120+ active</span></span>
                <span>// Authorization: <span className="text-purple-400">SOC2 Verified</span></span>
             </div>
             <div className="flex items-center gap-6 opacity-30 grayscale">
                <Users className="w-7 h-7" />
                <Target className="w-7 h-7" />
                <Award className="w-7 h-7" />
             </div>
          </div>
        </div>

        {/* Dynamic Card Injection mapped directly onto identical Features module logic */}
        <div 
           className="grid gap-6 mb-32" 
           style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {aboutData.map((data, i) => (
            <FeatureCard3D 
              key={i}
              {...data}
              delayIndex={i}
            />
          ))}
        </div>

        {/* Global Statistical Anchors */}
        <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
           className="grid grid-cols-2 md:grid-cols-4 border border-[rgba(255,255,255,0.07)] rounded-[20px] bg-[rgba(14,22,45,0.4)] backdrop-blur-md overflow-hidden"
        >
           <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.07)] text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight">120+</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-[rgba(148,163,184,0.8)] uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                AI Specialists
              </div>
           </div>
           
           <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-[rgba(255,255,255,0.07)] text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight">$80M</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-[rgba(148,163,184,0.8)] uppercase tracking-widest font-semibold">Capital Raised</div>
           </div>
           
           <div className="p-8 md:p-10 border-r md:border-b-0 border-[rgba(255,255,255,0.07)] text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight">14</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-[rgba(148,163,184,0.8)] uppercase tracking-widest font-semibold">Global Offices</div>
           </div>
           
           <div className="p-8 md:p-10 text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight overflow-hidden">2021</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-[rgba(148,163,184,0.8)] uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                 Founded
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}