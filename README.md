# Livefolio Waitlist

A standalone landing page with waitlist signup, using the same Livefolio design as the main portfolio app. No file uploads — just the landing page and email capture.

## Setup

1. Copy `.env.example` to `.env` and set your PostgreSQL `DATABASE_URL`.
2. Install dependencies: `bun install` (or `npm install`)
3. Push the database schema: `bun run db:push`
4. Start dev server: `bun run dev`

## Waitlist flow

- Click **Join waitlist** anywhere on the page to open the email dialog.
- Submissions are stored in the `waitlist_entries` table.
- Duplicate emails show a toast: "You're already on the waitlist."
- New signups show: "You're on the waitlist! We'll be in touch soon."
