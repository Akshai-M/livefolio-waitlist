"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  WAITLIST_JOINED_EVENT,
  type WaitlistJoinedDetail,
} from "@/lib/waitlist-events";

const POLL_MS = 10_000;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

interface WaitlistCounterProps {
  initialCount: number;
}

export function WaitlistCounter({ initialCount }: WaitlistCounterProps) {
  const [target, setTarget] = useState(initialCount);
  const [display, setDisplay] = useState(0);
  const displayRef = useRef(0);
  const reducedMotionRef = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const hasAnimatedInRef = useRef(false);

  const refreshCount = useCallback(async () => {
    try {
      const res = await fetch("/api/waitlist", { cache: "no-store" });
      if (!res.ok) return;
      const data = (await res.json()) as { count?: number };
      if (typeof data.count === "number") {
        setTarget(data.count);
      }
    } catch {
      // Ignore network errors during background refresh.
    }
  }, []);

  useEffect(() => {
    displayRef.current = display;
  }, [display]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => {
      reducedMotionRef.current = media.matches;
    };
    apply();
    media.addEventListener("change", apply);
    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotionRef.current) {
      setDisplay(target);
      displayRef.current = target;
      hasAnimatedInRef.current = true;
      return;
    }

    const from = hasAnimatedInRef.current ? displayRef.current : 0;
    if (from === target) {
      hasAnimatedInRef.current = true;
      return;
    }

    const delta = Math.abs(target - from);
    const duration = Math.min(2200, 600 + delta * 35);
    const startTime = performance.now();
    let frame = 0;

    function tick(now: number) {
      const progress = Math.min(1, (now - startTime) / duration);
      const next = Math.round(from + (target - from) * easeOutCubic(progress));
      setDisplay(next);
      displayRef.current = next;

      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        hasAnimatedInRef.current = true;
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  useEffect(() => {
    const onJoined = (event: Event) => {
      const detail = (event as CustomEvent<WaitlistJoinedDetail>).detail;
      if (typeof detail?.count === "number") {
        setTarget(detail.count);
        return;
      }
      void refreshCount();
    };

    const syncWhenVisible = () => {
      if (document.visibilityState === "visible") {
        void refreshCount();
      }
    };

    window.addEventListener(WAITLIST_JOINED_EVENT, onJoined);
    window.addEventListener("focus", syncWhenVisible);
    document.addEventListener("visibilitychange", syncWhenVisible);

    void refreshCount();

    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") {
        void refreshCount();
      }
    }, POLL_MS);

    return () => {
      window.removeEventListener(WAITLIST_JOINED_EVENT, onJoined);
      window.removeEventListener("focus", syncWhenVisible);
      document.removeEventListener("visibilitychange", syncWhenVisible);
      window.clearInterval(interval);
    };
  }, [refreshCount]);

  const memberLabel =
    display === 1 ? "person on the waitlist" : "people on the waitlist";

  return (
    <div className="flex flex-col items-center gap-2 text-center">
      <p
        className="font-display text-[clamp(2.5rem,8vw,4rem)] font-extrabold leading-none tracking-tight text-brand-secondary tabular-nums"
        aria-live="polite"
        aria-atomic="true"
      >
        <span className="sr-only">
          {display} {memberLabel}
        </span>
        <span aria-hidden>{formatCount(display)}</span>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-2">
        <p className="text-body-sm text-text-secondary">{memberLabel}</p>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default bg-surface-base px-2.5 py-0.5 text-label text-text-muted">
          <span
            className="h-1.5 w-1.5 rounded-full bg-success motion-safe:animate-pulse"
            aria-hidden
          />
          Live
        </span>
      </div>

      {display === 0 ? (
        <p className="text-body-sm text-text-muted">
          Be among the first — spots are filling up.
        </p>
      ) : null}
    </div>
  );
}
