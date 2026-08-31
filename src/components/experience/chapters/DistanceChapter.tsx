import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BeatSequence, type Beat } from "../BeatSequence";
import { ContinueCue } from "../ContinueCue";
import { StageFade } from "../StageFade";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const INTRO_BEATS: Beat[] = [
  {
    content: "Rajasthan.",
    holdMs: 1600,
    className: "font-display text-3xl font-light text-starlight sm:text-4xl",
  },
  {
    content: "Kolkata.",
    holdMs: 1600,
    className: "font-display text-3xl font-light text-starlight sm:text-4xl",
  },
  { content: "Different states. Different time zones of ordinary life.", holdMs: 2400 },
  { content: "Not close. Some days, not exactly far either.", holdMs: 2400 },
];

export function DistanceChapter({ onAdvance }: { onAdvance: () => void }) {
  const [stage, setStage] = useState<"intro" | "map">("intro");
  const [held, setHeld] = useState(false);
  const [showContinue, setShowContinue] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (stage !== "map") return;
    const id = setTimeout(() => setShowContinue(true), 5000);
    return () => clearTimeout(id);
  }, [stage]);

  const offset = held ? 14 : 0; // how far the two points move toward each other, in %

  return (
    <StageFade stageKey={stage}>
      {stage === "intro" && <BeatSequence beats={INTRO_BEATS} onDone={() => setStage("map")} />}

      {stage === "map" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div className="relative h-32 w-full max-w-md">
            <div
              aria-hidden="true"
              className="absolute top-1/2 h-px -translate-y-1/2 bg-starlight-dim/20 transition-all duration-700 ease-out"
              style={{ left: `${20 + offset}%`, right: `${20 + offset}%` }}
            />

            {!reduced && (
              <motion.span
                aria-hidden="true"
                className="absolute top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-ember shadow-[0_0_10px_3px_oklch(0.88_0.05_95/40%)]"
                animate={{ left: ["22%", "78%", "22%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              />
            )}

            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-700 ease-out"
              style={{ left: `${20 + offset}%` }}
            >
              <span className="h-2 w-2 rounded-full bg-starlight shadow-[0_0_10px_3px_oklch(0.93_0.012_285/30%)]" />
              <span className="text-[10px] font-light uppercase tracking-[0.35em] text-starlight-dim">
                rajasthan
              </span>
            </div>

            <div
              className="absolute top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-2 transition-all duration-700 ease-out"
              style={{ left: `${80 - offset}%` }}
            >
              <span className="h-2 w-2 rounded-full bg-starlight shadow-[0_0_10px_3px_oklch(0.93_0.012_285/30%)]" />
              <span className="text-[10px] font-light uppercase tracking-[0.35em] text-starlight-dim">
                kolkata
              </span>
            </div>
          </div>

          <button
            type="button"
            onPointerDown={() => setHeld(true)}
            onPointerUp={() => setHeld(false)}
            onPointerLeave={() => setHeld(false)}
            className="mt-10 text-[10px] font-light uppercase tracking-[0.4em] text-starlight-dim outline-none transition-colors duration-500 hover:text-starlight"
          >
            hold the line
          </button>

          <p className="mt-4 h-6 max-w-xs font-display text-sm font-light italic text-starlight-dim transition-opacity duration-500 sm:text-base">
            {held ? "for a moment, it doesn't feel so far." : "\u00A0"}
          </p>

          <p className="mt-6 max-w-xs font-display text-lg font-light leading-relaxed text-starlight-dim sm:max-w-sm sm:text-xl">
            It doesn't close the actual distance. But some days it feels like it does.
          </p>

          <ContinueCue visible={showContinue} onClick={onAdvance} />
        </div>
      )}
    </StageFade>
  );
}
