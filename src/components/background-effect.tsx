"use client";

import dynamic from "next/dynamic";

const GlitterWarp = dynamic(() => import("@/components/glitter-warp"), {
  ssr: false,
});

export function BackgroundEffect() {
  return (
    <div className="fixed inset-0 -z-10">
      <GlitterWarp
        speed={0.3}
        color="#171717"
        density={20}
        brightness={0.5}
        starSize={0.08}
        turbulence={0.1}
        className="h-full w-full"
      />
    </div>
  );
}
