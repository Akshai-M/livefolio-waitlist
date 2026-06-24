"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { WaitlistDialog } from "@/features/waitlist/waitlist-dialog";

type WaitlistContextValue = {
  openWaitlist: () => void;
};

const WaitlistContext = createContext<WaitlistContextValue | null>(null);

export function WaitlistProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const openWaitlist = useCallback(() => setOpen(true), []);

  return (
    <WaitlistContext.Provider value={{ openWaitlist }}>
      {children}
      <WaitlistDialog open={open} onOpenChange={setOpen} />
    </WaitlistContext.Provider>
  );
}

export function useWaitlist() {
  const ctx = useContext(WaitlistContext);
  if (!ctx) {
    throw new Error("useWaitlist must be used within WaitlistProvider");
  }
  return ctx;
}
