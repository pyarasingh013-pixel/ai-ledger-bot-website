import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Zap, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  {
    name: 'Free',
    price: '₹0',
    period: '/month',
    description: 'Perfect for personal expense tracking.',
    features: [
      '50 entries per month',
      '1 ledger',
      'Receipt OCR',
      'Basic insights',
      'WhatsApp support',
    ],
    cta: 'Start on WhatsApp',
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '₹299',
    period: '/month',
    description: 'For power users and shared expenses.',
    features: [
      'Unlimited entries',
      'Multiple ledgers',
      'Shared group ledgers',
      'Advanced insights',
      'Priority support',
      'Export to CSV/PDF',
      'Custom categories',
    ],
    cta: 'Upgrade to Pro',
    highlighted: true,
  },
];

export default function Pricing() {
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
        { y: 16, opacity: 0 },
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
        cards.querySelectorAll('.pricing-card'),
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
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
      id="pricing"
      ref={sectionRef}
      className="relative bg-dark-light py-24 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <h2 className="font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary leading-tight mb-4">
            Simple <span className="text-lime glow-text">pricing.</span>
          </h2>
          <p className="text-lg text-gray-secondary max-w-xl mx-auto">
            Start free. Upgrade when you need more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div
          ref={cardsRef}
          className="flex flex-col lg:flex-row justify-center items-stretch gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`pricing-card relative w-full lg:w-[min(28vw,380px)] rounded-2xl p-8 transition-all duration-300 ${
                plan.highlighted
                  ? 'bg-dark border-t-2 border-t-lime border-x border-b border-lime/20'
                  : 'bg-dark border border-white/5'
              } hover:transform hover:-translate-y-1`}
            >
              {/* Popular Badge */}
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <div className="flex items-center gap-1.5 bg-lime text-dark text-xs font-semibold px-3 py-1 rounded-full">
                    <Zap size={12} />
                    Most Popular
                  </div>
                </div>
              )}

              {/* Plan Name */}
              <h3 className="font-display font-semibold text-xl text-gray-primary mb-2">
                {plan.name}
              </h3>

              {/* Price */}
              <div className="flex items-baseline gap-1 mb-4">
                <span className="font-display font-bold text-4xl lg:text-5xl text-gray-primary">
                  {plan.price}
                </span>
                <span className="text-gray-secondary">{plan.period}</span>
              </div>

              {/* Description */}
              <p className="text-gray-secondary mb-6">{plan.description}</p>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check
                      size={18}
                      className={`mt-0.5 flex-shrink-0 ${
                        plan.highlighted ? 'text-lime' : 'text-gray-secondary'
                      }`}
                    />
                    <span className="text-sm text-gray-primary">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-lime text-dark hover:bg-lime-light hover:shadow-glow'
                    : 'border border-white/10 text-gray-primary hover:border-lime/50 hover:text-lime'
                }`}
              >
                {plan.cta}
                <ArrowRight size={18} />
              </a>
            </div>
          ))}
        </div>

        {/* Money Back Guarantee */}
        <p className="text-center text-sm text-gray-secondary mt-8">
          30-day money-back guarantee. No questions asked.
        </p>
      </div>
    </section>
  );
}
