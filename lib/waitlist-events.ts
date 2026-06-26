export const WAITLIST_JOINED_EVENT = "waitlist:joined";

export type WaitlistJoinedDetail = {
  count?: number;
};

export function dispatchWaitlistJoined(count?: number) {
  window.dispatchEvent(
    new CustomEvent<WaitlistJoinedDetail>(WAITLIST_JOINED_EVENT, {
      detail: count !== undefined ? { count } : {},
    }),
  );
}
