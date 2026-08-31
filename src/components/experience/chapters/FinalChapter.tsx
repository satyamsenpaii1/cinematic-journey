import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BeatSequence, type Beat } from "../BeatSequence";
import { StageFade } from "../StageFade";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BEATS: Beat[] = [
  { content: "Okay. Real talk for a second.", holdMs: 1800 },
  { content: "I'm glad we somehow ended up here.", holdMs: 2400 },
  {
    content: "We've had weird days. Actual arguments. Stretches where neither of us texted first.",
    holdMs: 2800,
  },
  {
    content: "And somehow you're still one of the first people I want to tell things to.",
    holdMs: 2800,
  },
  { content: "I wish I could just show up today instead of typing all this.", holdMs: 2400 },
  { content: "But the distance doesn't get a vote on whether this continues.", holdMs: 2800 },
  { content: "We'll meet properly one day. I mean that.", holdMs: 2600 },
  { content: "Until then—", holdMs: 1200 },
  { content: "Babe—", holdMs: 1400 },
  {
    content: "Happy birthday, Shanaya.",
    holdMs: 3600,
    className:
      "font-display text-4xl font-light tracking-[0.04em] text-starlight sm:text-5xl md:text-6xl",
  },
];

const LOVE_BEATS: Beat[] = [
  {
    content: "Love you.",
    holdMs: 3000,
    className: "font-display text-3xl font-light text-starlight sm:text-4xl",
  },
];

type Stage = "beats" | "loveYou" | "hug" | "rest";

export function FinalChapter() {
  const [stage, setStage] = useState<Stage>("beats");
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (stage !== "hug") return;
    const id = setTimeout(() => setStage("rest"), reduced ? 2600 : 5200);
    return () => clearTimeout(id);
  }, [stage, reduced]);

  return (
    <StageFade stageKey={stage}>
      {stage === "beats" && <BeatSequence beats={BEATS} onDone={() => setStage("loveYou")} />}

      {stage === "loveYou" && (
        <div className="absolute inset-0">
          <div className="absolute inset-x-0 top-[34%] flex items-center justify-center">
            <motion.svg
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.6, ease: "easeOut" }}
              width="28"
              height="26"
              viewBox="0 0 28 26"
              style={{ filter: "drop-shadow(0 0 8px oklch(0.78 0.09 40 / 45%))" }}
            >
              <path
                d="M14 24 C4 17 0 10 0 6.2 C0 1.8 3.6 -0.6 7.2 0.6 C10 1.5 12.5 4 14 6.6 C15.5 4 18 1.5 20.8 0.6 C24.4 -0.6 28 1.8 28 6.2 C28 10 24 17 14 24 Z"
                fill="oklch(0.8 0.08 40 / 85%)"
              />
            </motion.svg>
          </div>
          <BeatSequence beats={LOVE_BEATS} onDone={() => setStage("hug")} />
        </div>
      )}

      {stage === "hug" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 text-center">
          <div className="relative h-16 w-40 sm:h-20 sm:w-48">
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full sm:h-6 sm:w-6"
              style={{
                background: "oklch(0.9 0.02 90)",
                boxShadow: "0 0 16px 4px oklch(0.88 0.05 95 / 40%)",
              }}
              initial={{ left: "8%", opacity: 0 }}
              animate={{ left: "38%", opacity: 1 }}
              transition={{ duration: reduced ? 0.8 : 2.2, ease: "easeInOut" }}
            />
            <motion.span
              aria-hidden="true"
              className="absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full sm:h-6 sm:w-6"
              style={{
                background: "oklch(0.85 0.015 285)",
                boxShadow: "0 0 16px 4px oklch(0.93 0.012 285 / 35%)",
              }}
              initial={{ left: "84%", opacity: 0 }}
              animate={{ left: "54%", opacity: 1 }}
              transition={{ duration: reduced ? 0.8 : 2.2, ease: "easeInOut" }}
            />
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: reduced ? 0.5 : 1.8, ease: "easeOut" }}
            className="max-w-xs font-display text-lg font-light italic text-starlight-dim sm:text-xl"
          >
            consider this a hug, from wherever you're reading this.
          </motion.p>
        </div>
      )}

      {stage === "rest" && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-ember/70 shadow-[0_0_16px_5px_oklch(0.88_0.05_95/25%)]"
          />
        </div>
      )}
    </StageFade>
  );
}
