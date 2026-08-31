import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BeatSequence, type Beat } from "../BeatSequence";
import { StageFade } from "../StageFade";

const INTRO_BEATS: Beat[] = [
  { content: "Before we go further — some things about her.", holdMs: 2200 },
  { content: "Because this isn't only about whatever this is.", holdMs: 2400 },
];

const TRAIT_BEATS: Beat[] = [
  { content: "Supportive. Even when she pretends she isn't paying attention.", holdMs: 2400 },
  { content: "Caring, in the way that shows up in small things.", holdMs: 2400 },
  { content: "Filmy — she'd probably direct this whole moment differently.", holdMs: 2600 },
  {
    content: "Loves music, and has strong opinions about Alia Bhatt she will defend forever.",
    holdMs: 2800,
  },
  { content: "Also has strong opinions about Rohit Sharma. Equally non-negotiable.", holdMs: 2600 },
  { content: "Somehow still finds time to teach tuition to actual kids.", holdMs: 2400 },
  { content: "And still finds time to go explore somewhere new.", holdMs: 2400 },
];

export function ShanayaChapter({ onAdvance }: { onAdvance: () => void }) {
  const [stage, setStage] = useState<"intro" | "stubborn" | "traits">("intro");
  const [refused, setRefused] = useState(false);

  const handleStubbornTap = () => {
    if (!refused) {
      setRefused(true);
      return;
    }
    setStage("traits");
  };

  return (
    <StageFade stageKey={stage}>
      {stage === "intro" && <BeatSequence beats={INTRO_BEATS} onDone={() => setStage("stubborn")} />}

      {stage === "stubborn" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-8 text-center">
          <motion.p
            initial={{ opacity: 0, filter: "blur(6px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.3, ease: [0.22, 0.61, 0.36, 1] }}
            className="max-w-sm font-display text-2xl font-light leading-relaxed text-starlight sm:max-w-lg sm:text-3xl"
          >
            She's stubborn. Ridiculously stubborn.
          </motion.p>

          <button
            type="button"
            onClick={handleStubbornTap}
            className="text-[10px] font-light uppercase tracking-[0.45em] text-starlight-dim outline-none transition-colors duration-500 hover:text-starlight"
          >
            continue
          </button>

          <AnimatePresence>
            {refused && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-xs font-light italic text-starlight-dim"
              >
                no. try again.
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      )}

      {stage === "traits" && <BeatSequence beats={TRAIT_BEATS} onDone={onAdvance} />}
    </StageFade>
  );
}
