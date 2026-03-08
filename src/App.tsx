import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

import Navigation from './components/Navigation';
import Hero from './sections/Hero';
import Features from './sections/Features';
import UseCases from './sections/UseCases';
import ChatDemo from './sections/ChatDemo';
import HowItWorks from './sections/HowItWorks';
import Security from './sections/Security';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import CTAFooter from './sections/CTAFooter';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter((st) => st.vars.pin)
        .sort((a, b) => a.start - b.start);

      const maxScroll = ScrollTrigger.maxScroll(window);

      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map((st) => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Create global snap
      ScrollTrigger.create({
        snap: {
          snapTo: (value) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              (r) => value >= r.start - 0.02 && value <= r.end + 0.02
            );

            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );

            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <div className="relative bg-dark min-h-screen">
      {/* Grain Overlay */}
      <div className="grain-overlay" />

      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative">
        <div className="section-spacing"><Hero /></div>
        <div className="section-spacing"><Features /></div>
        <div className="section-spacing"><UseCases /></div>
        <div className="section-spacing"><ChatDemo /></div>
        <div className="section-spacing"><HowItWorks /></div>
        <div className="section-spacing"><Security /></div>
        <div className="section-spacing"><Pricing /></div>
        <div className="section-spacing"><FAQ /></div>
        <div className="section-spacing"><CTAFooter /></div>
      </main>
    </div>
  );
}

export default App;
