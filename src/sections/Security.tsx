import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lock, Shield, Eye, Database } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const badges = [
  { label: '256-bit encryption', icon: Lock },
  { label: 'SOC 2 aligned', icon: Shield },
  { label: 'GDPR ready', icon: Eye },
];

export default function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const lockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const lock = lockRef.current;
    const content = contentRef.current;

    if (!section || !lock || !content) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        lock,
        { scale: 0.9, opacity: 0, rotate: -6 },
        {
          scale: 1,
          opacity: 1,
          rotate: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        content,
        { x: '4vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-dark py-24 lg:py-32 z-50 overflow-hidden"
    >
      {/* Background Glow */}
      <div
        className="absolute left-1/4 top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none opacity-30"
        style={{
          background:
            'radial-gradient(circle, rgba(182,255,46,0.15), transparent 60%)',
        }}
      />

      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Lock Icon */}
          <div ref={lockRef} className="w-full lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-lime/5 flex items-center justify-center border border-lime/20">
                <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full bg-lime/10 flex items-center justify-center">
                  <Lock
                    size={80}
                    className="text-lime"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
              {/* Orbiting dots */}
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '20s' }}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-lime rounded-full" />
              </div>
              <div className="absolute inset-0 animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
                <div className="absolute bottom-4 right-4 w-2 h-2 bg-lime/60 rounded-full" />
              </div>
            </div>
          </div>

          {/* Content */}
          <div ref={contentRef} className="w-full lg:w-1/2">
            <h2 className="font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary leading-tight mb-6">
              Built to keep your data{' '}
              <span className="text-lime glow-text">yours.</span>
            </h2>

            <p className="text-lg text-gray-secondary leading-relaxed mb-8">
              Bank-grade encryption. No ads. No data selling. You can export or
              delete everything anytime.
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-4 mb-8">
              {badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-dark-light border border-white/5 rounded-full px-4 py-2"
                >
                  <badge.icon size={16} className="text-lime" />
                  <span className="text-sm text-gray-primary font-mono uppercase tracking-wider">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Database size={20} className="text-lime mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-primary mb-1">
                    Secure Cloud Storage
                  </h4>
                  <p className="text-sm text-gray-secondary">
                    Your data is encrypted at rest and in transit using
                    industry-standard protocols.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Eye size={20} className="text-lime mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-primary mb-1">
                    Privacy First
                  </h4>
                  <p className="text-sm text-gray-secondary">
                    We never sell your data. No third-party trackers. No
                    profiling.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Shield size={20} className="text-lime mt-0.5" />
                <div>
                  <h4 className="font-semibold text-gray-primary mb-1">
                    Role-Based Access
                  </h4>
                  <p className="text-sm text-gray-secondary">
                    Control who can view or edit your ledgers with granular
                    permissions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
