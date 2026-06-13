// app/providers.tsx

"use client"; // Required because providers utilize context/state, which are client-side only features.
import React from "react";
import { ThemeProvider } from "next-themes";

// CONCEPT NOTE:
// This file wraps the application with client-side providers.
// Keeping it separate allows the root layout.tsx to remain a Server Component.
// The ThemeProvider from next-themes automatically manages toggling the '.dark'
// class on the <html> element based on user selection or system settings.

interface ProvidersProps {
  // TODO: Define a children prop of type React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  // TODO: Render ThemeProvider wrapping the children
  //   - Set attribute to "class" (to match the .dark rule in globals.css)
  //   - Set defaultTheme to "system"
  //   - Enable system preference matching (enableSystem)
  //   - Disable transition on theme changes to prevent styling flashes (disableTransitionOnChange)
  return <div>{/* TODO: Return the children wrapped in ThemeProvider */}</div>;
}
