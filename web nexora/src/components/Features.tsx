import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { Brain, Command, Lock, Activity } from "lucide-react";
import { FeatureCard3D } from "./ui/FeatureCard3D";
import { CyberGrid } from "./3d/CyberGrid";

const featuresData = [
  {
    title: "Neural Engine",
    description: "Run advanced predictive models with zero cold starts. Computations happen natively at the edge layer.",
    icon: Brain,
    badge: "API V2"
  },
  {
    title: "Global Mesh",
    description: "Route decisions intelligently across an Anycast network mapping 30+ enterprise-grade data centers.",
    icon: Activity
  },
  {
    title: "Zero-Trust Vault",
    description: "Multi-party computation networks ensures your sensitive intelligence never touches disks unencrypted.",
    icon: Lock
  },
  {
    title: "Command Interface",
    description: "A developer-first CLI interface and comprehensive React SDK to integrate insights directly into workflow.",
    icon: Command,
    badge: "SDK"
  }
];

export function Features() {
  const { scrollY } = useScroll(); // UseScroll securely attaches passive listeners internally
  const smoothScrollY = useSpring(scrollY, { stiffness: 220, damping: 26, mass: 0.55 });

  const headingText = "Scale your intelligence infrastructure without limits.";
  const words = headingText.split(" ");

  return (
    <section id="features" className="relative pt-32 pb-40 z-0 dark:bg-[#060d1a]">
      {/* Absolute Dual Ambient Light Leaks */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-indigo-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-0 inset-x-0 h-[400px] bg-sky-900/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* WebGL Drifting Background - Masked via CSS Radial Gradient */}
      <div 
        className="absolute inset-0 pointer-events-none -z-10 overflow-hidden"
        style={{ 
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 80%)", 
          maskImage: "radial-gradient(circle at 50% 50%, black 10%, transparent 80%)" 
        }}
      >
        <Canvas 
          camera={{ position: [0, 4, 10], fov: 50 }} 
          dpr={[1, 2]}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
        >
          <Suspense fallback={null}>
            {/* Feeds smooth motion-value physics straight into R3F */}
            <CyberGrid scrollY={smoothScrollY} />
          </Suspense>
        </Canvas>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Asymmetric Two-Column Header */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 mb-24 items-start">
          
          {/* Left Hero Heading */}
          <div className="flex-1 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 px-3 py-1.5 rounded glass border border-black/10 dark:border-[rgba(255,255,255,0.07)] box-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:box-shadow-[0_0_15px_rgba(255,255,255,0.1)] w-fit">
               <span className="w-1.5 h-1.5 rounded-full bg-sky-500 drop-shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
               <span style={{ fontFamily: "'DM Mono', monospace" }} className="text-xs tracking-widest text-foreground/80 dark:text-[rgba(255,255,255,0.92)] uppercase">
                 Systems Online
               </span>
            </div>
            
            <h2 style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-4xl md:text-6xl font-bold tracking-tight leading-[1.2] flex flex-wrap gap-[0.22em]">
               {words.map((word, i) => {
                 const isAccent = word === "intelligence" || word === "infrastructure";
                 return (
                   <motion.span
                     key={i}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true, margin: "-100px" }}
                     transition={{ duration: 0.3, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] }}
                     className={isAccent ? "bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-[#38bdf8] dark:via-[#818cf8] dark:to-[#c084fc]" : "text-foreground dark:text-[rgba(255,255,255,0.92)]"}
                   >
                     {word}
                   </motion.span>
                 )
               })}
            </h2>
          </div>

          {/* Hairline Divider (Desktop exclusive) */}
          <div className="hidden lg:block w-[1px] h-32 bg-[rgba(255,255,255,0.1)] self-center" />

          {/* Right Accoutrement */}
          <div className="flex-1 lg:max-w-md pt-4">
             <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-[rgba(148,163,184,0.8)] text-sm mb-8 flex flex-col gap-2">
                <span>// Core infrastructure topology</span>
                <span>// Latency: <span className="text-sky-400">12ms avg</span></span>
                <span>// Uptime: <span className="text-emerald-400">99.999%</span></span>
             </div>
             <div className="flex items-center gap-6 opacity-30 grayscale">
                <Brain className="w-7 h-7" />
                <Activity className="w-7 h-7" />
                <Lock className="w-7 h-7" />
             </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div 
           className="grid gap-6 mb-32" 
           style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
        >
          {featuresData.map((feature, i) => (
            <FeatureCard3D 
              key={i}
              {...feature}
              delayIndex={i}
            />
          ))}
        </div>

        {/* Bottom Strip Glassmorphic Demographics */}
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true, margin: "-50px" }}
           transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
           className="grid grid-cols-2 md:grid-cols-4 border border-black/10 dark:border-[rgba(255,255,255,0.07)] rounded-[20px] bg-white/40 dark:bg-[rgba(14,22,45,0.4)] backdrop-blur-md overflow-hidden"
        >
           {/* Internal hairlines separated structurally via border widths */}
           <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/10 dark:border-[rgba(255,255,255,0.07)] text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-foreground dark:text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight">98.9%</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Model Accuracy</div>
           </div>
           
           <div className="p-8 md:p-10 border-b md:border-b-0 md:border-r border-black/10 dark:border-[rgba(255,255,255,0.07)] text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-foreground dark:text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight">10B+</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Events Processed</div>
           </div>
           
           <div className="p-8 md:p-10 border-r md:border-b-0 border-black/10 dark:border-[rgba(255,255,255,0.07)] text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-foreground dark:text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight">&lt;8ms</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-muted-foreground uppercase tracking-widest font-semibold">Latency p99</div>
           </div>
           
           <div className="p-8 md:p-10 text-center flex flex-col items-center justify-center">
              <div style={{ fontFamily: "'DM Mono', monospace" }} className="text-3xl md:text-4xl text-foreground dark:text-[rgba(255,255,255,0.92)] mb-2 font-medium tracking-tight overflow-hidden">SOC2</div>
              <div style={{ fontFamily: "'DM Sans', sans-serif" }} className="text-xs text-muted-foreground uppercase tracking-widest font-semibold flex items-center justify-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-emerald-400" />
                 Certified
              </div>
           </div>
        </motion.div>

      </div>
    </section>
  );
}
