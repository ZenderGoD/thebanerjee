"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import { DesignLayerProvider } from "./DesignLayerProvider";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <DesignLayerProvider>{children}</DesignLayerProvider>
    </NextThemesProvider>
  );
}
