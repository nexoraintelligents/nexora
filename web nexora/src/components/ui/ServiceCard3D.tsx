import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "motion/react";
import React, { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

interface ServiceCard3DProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: readonly string[];
  accentColors: readonly [string, string];
  index: number;
}

export function ServiceCard3D({ title, description, icon, features, accentColors, index }: ServiceCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  
  const springConfig = { stiffness: 180, damping: 24, mass: 0.5 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  // ±9 degree constraint specifically for taller cards containing lists
  const rotateX = useTransform(y, [-1, 1], [9, -9]);
  const rotateY = useTransform(x, [-1, 1], [-9, 9]);

  const mouseX = useSpring(useMotionValue(150), springConfig);
  const mouseY = useSpring(useMotionValue(200), springConfig);

  const glareOpacity = useTransform(() => {
    const dist = Math.sqrt(x.get() ** 2 + y.get() ** 2);
    return hovered ? Math.min(dist * 0.4, 0.4) : 0;
  });

  const angle = useTransform(() => {
    const rad = Math.atan2(y.get(), x.get());
    return (rad * 180) / Math.PI + 90;
  });

  const glareBg = useMotionTemplate`radial-gradient(circle at ${mouseX}px ${mouseY}px, rgba(255,255,255,0.25), transparent 50%)`;
  const shimmerBorder = useMotionTemplate`conic-gradient(from ${angle}deg, rgba(255,255,255,0.02) 0%, ${accentColors[0]} 60%, rgba(255,255,255,0.02) 100%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const lx = e.clientX - rect.left;
    const ly = e.clientY - rect.top;
    
    mouseX.set(lx);
    mouseY.set(ly);
    rawX.set((lx / rect.width) * 2 - 1);
    rawY.set((ly / rect.height) * 2 - 1);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    rawX.set(0);
    rawY.set(0);
    if (cardRef.current) {
        mouseX.set(cardRef.current.offsetWidth / 2);
        mouseY.set(cardRef.current.offsetHeight / 2);
    }
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, y: 50, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1500px" }}
      className="w-full h-full"
    >
      <motion.div
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          background: "linear-gradient(135deg, rgba(14,22,45,0.92) 0%, rgba(6,10,24,0.98) 100%)",
          borderColor: "rgba(255,255,255,0.05)",
        }}
        className="relative h-full px-8 py-9 rounded-[24px] border flex flex-col group transition-all duration-300"
      >
        {/* Deep SVG Noise Generator */}
        <div className="absolute inset-0 pointer-events-none rounded-[24px] overflow-hidden opacity-[0.02]" style={{ zIndex: 0 }}>
          <svg className="w-full h-full text-transparent">
            <filter id={`noise-${index}`}>
              <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
            </filter>
            <rect width="100%" height="100%" filter={`url(#noise-${index})`} />
          </svg>
        </div>

        {/* Dynamic Inner Card Edge Burn Tracker (Strictly Border) */}
        <motion.div 
          className="absolute inset-[-1px] rounded-[25px] -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
          style={{ 
            background: shimmerBorder,
            padding: "1px",
            WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude"
          }} 
        />

        {/* Distance Glare Masking Layer */}
        <motion.div 
          className="absolute inset-0 pointer-events-none rounded-[24px] mix-blend-overlay transition-opacity duration-300 z-20"
          style={{ background: glareBg, opacity: glareOpacity }}
        />

        {/* Primary 3D Transform Payload Container */}
        <div style={{ transformStyle: "preserve-3d" }} className="relative z-10 w-full h-full flex flex-col">
          
          <div 
             className="w-12 h-12 flex-shrink-0 rounded-xl border flex items-center justify-center mb-6 shadow-xl"
             style={{ 
               background: `linear-gradient(135deg, ${accentColors[0]}15, ${accentColors[1]}15)`,
               borderColor: `${accentColors[0]}30`,
               transform: "translateZ(30px)", 
               transformStyle: "preserve-3d" 
             }}
          >
             <div style={{ transform: "translateZ(15px)" }}>{icon}</div>
          </div>

          <h3 style={{ transform: "translateZ(25px)", fontFamily: "'DM Sans', sans-serif" }} className="text-2xl font-bold mb-3 text-[rgba(255,255,255,0.95)] tracking-tight">
             {title}
          </h3>
          
          <p style={{ transform: "translateZ(10px)", fontFamily: "'DM Sans', sans-serif" }} className="text-[rgba(148,163,184,0.8)] text-[15px] leading-relaxed mb-8 flex-grow">
             {description}
          </p>

          <ul className="mb-10 space-y-3" style={{ transformStyle: "preserve-3d" }}>
            {features.map((feature, i) => {
              // Mathematical hierarchy inside the list layout Z spacing
              const depth = 10 + (i * 5);
              
              // Map the outer tilt vectors inversed and scaled for physical internal item floating
              const itemX = useTransform(x, [-1, 1], [-depth * 0.15, depth * 0.15]);
              const itemY = useTransform(y, [-1, 1], [-depth * 0.15, depth * 0.15]);

              return (
                <motion.li 
                  key={feature}
                  style={{ 
                    x: itemX, y: itemY,
                    transform: `translateZ(${depth}px)`,
                    fontFamily: "'DM Sans', sans-serif"
                  }}
                  className="flex items-center gap-3 text-[15px] text-[rgba(255,255,255,0.7)]"
                >
                  <div className="w-[5px] h-[5px] rounded-full" style={{ background: accentColors[0], boxShadow: `0 0 10px ${accentColors[0]}` }} />
                  {feature}
                </motion.li>
              );
            })}
          </ul>

          <motion.button
            style={{ 
              transform: "translateZ(52px)",
              borderColor: `${accentColors[0]}40`,
              fontFamily: "'DM Sans', sans-serif"
            }}
            whileHover={{ backgroundColor: `${accentColors[0]}15`, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full mt-auto py-3.5 px-4 rounded-xl border flex items-center justify-between group/btn text-sm font-semibold transition-all relative z-50 overflow-hidden"
          >
            <span style={{ color: "rgba(255, 255, 255, 0.95)" }}>Learn More</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowRight className="w-[18px] h-[18px]" color={accentColors[0]} />
            </motion.div>
          </motion.button>

        </div>
      </motion.div>
    </motion.div>
  );
}
