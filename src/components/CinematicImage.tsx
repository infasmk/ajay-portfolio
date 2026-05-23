import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";

interface CinematicImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectClassName?: string;
}

export default function CinematicImage({
  src,
  alt,
  className = "",
  aspectClassName = "aspect-video"
}: CinematicImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.15 });
  
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [scrollYOffset, setScrollYOffset] = useState(0);

  // 1. Mouse Tilt Interaction
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const { left, top, width, height } = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - top) / height - 0.5; // -0.5 to 0.5
    setCoords({ x: x * 15, y: y * -15 }); // Max 15 degree tilt
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // 2. Parallax Scroll Effect
  useEffect(() => {
    const onScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far the element is from the center of viewport
      const offset = (rect.top + rect.height / 2) - viewportHeight / 2;
      // Map to an offset movement
      setScrollYOffset(offset * -0.05); // Parallax factor
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    // Run initial trigger
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden group select-none cursor-pointer rounded-2xl bg-[#f5f7fa] ${aspectClassName} ${className}`}
      style={{
        perspective: 1200,
      }}
    >
      {/* Cinematic Mask Reveal animation */}
      <motion.div
        initial={{ width: "100%" }}
        animate={isInView ? { width: "0%" } : { width: "100%" }}
        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        className="absolute top-0 right-0 bottom-0 bg-slate-100 z-10 pointer-events-none"
      />

      {/* Tilt and Parallax mesh */}
      <motion.div
        animate={{
          rotateX: coords.y,
          rotateY: coords.x,
          scale: isHovered ? 1.05 : 1.0,
        }}
        transition={
          isHovered
            ? { type: "tween", duration: 0.1 }
            : { type: "spring", stiffness: 100, damping: 15 }
        }
        className="w-full h-full origin-center overflow-hidden"
      >
        <img
          ref={imageRef}
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover origin-center select-none"
          style={{
            transform: `translate3d(0, ${scrollYOffset}px, 0) scale(1.15)`,
            transition: "transform 0.1s ease-out",
          }}
        />
      </motion.div>

      {/* Floating glossy glass glare overlay */}
      <div className="absolute inset-0 pointer-events-none bg-radial-gradient from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-5" />
    </div>
  );
}
