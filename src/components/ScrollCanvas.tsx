import React, { useEffect, useRef, useState } from "react";

export default function ScrollCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const bgContainerRef = useRef<HTMLDivElement | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const dimensionsRef = useRef({ x: 0, y: 0, width: 0, height: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [percentage, setPercentage] = useState(0);

  // Animation state refs (to avoid re-renders during animation loop)
  const stateRef = useRef({
    targetFrame: 1,
    currentFrame: 1,
    lastDrawnFrame: null as number | null,
    animationFrameId: null as number | null,
  });

  const totalFrames = 300;
  const frameFolder = "/ezgif-5f26d3fecd27db4c-jpg";
  const framePrefix = "ezgif-frame-";
  const frameExtension = ".jpg";
  const ease = 0.05; // Cinematic smoothing factor (0.05 is smoother than 0.08)

  // Draw image covering the entire canvas (similar to object-fit: cover)
  const drawFrame = (frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = imagesRef.current[frameIndex];
    if (!img || !img.complete) return;

    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    let { x, y, width, height } = dimensionsRef.current;

    // Recalculate dimensions only if canvas was resized or first cache
    if (width === 0) {
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;
      const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);

      x = (canvasWidth - imgWidth * scale) / 2;
      y = (canvasHeight - imgHeight * scale) / 2;
      width = imgWidth * scale;
      height = imgHeight * scale;

      dimensionsRef.current = { x, y, width, height };
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(img, x, y, width, height);
    stateRef.current.lastDrawnFrame = frameIndex;
  };

  // Lerp update loop
  const updateFrame = () => {
    const state = stateRef.current;
    const diff = state.targetFrame - state.currentFrame;

    if (Math.abs(diff) < 0.01) {
      state.currentFrame = state.targetFrame;
      const roundedFrame = Math.round(state.currentFrame);
      if (roundedFrame !== state.lastDrawnFrame) {
        drawFrame(roundedFrame);
      }
      state.animationFrameId = null;
      return;
    }

    state.currentFrame += diff * ease;
    const roundedFrame = Math.round(state.currentFrame);
    
    // Only draw the frame if it actually changed
    if (roundedFrame !== state.lastDrawnFrame) {
      drawFrame(roundedFrame);
    }

    state.animationFrameId = requestAnimationFrame(updateFrame);
  };

  useEffect(() => {
    // 1. Resize Handler
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Reset dimensions cache to trigger recalculation on next draw
      dimensionsRef.current = { x: 0, y: 0, width: 0, height: 0 };
      
      drawFrame(Math.round(stateRef.current.currentFrame));
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial call

    // 2. Scroll Handler
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const introHeight = window.innerHeight; // Height of Hero section (100vh)

      // Smoothly fade in and slide up the background canvas group as we scroll past the Hero section
      const container = bgContainerRef.current;
      if (container) {
        const opacity = Math.min(1, scrollTop / (introHeight * 0.95)); // fully visible slightly before 100vh
        container.style.opacity = opacity.toString();
        
        // Slide up parallax effect (starts at translateY(60px) and moves to 0px)
        const translateY = (1 - opacity) * 60;
        container.style.transform = `translateY(${translateY}px)`;
      }

      let target = 1;

      if (scrollTop > introHeight) {
        const animationScrollTop = scrollTop - introHeight;
        const animationMaxScroll = maxScroll - introHeight;
        const scrollFraction = animationMaxScroll <= 0 ? 0 : animationScrollTop / animationMaxScroll;

        target = Math.min(
          totalFrames,
          Math.max(1, Math.floor(scrollFraction * (totalFrames - 1)) + 1)
        );
      } else {
        target = 1;
      }

      stateRef.current.targetFrame = target;

      // Start loop if not already running
      if (!stateRef.current.animationFrameId) {
        stateRef.current.animationFrameId = requestAnimationFrame(updateFrame);
      }
    };

    // 3. Preload images
    let loadedCount = 0;
    const preload = () => {
      for (let i = 1; i <= totalFrames; i++) {
        const img = new Image();
        const paddedIndex = String(i).padStart(3, "0");
        img.src = `${frameFolder}/${framePrefix}${paddedIndex}${frameExtension}`;

        img.onload = () => {
          // Pre-decode image asynchronously on background thread to prevent scroll stutter (jank)
          img.decode()
            .then(() => {
              loadedCount++;
              const pct = Math.round((loadedCount / totalFrames) * 100);
              setPercentage(pct);

              if (loadedCount === totalFrames) {
                setIsLoaded(true);
                drawFrame(1);
                window.addEventListener("scroll", handleScroll, { passive: true });
                handleScroll();
              }
            })
            .catch((err) => {
              console.warn(`Failed to decode frame ${i}, using fallback:`, err);
              loadedCount++;
              const pct = Math.round((loadedCount / totalFrames) * 100);
              setPercentage(pct);

              if (loadedCount === totalFrames) {
                setIsLoaded(true);
                drawFrame(1);
                window.addEventListener("scroll", handleScroll, { passive: true });
                handleScroll();
              }
            });
        };

        img.onerror = () => {
          loadedCount++;
          const pct = Math.round((loadedCount / totalFrames) * 100);
          setPercentage(pct);
          console.error(`Failed to load frame ${i}`);

          if (loadedCount === totalFrames) {
            setIsLoaded(true);
            drawFrame(1);
            window.addEventListener("scroll", handleScroll, { passive: true });
            handleScroll();
          }
        };

        imagesRef.current[i] = img;
      }
    };

    preload();

    // Cleanup listeners
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      if (stateRef.current.animationFrameId) {
        cancelAnimationFrame(stateRef.current.animationFrameId);
      }
    };
  }, []);

  return (
    <>
      {/* Premium minimal preloader */}
      <div
        className={`fixed inset-0 bg-black flex items-center justify-center z-50 transition-opacity duration-800 ${
          isLoaded ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        <div className="flex flex-col items-center justify-center relative select-none">
          {/* Spinner */}
          <div className="w-20 h-20 border-2 border-white/5 border-t-white rounded-full animate-spin" />
          {/* Percentage */}
          <span className="absolute font-mono text-xs tracking-widest text-white/90">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Fixed Background Canvas & Overlay Group */}
      <div
        ref={bgContainerRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0, willChange: "transform, opacity" }}
      >
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Subtle overlay to dim canvas and ensure white text readability */}
        <div className="absolute inset-0 bg-black/75" />
      </div>
    </>
  );
}
