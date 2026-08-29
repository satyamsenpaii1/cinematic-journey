import { motion, AnimatePresence } from "motion/react";
import type { ReactNode } from "react";

/**
 * One line of the film. Fades up out of the dark, holds, and dissolves.
 * Timing is handled by the parent sequencer; this only owns the fade.
 */
export function CinematicLine({
  show,
  children,
  className = "",
  enterDuration = 2.2,
  exitDuration = 1.4,
}: {
  show: boolean;
  children: ReactNode;
  className?: string;
  enterDuration?: number;
  exitDuration?: number;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{
            duration: enterDuration,
            ease: [0.22, 0.61, 0.36, 1],
            exit: { duration: exitDuration, ease: "easeInOut" },
          }}
          className={className}
        >
          {children}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
