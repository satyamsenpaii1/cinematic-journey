import { BeatSequence, type Beat } from "../BeatSequence";

const BEATS: Beat[] = [
  { content: "Years passed.", holdMs: 1600 },
  { content: "Different apps. Different lives.", holdMs: 2200 },
  { content: "And then — Instagram.", holdMs: 2000 },
  { content: "One message turned into a conversation.", holdMs: 2400 },
  { content: "And the conversation just... didn't stop.", holdMs: 2800 },
];

export function ReconnectChapter({ onAdvance }: { onAdvance: () => void }) {
  return <BeatSequence beats={BEATS} onDone={onAdvance} />;
}
