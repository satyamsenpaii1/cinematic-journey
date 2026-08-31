import { BeatSequence, type Beat } from "../BeatSequence";

const BEATS: Beat[] = [
  { content: "This isn't where it started.", holdMs: 2000 },
  { content: "Not really.", holdMs: 1500 },
  { content: "It started years earlier — in a game.", holdMs: 2400 },
  { content: "Clash of Clans, if you can believe that.", holdMs: 2600 },
  {
    content: "We weren't close then. Just two names in the same clan chat.",
    holdMs: 2800,
  },
];

export function ClashChapter({ onAdvance }: { onAdvance: () => void }) {
  return <BeatSequence beats={BEATS} onDone={onAdvance} />;
}
