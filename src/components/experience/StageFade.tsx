import { AnimatePresence, motion } from "motion/react";
import type { ReactNode } from "react";

/**
 * Crossfades between the internal stages of a single chapter (e.g. text
 * beats → an interactive moment), so those handoffs feel like the same
 * film rather than a cut.
 */
export function StageFade({ stageKey, children }: { stageKey: string; children: ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stageKey}
        initial={{ opacity: 0, filter: "blur(4px)" }}
        animate={{ opacity: 1, filter: "blur(0px)" }}
        exit={{ opacity: 0, filter: "blur(4px)" }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="absolute inset-0"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
