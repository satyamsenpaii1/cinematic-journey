import { useState } from "react";
import { motion } from "motion/react";
import { BeatSequence, type Beat } from "../BeatSequence";

const BEATS: Beat[] = [
  { content: "I kept thinking about how to end this.", holdMs: 2200 },
  { content: "And I kept coming back to the same picture.", holdMs: 2600 },
  { content: "I'm Earth.", holdMs: 2200 },
  { content: "The world is Moon.", holdMs: 2400 },
  { content: "And you're Sun.", holdMs: 3400 },
];

export function CosmicChapter({ onAdvance }: { onAdvance: () => void }) {
  const [beatIndex, setBeatIndex] = useState(-1);

  const earthVisible = beatIndex >= 2;
  const moonVisible = beatIndex >= 3;
  const sunVisible = beatIndex >= 4;

  return (
    <div className="absolute inset-0">
      <div className="absolute inset-x-0 top-[32%] flex items-center justify-center gap-8 sm:gap-14">
        <motion.span
          aria-hidden="true"
          animate={{ opacity: earthVisible ? 1 : 0, scale: earthVisible ? 1 : 0.6 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-4 w-4 rounded-full sm:h-5 sm:w-5"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.7 0.06 240) 0%, oklch(0.35 0.05 260) 100%)",
            boxShadow: "0 0 14px 2px oklch(0.55 0.05 250 / 40%)",
          }}
        />
        <motion.span
          aria-hidden="true"
          animate={{ opacity: moonVisible ? 1 : 0, scale: moonVisible ? 1 : 0.6 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="h-2.5 w-2.5 rounded-full sm:h-3 sm:w-3"
          style={{
            background: "oklch(0.85 0.01 285)",
            boxShadow: "0 0 10px 2px oklch(0.85 0.01 285 / 35%)",
          }}
        />
        <motion.span
          aria-hidden="true"
          animate={{ opacity: sunVisible ? 1 : 0, scale: sunVisible ? 1 : 0.5 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="h-9 w-9 rounded-full sm:h-12 sm:w-12"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, oklch(0.92 0.06 90) 0%, oklch(0.75 0.09 60) 100%)",
            boxShadow: "0 0 40px 10px oklch(0.85 0.08 80 / 45%)",
          }}
        />
      </div>

      <BeatSequence beats={BEATS} onDone={onAdvance} onIndexChange={setBeatIndex} />
    </div>
  );
}
