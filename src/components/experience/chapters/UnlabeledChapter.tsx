import { BeatSequence, type Beat } from "../BeatSequence";

const BEATS: Beat[] = [
  { content: "People like putting names on things.", holdMs: 2000 },
  { content: "Friends. More than friends. Something in between.", holdMs: 2400 },
  { content: "We've never really needed the label.", holdMs: 2400 },
  { content: "Whatever this is — it's ours.", holdMs: 2800 },
];

export function UnlabeledChapter({ onAdvance }: { onAdvance: () => void }) {
  return <BeatSequence beats={BEATS} onDone={onAdvance} />;
}
