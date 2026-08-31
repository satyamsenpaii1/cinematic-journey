import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { StarField } from "./StarField";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

import { ClashChapter } from "./chapters/ClashChapter";
import { ReconnectChapter } from "./chapters/ReconnectChapter";
import { ClosenessChapter } from "./chapters/ClosenessChapter";
import { ReturnChapter } from "./chapters/ReturnChapter";
import { ShanayaChapter } from "./chapters/ShanayaChapter";
import { UnlabeledChapter } from "./chapters/UnlabeledChapter";
import { DistanceChapter } from "./chapters/DistanceChapter";
import { QuietPlaceChapter } from "./chapters/QuietPlaceChapter";
import { BirthdayChapter } from "./chapters/BirthdayChapter";
import { CosmicChapter } from "./chapters/CosmicChapter";
import { FinalChapter } from "./chapters/FinalChapter";

const ORDER = [
  "clash",
  "reconnect",
  "closeness",
  "return",
  "shanaya",
  "unlabeled",
  "distance",
  "quietPlace",
  "birthday",
  "cosmic",
  "final",
] as const;

type ChapterId = (typeof ORDER)[number];

// How dim the stars are and how much warm light bleeds in, per chapter.
// This is the one place that controls the world's mood — chapters don't
// need to know about it.
const SKY: Record<ChapterId, { dim: number; warm: number }> = {
  clash: { dim: 0.15, warm: 0 },
  reconnect: { dim: 0.08, warm: 0 },
  closeness: { dim: 0.02, warm: 0.04 },
  return: { dim: 0.38, warm: 0 },
  shanaya: { dim: 0.02, warm: 0.08 },
  unlabeled: { dim: 0.12, warm: 0.04 },
  distance: { dim: 0.22, warm: 0 },
  quietPlace: { dim: 0.3, warm: 0.08 },
  birthday: { dim: 0, warm: 0.5 },
  cosmic: { dim: 0, warm: 0.7 },
  final: { dim: 0, warm: 0.45 },
};

export function StoryJourney() {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();

  const chapter: ChapterId = ORDER[index] ?? "final";
  const sky = SKY[chapter];

  const advance = useCallback(() => {
    setIndex((i) => Math.min(i + 1, ORDER.length - 1));
  }, []);

  return (
    <main className="fixed inset-0 overflow-hidden bg-night-deep" aria-label="Our story, continued.">
      <div className="absolute inset-0">
        <StarField traveling={false} dim={sky.dim} />
      </div>

      {/* warmth that grows as the night gives way to the reveal */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-[2200ms]"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 45%, oklch(0.88 0.05 90 / 55%) 0%, transparent 65%)",
          opacity: sky.warm,
        }}
      />

      {/* the same vignette language as the opening, tuned per chapter */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 transition-opacity duration-[2200ms]"
        style={{
          background:
            "radial-gradient(ellipse 90% 70% at 50% 55%, transparent 40%, var(--color-night-deep) 100%)",
          opacity: 0.75 - sky.warm * 0.5,
        }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={chapter}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.4 : 1, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {chapter === "clash" && <ClashChapter onAdvance={advance} />}
          {chapter === "reconnect" && <ReconnectChapter onAdvance={advance} />}
          {chapter === "closeness" && <ClosenessChapter onAdvance={advance} />}
          {chapter === "return" && <ReturnChapter onAdvance={advance} />}
          {chapter === "shanaya" && <ShanayaChapter onAdvance={advance} />}
          {chapter === "unlabeled" && <UnlabeledChapter onAdvance={advance} />}
          {chapter === "distance" && <DistanceChapter onAdvance={advance} />}
          {chapter === "quietPlace" && <QuietPlaceChapter onAdvance={advance} />}
          {chapter === "birthday" && <BirthdayChapter onAdvance={advance} />}
          {chapter === "cosmic" && <CosmicChapter onAdvance={advance} />}
          {chapter === "final" && <FinalChapter />}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
