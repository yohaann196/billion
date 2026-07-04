"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

import { useMarkIntroDone } from "./intro-context";

/* ── The record gets marked ─────────────────────────────────────────────
   A brief, skippable "stamp" moment on the wordmark — the same gesture
   the signature Annotated Record section pays off later: something
   official just got marked. ~650ms total, gone well before it overstays.

   The overlay only ever decides whether to show itself inside an effect,
   after mount. Server-render and the client's first render both output
   null — deciding based on `matchMedia` during the initial render would
   make the client's first pass disagree with the server-rendered markup,
   and React has no reliable way to reconcile that away: the extra node
   would be orphaned in the DOM with no fiber attached, unremovable. */

const STAMP_S = 0.32;
const HOLD_S = 0.16;
const EXIT_S = 0.22;
// Safety net: whatever else happens, never let the intro block the page.
const FALLBACK_MS = 2500;

export function IntroOverlay() {
  const markDone = useMarkIntroDone();
  const [visible, setVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) {
      markDone();
      return;
    }

    setVisible(true);
    const exitTimer = setTimeout(
      () => setExiting(true),
      (STAMP_S + HOLD_S) * 1000,
    );
    const fallbackTimer = setTimeout(() => {
      setExiting(true);
      markDone();
    }, FALLBACK_MS);
    // Any keypress skips — the intro is a brief flourish, not a gate.
    const skip = () => setExiting(true);
    window.addEventListener("keydown", skip);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(fallbackTimer);
      window.removeEventListener("keydown", skip);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence onExitComplete={markDone}>
      {!exiting && (
        <motion.div
          key="intro"
          className="bg-background fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center gap-4"
          aria-hidden="true"
          exit={{ opacity: 0 }}
          transition={{ duration: EXIT_S, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => setExiting(true)}
        >
          <div className="relative flex items-center justify-center">
            <motion.span
              className="absolute rounded-full border border-white/25"
              style={{ width: 64, height: 64 }}
              initial={{ scale: 0.6, opacity: 0.6 }}
              animate={{ scale: 2.2, opacity: 0 }}
              transition={{ duration: STAMP_S, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.img
              src="/billion-logo.png"
              alt="Billion"
              className="h-16 w-16 rounded-2xl"
              initial={{ scale: 0.72, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: STAMP_S, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          <motion.span
            className="font-display text-foreground text-[15px] font-semibold tracking-[-0.01em]"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: STAMP_S, duration: 0.2, ease: "easeOut" }}
          >
            Billion
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
