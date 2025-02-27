'use client';
import gsap from 'gsap';
import { ReactLenis } from 'lenis/react';
import { ReactElement, useEffect, useRef } from 'react';

export function LenisGSAP({ children }: { children: ReactElement }) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);

    return () => gsap.ticker.remove(update);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.5,
        syncTouch: true,
        smoothWheel: true,
        autoRaf: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
