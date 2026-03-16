"use client";

import { useDesignLayers } from "./DesignLayerProvider";
import { MangaDossier } from "./manga/MangaDossier";
import { useEffect, useState } from "react";

export function HelpRouter({ children }: { children: React.ReactNode }) {
  const { layers } = useDesignLayers();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>;
  if (layers.manga) return <MangaDossier />;
  return <>{children}</>;
}
