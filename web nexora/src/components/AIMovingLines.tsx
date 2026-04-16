import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  dx: number;
  dy: number;
};

const PARTICLE_COUNT = 70;
const LINK_DISTANCE = 120;
const MOUSE_RADIUS = 140;
const MAX_SPEED = 1.4;

type AIMovingLinesProps = {
  backgroundColor?: string;
  particleColor?: string;
  lineColor?: string;
  particleCount?: number;
  linkDistance?: number;
};

type MousePosition = {
  x: number;
  y: number;
};

export function AIMovingLines({
  backgroundColor = "#020617",
  particleColor = "#7c3aed",
  lineColor = "rgba(124,58,237,",
  particleCount = PARTICLE_COUNT,
  linkDistance = LINK_DISTANCE,
}: AIMovingLinesProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  const mouseRef = useRef<MousePosition | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      particlesRef.current = Array.from({ length: particleCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        dx: (Math.random() - 0.5) * 1,
        dy: (Math.random() - 0.5) * 1,
      }));
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = null;
    };

    resizeCanvas();
    initParticles();
    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      if (backgroundColor) {
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, width, height);
      }

      const particles = particlesRef.current;

      particles.forEach((p, i) => {
        const mouse = mouseRef.current;
        if (mouse) {
          const mx = p.x - mouse.x;
          const my = p.y - mouse.y;
          const md = Math.hypot(mx, my);

          if (md < MOUSE_RADIUS) {
            const force = (MOUSE_RADIUS - md) / MOUSE_RADIUS * 0.06;
            p.dx += (mx / md) * force;
            p.dy += (my / md) * force;
          }
        }

        p.x += p.dx;
        p.y += p.dy;

        if (p.x <= 0 || p.x >= width) p.dx *= -1;
        if (p.y <= 0 || p.y >= height) p.dy *= -1;

        p.dx = Math.max(Math.min(p.dx, MAX_SPEED), -MAX_SPEED);
        p.dy = Math.max(Math.min(p.dy, MAX_SPEED), -MAX_SPEED);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j += 1) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.hypot(dx, dy);

          if (dist < linkDistance) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `${lineColor}${1 - dist / linkDistance})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [backgroundColor, lineColor, particleColor, linkDistance, particleCount]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}
