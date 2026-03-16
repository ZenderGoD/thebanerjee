"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

export type DesignLayers = {
  brutal: boolean;
  neu: boolean;
  skeu: boolean;
  manga: boolean;
};

type DesignLayerContextValue = {
  layers: DesignLayers;
  toggle: (layer: keyof DesignLayers) => void;
};

const DesignLayerContext = createContext<DesignLayerContextValue>({
  layers: { brutal: true, neu: true, skeu: true, manga: false },
  toggle: () => {},
});

const STORAGE_KEY = "design-layers";
const DEFAULT: DesignLayers = { brutal: false, neu: false, skeu: false, manga: true };

function syncAttributes(layers: DesignLayers) {
  const el = document.documentElement;
  el.dataset.brutal = layers.brutal ? "on" : "off";
  el.dataset.neu = layers.neu ? "on" : "off";
  el.dataset.skeu = layers.skeu ? "on" : "off";
  el.dataset.manga = layers.manga ? "on" : "off";
}

export function DesignLayerProvider({ children }: { children: ReactNode }) {
  const [layers, setLayers] = useState<DesignLayers>(DEFAULT);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Partial<DesignLayers>;
        const merged = { ...DEFAULT, ...parsed };
        setLayers(merged);
        syncAttributes(merged);
      }
    } catch {}
  }, []);

  useEffect(() => {
    syncAttributes(layers);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(layers));
    } catch {}
  }, [layers]);

  const toggle = useCallback((layer: keyof DesignLayers) => {
    setLayers((prev) => {
      if (layer === "manga") {
        const next = !prev.manga;
        return next
          ? { brutal: false, neu: false, skeu: false, manga: true }
          : { brutal: true, neu: true, skeu: true, manga: false };
      }
      return { ...prev, [layer]: !prev[layer], manga: false };
    });
  }, []);

  return (
    <DesignLayerContext.Provider value={{ layers, toggle }}>
      {children}
    </DesignLayerContext.Provider>
  );
}

export function useDesignLayers() {
  return useContext(DesignLayerContext);
}
