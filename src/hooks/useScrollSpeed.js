import { useEffect, useRef, useState } from "react";

const MIN_SPEED = 1;
const MAX_SPEED = 7;
const DECAY = 0.92;

export function useScrollSpeed() {
  const [speed, setSpeed] = useState(MIN_SPEED);
  const speedRef = useRef(MIN_SPEED);
  const lastY = useRef(0);
  const lastTime = useRef(performance.now());
  const rafRef = useRef(null);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const now = performance.now();
      const dy = Math.abs(window.scrollY - lastY.current);
      const dt = Math.max(now - lastTime.current, 1);
      const velocity = dy / dt;

      const target = Math.min(MAX_SPEED, MIN_SPEED + velocity * 14);
      speedRef.current = Math.max(speedRef.current, target);

      lastY.current = window.scrollY;
      lastTime.current = now;
    }

    function tick() {
      speedRef.current = Math.max(MIN_SPEED, speedRef.current * DECAY + MIN_SPEED * (1 - DECAY));
      setSpeed(speedRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return speed;
}
