"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

interface HeroImageProps {
  src: string;
  alt: string;
  children?: React.ReactNode;
}

export function HeroImage({ src, alt, children }: HeroImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (reducedMotion || !containerRef.current || !innerRef.current) return;

      const bounds = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - bounds.left) / bounds.width - 0.5;
      const y = (e.clientY - bounds.top) / bounds.height - 0.5;

      gsap.to(innerRef.current, {
        rotateY: x * 8,
        rotateX: -y * 8,
        scale: 1.02,
        duration: 0.6,
        ease: "power2.out",
      });
    },
    [reducedMotion],
  );

  const handleMouseLeave = useCallback(() => {
    if (reducedMotion || !innerRef.current) return;

    gsap.to(innerRef.current, {
      rotateY: 0,
      rotateX: 0,
      scale: 1,
      duration: 0.8,
      ease: "power2.out",
    });
  }, [reducedMotion]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || reducedMotion) return;

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave, reducedMotion]);

  return (
    <div ref={containerRef} className="w-full" style={{ perspective: "1000px" }}>
      <div
        ref={innerRef}
        className="relative w-full min-h-[250px] sm:min-h-[500px] overflow-hidden rounded-4xl bg-neutral-100"
        style={{ transformStyle: "preserve-3d" }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover grayscale"
          priority
        />
        {children}
      </div>
    </div>
  );
}
