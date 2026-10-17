import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 240;

export function ScrollAnimationPlayer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const targetFrameRef = useRef(0);
  const currentFrameRef = useRef(0);

  // Preload all 240 frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i).padStart(6, "0");

      // Use WebP for fast, lightweight preloading, with PNG fallback
      img.src = `${import.meta.env.BASE_URL}hero-sequence-webp/frame_${frameNum}.webp`;

      img.onload = () => {
        if (!isMounted) return;
        count++;
        setLoadedCount(count);
        if (count === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };

      img.onerror = () => {
        // Fallback to PNG if WebP fails
        img.src = `${import.meta.env.BASE_URL}hero-sequence-png/frame_${frameNum}.png`;
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

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawFrame = (frameIndex: number) => {
      const clampedIndex = Math.max(
        0,
        Math.min(TOTAL_FRAMES - 1, Math.round(frameIndex))
      );
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

      // Canvas background
      ctx.fillStyle = "#0A0A0C";
      ctx.fillRect(0, 0, width, height);

      // Fit image aspect ratio (contain style) centered perfectly
      const imgRatio = img.naturalWidth / img.naturalHeight;
      const canvasRatio = width / height;
      let drawWidth = width;
      let drawHeight = height;
      let offsetX = 0;
      let offsetY = 0;

      if (canvasRatio > imgRatio) {
        drawHeight = height;
        drawWidth = height * imgRatio;
        offsetX = (width - drawWidth) / 2;
      } else {
        drawWidth = width;
        drawHeight = width / imgRatio;
        offsetY = (height - drawHeight) / 2;
      }

      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const totalScroll = container.scrollHeight - window.innerHeight;
      const currentScroll = Math.max(0, Math.min(totalScroll, window.scrollY));
      const progress = totalScroll > 0 ? currentScroll / totalScroll : 0;

      targetFrameRef.current = progress * (TOTAL_FRAMES - 1);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    handleScroll();

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

  const loadPercentage = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div ref={containerRef} className="relative w-full h-[600vh] bg-[#0A0A0C]">
      {/* Sticky Canvas Viewport */}
      <div className="sticky top-0 left-0 w-full h-screen overflow-hidden flex items-center justify-center bg-[#0A0A0C]">
        <canvas ref={canvasRef} className="w-full h-full block touch-none" />

        {/* Loading overlay until frames are 100% ready */}
        {!isLoaded && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0A0A0C] z-50 transition-opacity duration-500">
            <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-white transition-all duration-150 ease-out"
                style={{ width: `${loadPercentage}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
