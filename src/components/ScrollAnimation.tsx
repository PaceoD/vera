import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

export function ScrollAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  // Preload all 240 extracted frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(6, "0");
      img.src = `/hero-sequence-webp/frame_${frameNum}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
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

  // Frame rendering and scroll handling
  useEffect(() => {
    if (!isLoaded) return;

    const drawFrame = (frameIndex: number) => {
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

      // Update resolution
      const targetCanvasWidth = Math.floor(width * dpr);
      const targetCanvasHeight = Math.floor(height * dpr);

      if (canvas.width !== targetCanvasWidth || canvas.height !== targetCanvasHeight) {
        canvas.width = targetCanvasWidth;
        canvas.height = targetCanvasHeight;
      }

      // Reset transform to identity then scale DPR to prevent matrix accumulation
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      // Calculate object-cover dimensions
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

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // Scroll listener to calculate progress
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollableHeight = rect.height - window.innerHeight;
      if (scrollableHeight <= 0) return;

      const currentScroll = -rect.top;
      const progress = Math.max(0, Math.min(1, currentScroll / scrollableHeight));
      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

    // Render loop with lerp
    let animFrameId: number;
    const renderLoop = () => {
      const diff = targetFrameRef.current - currentFrameRef.current;
      if (Math.abs(diff) > 0.001) {
        currentFrameRef.current += diff * 0.15;
      } else {
        currentFrameRef.current = targetFrameRef.current;
      }

      drawFrame(currentFrameRef.current);
      animFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      cancelAnimationFrame(animFrameId);
    };
  }, [isLoaded]);

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className="relative w-full bg-black min-h-screen">
      {/* Loading Overlay */}
      {!isLoaded && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
          <div className="w-48 h-1.5 bg-neutral-800 rounded-full overflow-hidden mb-4">
            <div
              className="h-full bg-white transition-all duration-150 ease-out rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <p className="font-mono text-xs tracking-widest text-neutral-400">
            LOADING FRAMES {progressPercent}%
          </p>
        </div>
      )}

      {/* Subtle floating scroll prompt */}
      {isLoaded && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-none flex flex-col items-center text-white/70 animate-bounce">
          <span className="text-xs uppercase tracking-widest mb-1 font-mono">Scroll to animate</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}

      {/* Main Sticky Scroll Track (600vh scroll height for smooth frame scrubbing) */}
      <div ref={containerRef} className="relative h-[600vh] w-full">
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden bg-black">
          <canvas
            ref={canvasRef}
            className="w-full h-full block touch-none"
          />
        </div>
      </div>
    </div>
  );
}
