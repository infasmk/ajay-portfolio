import React, { useEffect, useState, useRef } from "react";
import { useInView } from "motion/react";

interface CounterProps {
  target: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}

export default function Counter({
  target,
  duration = 1500,
  prefix = "",
  suffix = "",
  className = ""
}: CounterProps) {
  const [current, setCurrent] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let start = 0;
    const end = target;
    const intervalTime = 30; // 30ms increments
    const steps = Math.ceil(duration / intervalTime);
    const increment = end / steps;
    
    let stepCount = 0;
    
    const timer = setInterval(() => {
      stepCount++;
      start += increment;
      if (stepCount >= steps) {
        setCurrent(end);
        clearInterval(timer);
      } else {
        setCurrent(Math.floor(start));
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  // Special formatter for things like "150M" or "03"
  const formatNumber = (val: number) => {
    if (target >= 10 && target < 100 && suffix === "") {
      // pad with absolute zero for things like 06
      return val < 10 ? `0${val}` : `${val}`;
    }
    return val.toLocaleString();
  };

  return (
    <span ref={ref} className={className}>
      {prefix}
      {formatNumber(current)}
      {suffix}
    </span>
  );
}
