"use client";

import { cn } from "@/lib/utils";

interface StarBorderProps extends React.HTMLAttributes<HTMLElement> {
  as?: React.ElementType;
  color?: string;
  speed?: string;
  className?: string;
  children?: React.ReactNode;
}

export function StarBorder({
  as: Component = "div",
  color = "white",
  speed = "6s",
  className,
  children,
  style,
  ...rest
}: StarBorderProps) {
  return (
    <Component
      className={cn("relative inline-block overflow-hidden", className)}
      style={{ padding: "1px 0", ...style }}
      {...rest}
    >
      <div
        className="absolute bottom-[-12px] right-[-250%] h-1/2 w-[300%] animate-[star-movement-bottom] rounded-[50%] opacity-70 motion-reduce:animate-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
        }}
      />
      <div
        className="absolute top-[-12px] left-[-250%] h-1/2 w-[300%] animate-[star-movement-top] rounded-[50%] opacity-70 motion-reduce:animate-none"
        style={{
          background: `radial-gradient(circle, ${color}, transparent 10%)`,
          animationDuration: speed,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDirection: "alternate",
        }}
      />
      <div className="relative z-[1] rounded-[inherit] border border-neutral-200 bg-white">
        {children}
      </div>
    </Component>
  );
}
