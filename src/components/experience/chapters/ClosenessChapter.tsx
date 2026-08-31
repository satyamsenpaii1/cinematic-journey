import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BeatSequence, type Beat } from "../BeatSequence";
import { ContinueCue } from "../ContinueCue";
import { StageFade } from "../StageFade";

const INTRO_BEATS: Beat[] = [
  { content: "Some days we talk like old friends.", holdMs: 2000 },
  { content: "Some days it's something else entirely.", holdMs: 2200 },
];

const CHIPS = [
  { label: "friends", line: "checking in, sending memes, the usual chaos." },
  { label: "flirting", line: "we're not going to pretend that never happens." },
  { label: "deep talks", line: "the kind of conversations you don't have with everyone." },
  { label: "nonsense", line: "fully unhinged conversations that make sense to no one else." },
  { label: "care", line: "the quiet kind. the kind that doesn't need saying out loud." },
] as const;

export function ClosenessChapter({ onAdvance }: { onAdvance: () => void }) {
  const [stage, setStage] = useState<"intro" | "chips">("intro");
  const [activeLine, setActiveLine] = useState<string | null>(null);
  const [tapped, setTapped] = useState<Set<number>>(new Set());
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    if (stage !== "chips") return;
    const id = setTimeout(() => setShowContinue(true), 7000);
    return () => clearTimeout(id);
  }, [stage]);

  useEffect(() => {
    if (tapped.size >= 2) setShowContinue(true);
  }, [tapped]);

  return (
    <StageFade stageKey={stage}>
      {stage === "intro" && <BeatSequence beats={INTRO_BEATS} onDone={() => setStage("chips")} />}

      {stage === "chips" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-8 text-center">
          <motion.p
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: "easeOut" }}
            className="text-[11px] font-light uppercase tracking-[0.4em] text-starlight-dim"
          >
            touch a few — see what&rsquo;s true
          </motion.p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            {CHIPS.map((chip, idx) => (
              <button
                key={chip.label}
                type="button"
                onClick={() => {
                  setActiveLine(chip.line);
                  setTapped((prev) => new Set(prev).add(idx));
                }}
                data-hit={tapped.has(idx) ? "true" : undefined}
                className="rounded-full border border-starlight/15 px-4 py-2 text-xs font-light tracking-wide text-starlight-dim transition-colors duration-500 hover:border-ember/50 hover:text-starlight data-[hit=true]:border-ember/60 data-[hit=true]:text-starlight"
              >
                {chip.label}
              </button>
            ))}
          </div>

          <div className="relative h-16 w-full max-w-sm">
            <AnimatePresence mode="wait">
              {activeLine && (
                <motion.p
                  key={activeLine}
                  initial={{ opacity: 0, filter: "blur(4px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, filter: "blur(3px)" }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                  className="absolute inset-0 flex items-center justify-center font-display text-lg font-light italic text-starlight-dim sm:text-xl"
                >
                  {activeLine}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <ContinueCue visible={showContinue} onClick={onAdvance} />
        </div>
      )}
    </StageFade>
  );
}
