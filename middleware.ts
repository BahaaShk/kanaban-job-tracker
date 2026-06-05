// middleware.ts
// Lives at the ROOT of the project (same level as package.json)


// HOW THIS FILE WORKS:
// Next.js automatically runs the exported `middleware` function on every
// matched request before the page renders. We use it for two things:
//   1. Refresh the Supabase session on every request (keeps the user logged in)
//   2. Redirect unauthenticated users away from protected routes
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export const middleware = async (request: NextRequest) => {
  const response = NextResponse.next({ request });
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (cookiesToSet) =>
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
            response.cookies.set(name, value, options)
          }),
        },
      },
    );
    const {data : {user}} = await supabase.auth.getUser()
};
// TODO: export an async function called `middleware`
//   - receives one parameter: request (type: NextRequest)
//
//   Inside the function:
//
//   STEP 1 — create a response object to pass around
//     const response = NextResponse.next({ request })
//     (this just means "continue to the page as normal, no redirect yet")
//
//   STEP 2 — create a Supabase server client
//     Use createServerClient() the same way as lib/supabase/server.ts
//     BUT instead of using cookies() from next/headers, use:
//       - getAll: () => request.cookies.getAll()
//       - setAll: (cookiesToSet) => loop over cookiesToSet and call both:
//           request.cookies.set(name, value)
//           response.cookies.set(name, value, options)
//         No try/catch needed here — middleware can always set cookies
// 
//   STEP 3 — refresh the session
//     Call: await supabase.auth.getUser()
//     Store the result: const { data: { user } } = ...
//     This call refreshes the session token automatically as a side effect
//
//   STEP 4 — protect dashboard routes
//     If there is NO user (user is null) AND the request is for a dashboard route:
//       hint: check request.nextUrl.pathname.startsWith('/dashboard')
//       then redirect to '/login':
//         return NextResponse.redirect(new URL('/login', request.url))
//
//   STEP 5 — if user is logged in and tries to visit /login or /signup
//     redirect them to '/dashboard' instead
//     hint: check if pathname starts with '/login' or '/signup'
//
//   STEP 6 — return the response object

// TODO: export a `config` object with a `matcher` array
//   This tells Next.js which routes to run middleware on
//   Use this exact value — it excludes static files and Next.js internals:
//
//   export const config = {
//     matcher: [
//       '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
//     ],
//   }
