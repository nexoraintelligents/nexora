import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import React, { useRef, useState } from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
  badge?: string;
  delayIndex: number;
}

export function FeatureCard3D({ title, description, icon: Icon, badge, delayIndex }: FeatureCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // Normalized coords [-1, 1]
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  // High-performance spring config
  const springConfig = { stiffness: 220, damping: 26, mass: 0.55 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  // Tilt limit ±14° (invert axes to create correct physical tilt)
  const rotateX = useTransform(y, [-1, 1], ["14deg", "-14deg"]);
  const rotateY = useTransform(x, [-1, 1], ["-14deg", "14deg"]);

  // Mouse absolute coords within bounds for custom gradient positions
  const mouseX = useSpring(useMotionValue(150), springConfig);
  const mouseY = useSpring(useMotionValue(150), springConfig);

  // Dynamic glare opacity based on distance from center
  const glareOpacity = useTransform(() => {
    const dist = Math.sqrt(x.get() ** 2 + y.get() ** 2);
    return hovered ? Math.min(dist * 0.5, 0.6) : 0;
  });

  // Dynamic Border direction
  const angle = useTransform(() => {
    const rad = Math.atan2(y.get(), x.get());
    const deg = (rad * 180) / Math.PI;
    return deg + 90; // offset so 0 is standard
  });

  // Shimmer and Glow templates
  const backgroundRadial = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(56, 189, 248, 0.15), transparent 60%)`;
  const glareBackground = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255, 255, 255, 0.4), transparent 50%)`;
  const shimmerBorder = useMotionTemplate`conic-gradient(from ${angle}deg, rgba(255, 255, 255, 0.05) 0%, rgba(56, 189, 248, 0.4) 50%, rgba(255, 255, 255, 0.05) 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    
    // Local coords relative to container top-left
    const localX = e.clientX - rect.left;
    const localY = e.clientY - rect.top;
    
    mouseX.set(localX);
    mouseY.set(localY);

    // Normalized [-1, 1]
    rawX.set((localX / w) * 2 - 1);
    rawY.set((localY / h) * 2 - 1);
  };

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
    // Approximate center fallback for mouse leave
    if (cardRef.current) {
        mouseX.set(cardRef.current.offsetWidth / 2);
        mouseY.set(cardRef.current.offsetHeight / 2);
    }
  };

  return (
    <div style={{ perspective: "1000px" }} className="w-full h-full group">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 52, filter: "blur(4px)" }}
        whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ delay: delayIndex * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
          background: "rgba(14,22,45,0.92)",
          borderColor: "rgba(255,255,255,0.07)"
        }}
        className="relative h-full px-7 py-8 rounded-[20px] transition-all duration-300 border box-border flex flex-col"
      >
        {/* SVG Fractal Noise Grain Overlay (2.5% Opacity) */}
        <div className="absolute inset-0 pointer-events-none rounded-[20px] overflow-hidden opacity-[0.025]" style={{ zIndex: 0 }}>
          <svg className="w-full h-full text-transparent">
            <filter id="fractalNoise">
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter="url(#fractalNoise)" />
          </svg>
        </div>

        {/* Shimmer Border Clip (Strictly Border Mask) */}
        <motion.div 
          className="absolute inset-[-1px] rounded-[21px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ 
            background: shimmerBorder,
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }} 
        />

        {/* Glow Radial Layer (Inside Card behind content) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-[20px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{ background: backgroundRadial }}
        />

        {/* Glare Layer Overlay (Distance Opacity) */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-[20px] mix-blend-overlay transition-opacity duration-300 z-20"
          style={{ background: glareBackground, opacity: glareOpacity }}
        />

        {/* Parallax Content Canvas */}
        <div style={{ transformStyle: "preserve-3d" }} className="relative z-10 w-full h-full flex flex-col">
          {badge && (
             <div className="mb-8 inline-flex items-center gap-2 px-3 py-1 rounded border border-white/10 bg-white/5 w-fit" style={{ transform: "translateZ(10px)" }}>
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.8)] animate-pulse" />
                <span className="text-[10px] font-mono tracking-wider text-slate-300 uppercase">{badge}</span>
             </div>
          )}

          <div 
             className="w-12 h-12 flex-shrink-0 rounded-xl bg-gradient-to-br from-indigo-500/20 to-sky-500/20 border border-white/10 flex items-center justify-center mb-6 shadow-xl"
             style={{ transform: "translateZ(44px)", transformStyle: "preserve-3d" }}
          >
             <Icon className="w-6 h-6 text-sky-300 drop-shadow-md" style={{ transform: "translateZ(8px)" }} />
          </div>

          <h3 style={{ transform: "translateZ(20px)", fontFamily: "'DM Sans', sans-serif" }} className="text-[22px] font-bold mb-3 text-[rgba(255,255,255,0.92)] tracking-tight">
             {title}
          </h3>
          <p style={{ transform: "translateZ(10px)", fontFamily: "'DM Sans', sans-serif" }} className="text-[rgba(148,163,184,0.8)] text-[15px] leading-relaxed">
             {description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}
