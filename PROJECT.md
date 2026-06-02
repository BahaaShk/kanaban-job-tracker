# Job Application Tracker — Project Reference

> Full-stack job application tracking app built with Next.js 16, Tailwind CSS v4, and Supabase.
> Built by Bahaa Shkair as a portfolio project and daily-use tool during an active job search.

---

## Purpose

Track job applications through a Kanban-style pipeline. Built to:
- Demonstrate full-stack Next.js skills to potential employers
- Serve as a real daily-use tool during the job search
- Maintain consistent GitHub activity (daily commits) while preparing for interviews

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.x (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Data mutations | Server Actions |
| Deployment | Vercel |

---

## Styling Contract

**All colors live in `app/globals.css` as CSS custom properties — both light and dark mode.**

Do not hardcode any color values anywhere in components. Always reference variables from `globals.css`.

```css
/* Example structure in globals.css */

@theme {
  --font-sans: var(--font-geist);
  --color-bg: #F4F6F9;
  --color-surface: #FFFFFF;
  --color-border: #E2E8F0;
  --color-text-primary: #0D1117;
  --color-text-secondary: #57606A;
  --color-accent: #2F81F7;
  --color-accent-hover: #1A6FE0;
  --color-success: #2EA043;
  --color-warning: #D29922;
  --color-danger: #DA3633;
  --color-muted: #57606A;
}

.dark {
  --color-bg: #0D1117;
  --color-surface: #161B22;
  --color-border: #21262D;
  --color-text-primary: #E6EDF3;
  --color-text-secondary: #8B949E;
  --color-accent: #2F81F7;
  --color-accent-hover: #388BFD;
  --color-success: #3FB950;
  --color-warning: #E3B341;
  --color-danger: #F85149;
  --color-muted: #8B949E;
}
```

Any agent, contributor, or AI tool working on this project must:
1. Read `globals.css` before writing any styled component
2. Use `var(--token-name)` or the mapped Tailwind utility classes — never raw hex or rgb values
3. Add new color tokens to `globals.css` if a new one is needed — never inline it

---

## Folder Structure

```
job-tracker/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── signup/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx              ← protected layout, checks session
│   │   ├── page.tsx                ← dashboard with stats
│   │   ├── applications/
│   │   │   ├── page.tsx            ← kanban board
│   │   │   └── [id]/
│   │   │       └── page.tsx        ← single application detail + edit
│   │   └── settings/
│   │       └── page.tsx
│   ├── layout.tsx                  ← root layout
│   └── globals.css                 ← ALL color tokens live here (light + dark)
├── components/
│   ├── ui/                         ← reusable primitives: Button, Badge, Modal, Input
│   ├── kanban/                     ← Board, Column, Card components
│   └── dashboard/                  ← StatsCard, Chart, ActivityFeed components
├── lib/
│   ├── supabase/
│   │   ├── client.ts               ← browser Supabase client
│   │   └── server.ts               ← server Supabase client (cookies)
│   └── utils.ts                    ← shared helpers (cn, formatDate, etc.)
├── actions/
│   ├── applications.ts             ← Server Actions: create, update, delete, reorder
│   └── auth.ts                     ← Server Actions: signIn, signUp, signOut
└── types/
    └── index.ts                    ← shared TypeScript types (Application, Status, etc.)
```

---

## Database Schema

```sql
create table applications (
  id            uuid default gen_random_uuid() primary key,
  user_id       uuid references auth.users not null,
  company       text not null,
  role          text not null,
  status        text default 'wishlist',
  -- status values: 'wishlist' | 'applied' | 'interview' | 'offer' | 'rejected'
  url           text,
  salary_min    int,
  salary_max    int,
  location      text,
  notes         text,
  applied_at    date,
  follow_up_at  date,
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

alter table applications enable row level security;

create policy "Users manage own applications"
  on applications for all
  using (auth.uid() = user_id);

-- explicit grants (required — do not rely on default Data API permissions)
grant select, insert, update, delete on applications to authenticated;
```

---

## Application Statuses

| Status | Description |
|---|---|
| `wishlist` | Saved, not yet applied |
| `applied` | Application submitted |
| `interview` | In interview process |
| `offer` | Offer received |
| `rejected` | Rejected or ghosted |

---

## Build Phases

### Phase 1 — Foundation
- Next.js 16 project init with TypeScript, Tailwind, App Router, Turbopack
- Supabase client setup (browser + server)
- Login / Signup pages
- Protected route middleware
- Dark/Light mode toggle integration (ThemeProvider + UI Toggle)
- Deploy to Vercel (live URL from day 1)

**Files:** `lib/supabase/client.ts`, `lib/supabase/server.ts`, `middleware.ts`, `app/providers.tsx`, `components/ui/ThemeToggle.tsx`, `app/(auth)/login/page.tsx`, `app/(auth)/signup/page.tsx`

---

### Phase 2 — Core Feature: Kanban Board
- Supabase schema + RLS + explicit grants
- Server Actions: `createApplication`, `updateStatus`, `deleteApplication`
- Kanban board UI — 5 columns
- Drag and drop between columns (`@dnd-kit/core`)
- Application card with company, role, status badge, date

**Files:** `actions/applications.ts`, `components/kanban/Board.tsx`, `components/kanban/Column.tsx`, `components/kanban/Card.tsx`, `app/(dashboard)/applications/page.tsx`

---

### Phase 3 — Detail View + Notes
- `/applications/[id]` detail page
- Edit form via Server Actions (no client fetch)
- Notes field with timestamps
- Follow-up date with overdue indicator

**Files:** `app/(dashboard)/applications/[id]/page.tsx`, `components/ui/EditForm.tsx`

---

### Phase 4 — Dashboard & Stats
- Total applications, response rate, interview conversion rate
- Applications by status (bar chart via `recharts`)
- Recent activity feed
- "Follow up needed" list

**Files:** `app/(dashboard)/page.tsx`, `components/dashboard/StatsCard.tsx`, `components/dashboard/StatusChart.tsx`, `components/dashboard/ActivityFeed.tsx`

---

### Phase 5 — Polish
- Loading states + skeleton screens
- Empty states (designed, not placeholder text)
- Mobile responsive layout
- README with screenshots, tech stack, live link

---

## Development Workflow

This project follows a deliberate learn-by-doing process. Every file is written by the developer — not generated by AI.

### The per-file cycle

1. **Skeleton provided**: each file starts as a bare shell — imports, component declaration, typed props, and detailed comments. Comments cover every function, every piece of logic, and every JSX block that needs to be written. Think of it as pseudocode inside the real file structure.
2. **Developer implements**: Bahaa writes all the actual code from scratch, guided only by the comments. No AI completes the implementation.
3. **Review**: the finished file is shared for review — correctness, Next.js patterns, TypeScript usage, Tailwind consistency, anything off gets flagged with explanation.
4. **Fix and move on**: issues are corrected by the developer, then we proceed to the next file.

### Why this matters

The point is not just to ship the app — it's to be able to explain every line of it in an interview. If AI writes the code, that's not possible. The skeleton approach keeps the learning real without leaving the developer stuck on blank files.

### Skeleton format example

```tsx
import React from 'react'

// TODO: import the cn utility from lib/utils
// TODO: import the Application type from types/index.ts

// Props this component receives:
// - application: Application (the full application object)
// - onStatusChange: (id: string, status: string) => void

const ApplicationCard = () => {
  // TODO: destructure the props you need from the application object
  // (company, role, status, applied_at, follow_up_at)

  // TODO: determine if the follow-up date is overdue
  // hint: compare follow_up_at to today's date using new Date()

  return (
    <div>
      {/* TODO: render the company name and role as text */}
      {/* TODO: render a Badge component with the current status */}
      {/* TODO: if follow-up is overdue, show a visual warning indicator */}
    </div>
  )
}

export default ApplicationCard
```

**Commit at least once per day.** Even a small fix, a new component shell, or a util function counts. Consistent GitHub activity during the job search is part of the goal.

---

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

Never commit `.env.local`. It is already in `.gitignore` by default.

---

## Agent Instructions

If you are an AI agent working on this codebase:

1. **Colors**: All color tokens are in `app/globals.css`. Read it before styling anything. Use CSS variables only — no raw color values in components.
2. **Data mutations**: Use Server Actions in `/actions/`. Do not use client-side fetch for database writes.
3. **Supabase**: Use the server client (`lib/supabase/server.ts`) in Server Components and Actions. Use the browser client (`lib/supabase/client.ts`) only in Client Components.
4. **Components**: Keep components small and single-responsibility. Split anything that can be split.
5. **TypeScript**: All types live in `types/index.ts`. Do not inline types for shared data structures.
6. **No hardcoded user data**: Always scope queries with `user_id = auth.uid()` — RLS enforces this but always be explicit.
