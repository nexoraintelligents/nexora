import { useRef, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Brain, Globe, Zap, ArrowRight, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

import { ParticleField } from "../components/3d/ParticleField";
import { ServiceCard3D } from "../components/ui/ServiceCard3D";

// ─── Services data ────────────────────────────────────────────────────────────

const SERVICES = [
  {
    icon: <Brain size={22} strokeWidth={1.5} color="#a78bfa" />,
    title: "Neural Decision Engine",
    description:
      "Advanced AI that simulates thousands of business scenarios to find the optimal path for growth.",
    features: ["Scenario Modeling", "Risk Assessment", "Opportunity Detection"],
    accentColors: ["#a78bfa", "#7c3aed"] as const,
  },
  {
    icon: <Globe size={22} strokeWidth={1.5} color="#38bdf8" />,
    title: "Predictive Market Intelligence",
    description:
      "Real-time global market analysis that predicts shifts before they happen.",
    features: ["Trend Forecasting", "Competitor Tracking", "Sentiment Analysis"],
    accentColors: ["#38bdf8", "#3b82f6"] as const,
  },
  {
    icon: <Zap size={22} strokeWidth={1.5} color="#fbbf24" />,
    title: "Automated Growth Ops",
    description:
      "Self-optimizing marketing and sales pipelines that learn from every interaction.",
    features: ["Lead Scoring", "Content Optimization", "Churn Prediction"],
    accentColors: ["#fbbf24", "#f97316"] as const,
  },
] as const;

// ─── Horizontal CTA banner with full glare + shimmer ─────────────────────────

function CTABanner() {
  const bannerRef = useRef<HTMLDivElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const spX  = useSpring(rawX, { stiffness: 180, damping: 24 });
  const spY  = useSpring(rawY, { stiffness: 180, damping: 24 });

  const rotateX  = useTransform(spY, [-1, 1], [3, -3]);
  const rotateY  = useTransform(spX, [-1, 1], [-5, 5]);
  const glareX = useTransform(spX, [-1, 1], ["20%", "80%"]);
  const glareY = useTransform(spY, [-1, 1], ["20%", "80%"]);
  const glareOp = useTransform(
    () => Math.hypot(spX.get(), spY.get()) * 0.12
  );
  const shimmerAngle = useTransform(
    () => `${Math.atan2(spY.get(), spX.get()) * (180 / Math.PI) + 90}deg`
  );
  const shimmerOp = useTransform(
    () => 0.06 + Math.hypot(spX.get(), spY.get()) * 0.22
  );

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = bannerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    rawX.set(((e.clientX - r.left) / r.width)  * 2 - 1);
    rawY.set(((e.clientY - r.top)  / r.height) * 2 - 1);
  }
  function onMouseLeave() { rawX.set(0); rawY.set(0); }

  return (
    <motion.div
      ref={bannerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      initial={{ opacity: 0, y: 40, filter: "blur(4px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.75, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: "1200px", marginTop: "3.5rem" }}
    >
      <motion.div
        style={{
          rotateX, rotateY,
          transformStyle: "preserve-3d",
          position: "relative",
          borderRadius: 24,
          overflow: "hidden",
          background: "linear-gradient(135deg, rgba(14,22,45,0.95) 0%, rgba(6,9,26,0.98) 100%)",
          backdropFilter: "blur(28px) saturate(180%)",
          border: "1px solid rgba(255,255,255,0.07)",
          boxShadow: `
            0 1px 0 0 rgba(255,255,255,0.07) inset,
            0 32px 80px -16px rgba(0,0,0,0.7),
            0 0 0 1px rgba(0,0,0,0.3)
          `,
          padding: "clamp(2rem, 4vw, 3rem) clamp(2rem, 5vw, 4rem)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "2rem",
          flexWrap: "wrap",
          cursor: "default",
        }}
      >
        {/* Shimmer border */}
        <motion.div aria-hidden style={{
          position: "absolute", inset: -1, borderRadius: 25,
          pointerEvents: "none", zIndex: 0, opacity: shimmerOp,
          background: useTransform(() => `conic-gradient(from ${shimmerAngle.get()}, #3b82f6, #d946ef, #3b82f6)`),
          padding: 1,
        }}>
          <div style={{ position: "absolute", inset: 1, borderRadius: 24, background: "#060d1a" }} />
        </motion.div>

        {/* Glare */}
        <motion.div aria-hidden style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          pointerEvents: "none", zIndex: 3, opacity: glareOp,
          background: useTransform(() => `radial-gradient(ellipse at ${glareX.get()} ${glareY.get()}, rgba(255,255,255,0.4) 0%, transparent 60%)`),
        }} />

        {/* Top accent */}
        <div aria-hidden style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: "linear-gradient(90deg, transparent 0%, #3b82f6 25%, #d946ef 75%, transparent 100%)",
          opacity: 0.8, zIndex: 4,
        }} />

        {/* Ambient glow */}
        <div aria-hidden style={{
          position: "absolute", top: "50%", left: "30%",
          transform: "translate(-50%, -50%)",
          width: 400, height: 300, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(59,130,246,0.1) 0%, transparent 70%)",
          pointerEvents: "none", zIndex: 1,
        }} />

        {/* Grain */}
        <div aria-hidden style={{
          position: "absolute", inset: 0, borderRadius: "inherit",
          pointerEvents: "none", zIndex: 6, opacity: 0.02,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }} />

        {/* Left — text */}
        <div style={{ position: "relative", zIndex: 5, maxWidth: 560 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "4px 12px", borderRadius: 999, marginBottom: "1rem",
            background: "rgba(217,70,239,0.08)",
            border: "1px solid rgba(217,70,239,0.2)",
          }}>
            <Sparkles size={12} color="#d946ef" />
            <span style={{
              fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.12em",
              textTransform: "uppercase", color: "#d946ef",
              fontFamily: "'DM Mono', monospace",
            }}>
              Custom Engagement
            </span>
          </div>

          <h3 style={{
            fontSize: "clamp(1.4rem, 3vw, 2rem)", fontWeight: 700,
            letterSpacing: "-0.04em", lineHeight: 1.15,
            color: "#fff", marginBottom: "0.75rem",
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Custom AI Consulting
          </h3>

          <p style={{
            fontSize: "0.95rem", color: "rgba(148,163,184,0.75)",
            lineHeight: 1.7,
            fontFamily: "'DM Sans', system-ui, sans-serif",
          }}>
            Need a bespoke solution? Our AI architects work directly with your
            team to design, build, and deploy tailored intelligence systems
            that map exactly to your business model.
          </p>
        </div>

        {/* Right — CTA */}
        <motion.button
          style={{
            position: "relative", zIndex: 5, flexShrink: 0,
            display: "inline-flex", alignItems: "center", gap: 10,
            padding: "14px 28px", borderRadius: 12,
            background: "linear-gradient(135deg, #3b82f6 0%, #d946ef 100%)",
            border: "none", cursor: "pointer",
            fontFamily: "'DM Sans', system-ui, sans-serif",
            fontSize: "0.95rem", fontWeight: 600, color: "#fff",
            letterSpacing: "-0.01em",
            boxShadow: "0 8px 32px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.4)",
            transform: "translateZ(30px)",
          }}
          whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(59,130,246,0.45)" }}
          whileTap={{ scale: 0.97 }}
        >
          Get in Touch
          <ArrowRight size={16} />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollYRaw, setScrollY] = useState(0);
  
  // Smooth out the state-based scroll pass exactly like Features pattern
  const scrollY = useSpring(scrollYRaw, { stiffness: 220, damping: 26, mass: 0.55 });

  useEffect(() => {
    const onScroll = () => {
      if (!sectionRef.current) return;
      setScrollY(Math.max(0, -sectionRef.current.getBoundingClientRect().top));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        padding: "130px 0 150px",
        overflow: "hidden",
        background: "linear-gradient(180deg, #04070f 0%, #060d1a 50%, #04070f 100%)",
      }}
    >
      {/* ── ParticleField WebGL ────────────────────────────────────────── */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 0,
        maskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 85% 75% at 50% 50%, black 25%, transparent 100%)",
      }}>
        <Canvas
          camera={{ position: [0, 0, 6], fov: 52 }}
          gl={{ antialias: false, alpha: true, powerPreference: "low-power" }}
          style={{ background: "transparent" }}
        >
          <ParticleField
            primaryColor="#3b82f6" /* Blue */
            secondaryColor="#d946ef" /* Fuchsia */
            scrollY={scrollY} /* Cast identical spring */
          />
        </Canvas>
      </div>

      {/* Indigo top light leak */}
      <div aria-hidden style={{
        position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)",
        width: 800, height: 400, borderRadius: "50%", zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(99,102,241,0.11) 0%, transparent 70%)",
      }} />

      {/* Cyan bottom light leak */}
      <div aria-hidden style={{
        position: "absolute", bottom: -80, left: "50%", transform: "translateX(-50%)",
        width: 600, height: 280, borderRadius: "50%", zIndex: 1, pointerEvents: "none",
        background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 70%)",
      }} />

      {/* Grain overlay */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.018,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        backgroundSize: "200px",
      }} />

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div style={{
        position: "relative", zIndex: 2,
        maxWidth: 1160, margin: "0 auto", padding: "0 24px",
      }}>

        {/* ── Asymmetric header ──────────────────────────────────────── */}
        <div
          className="services-header lg:flex-row flex-col flex"
          style={{
            gap: "2rem",
            marginBottom: "3.5rem",
            alignItems: "flex-end",
          }}
        >
          {/* Left — badge + word reveal */}
          <div style={{ flex: 1 }}>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                padding: "6px 14px", borderRadius: 999, marginBottom: "1.5rem",
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.2)",
              }}
            >
              <span style={{
                width: 6, height: 6, borderRadius: "50%",
                background: "#3b82f6",
                boxShadow: "0 0 8px #3b82f6, 0 0 20px #3b82f640",
                display: "inline-block",
              }} />
              <span style={{
                fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.14em",
                textTransform: "uppercase", color: "#3b82f6",
                fontFamily: "'DM Mono', monospace",
              }}>
                What We Build
              </span>
            </motion.div>

            {/* Word-by-word title */}
            <h2
              aria-label="Our Services"
              style={{
                fontSize: "clamp(2.6rem, 5.5vw, 4.4rem)",
                fontWeight: 700, lineHeight: 1.06, letterSpacing: "-0.045em",
                display: "flex", flexWrap: "wrap", gap: "0 0.24em",
                marginBottom: "1.2rem",
                fontFamily: "'DM Sans', system-ui, sans-serif",
              }}
            >
              {[
                { word: "Our",      accent: false },
                { word: "Services", accent: true  },
              ].map(({ word, accent }, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.55, delay: 0.06 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={accent ? {
                    background: "linear-gradient(135deg, #a78bfa 0%, #3b82f6 50%, #d946ef 100%)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  } : { color: "#fff" }}
                >
                  {word}
                </motion.span>
              ))}
            </h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontSize: "1rem", color: "rgba(148,163,184,0.75)",
                lineHeight: 1.75, maxWidth: 440,
                fontFamily: "'DM Sans', system-ui, sans-serif",
                margin: 0
              }}
            >
              Nexora provides a comprehensive suite of AI-powered solutions
              designed to scale your business intelligence and operational
              efficiency.
            </motion.p>
          </div>

          {/* Right — monospaced metrics */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            style={{
              borderLeft: "1px solid rgba(255,255,255,0.07)",
              paddingLeft: "2.5rem",
              display: "flex", flexDirection: "column", justifyContent: "flex-end",
              paddingBottom: "0.25rem",
              flex: "0 1 auto"
            }}
          >
            <p style={{
              fontSize: "0.85rem", color: "rgba(148,163,184,0.45)",
              lineHeight: 1.8, marginBottom: "1.5rem",
              fontFamily: "'DM Mono', monospace", letterSpacing: "0.01em",
            }}>
              // Three core pillars<br />
              // Each a standalone product<br />
              // All deeply integrated
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { metric: "3 products", label: "in one platform" },
                { metric: "~40ms",      label: "avg. inference time" },
                { metric: "99.95%",     label: "pipeline uptime" },
              ].map(({ metric, label }) => (
                <div key={metric} style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                  <span style={{
                    fontSize: "1.1rem", fontWeight: 700, color: "#fff",
                    letterSpacing: "-0.04em",
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {metric}
                  </span>
                  <span style={{
                    fontSize: "0.8rem", color: "rgba(148,163,184,0.45)",
                    fontFamily: "'DM Mono', monospace",
                  }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Service cards grid ─────────────────────────────────────── */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.5rem",
          alignItems: "stretch",
        }}>
          {SERVICES.map((service, i) => (
            <ServiceCard3D key={service.title} {...service} index={i} />
          ))}
        </div>

        {/* ── Full-width CTA banner ──────────────────────────────────── */}
        <CTABanner />
      </div>

    </section>
  );
}
