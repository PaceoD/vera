import { useEffect, useRef } from "react";

interface AmbientBotanicalCanvasProps {
  preset: "faq" | "newsletter";
  count?: number;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  rotation: number;
  vRot: number;
  wobblePhase: number;
  wobbleSpeed: number;
  wobbleAmp: number;
  opacity: number;
  maxOpacity: number;
  life: number;
  maxLife: number;
  type: "leaf" | "petal" | "paper" | "gold";
  color: string;
}

export function AmbientBotanicalCanvas({
  preset,
  count = 32,
  className = "",
}: AmbientBotanicalCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      const dpr = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = canvas.parentElement?.offsetHeight || window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    const isFaq = preset === "faq";

    // Palette configuration per section preset
    const faqColors = ["#96B59A", "#8A9A86", "#A8BFA9", "#EFE9E2"];
    const newsletterColors = ["#C48A91", "#E8BAC0", "#D6B46D", "#FAD6C5", "#F7E1D7"];

    const createParticle = (initialRandom = false): Particle => {
      const typeRand = Math.random();
      let type: Particle["type"] = "leaf";
      if (isFaq) {
        type = typeRand < 0.65 ? "leaf" : "paper";
      } else {
        if (typeRand < 0.55) type = "petal";
        else if (typeRand < 0.8) type = "gold";
        else type = "paper";
      }

      const colors = isFaq ? faqColors : newsletterColors;
      const color = colors[Math.floor(Math.random() * colors.length)];

      const size = Math.random() * 14 + 8; // 8px - 22px
      const maxOpacity = Math.random() * 0.35 + 0.2; // 20% - 55%

      // Drift velocities: FAQ drifts downward-right breeze; Newsletter floats upward-right
      const vx = (Math.random() * 0.4 + 0.15) * (Math.random() > 0.3 ? 1 : -0.5);
      const vy = isFaq ? Math.random() * 0.35 + 0.2 : -(Math.random() * 0.45 + 0.2);

      const maxLife = Math.floor(Math.random() * 400 + 350);

      let x = Math.random() * width;
      let y = Math.random() * height;

      if (!initialRandom) {
        // Spawn from edges when recycling
        if (isFaq) {
          y = Math.random() < 0.7 ? -20 : Math.random() * height;
          x = y < 0 ? Math.random() * width : -20;
        } else {
          y = Math.random() < 0.7 ? height + 20 : Math.random() * height;
          x = y > height ? Math.random() * width : -20;
        }
      }

      return {
        x,
        y,
        size,
        vx,
        vy,
        rotation: Math.random() * Math.PI * 2,
        vRot: (Math.random() - 0.5) * 0.015,
        wobblePhase: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.02 + 0.01,
        wobbleAmp: Math.random() * 0.4 + 0.2,
        opacity: initialRandom ? maxOpacity * Math.random() : 0,
        maxOpacity,
        life: initialRandom ? Math.floor(Math.random() * maxLife) : 0,
        maxLife,
        type,
        color,
      };
    };

    const particles: Particle[] = Array.from({ length: count }, () =>
      createParticle(true)
    );

    // Particle Shape Renderers
    const drawLeaf = (size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.strokeStyle = color;
      ctx.lineWidth = 0.8;

      ctx.beginPath();
      ctx.moveTo(0, -size);
      ctx.bezierCurveTo(size * 0.75, -size * 0.4, size * 0.75, size * 0.4, 0, size);
      ctx.bezierCurveTo(-size * 0.75, size * 0.4, -size * 0.75, -size * 0.4, 0, -size);
      ctx.fill();

      // Delicate leaf vein
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.lineTo(0, size * 0.8);
      ctx.globalAlpha *= 0.6;
      ctx.stroke();
    };

    const drawPetal = (size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.8);
      ctx.quadraticCurveTo(size * 0.85, -size * 0.1, 0, size);
      ctx.quadraticCurveTo(-size * 0.85, -size * 0.1, 0, -size * 0.8);
      ctx.fill();
    };

    const drawGoldFragment = (size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.moveTo(0, -size * 0.6);
      ctx.lineTo(size * 0.5, 0);
      ctx.lineTo(0, size * 0.7);
      ctx.lineTo(-size * 0.4, 0);
      ctx.closePath();
      ctx.fill();
    };

    const drawPaperFragment = (size: number, color: string) => {
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.rect(-size * 0.35, -size * 0.55, size * 0.7, size * 1.1);
      ctx.fill();
    };

    // Render loop running at 60 FPS
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, index) => {
        p.life++;
        p.rotation += p.vRot;
        p.wobblePhase += p.wobbleSpeed;

        // Smooth velocity + gentle breeze swaying
        const currentVx = p.vx + Math.sin(p.wobblePhase) * p.wobbleAmp;
        p.x += currentVx;
        p.y += p.vy;

        // Fade in / Fade out life calculations
        const fadeIn = Math.min(1, p.life / 60);
        const fadeOut = Math.min(1, (p.maxLife - p.life) / 60);
        p.opacity = p.maxOpacity * fadeIn * fadeOut;

        // Reset particle when dead or out of canvas bounds
        if (
          p.life >= p.maxLife ||
          p.x < -40 ||
          p.x > width + 40 ||
          p.y < -40 ||
          p.y > height + 40
        ) {
          particles[index] = createParticle(false);
          return;
        }

        // Draw particle with transform
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity;

        if (p.type === "leaf") {
          drawLeaf(p.size, p.color);
        } else if (p.type === "petal") {
          drawPetal(p.size, p.color);
        } else if (p.type === "gold") {
          drawGoldFragment(p.size, p.color);
        } else {
          drawPaperFragment(p.size, p.color);
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animId);
    };
  }, [preset, count]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      aria-hidden="true"
    />
  );
}
