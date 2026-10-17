import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

export function ScrollDrivenBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);
  const targetOpacityRef = useRef(0);
  const currentOpacityRef = useRef(0);

  // Preload all 240 frames
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
        img.src = `${import.meta.env.BASE_URL}hero-sequence-png/frame_${frameNum}.png`;
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
      };

      images.push(img);
    }

    imagesRef.current = images;

    return () => {
      isMounted = false;
    };
  }, []);

  // Frame rendering and section-aware scroll handling
  useEffect(() => {
    if (!isLoaded) return;

    const drawFrame = (frameIndex: number, opacity: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const clampedIndex = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex)));
      const img = imagesRef.current[clampedIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Base warm parchment background color
      ctx.fillStyle = "#FFF8F3";
      ctx.fillRect(0, 0, width, height);

      if (opacity <= 0.001) return;

      // Calculate object-cover dimensions to fill screen nicely
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.save();
      // Render frame illustration with multiply composite mode for clear, visible artwork
      ctx.globalAlpha = opacity;
      ctx.globalCompositeOperation = "multiply";
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();

      // Soft vignette mask around center to ensure text legibility while artwork shines
      const centerGradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        width * 0.2,
        width / 2,
        height / 2,
        width * 0.8
      );
      centerGradient.addColorStop(0, "rgba(255, 248, 243, 0.25)");
      centerGradient.addColorStop(1, "rgba(255, 248, 243, 0)");
      ctx.fillStyle = centerGradient;
      ctx.fillRect(0, 0, width, height);
    };

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewHeight = window.innerHeight;

      const heroEl = document.getElementById("hero-section");
      const exploreEl = document.getElementById("explore-topics-section");
      const mythEl = document.getElementById("myth-challenge-section");
      const evidenceExplainedEl = document.getElementById("evidence-explained-section");
      const evidenceFeedEl = document.getElementById("evidence-feed-section");
      const learningEl = document.getElementById("learning-hub-section");
      const trustEl = document.getElementById("trust-section");

      const heroHeight = heroEl?.offsetHeight || viewHeight * 0.85;
      const exploreTop = exploreEl?.offsetTop || heroHeight;
      const exploreHeight = exploreEl?.offsetHeight || viewHeight * 0.9;
      const mythTop = mythEl?.offsetTop || exploreTop + exploreHeight;
      const mythHeight = mythEl?.offsetHeight || viewHeight * 0.8;

      const animStartTop = evidenceExplainedEl?.offsetTop || mythTop + mythHeight;
      const trustTop = trustEl?.offsetTop || animStartTop + viewHeight * 3;
      const trustHeight = trustEl?.offsetHeight || viewHeight;
      const animEndBottom = trustTop + trustHeight;

      // Section 1: Hero -> Keep background unchanged (0% opacity)
      if (scrollY < exploreTop - 150) {
        targetOpacityRef.current = 0;
        targetFrameRef.current = 0;
      }
      // Section 2: Explore Topics -> Static subtle paper texture (5% opacity)
      else if (scrollY >= exploreTop - 150 && scrollY < mythTop - 150) {
        targetOpacityRef.current = 0.05;
        targetFrameRef.current = 0;
      }
      // Section 3: Myth Challenge -> Static section (No animation)
      else if (scrollY >= mythTop - 150 && scrollY < animStartTop - 150) {
        targetOpacityRef.current = 0.02;
        targetFrameRef.current = 0;
      }
      // Section 4: ONE continuous scroll-driven sequence (Evidence Explained -> Evidence Feed -> Learning Hub -> Trust)
      else if (scrollY >= animStartTop - 150 && scrollY <= animEndBottom + 150) {
        const totalAnimScrollable = animEndBottom - animStartTop;
        const currentAnimScroll = Math.max(0, Math.min(totalAnimScrollable, scrollY - (animStartTop - 150)));
        const progress = totalAnimScrollable > 0 ? currentAnimScroll / totalAnimScrollable : 0;

        // Continuous scrub across all 240 frames (never restarts)
        targetFrameRef.current = progress * (TOTAL_FRAMES - 1);

        const evidenceFeedTop = evidenceFeedEl?.offsetTop || animStartTop + viewHeight;
        const learningTop = learningEl?.offsetTop || evidenceFeedTop + viewHeight;

        if (scrollY < evidenceFeedTop) {
          // Evidence Explained: 35% opacity (Roots, DNA & paper sketches clearly visible)
          targetOpacityRef.current = 0.35;
        } else if (scrollY < learningTop) {
          // Evidence Feed: 40% opacity (Papers evolving into books & tree trunk)
          targetOpacityRef.current = 0.40;
        } else if (scrollY < trustTop) {
          // Learning Hub: 45% opacity (Trunk growing into branches with botanical elements)
          targetOpacityRef.current = 0.45;
        } else {
          // Trust Section: 30% fading down to 0% as user reaches bottom of Trust
          const trustProgress = Math.min(1, Math.max(0, (scrollY - trustTop) / (trustHeight || viewHeight)));
          targetOpacityRef.current = 0.30 * (1 - trustProgress);
        }
      }
      // Section 5: Footer -> END animation completely (0% opacity, warm peach background)
      else {
        targetOpacityRef.current = 0;
        targetFrameRef.current = TOTAL_FRAMES - 1;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    let animFrameId: number;
    const renderLoop = () => {
      const frameDiff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(frameDiff) > 0.001) {
        currentFrameRef.current += frameDiff * 0.12;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      const opacityDiff = targetOpacityRef.current - currentOpacityRef.current;
      if (Math.abs(opacityDiff) > 0.0005) {
        currentOpacityRef.current += opacityDiff * 0.12;
      } else {
        currentOpacityRef.current = targetOpacityRef.current;
      }

      drawFrame(currentFrameRef.current, currentOpacityRef.current);
      animFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [isLoaded]);

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden bg-[#FFF8F3]">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
