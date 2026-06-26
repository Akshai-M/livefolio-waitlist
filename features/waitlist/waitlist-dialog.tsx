"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { dispatchWaitlistJoined } from "@/lib/waitlist-events";
import { getWaitlistEmailError } from "@/lib/waitlist-schema";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function WaitlistDialog({ open, onOpenChange }: WaitlistDialogProps) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) {
      setEmailError(null);
    }
    onOpenChange(nextOpen);
  }

  function handleEmailChange(value: string) {
    setEmail(value);
    if (emailError) {
      setEmailError(getWaitlistEmailError(value));
    }
  }

  function handleEmailBlur() {
    if (email.trim()) {
      setEmailError(getWaitlistEmailError(email));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;

    const validationError = getWaitlistEmailError(email);
    if (validationError) {
      setEmailError(validationError);
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = (await res.json()) as {
        status?: "created" | "exists";
        count?: number;
        error?: string;
      };

      if (!res.ok) {
        toast.error(data.error ?? "Something went wrong. Please try again.");
        return;
      }

      if (data.status === "exists") {
        toast.info("You're already on the waitlist.");
        handleOpenChange(false);
        setEmail("");
        return;
      }

      toast.success("You're on the waitlist! We'll be in touch soon.");
      dispatchWaitlistJoined(data.count);
      handleOpenChange(false);
      setEmail("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Join the waitlist</DialogTitle>
          <DialogDescription>
            Be the first to know when Livefolio launches. Enter your email below.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="waitlist-email">Email</Label>
            <Input
              id="waitlist-email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => handleEmailChange(e.target.value)}
              onBlur={handleEmailBlur}
              required
              autoComplete="email"
              disabled={submitting}
              aria-invalid={emailError ? true : undefined}
              aria-describedby={
                emailError ? "waitlist-email-error" : undefined
              }
            />
            {emailError ? (
              <p
                id="waitlist-email-error"
                role="alert"
                className="text-body-sm text-danger"
              >
                {emailError}
              </p>
            ) : null}
          </div>

          <DialogFooter>
            <Button type="submit" variant="accent" disabled={submitting}>
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
                  Joining…
                </>
              ) : (
                "Join waitlist"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
