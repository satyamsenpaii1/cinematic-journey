import { useEffect, useState } from "react";
import { BeatSequence, type Beat } from "../BeatSequence";
import { ContinueCue } from "../ContinueCue";
import { StageFade } from "../StageFade";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

const BEATS: Beat[] = [
  { content: "If we were in the same place—", holdMs: 2000 },
  { content: "—I don't think we'd pick anywhere loud.", holdMs: 2400 },
  { content: "Somewhere quiet. Water nearby, maybe hills.", holdMs: 2600 },
  { content: "No plans. No one to perform for.", holdMs: 2400 },
  { content: "Just... time.", holdMs: 2000 },
];

export function QuietPlaceChapter({ onAdvance }: { onAdvance: () => void }) {
  const [stage, setStage] = useState<"beats" | "stillness">("beats");
  const [showContinue, setShowContinue] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (stage !== "stillness") return;
    const id = setTimeout(() => setShowContinue(true), reduced ? 1800 : 4200);
    return () => clearTimeout(id);
  }, [stage, reduced]);

  return (
    <div className="absolute inset-0">
      {/* an abstract, quiet horizon — no photographs, just layered darkness */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
        style={{
          background: "linear-gradient(to top, oklch(0.16 0.02 260 / 90%) 0%, transparent 100%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
        style={{
          clipPath: "polygon(0 40%, 22% 30%, 45% 42%, 68% 26%, 100% 38%, 100% 100%, 0 100%)",
          background: "oklch(0.14 0.02 268 / 95%)",
        }}
      />

      <StageFade stageKey={stage}>
        {stage === "beats" && <BeatSequence beats={BEATS} onDone={() => setStage("stillness")} />}
        {stage === "stillness" && (
          <div className="absolute inset-0">
            <ContinueCue visible={showContinue} onClick={onAdvance} />
          </div>
        )}
      </StageFade>
    </div>
  );
}
