// app/providers.tsx

"use client"; 

import { ThemeProvider } from "next-themes";


type ProvidersProps = {
  children : React.ReactNode
}
const Providers = ({ children }: ProvidersProps) => {
  return <ThemeProvider attribute={'class'} defaultTheme="system" enableSystem disableTransitionOnChange >{children}</ThemeProvider>;
}

export default Providers

// app/providers.tsx

// 'use client'

// CONCEPT NOTE — What is this file and why does it exist?
//
// In Next.js App Router, the root layout (app/layout.tsx) is a Server Component by default.
// Server Components cannot hold client-side state or use context providers — but ThemeProvider
// (from next-themes) needs to wrap the entire app and runs on the client.
//
// The pattern: extract all client providers into a single <Providers> wrapper component,
// then render it inside the root layout. The layout stays a Server Component; only
// this file becomes a Client Component via 'use client'.
//
// If you ever add more client providers (e.g. a toast library, a query client), they go here too.

// TODO: import ThemeProvider from 'next-themes'

// TODO: define a Props type for this component
//   - it accepts: children (type: React.ReactNode)

// const Providers = () => {

  // TODO: return ThemeProvider wrapping {children}
  //   - set the `attribute` prop to 'class'
  //     (this tells next-themes to toggle the 'dark' class on <html>, which is how Tailwind v4 dark mode works)
  //   - set `defaultTheme` to 'system'
  //     (respects the user's OS preference on first visit)
  //   - set `enableSystem` to true
  //     (allows the system preference to actually take effect)
  //   - set `disableTransitionOnChange` to true
  //     (prevents a flash/transition when toggling theme — cleaner UX)

// }

// export default Providers
