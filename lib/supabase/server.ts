import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

/**
 * TODO: Implement the cookie-based Supabase Server Client.
 * 
 * Instructions:
 * 1. Define and export an async function named `createClient`.
 * 2. It must be async because `cookies()` is an asynchronous function in Next.js 16 and must be awaited.
 * 3. Inside, call `createServerClient` passing:
 *    - The Supabase URL env variable (NEXT_PUBLIC_SUPABASE_URL)
 *    - The Supabase Anon Key env variable (NEXT_PUBLIC_SUPABASE_ANON_KEY)
 *    - A cookie handler configuration object:
 *      - `getAll()`: returns all cookies from `cookieStore.getAll()`.
 *      - `setAll(cookiesToSet)`: loops through each cookie in `cookiesToSet` and sets it on `cookieStore` using `cookieStore.set(name, value, options)`.
 *        Note: Wrap the `set` logic in a `try...catch` block because Server Components cannot set cookies, and we want to fail silently there.
 * 4. Return the Supabase client instance.
 * 
 * Hint:
 * const cookieStore = await cookies()
 * return createServerClient(..., ..., {
 *   cookies: {
 *     getAll() { ... },
 *     setAll(cookiesToSet) { ... }
 *   }
 * })
 */
