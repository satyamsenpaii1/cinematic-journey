import { BeatSequence, type Beat } from "../BeatSequence";

const BEATS: Beat[] = [
  { content: "This whole thing—", holdMs: 1400 },
  { content: "all of it—", holdMs: 1200 },
  { content: "was really about one specific day.", holdMs: 2400 },
  {
    content: "September 1st.",
    holdMs: 2400,
    className:
      "font-display text-3xl font-light tracking-[0.05em] text-starlight sm:text-4xl md:text-5xl",
  },
  { content: "Twenty-two trips around the sun.", holdMs: 2800 },
];

export function BirthdayChapter({ onAdvance }: { onAdvance: () => void }) {
  return <BeatSequence beats={BEATS} onDone={onAdvance} />;
}
