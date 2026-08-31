import { BeatSequence, type Beat } from "../BeatSequence";

const BEATS: Beat[] = [
  { content: "It hasn't always been easy.", holdMs: 2000 },
  { content: "We've argued. Properly argued.", holdMs: 2200 },
  { content: "Gone days without talking.", holdMs: 2200 },
  { content: "Some of that silence was on purpose.", holdMs: 2400 },
  { content: "But somehow—", holdMs: 1400 },
  { content: "—we always came back.", holdMs: 2800 },
];

export function ReturnChapter({ onAdvance }: { onAdvance: () => void }) {
  return <BeatSequence beats={BEATS} onDone={onAdvance} />;
}
