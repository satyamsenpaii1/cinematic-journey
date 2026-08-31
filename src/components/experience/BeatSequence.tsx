import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { CinematicLine } from "./CinematicLine";
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion";

export type Beat = {
  content: ReactNode;
  /** how long the line stays fully visible before the next one begins */
  holdMs?: number;
  className?: string;
};

type BeatSequenceProps = {
  beats: Beat[];
  onDone?: () => void;
  onIndexChange?: (index: number) => void;
  startDelayMs?: number;
  lineClassName?: string;
};

const DEFAULT_LINE_CLASSNAME =
  "max-w-sm font-display text-2xl font-light leading-relaxed text-starlight sm:max-w-lg sm:text-3xl";

/**
 * Plays a list of lines one at a time, using the same stacked-crossfade
 * layout the opening uses: every line occupies the identical centered
 * position, so nothing reflows as one fades and the next appears.
 */
export function BeatSequence({
  beats,
  onDone,
  onIndexChange,
  startDelayMs = 400,
  lineClassName = DEFAULT_LINE_CLASSNAME,
}: BeatSequenceProps) {
  const [i, setI] = useState(-1);
  const reduced = usePrefersReducedMotion();
  const W = reduced ? 0.55 : 1;

  useEffect(() => {
    const id = setTimeout(() => setI(0), startDelayMs * W);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onIndexChange?.(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  useEffect(() => {
    if (i < 0 || i >= beats.length) return;
    const hold = (beats[i]?.holdMs ?? 2400) * W;
    const id = setTimeout(() => {
      if (i >= beats.length - 1) {
        onDone?.();
      } else {
        setI((prev) => prev + 1);
      }
    }, hold);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [i]);

  return (
    <div className="absolute inset-0">
      {beats.map((beat, idx) => (
        <div key={idx} className="absolute inset-0 flex items-center justify-center px-8 text-center">
          <CinematicLine show={i === idx} className={beat.className ?? lineClassName}>
            {beat.content}
          </CinematicLine>
        </div>
      ))}
    </div>
  );
}
