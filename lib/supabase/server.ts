import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export  const createClient = async () => {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: (cookiesToSet) => {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options);
            });
          } catch{
            console.log("error");
          }
        },
      },
    },
  );
}

// lib/supabase/server.ts

// TODO: import { createServerClient } from '@supabase/ssr'
// TODO: import { cookies } from 'next/headers'

// This file creates a Supabase client that works on the SERVER side only.
// It is used in:
//   - Server Components (to fetch data)
//   - Server Actions (to mutate data)
//   - Route Handlers if needed
//
// Why cookies? Because Supabase Auth stores the session in cookies.
// The server needs to read those cookies to know who the logged-in user is.
// If we don't pass cookies, every server request is unauthenticated.

// TODO: export an async function called createClient
//   - it takes no parameters
//   - it must be async because cookies() from next/headers is async in Next.js 15+
//
//   Inside the function:
//
//   1. call cookies() and await it — store the result in a variable (e.g. cookieStore)
//
//   2. return createServerClient() with three arguments:
//      - process.env.NEXT_PUBLIC_SUPABASE_URL!
//      - process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
//      - an options object with a `cookies` property
//
//   3. the `cookies` property is an object with two methods:
//
//      getAll() {
//        // call cookieStore.getAll() and return the result
//        // this gives Supabase all the cookies from the incoming request
//      }
//
//      setAll(cookiesToSet) {
//        // cookiesToSet is an array of cookie objects
//        // each object has: { name, value, options }
//        // loop over cookiesToSet and for each one call:
//        // cookieStore.set(name, value, options)
//        //
//        // wrap this in a try/catch and silently ignore the error
//        // why? because Server Components cannot set cookies —
//        // only Server Actions and Route Handlers can.
//        // the try/catch prevents a crash when this is called from a Server Component
//      }