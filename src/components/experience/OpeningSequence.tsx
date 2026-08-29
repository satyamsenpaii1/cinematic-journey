import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { StarField } from "./StarField";
import { CinematicLine } from "./CinematicLine";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

/**
 * The opening film.
 *
 * silence → dedication → invitation → threshold (waits for touch)
 *   → warp → story
 *
 * `story` is the first meaningful reveal — "How did we get here?" —
 * reached by moving forward through the same night, never by leaving it.
 * The line rests on screen as the threshold of the next chapter.
 */
type Phase =
  | "silence"
  | "dedication"
  | "invitation"
  | "threshold"
  | "warp"
  | "story";

export function OpeningSequence() {
  const [phase, setPhase] = useState<Phase>("silence");
  const reduced = usePrefersReducedMotion();

  const W = reduced ? 0.45 : 1; // reduced motion compresses the timing, nothing moves

  useEffect(() => {
    const timers: Partial<Record<Phase, [Phase, number]>> = {
      silence: ["dedication", 2600 * W],
      dedication: ["invitation", 6200 * W],
      invitation: ["threshold", 5600 * W],
      warp: ["story", 3400 * W],
      // threshold waits for the visitor; story rests until the next chapter
    };
    const next = timers[phase];
    if (!next) return;
    const id = setTimeout(() => setPhase(next[0]), next[1]);
    return () => clearTimeout(id);
  }, [phase, W]);

  const traveling = phase === "warp";
  const inStory = phase === "story";

  return (
    <main
      className="fixed inset-0 overflow-hidden bg-night-deep"
      aria-label="A quiet night sky. An opening made for Shanaya."
    >
      {/* the night */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0.8 : 3.4, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <StarField traveling={traveling && !reduced} dim={inStory ? 0.3 : 0} />
      </motion.div>

      {/* soft vignette — the dark itself is part of the set */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-[3000ms]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 40%, var(--color-night-deep) 100%)",
          opacity: phase === "warp" ? 0.35 : 0.85,
        }}
      />

      {/* the words */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
        <CinematicLine
          show={phase === "dedication"}
          className="font-display text-4xl font-light tracking-[0.04em] text-starlight sm:text-5xl md:text-6xl"
        >
          For Shanaya.
        </CinematicLine>

        <CinematicLine
          show={phase === "invitation"}
          className="max-w-xs font-display text-2xl font-light leading-relaxed text-starlight-dim sm:max-w-md sm:text-3xl"
        >
          There&rsquo;s something I wanted you to&nbsp;see.
        </CinematicLine>

        {/*
          The story begins — this line stays, resting in the dark the
          warp carried us into. The next chapter grows from here.
        */}
        <CinematicLine
          show={inStory}
          enterDuration={3}
          className="max-w-xs font-display text-3xl font-light leading-snug text-starlight sm:max-w-lg sm:text-4xl md:text-5xl"
        >
          How did we get&nbsp;here?
        </CinematicLine>
      </div>

      {/* the threshold — a single point of light asking to be touched */}
      <AnimatePresence>
        {phase === "threshold" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: reduced ? 1 : 1.6 }}
            transition={{ duration: reduced ? 0.6 : 2.4, ease: "easeOut" }}
            className="absolute inset-x-0 bottom-[22%] flex flex-col items-center gap-6"
          >
            <button
              type="button"
              onClick={() => setPhase("warp")}
              aria-label="Enter"
              className="group relative flex h-20 w-20 items-center justify-center outline-none"
            >
              {/* halo */}
              <span
                aria-hidden="true"
                className="absolute inset-0 rounded-full opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.88 0.05 95 / 45%) 0%, transparent 70%)",
                }}
              />
              {/* breathing core */}
              <span
                aria-hidden="true"
                className="animate-ember-breathe absolute h-2.5 w-2.5 rounded-full bg-ember shadow-[0_0_18px_6px_oklch(0.88_0.05_95/35%)]"
              />
              {/* focus ring, only for keyboard users */}
              <span
                aria-hidden="true"
                className="absolute inset-4 rounded-full border border-ember/0 transition-colors duration-500 group-focus-visible:border-ember/40"
              />
            </button>
            <span className="text-[11px] font-light uppercase tracking-[0.5em] text-starlight-dim">
              enter
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* the warp — darkness opening, not a screen flash */}
      <AnimatePresence>
        {phase === "warp" && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.5, 0] }}
            transition={{
              duration: reduced ? 1.2 : 3.2,
              times: [0, 0.45, 1],
              ease: "easeInOut",
            }}
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 55%, oklch(0.9 0.03 95 / 22%) 0%, transparent 60%)",
            }}
          />
        )}
      </AnimatePresence>
    </main>
  );
}
