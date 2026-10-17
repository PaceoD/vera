import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 300;
const FPS = 30;

export function FrameAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload all 300 high quality frames
  useEffect(() => {
    let isMounted = true;
    const images: HTMLImageElement[] = [];
    let count = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameNum = String(i + 1).padStart(6, "0");
      img.src = `${import.meta.env.BASE_URL}frames_hq/frame_${frameNum}.jpg`;

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

  // Animation Loop (Continuous smooth 30 FPS playback)
  useEffect(() => {
    if (!isLoaded) return;

    let animFrameId: number;
    let lastFrameTime = performance.now();
    let currentFrame = 0;
    const frameInterval = 1000 / FPS;

    const drawFrame = (frameIndex: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      const img = imagesRef.current[frameIndex];
      if (!img || !img.complete || img.naturalWidth === 0) return;

      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
      }

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Object-cover aspect ratio math
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

  const progressPercent = Math.round((loadedCount / TOTAL_FRAMES) * 100);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black flex items-center justify-center">
      {!isLoaded && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-black text-white">
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
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
