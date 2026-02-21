"use client";

import dynamic from "next/dynamic";

const TextPath = dynamic(() => import("@/components/text-path"), { ssr: false });

const WAVE_PATH = "M 0 80 Q 150 30 300 80 Q 450 130 600 80 Q 750 30 900 80 Q 1050 130 1200 80";

export function TextSeparator({ text }: { text: string }) {
  return (
    <div className="w-full py-4 text-neutral-300 sm:py-8">
      <TextPath
        text={text}
        path={WAVE_PATH}
        fontSize="50px"
        letterSpacing="0"
        duration={21}
        reversed
        viewBox="0 0 1200 160"
        pathScale={1}
      />
    </div>
  );
}
