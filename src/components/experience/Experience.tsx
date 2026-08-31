import { useCallback, useState } from "react";
import { OpeningSequence } from "./OpeningSequence";
import { StoryJourney } from "./StoryJourney";

/**
 * Top-level state for the whole film: the opening, then everything after.
 * Kept deliberately dumb — one boolean — so the opening stays exactly the
 * self-contained piece it already was.
 */
export function Experience() {
  const [begun, setBegun] = useState(false);
  const handleOpeningComplete = useCallback(() => setBegun(true), []);

  if (!begun) {
    return <OpeningSequence onComplete={handleOpeningComplete} />;
  }

  return <StoryJourney />;
}
