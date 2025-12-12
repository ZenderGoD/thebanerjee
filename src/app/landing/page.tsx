'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import GhostCursor from '@/components/GhostCursor';
import LaserFlow from '@/components/LaserFlow';
import GlassSurface from '@/components/GlassSurface';

export default function LandingPage() {
  const router = useRouter();
  const [textFound, setTextFound] = useState(false);
  const [showLaserFlow, setShowLaserFlow] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const hiddenTextRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const checkIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hintTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Show hint after 10 seconds if text not found
  useEffect(() => {
    if (!textFound && !showLaserFlow) {
      hintTimeoutRef.current = setTimeout(() => {
        setShowHint(true);
      }, 10000);
    }
    return () => {
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
    };
  }, [textFound, showLaserFlow]);

  // Check if cursor is near the hidden text
  useEffect(() => {
    if (textFound || showLaserFlow) return;

    const checkCursorPosition = () => {
      if (!hiddenTextRef.current || !containerRef.current) return;

      const textRect = hiddenTextRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      // Get all elements with pointer events
      const elements = document.elementsFromPoint(
        textRect.left + textRect.width / 2,
        textRect.top + textRect.height / 2
      );

      // Check if cursor trail would intersect with the hidden text area
      // We'll use a simpler approach: check if mouse is within a larger area around the text
      const checkMousePosition = (e: MouseEvent) => {
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        // Expand the detection area
        const padding = 100;
        const expandedRect = {
          left: textRect.left - padding,
          top: textRect.top - padding,
          right: textRect.right + padding,
          bottom: textRect.bottom + padding,
        };

        if (
          mouseX >= expandedRect.left &&
          mouseX <= expandedRect.right &&
          mouseY >= expandedRect.top &&
          mouseY <= expandedRect.bottom
        ) {
          setTextFound(true);
          if (checkIntervalRef.current) {
            clearInterval(checkIntervalRef.current);
          }
        }
      };

      window.addEventListener('mousemove', checkMousePosition);
      
      return () => {
        window.removeEventListener('mousemove', checkMousePosition);
      };
    };

    checkIntervalRef.current = setInterval(checkCursorPosition, 100);

    return () => {
      if (checkIntervalRef.current) {
        clearInterval(checkIntervalRef.current);
      }
    };
  }, [textFound, showLaserFlow]);

  // Handle text found - transition to main page
  useEffect(() => {
    if (textFound && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    }
  }, [textFound, isTransitioning, router]);

  // Handle LaserFlow activation - transition after effect
  useEffect(() => {
    if (showLaserFlow && !isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          router.push('/');
        }, 3000);
      }, 4000);
    }
  }, [showLaserFlow, isTransitioning, router]);

  const handleSkipButton = () => {
    setShowLaserFlow(true);
    setShowHint(false);
  };

  // Random positions for hidden text (changes on each render attempt)
  const getRandomPosition = () => {
    if (typeof window === 'undefined') return { top: '50%', left: '50%' };
    
    const padding = 150;
    const top = Math.random() * (window.innerHeight - padding * 2) + padding;
    const left = Math.random() * (window.innerWidth - padding * 2) + padding;
    
    return {
      top: `${top}px`,
      left: `${left}px`,
    };
  };

  const [textPosition] = useState(getRandomPosition);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#030712] via-[#050816] to-[#04060f]"
      style={{ height: '100vh', position: 'relative' }}
    >
      {/* GhostCursor - always visible */}
      <GhostCursor
        color="#B19EEF"
        brightness={1}
        edgeIntensity={0}
        trailLength={50}
        inertia={0.5}
        grainIntensity={0.05}
        bloomStrength={0.1}
        bloomRadius={1.0}
        bloomThreshold={0.025}
        fadeDelayMs={1000}
        fadeDurationMs={1500}
      />

      {/* Hidden text "Bishal" - invisible but detectable */}
      <div
        ref={hiddenTextRef}
        className="absolute pointer-events-none select-none"
        style={{
          ...textPosition,
          opacity: 0,
          fontSize: '120px',
          fontWeight: 'bold',
          color: 'transparent',
          userSelect: 'none',
          zIndex: 5,
          // Make it detectable by cursor but invisible
          mixBlendMode: 'difference',
        }}
        aria-hidden="true"
      >
        Bishal
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        <div className="text-center space-y-6 px-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-4">
            Find the hidden word
          </h1>
          <p className="text-xl md:text-2xl text-zinc-400 max-w-2xl">
            Move your cursor around to discover what's hidden...
          </p>
          
          {showHint && !textFound && !showLaserFlow && (
            <div className="mt-8 animate-pulse">
              <p className="text-lg text-zinc-500 mb-4">
                Can't find it? Try moving your cursor slowly across the screen.
              </p>
              <button
                onClick={handleSkipButton}
                className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-semibold transition-colors"
              >
                Skip to reveal
              </button>
            </div>
          )}

          {textFound && (
            <div className="mt-8 animate-fade-in">
              <p className="text-3xl text-green-400 font-bold mb-4">
                ✨ You found it! ✨
              </p>
              <p className="text-lg text-zinc-300">
                Transitioning to the main page...
              </p>
            </div>
          )}
        </div>
      </div>

      {/* LaserFlow effect when activated */}
      {showLaserFlow && (
        <div className="absolute inset-0 z-20">
          <LaserFlow
            horizontalBeamOffset={0.1}
            verticalBeamOffset={0.0}
            color="#FF79C6"
          />
          <div className="absolute inset-0 flex items-center justify-center z-30">
            <div className="text-center text-white">
              <h2 className="text-5xl font-bold mb-4">Bishal</h2>
              <p className="text-xl text-zinc-300">The hidden word revealed</p>
            </div>
          </div>
        </div>
      )}

      {/* GlassSurface transition overlay */}
      {isTransitioning && (
        <div className="absolute inset-0 z-50 flex items-center justify-center">
          <GlassSurface
            width="100vw"
            height="100vh"
            borderRadius={0}
            opacity={0.95}
            blur={20}
            brightness={50}
            className="transition-opacity duration-1000"
          >
            <div className="text-center text-white">
              <h2 className="text-4xl font-bold mb-4">Welcome</h2>
              <p className="text-xl">Entering the main experience...</p>
            </div>
          </GlassSurface>
        </div>
      )}
    </div>
  );
}

