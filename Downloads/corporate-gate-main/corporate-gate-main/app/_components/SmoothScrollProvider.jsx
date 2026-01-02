"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";

/**
 * SmoothScrollProvider - Wraps content with Lenis smooth scrolling
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Child components to wrap
 * @param {Object} props.options - Optional Lenis configuration options
 */
export default function SmoothScrollProvider({ children, options = {} }) {
    const lenisRef = useRef(null);

    useEffect(() => {
        // Initialize Lenis with default options merged with custom options
        const lenis = new Lenis({
            duration: 1.2,           // Scroll duration (in seconds)
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom easing
            orientation: "vertical", // Scroll orientation
            smoothWheel: true,       // Enable smooth scrolling for wheel events
            wheelMultiplier: 1,      // Wheel scroll multiplier
            touchMultiplier: 2,      // Touch scroll multiplier
            infinite: false,         // Infinite scroll
            ...options,
        });

        lenisRef.current = lenis;

        // RAF loop for smooth updates
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Cleanup on unmount
        return () => {
            lenis.destroy();
            lenisRef.current = null;
        };
    }, [options]);

    return children;
}
