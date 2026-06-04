// lib/supabase/client.ts

import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
};

// TODO: import { createBrowserClient } from '@supabase/ssr'

// This file creates a Supabase client that works on the CLIENT side only.
// It is used in:
//   - Client Components (components with 'use client' at the top)
//
// Unlike server.ts, this one:
//   - is NOT async
//   - does NOT need cookies() — the browser handles cookies automatically
//   - is much simpler — createBrowserClient handles everything internally
//
// TODO: export a function called createClient
//   - not async
//   - no parameters
//   - returns createBrowserClient() with two arguments:
//     - process.env.NEXT_PUBLIC_SUPABASE_URL!
//     - process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
