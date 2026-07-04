"use client";

import type { ReactNode } from "react";
import { createContext, useCallback, useContext, useState } from "react";

interface IntroContextValue {
  done: boolean;
  markDone: () => void;
}

const IntroContext = createContext<IntroContextValue>({
  done: true,
  markDone: () => undefined,
});

export function useIntroDone() {
  return useContext(IntroContext).done;
}

export function useMarkIntroDone() {
  return useContext(IntroContext).markDone;
}

export function IntroProvider({ children }: { children: ReactNode }) {
  const [done, setDone] = useState(false);
  const markDone = useCallback(() => setDone(true), []);

  return (
    <IntroContext.Provider value={{ done, markDone }}>
      {children}
    </IntroContext.Provider>
  );
}
