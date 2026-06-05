# Progress Log — Job Application Tracker

> Keep this file updated after every file you complete.
> When starting a new chat or switching AI tools: paste both PROJECT.md and PROGRESS.md.

---

## How to mark tasks

```md
- [ ] not started
- [~] in progress (skeleton received, currently implementing)
- [x] done (implemented + reviewed + approved)
```

Example of a completed file entry:
```md
- [x] `lib/supabase/server.ts` — cookie-based server client
```

Example of current file:
```md
- [~] `middleware.ts` — skeleton received, implementing route protection
```

---

## Current Status

**Phase 1 — Foundation** · In Progress

---

## Phase 1 — Foundation

### Setup
- [x] Next.js 16 project initialized (TypeScript, Tailwind, App Router, Turbopack)
- [x] Supabase project created + `.env.local` configured
- [ ] Deployed to Vercel (live URL: _not yet_)

### Files
- [x] `lib/supabase/server.ts` — server-side Supabase client (cookie-based)
- [x] `lib/supabase/client.ts` — browser-side Supabase client
- [x] `middleware.ts` — protected route logic
- [ ] `app/providers.tsx` — client-side providers (ThemeProvider)
- [ ] `components/ui/ThemeToggle.tsx` — dark/light mode toggle component
- [ ] `types/index.ts` — shared TypeScript types
- [ ] `lib/utils.ts` — cn() and shared helpers
- [ ] `app/(auth)/login/page.tsx` — login page UI + action
- [ ] `app/(auth)/signup/page.tsx` — signup page UI + action
- [ ] `actions/auth.ts` — signIn, signUp, signOut Server Actions
- [ ] `app/(dashboard)/layout.tsx` — protected layout, session check

---

## Phase 2 — Kanban Board

### Files
- [ ] `types/index.ts` — update with Application type + Status enum
- [ ] `actions/applications.ts` — createApplication, updateStatus, deleteApplication
- [ ] `components/ui/Badge.tsx` — status badge primitive
- [ ] `components/ui/Button.tsx` — button primitive
- [ ] `components/kanban/Card.tsx` — single application card
- [ ] `components/kanban/Column.tsx` — kanban column with cards
- [ ] `components/kanban/Board.tsx` — full board, drag and drop logic
- [ ] `app/(dashboard)/applications/page.tsx` — kanban page (fetches + renders board)

---

## Phase 3 — Detail View + Notes

### Files
- [ ] `app/(dashboard)/applications/[id]/page.tsx` — detail + edit page
- [ ] `components/ui/EditForm.tsx` — edit form component

---

## Phase 4 — Dashboard & Stats

### Files
- [ ] `app/(dashboard)/page.tsx` — dashboard page
- [ ] `components/dashboard/StatsCard.tsx` — single stat display
- [ ] `components/dashboard/StatusChart.tsx` — recharts bar chart
- [ ] `components/dashboard/ActivityFeed.tsx` — recent activity list

---

## Phase 5 — Polish

### Tasks
- [ ] Loading states + skeleton screens on all data pages
- [ ] Empty states designed (not just placeholder text)
- [ ] Mobile responsive pass across all pages
- [ ] README.md with screenshots, live link, tech stack

---

## Decisions Log

> Record any technical decisions made during the build so you don't forget why you did something.

| Decision | Reason |
|---|---|
| Cookie-based Supabase server client | Required for App Router SSR — legacy createServerComponentClient is deprecated |
| `@dnd-kit/core` for drag and drop | Lighter and more accessible than react-beautiful-dnd which is unmaintained |
| Server Actions for all mutations | Avoids client-side fetch boilerplate, demonstrates App Router patterns properly |
| No external state manager | App Router + Server Actions handles it — adding Zustand/Redux would be overkill |

---

## Notes

> Anything worth remembering that doesn't fit above.

- All colors are CSS custom properties in `app/globals.css` — never hardcode colors in components
- Supabase RLS is enabled — always scope queries to `auth.uid()` even though RLS enforces it
- Explicit `GRANT` statements are in the migration SQL — do not rely on Supabase default Data API permissions

---

## Vercel Live URL

_not deployed yet_

---

## Last Updated

Phase 1 started — setup not yet complete
