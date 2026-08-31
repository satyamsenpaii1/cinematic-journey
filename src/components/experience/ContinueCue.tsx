import { motion, AnimatePresence } from "motion/react";

/**
 * A quiet way forward, reusing the opening's breathing-light language
 * instead of a conventional button.
 */
export function ContinueCue({
  visible,
  label = "continue",
  onClick,
}: {
  visible: boolean;
  label?: string;
  onClick: () => void;
}) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={onClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-x-0 bottom-[8%] mx-auto flex w-fit flex-col items-center gap-3 text-starlight-dim outline-none transition-colors duration-500 hover:text-starlight"
        >
          <span
            aria-hidden="true"
            className="animate-ember-breathe h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_12px_4px_oklch(0.88_0.05_95/30%)]"
          />
          <span className="text-[10px] font-light uppercase tracking-[0.45em]">{label}</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
