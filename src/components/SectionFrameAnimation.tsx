import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 300;
const FPS = 30;

export function SectionFrameAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload HQ frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(6, "0");
      img.src = `/frames_hq/frame_${frameNum}.jpg`;

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

  // Animation Loop (Continuous 30 FPS playback)
  useEffect(() => {
    if (!isLoaded) return;

    let animFrameId: number;
    let lastFrameTime = performance.now();
    let currentFrame = 0;
    const frameInterval = 1000 / FPS;

    const drawFrame = (frameIndex: number) => {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (!container || !canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const rect = container.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      const width = rect.width;
      const height = rect.height;

      if (width === 0 || height === 0) return;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Calculate object-cover dimensions to fill section container
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const containerRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (containerRatio > imgRatio) {
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      } else {
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
      ctx.restore();
    };

    const animate = (now: number) => {
      const elapsed = now - lastFrameTime;

      if (elapsed >= frameInterval) {
        const framesToAdvance = Math.floor(elapsed / frameInterval);
        currentFrame = (currentFrame + framesToAdvance) % TOTAL_FRAMES;
        lastFrameTime = now - (elapsed % frameInterval);

        drawFrame(currentFrame);
      }

      animFrameId = requestAnimationFrame(animate);
    };

    drawFrame(0);
    animFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      drawFrame(currentFrame);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, [isLoaded]);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
