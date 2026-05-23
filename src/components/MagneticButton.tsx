import React, { useRef, useState, MouseEvent } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  id?: string;
}

export default function MagneticButton({
  children,
  className = "",
  onClick,
  id
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!buttonRef.current) return;

    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    
    // Calculate center coordinates
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    // Delta between cursor and center with scale damping
    const deltaX = clientX - centerX;
    const deltaY = clientY - centerY;

    // Pull intensity factor (0.35 means 35% movement towards cursor)
    setPosition({ x: deltaX * 0.35, y: deltaY * 0.35 });
  };

  const handleMouseLeave = () => {
    // Reset positions smoothly
    setPosition({ x: 0, y: 0 });
  };

  return (
    <div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-block ${className}`}
      id={id}
    >
      <motion.div
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 120, damping: 15, mass: 0.1 }}
        onClick={onClick}
        className="w-full h-full cursor-pointer"
      >
        {children}
      </motion.div>
    </div>
  );
}
