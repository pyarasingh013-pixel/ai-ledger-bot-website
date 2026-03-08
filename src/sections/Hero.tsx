import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scan, Tags, TrendingUp, ArrowRight, ChevronDown } from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import ChatBubble from '../components/ChatBubble';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const bulletsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const phone = phoneRef.current;
    const cards = cardsRef.current;
    const cta = ctaRef.current;
    const bullets = bulletsRef.current;

    if (!section || !headline || !phone || !cards || !cta || !bullets) return;

    const ctx = gsap.context(() => {
      // Initial load animation
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Headline animation
      loadTl.fromTo(
        headline.querySelectorAll('.headline-line'),
        { y: 24, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.7 },
        0.2
      );

      // Phone animation
      loadTl.fromTo(
        phone,
        { scale: 0.92, y: 40, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.8 },
        0.3
      );

      // Cards animation
      loadTl.fromTo(
        cards.querySelectorAll('.feature-card'),
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, stagger: 0.12, duration: 0.7 },
        0.4
      );

      // CTA animation
      loadTl.fromTo(
        cta,
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.35 },
        0.6
      );

      // Bullets animation
      loadTl.fromTo(
        bullets.querySelectorAll('.bullet-item'),
        { y: 10, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.35 },
        0.7
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=100%',
          pin: true,
          scrub: 1.5,
          onLeaveBack: () => {
            // Reset all elements when scrolling back to top
            gsap.set([headline.querySelectorAll('.headline-line'), phone, cards.querySelectorAll('.feature-card'), cta, bullets.querySelectorAll('.bullet-item')], {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
            });
          },
        },
      });

      // SETTLE phase (0% - 60%): Hold position
      // EXIT phase (60% - 100%)
      scrollTl.fromTo(
        headline,
        { x: 0, opacity: 1 },
        { x: '-18vw', opacity: 0, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        phone,
        { y: 0, scale: 1, opacity: 1 },
        { y: '-10vh', scale: 0.96, opacity: 0, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        cards.querySelectorAll('.feature-card'),
        { x: 0, opacity: 1 },
        { x: '12vw', opacity: 0, stagger: 0.05, ease: 'power2.in' },
        0.6
      );

      scrollTl.fromTo(
        cta,
        { y: 0, opacity: 1 },
        { y: 20, opacity: 0, ease: 'power2.in' },
        0.65
      );

      scrollTl.fromTo(
        bullets,
        { y: 0, opacity: 1 },
        { y: 20, opacity: 0, ease: 'power2.in' },
        0.65
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToFeatures = () => {
    const element = document.getElementById('features');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="section-pinned bg-dark flex items-center justify-center z-10"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, rgba(30,30,35,0.6), rgba(11,11,13,1))',
        }}
      />

      <div className="relative w-full h-full flex items-center">
        {/* Left Content */}
        <div className="absolute left-[7vw] top-[18vh] w-[42vw] max-w-xl">
          {/* Headline */}
          <div ref={headlineRef} className="mb-8">
            <h1 className="font-display font-bold text-[clamp(44px,5.2vw,84px)] leading-[0.95] tracking-[-0.03em] text-gray-primary">
              <span className="headline-line block">Your money.</span>
              <span className="headline-line block mt-2">
                One <span className="text-lime glow-text">chat</span> away.
              </span>
            </h1>
            <p className="text-sm text-gray-secondary mt-2 italic">Free WhatsApp Expense Tracker with AI Receipt Scanning</p>
          </div>

          {/* Subheadline */}
          <p className="text-lg lg:text-xl text-gray-secondary leading-relaxed mb-8 max-w-md">
            Smart expense tracking on WhatsApp. Scan receipts with AI OCR, auto-categorize spending, split bills with friends, and get weekly financial insights—no app download needed.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-wrap items-center gap-4 mb-12">
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              Add to WhatsApp
              <ArrowRight size={18} />
            </a>
            <button
              onClick={scrollToFeatures}
              className="text-gray-secondary hover:text-gray-primary transition-colors flex items-center gap-2"
            >
              See how it works
              <ChevronDown size={18} />
            </button>
          </div>

          {/* Feature Bullets */}
          <div ref={bulletsRef} className="flex flex-wrap gap-6">
            <div className="bullet-item flex items-center gap-2 text-sm text-gray-secondary">
              <Scan size={16} className="text-lime" />
              <span>OCR receipts</span>
            </div>
            <div className="bullet-item flex items-center gap-2 text-sm text-gray-secondary">
              <Tags size={16} className="text-lime" />
              <span>Auto-categories</span>
            </div>
            <div className="bullet-item flex items-center gap-2 text-sm text-gray-secondary">
              <TrendingUp size={16} className="text-lime" />
              <span>Daily insights</span>
            </div>
          </div>
        </div>

        {/* Right Phone */}
        <div
          ref={phoneRef}
          className="absolute right-[12vw] top-1/2 -translate-y-1/2 scale-90 origin-center"
        >
          <PhoneMockup className="animate-float">
            {/* WhatsApp Header */}
            <div className="bg-dark-lighter px-4 py-3 flex items-center gap-3 border-b border-white/5">
              <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-lime"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-primary text-sm">
                  AI Ledger Bot
                </p>
                <p className="text-xs text-lime">Online</p>
              </div>
            </div>

            {/* Chat Content */}
            <div className="px-4 py-4 min-h-[320px] bg-gradient-to-b from-dark to-dark-light">
              <ChatBubble isUser={false} timestamp="9:38 AM">
                👋 Hi! I&apos;m your AI Ledger Bot. Send me a receipt photo or type
                an expense like &quot;Coffee ₹250&quot; to get started!
              </ChatBubble>

              <ChatBubble isUser={true} timestamp="9:39 AM">
                Coffee ₹250
              </ChatBubble>

              <ChatBubble isUser={false} timestamp="9:39 AM">
                ✅ Logged! Coffee ₹250 → Food & Dining
                <br />
                <br />
                📊 Today: ₹250
                <br />
                📊 This week: ₹1,240
              </ChatBubble>

              {/* Input Area */}
              <div className="mt-4 flex items-center gap-2 bg-dark-lighter rounded-full px-4 py-2 border border-white/5">
                <svg
                  className="w-5 h-5 text-gray-secondary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-sm text-gray-secondary flex-1">
                  Type a message...
                </span>
                <div className="w-8 h-8 rounded-full bg-lime flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-dark"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 12h14M12 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </PhoneMockup>
        </div>

        {/* Right Floating Cards */}
        <div
          ref={cardsRef}
          className="absolute right-[4vw] top-1/2 -translate-y-1/2 flex flex-col items-center gap-3"
        >
          <div className="feature-card relative w-[14vw] min-w-[170px] animate-float-x">
            <div className="absolute top-0 left-0 w-12 h-0.5 bg-lime" />
            <Scan size={24} className="text-lime mb-3" />
            <h3 className="font-display font-semibold text-gray-primary mb-1">
              Scan any receipt
            </h3>
            <p className="text-sm text-gray-secondary">
              Snap → extract → done.
            </p>
          </div>

          <div className="feature-card relative w-[13vw] min-w-[160px] animate-float-x animation-delay-200">
            <div className="absolute top-0 left-0 w-12 h-0.5 bg-lime" />
            <Tags size={24} className="text-lime mb-3" />
            <h3 className="font-display font-semibold text-gray-primary mb-1">
              Smart categories
            </h3>
            <p className="text-sm text-gray-secondary">
              Food, travel, bills—auto-tagged.
            </p>
          </div>

          <div className="feature-card relative w-[15vw] min-w-[180px] animate-float-x animation-delay-400">
            <div className="absolute top-0 left-0 w-12 h-0.5 bg-lime" />
            <TrendingUp size={24} className="text-lime mb-3" />
            <h3 className="font-display font-semibold text-gray-primary mb-1">
              Insights that land
            </h3>
            <p className="text-sm text-gray-secondary">
              Weekly summaries in your chat.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
