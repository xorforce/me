"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import dynamic from "next/dynamic";
import placesData from "@/data/places.json";
import type { GlobeMethods } from "react-globe.gl";
import * as THREE from "three";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Globe = dynamic(
  () => import("react-globe.gl").then((mod) => {
    const GlobeComponent = mod.default || mod;
    return GlobeComponent;
  }),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading globe…</p>
      </div>
    ),
  }
);

type Place = {
  id: string;
  city: string;
  country: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  description: string;
  recommendations: Record<string, string[]>;
};

type RecommendationItem = {
  text: string;
  tag: string;
};

const ROTATION_STEP = 0.02;

const formatCategoryLabel = (value: string) =>
  value
    .split("-")
    .map((part) => (part ? part[0].toUpperCase() + part.slice(1) : part))
    .join(" ");

export default function PlacesPage() {
  const places = useMemo<Place[]>(() => placesData as Place[], []);
  const [selectedPlace, setSelectedPlace] = useState<Place>(places[0]);
  const [globeReady, setGlobeReady] = useState(false);
  const globeRef = useRef<GlobeMethods | null>(null);
  const globeContainerRef = useRef<HTMLDivElement | null>(null);
  const [globeSize, setGlobeSize] = useState({ width: 480, height: 480 });
  const animationFrameRef = useRef<number | null>(null);
  const activeKeysRef = useRef({
    left: false,
    right: false,
    up: false,
    down: false,
  });
  const lastSelectionTimeRef = useRef<number>(0);
  const isInteractingRef = useRef<boolean>(false);
  const [autoRotateEnabled, setAutoRotateEnabled] = useState(true);
  const { resolvedTheme } = useTheme();
  const isDarkMode = (resolvedTheme ?? "dark") === "dark";
  const globeTexture = isDarkMode
    ? "//unpkg.com/three-globe/example/img/earth-night.jpg"
    : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg";
  const atmosphereColor = isDarkMode ? "rgba(96,165,250,0.65)" : "rgba(2,132,199,0.25)";
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  // Flatten recommendations into a single list with tags
  const allRecommendations = useMemo<RecommendationItem[]>(() => {
    if (!selectedPlace) return [];
    return Object.entries(selectedPlace.recommendations).flatMap(([category, items]) =>
      items.map((item) => ({
        text: item,
        tag: category,
      }))
    );
  }, [selectedPlace]);

  // Get unique tags
  const availableTags = useMemo(() => {
    if (!selectedPlace) return [];
    return Object.keys(selectedPlace.recommendations);
  }, [selectedPlace]);

  // Filter recommendations by selected tag
  const filteredRecommendations = useMemo(() => {
    if (!selectedTag) return allRecommendations;
    return allRecommendations.filter((item) => item.tag === selectedTag);
  }, [allRecommendations, selectedTag]);

  useEffect(() => {
    if (
      typeof window === "undefined" ||
      !("ResizeObserver" in window) ||
      !globeContainerRef.current
    ) {
      return;
    }

    const container = globeContainerRef.current;
    const resizeObserver = new ResizeObserver((entries) => {
      if (!entries.length) {
        return;
      }

      const entry = entries[0];
      const { width, height } = entry.contentRect;
      const size = Math.max(300, Math.min(width, height));

      setGlobeSize({
        width: size,
        height: size,
      });
    });

    resizeObserver.observe(container);

    return () => {
      resizeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!globeReady || !globeRef.current) {
      return;
    }

    const controls = globeRef.current.controls();
    if (!controls) {
      return;
    }

    controls.enableDamping = true;
    controls.dampingFactor = 0.1;
    controls.rotateSpeed = 0.6;
    controls.enableZoom = true;
    controls.autoRotate = autoRotateEnabled;
    controls.autoRotateSpeed = 0.45;

    // Add listeners for manual interaction to re-enable rotation
    const handleStart = () => {
      isInteractingRef.current = true;
    };

    const handleEnd = () => {
      isInteractingRef.current = false;
      // Delay to allow click event to propagate and set lastSelectionTimeRef
      setTimeout(() => {
        if (Date.now() - lastSelectionTimeRef.current < 200) {
          return;
        }
        // User finished interacting - re-enable auto rotation
        setAutoRotateEnabled(true);
        controls.autoRotate = true;
      }, 50);
    };

    controls.addEventListener('start', handleStart);
    controls.addEventListener('end', handleEnd);

    return () => {
      controls.removeEventListener('start', handleStart);
      controls.removeEventListener('end', handleEnd);
    };
  }, [globeReady, autoRotateEnabled]);

  useEffect(() => {
    if (!selectedPlace || !globeRef.current) {
      return;
    }

    const { lat, lng } = selectedPlace.coordinates;
    globeRef.current.pointOfView({ lat, lng, altitude: 1.8 }, 900);
    // Reset tag filter when place changes
    setSelectedTag(null);
  }, [selectedPlace]);

  const stepRotation = useCallback(() => {
    if (!globeRef.current) {
      animationFrameRef.current = null;
      return;
    }

    const controls = globeRef.current.controls();
    if (!controls) {
      animationFrameRef.current = null;
      return;
    }

    const { left, right, up, down } = activeKeysRef.current;
    const hasActiveKey = left || right || up || down;

    if (!hasActiveKey) {
      animationFrameRef.current = null;
      return;
    }

    controls.autoRotate = false;
    setAutoRotateEnabled(false);

    // Get the camera from the controls
    const camera = controls.object;
    if (!camera) {
      animationFrameRef.current = null;
      return;
    }

    // Calculate rotation based on spherical coordinates
    const spherical = new THREE.Spherical();
    spherical.setFromVector3(camera.position);

    if (left) {
      spherical.theta -= ROTATION_STEP;
    }

    if (right) {
      spherical.theta += ROTATION_STEP;
    }

    if (up) {
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi - ROTATION_STEP));
    }

    if (down) {
      spherical.phi = Math.max(0.1, Math.min(Math.PI - 0.1, spherical.phi + ROTATION_STEP));
    }

    // Update camera position from spherical coordinates
    spherical.makeSafe();
    camera.position.setFromSpherical(spherical);
    camera.lookAt(0, 0, 0);
    controls.update();

    animationFrameRef.current = window.requestAnimationFrame(stepRotation);
  }, []);

  useEffect(() => {
    if (!globeReady || !globeRef.current) {
      return;
    }

    const isArrowKey = (key: string) =>
      key === "ArrowLeft" ||
      key === "ArrowRight" ||
      key === "ArrowUp" ||
      key === "ArrowDown";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isArrowKey(event.key)) {
        return;
      }

      // Don't prevent default if user is typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (!globeRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (event.key === "ArrowLeft") {
        activeKeysRef.current.left = true;
      }
      if (event.key === "ArrowRight") {
        activeKeysRef.current.right = true;
      }
      if (event.key === "ArrowUp") {
        activeKeysRef.current.up = true;
      }
      if (event.key === "ArrowDown") {
        activeKeysRef.current.down = true;
      }

      if (animationFrameRef.current === null) {
        stepRotation();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      if (!isArrowKey(event.key)) {
        return;
      }

      // Don't prevent default if user is typing in an input field
      const target = event.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      ) {
        return;
      }

      if (!globeRef.current) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (event.key === "ArrowLeft") {
        activeKeysRef.current.left = false;
      }
      if (event.key === "ArrowRight") {
        activeKeysRef.current.right = false;
      }
      if (event.key === "ArrowUp") {
        activeKeysRef.current.up = false;
      }
      if (event.key === "ArrowDown") {
        activeKeysRef.current.down = false;
      }

      const { left, right, up, down } = activeKeysRef.current;
      if (!left && !right && !up && !down && animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;

        // Re-enable auto-rotate when no keys are pressed
        const controls = globeRef.current.controls();
        if (controls) {
          setAutoRotateEnabled(true);
          controls.autoRotate = true;
        }
      }
    };

    // Use capture phase to ensure we catch events early
    document.addEventListener("keydown", handleKeyDown, { capture: true, passive: false });
    document.addEventListener("keyup", handleKeyUp, { capture: true, passive: false });

    return () => {
      document.removeEventListener("keydown", handleKeyDown, { capture: true });
      document.removeEventListener("keyup", handleKeyUp, { capture: true });

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };
  }, [globeReady, stepRotation]);

  // Force tooltip positioning above the pin
  useEffect(() => {
    if (!globeReady) return;

    const adjustTooltips = () => {
      // Find the tooltip created by react-globe.gl (usually has class 'scene-tooltip')
      const tooltips = document.querySelectorAll('.scene-tooltip, [class*="tooltip"]');
      tooltips.forEach((tooltip) => {
        const element = tooltip as HTMLElement;

        // Add our custom class for styling
        if (!element.classList.contains('globe-tooltip')) {
          element.classList.add('globe-tooltip');
        }
      });
    };

    // Adjust immediately
    adjustTooltips();

    // Use MutationObserver to catch dynamically created tooltips
    const observer = new MutationObserver(() => {
      adjustTooltips();
    });

    if (globeContainerRef.current) {
      observer.observe(globeContainerRef.current, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class'],
      });
    }

    // Also use interval as backup
    const interval = setInterval(adjustTooltips, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, [globeReady]);

  const handleSelectPlace = (place: Place) => {
    lastSelectionTimeRef.current = Date.now();
    setSelectedPlace(place);
    // Disable auto-rotation when user clicks a city
    setAutoRotateEnabled(false);
    if (globeRef.current) {
      const controls = globeRef.current.controls();
      if (controls) {
        controls.autoRotate = false;
      }
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:px-10 lg:h-screen lg:flex-row lg:items-stretch lg:gap-12 lg:py-12">
        {/* Globe Section */}
        <section className="relative flex-1 overflow-hidden rounded-3xl border border-border bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/30 lg:h-full">
          <div
            className={cn(
              "relative flex h-full flex-col overflow-hidden rounded-3xl bg-gradient-to-br transition-colors duration-300",
              "from-slate-100 via-slate-50 to-white text-slate-900",
              "dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 dark:text-white"
            )}
          >
            <div className="relative z-20 space-y-1 px-3 pt-3">
              <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">
                Explore
              </p>
              <h1 className="text-2xl font-semibold drop-shadow-sm md:text-3xl">
                Places I can&rsquo;t stop recommending
              </h1>
            </div>
            <div className="relative flex flex-1 items-center justify-center px-2 pb-4">
              <div
                ref={globeContainerRef}
                className="relative flex h-full w-full max-h-[720px] max-w-[720px] min-h-[320px] min-w-[320px] items-center justify-center"
              >
                <Globe
                  key={isDarkMode ? "globe-dark" : "globe-light"}
                  ref={globeRef as any}
                  width={globeSize.width}
                  height={globeSize.height}
                  globeImageUrl={globeTexture}
                  bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                  backgroundColor="rgba(0,0,0,0)"
                  atmosphereColor={atmosphereColor}
                  atmosphereAltitude={0.18}
                  rendererConfig={{
                    antialias: true,
                    alpha: true,
                    powerPreference: "high-performance",
                  }}
                  showGlobe
                  showAtmosphere
                  animateIn
                  onGlobeReady={() => {
                    setGlobeReady(true);
                  }}
                  onZoom={() => {
                    // Re-enable auto-rotation when user zooms, but only if it's a manual interaction
                    if (isInteractingRef.current) {
                      setAutoRotateEnabled(true);
                    }
                  }}
                  onGlobeClick={() => {
                    // Re-enable auto-rotation when user clicks the globe (not a point)
                    // Ignore if we just selected a point (to prevent race conditions)
                    if (Date.now() - lastSelectionTimeRef.current > 200) {
                      setAutoRotateEnabled(true);
                    }
                  }}
                  pointsData={places}
                  pointLat={(place: any) => place.coordinates.lat}
                  pointLng={(place: any) => place.coordinates.lng}
                  pointAltitude={(place: any) =>
                    selectedPlace?.id === place.id ? 0.16 : 0.09
                  }
                  pointRadius={(place: any) =>
                    selectedPlace?.id === place.id ? 1.15 : 0.75
                  }
                  pointResolution={24}
                  pointColor={(place: any) => {
                    const isActive = selectedPlace?.id === place.id;
                    if (isDarkMode) {
                      return isActive ? "#fb923c" : "#60a5fa";
                    }
                    return isActive ? "#f97316" : "#0ea5e9";
                  }}
                  pointLabel={(place: any) => `${place.city}, ${place.country}`}
                  onPointClick={(place: any) => handleSelectPlace(place as Place)}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Info Panel */}
        <aside className="flex w-full flex-col overflow-hidden rounded-3xl border border-border bg-card/80 shadow-sm transition-all duration-300 dark:bg-card/60 lg:h-[calc(100vh-6rem)] lg:max-w-md">
          <div className="flex h-full flex-col p-6">
            <header>
              <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                Destination
              </p>
              <h2 className="text-3xl font-semibold text-foreground">
                {selectedPlace.city}
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  {selectedPlace.country}
                </span>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selectedPlace.description}
              </p>
            </header>
            <div className="mt-6 flex flex-1 flex-col gap-4 min-h-0">
              {/* Tag Filter */}
              <div className="flex flex-wrap gap-2 shrink-0">
                <Button
                  variant={selectedTag === null ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedTag(null)}
                  className="h-8 text-xs"
                >
                  All
                </Button>
                {availableTags.map((tag) => (
                  <Button
                    key={tag}
                    variant={selectedTag === tag ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedTag(tag)}
                    className="h-8 text-xs"
                  >
                    {formatCategoryLabel(tag)}
                  </Button>
                ))}
              </div>

              {/* Recommendations List */}
              <div className="flex-1 overflow-y-auto pr-2 min-h-0">
                <div className="space-y-2">
                  {filteredRecommendations.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-lg bg-background/60 p-3 shadow-sm ring-1 ring-border/40 transition-all hover:shadow hover:ring-border/60"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className="flex-1 text-sm text-foreground/90">{item.text}</p>
                        <Badge
                          variant="secondary"
                          className="shrink-0 text-xs font-medium"
                        >
                          {formatCategoryLabel(item.tag)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <footer className="mt-6 text-xs text-muted-foreground/70">
              💡 Tip: Drag to orbit or use arrow keys to rotate.
            </footer>
          </div>
        </aside>
      </div>
      <style jsx global>{`
        .globe-tooltip,
        .scene-tooltip {
          transform: translate(-50%, calc(-100% - 40px)) !important;
          padding: 0.5rem 0.875rem;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.98);
          color: #0f172a;
          font-size: 0.8125rem;
          font-weight: 500;
          font-family: var(--font-primary), system-ui, sans-serif;
          letter-spacing: 0.01em;
          text-transform: none;
          box-shadow: 0 20px 50px rgba(15, 23, 42, 0.25), 0 0 0 1px rgba(15, 23, 42, 0.1);
          border: 2px solid rgba(15, 23, 42, 0.12);
          backdrop-filter: blur(16px);
          pointer-events: none !important;
          white-space: nowrap;
          z-index: 9999 !important;
          margin-top: 0 !important;
        }

        .globe-tooltip::after,
        .scene-tooltip::after {
          display: none;
        }

        .dark .globe-tooltip,
        .dark .scene-tooltip {
          background: rgba(15, 23, 42, 0.98);
          color: #f1f5f9;
          border: 2px solid rgba(148, 163, 184, 0.2);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(148, 163, 184, 0.15);
        }

        .dark .globe-tooltip::after,
        .dark .scene-tooltip::after {
          display: none;
        }
      `}</style>
    </main>
  );
}
