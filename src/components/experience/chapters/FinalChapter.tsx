import { useState } from "react";
import { BeatSequence, type Beat } from "../BeatSequence";
import { StageFade } from "../StageFade";

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
  {
    content: "Happy birthday, Shanaya.",
    holdMs: 3600,
    className:
      "font-display text-4xl font-light tracking-[0.04em] text-starlight sm:text-5xl md:text-6xl",
  },
];

export function FinalChapter() {
  const [stage, setStage] = useState<"beats" | "rest">("beats");

  return (
    <StageFade stageKey={stage}>
      {stage === "beats" && <BeatSequence beats={BEATS} onDone={() => setStage("rest")} />}
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
