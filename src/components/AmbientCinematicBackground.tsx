import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;
const PLAYBACK_FPS = 18; // Very slow, breathing pace for ambient editorial feel

interface Particle {
  x: number;
  y: number;
  radius: number;
  alpha: number;
  speedX: number;
  speedY: number;
  pulseSpeed: number;
  pulsePhase: number;
}

export function AmbientCinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const scrollYRef = useRef(0);

  // Preload frame sequence
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(6, "0");
      img.src = `${import.meta.env.BASE_URL}hero-sequence-webp/frame_${frameNum}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize subtle floating dust motes
  useEffect(() => {
    const particles: Particle[] = [];
    const count = 24;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random(),
        y: Math.random(),
        radius: 0.7 + Math.random() * 1.2,
        alpha: 0.15 + Math.random() * 0.25,
        speedX: (Math.random() - 0.5) * 0.0001,
        speedY: -0.00015 - Math.random() * 0.00015,
        pulseSpeed: 0.008 + Math.random() * 0.012,
        pulsePhase: Math.random() * Math.PI * 2,
      });
    }

    particlesRef.current = particles;
  }, []);

  // Track scroll position for subtle depth parallax
  useEffect(() => {
    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Main Ambient Animation Loop
  useEffect(() => {
    if (!isLoaded) return;

    let animFrameId: number;
    let lastTime = performance.now();
    let currentFrame = 0;
    const frameInterval = 1000 / PLAYBACK_FPS;

    const render = (now: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const width = window.innerWidth;
      const height = window.innerHeight;
      const dpr = window.devicePixelRatio || 1;

      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 1. Draw Editorial Warm Ivory Base
      ctx.fillStyle = "#FFF8F3";
      ctx.fillRect(0, 0, width, height);

      // 2. Draw Soft Shifting Morning Sunlight Gradient
      const timeSec = now * 0.0005;
      const sunX = width * (0.5 + 0.15 * Math.sin(timeSec * 0.7));
      const sunY = height * (0.3 + 0.1 * Math.cos(timeSec * 0.5));
      const sunGradient = ctx.createRadialGradient(sunX, sunY, 50, sunX, sunY, width * 0.75);
      sunGradient.addColorStop(0, "rgba(214, 180, 109, 0.08)");
      sunGradient.addColorStop(0.5, "rgba(196, 138, 145, 0.03)");
      sunGradient.addColorStop(1, "rgba(255, 248, 243, 0)");
      ctx.fillStyle = sunGradient;
      ctx.fillRect(0, 0, width, height);

      // 3. Draw Breathing Frame Animation with Parallax & Opacity Blend
      const elapsed = now - lastTime;
      if (elapsed >= frameInterval) {
        currentFrame = (currentFrame + 1) % TOTAL_FRAMES;
        lastTime = now - (elapsed % frameInterval);
      }

      const img = imagesRef.current[currentFrame];
      if (img && img.complete && img.naturalWidth > 0) {
        ctx.save();
        ctx.globalAlpha = 0.82; // Muted editorial density

        // Parallax vertical drift
        const parallaxOffset = (scrollYRef.current * 0.04) % 20;

        // Calculate object-cover dimensions
        const imgRatio = img.naturalWidth / img.naturalHeight;
        const canvasRatio = width / height;
        let drawWidth = width;
        let drawHeight = height;
        let offsetX = 0;
        let offsetY = 0;

        if (canvasRatio > imgRatio) {
          drawWidth = width;
          drawHeight = width / imgRatio;
          offsetY = (height - drawHeight) / 2;
        } else {
          drawHeight = height;
          drawWidth = height * imgRatio;
          offsetX = (width - drawWidth) / 2;
        }

        ctx.drawImage(img, offsetX, offsetY + parallaxOffset, drawWidth, drawHeight);
        ctx.restore();
      }

      // 4. Central Soft Mask to Reduce Visual Noise (~30% Density Reduction in Center)
      const centerGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.25,
        width / 2,
        height / 2,
        width * 0.65
      );
      centerGradient.addColorStop(0, "rgba(255, 248, 243, 0.55)");
      centerGradient.addColorStop(0.6, "rgba(255, 248, 243, 0.25)");
      centerGradient.addColorStop(1, "rgba(255, 248, 243, 0)");
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, width, height);

      // 5. Draw Slow Floating Library Dust Motes
      ctx.save();
      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -0.05) p.y = 1.05;
        if (p.x < -0.05) p.x = 1.05;
        if (p.x > 1.05) p.x = -0.05;

        p.pulsePhase += p.pulseSpeed;
        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulsePhase));

        const px = p.x * width;
        const py = p.y * height;

        ctx.fillStyle = `rgba(180, 160, 145, ${currentAlpha})`;
        ctx.beginPath();
        ctx.arc(px, py, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameId);
    };
  }, [isLoaded]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#FFF8F3]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
