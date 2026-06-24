"use client";

import type { ComponentProps } from "react";
import { Button } from "@/components/ui/button";
import { useWaitlist } from "@/features/waitlist/waitlist-provider";

type WaitlistButtonProps = Omit<ComponentProps<typeof Button>, "onClick">;

export function WaitlistButton({ children, ...props }: WaitlistButtonProps) {
  const { openWaitlist } = useWaitlist();

  return (
    <Button type="button" onClick={openWaitlist} {...props}>
      {children ?? "Join waitlist"}
    </Button>
  );
}
