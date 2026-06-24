"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { WaitlistProvider } from "@/features/waitlist/waitlist-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <WaitlistProvider>
        {children}
        <Toaster />
      </WaitlistProvider>
    </ThemeProvider>
  );
}
