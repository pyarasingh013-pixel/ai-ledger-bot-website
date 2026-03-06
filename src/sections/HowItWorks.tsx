import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageSquare, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    number: '01',
    title: 'Save the number',
    description:
      'Add AI Ledger Bot to your contacts. Tap to open WhatsApp.',
    icon: Phone,
  },
  {
    number: '02',
    title: 'Send a message',
    description:
      'Type an expense or snap a receipt. We\'ll handle the rest.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'Stay in control',
    description:
      'Get insights, set limits, and never lose track.',
    icon: Shield,
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const cards = cardsRef.current;

    if (!section || !header || !cards) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        header,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cards.querySelectorAll('.step-card'),
        { y: 40, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 85%',
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
      className="relative bg-dark py-24 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary leading-tight mb-4">
            Three steps. <span className="text-lime glow-text">Zero stress.</span>
          </h2>
          <p className="text-lg text-gray-secondary max-w-xl mx-auto">
            Getting started takes less than a minute. No downloads, no setup, no fuss.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="step-card relative bg-dark-light rounded-2xl border border-white/5 p-8 transition-all duration-300 hover:border-lime/30 group"
            >
              {/* Lime accent line */}
              <div className="absolute top-0 left-0 w-16 h-0.5 bg-lime transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

              {/* Step Number */}
              <span className="step-number block mb-4">{step.number}</span>

              {/* Icon */}
              <div className="w-14 h-14 rounded-xl bg-lime/10 flex items-center justify-center mb-6 group-hover:bg-lime/20 transition-colors">
                <step.icon size={28} className="text-lime" />
              </div>

              {/* Content */}
              <h3 className="font-display font-semibold text-xl text-gray-primary mb-3">
                {step.title}
              </h3>
              <p className="text-gray-secondary leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
