"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import StaggeredText from "@/components/staggered-text";

export function PagePreloader({ children }: { children: React.ReactNode }) {
  const [visible, setVisible] = useState(true);
  const [textDone, setTextDone] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setVisible(false);
      return;
    }
  }, []);

  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  useEffect(() => {
    if (textDone) {
      const timer = setTimeout(() => setVisible(false), 1200);
      return () => clearTimeout(timer);
    }
  }, [textDone]);

  return (
    <>
      <AnimatePresence>
        {visible && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black"
            exit={{ y: "-100%" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex flex-col items-center gap-1">
              <StaggeredText
                text="arclo·"
                as="h1"
                className="font-outfit text-5xl font-bold text-white sm:text-6xl md:text-7xl [&_span:last-child]:text-[#2563EB]"
                segmentBy="chars"
                delay={100}
                duration={0.6}
                direction="bottom"
                blur
                staggerDirection="forward"
                onAnimationComplete={() => setTextDone(true)}
              />
              <StaggeredText
                text="SYSTEMS"
                as="p"
                className="font-outfit text-lg font-normal tracking-[0.5em] text-white sm:text-xl md:text-2xl"
                segmentBy="chars"
                delay={60}
                duration={0.5}
                direction="bottom"
                blur
                staggerDirection="forward"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {children}
    </>
  );
}
