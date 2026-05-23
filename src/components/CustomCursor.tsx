import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorHaloRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    // Detect mobile touch screen early
    const checkIsTouch = () => {
      setIsMobile(
        "ontouchstart" in window ||
          navigator.maxTouchPoints > 0 ||
          window.matchMedia("(max-width: 768px)").matches
      );
    };

    checkIsTouch();
    window.addEventListener("resize", checkIsTouch);

    if (isMobile) return;

    let mouseX = 0;
    let mouseY = 0;
    let haloX = 0;
    let haloY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handleHoverStart = () => {
      if (cursorHaloRef.current) {
        cursorHaloRef.current.style.width = "48px";
        cursorHaloRef.current.style.height = "48px";
        cursorHaloRef.current.style.borderColor = "#7c3aed";
        cursorHaloRef.current.style.backgroundColor = "rgba(124, 58, 237, 0.04)";
      }
    };

    const handleHoverEnd = () => {
      if (cursorHaloRef.current) {
        cursorHaloRef.current.style.width = "28px";
        cursorHaloRef.current.style.height = "28px";
        cursorHaloRef.current.style.borderColor = "rgba(110, 120, 140, 0.3)";
        cursorHaloRef.current.style.backgroundColor = "transparent";
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Attach listeners to interactive items dynamically
    const updateInteractiveListeners = () => {
      const interactives = document.querySelectorAll('a, button, input, textarea, [role="button"], .interactive-hover');
      interactives.forEach((el) => {
        el.addEventListener("mouseenter", handleHoverStart);
        el.addEventListener("mouseleave", handleHoverEnd);
      });
    };

    // Update initial listeners and periodically setup
    updateInteractiveListeners();
    const clickObserver = new MutationObserver(updateInteractiveListeners);
    clickObserver.observe(document.body, { childList: true, subtree: true });

    // Tick loops for interpolated smooth halo following
    let animationFrameId: number;
    const tick = () => {
      // Easing calculation
      haloX += (mouseX - haloX) * 0.12;
      haloY += (mouseY - haloY) * 0.12;

      if (cursorHaloRef.current) {
        cursorHaloRef.current.style.transform = `translate3d(${haloX}px, ${haloY}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("resize", checkIsTouch);
      window.removeEventListener("mousemove", handleMouseMove);
      clickObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Central Core Cursor Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-slate-900 pointer-events-none z-[99999] -translate-x-1/2 -translate-y-1/2 transition-shadow duration-300 pointer-events-none shadow-[0_0_10px_rgba(37,99,235,0.5)]"
        style={{ willChange: "transform" }}
      />
      {/* Outer Glow Halo Ring */}
      <div
        ref={cursorHaloRef}
        className="fixed top-0 left-0 w-7 h-7 border border-slate-400 rounded-full pointer-events-none z-[99998] -translate-x-1/2 -translate-y-1/2 transition-[width,height,border-color,background-color] duration-300 pointer-events-none"
        style={{ willChange: "transform", mixBlendMode: "normal" }}
      />
    </>
  );
}
