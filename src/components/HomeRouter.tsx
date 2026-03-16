"use client";

import { useDesignLayers } from "./DesignLayerProvider";
import { MangaHome } from "./manga/MangaHome";
import { useEffect, useState } from "react";

export function HomeRouter({ children }: { children: React.ReactNode }) {
  const { layers } = useDesignLayers();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return <>{children}</>;
  if (layers.manga) return <MangaHome />;
  return <>{children}</>;
}
