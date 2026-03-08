import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Sparkles, BarChart3, Tags } from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';
import ChatBubble from '../components/ChatBubble';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const section1Ref = useRef<HTMLElement>(null);
  const section2Ref = useRef<HTMLElement>(null);
  const section3Ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const sections = [
      { ref: section1Ref, headline: 'Point. Shoot. Logged.' },
      { ref: section2Ref, headline: 'It knows where it goes.' },
      { ref: section3Ref, headline: 'See the story.' },
    ];

    const triggers: ScrollTrigger[] = [];

    sections.forEach(({ ref }) => {
      const section = ref.current;
      if (!section) return;

      const headline = section.querySelector('.feature-headline');
      const phone = section.querySelector('.feature-phone');
      const leftCaption = section.querySelector('.left-caption');
      const rightCaption = section.querySelector('.right-caption');
      const glowBlob = section.querySelector('.glow-blob');
      const chips = section.querySelectorAll('.category-chip');

      gsap.context(() => {
        const scrollTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=130%',
            pin: true,
            scrub: 0.6,
          },
        });

        // Store the trigger for cleanup
        if (scrollTl.scrollTrigger) {
          triggers.push(scrollTl.scrollTrigger);
        }

        // ENTRANCE (0% - 30%)
        scrollTl.fromTo(
          headline,
          { y: '-12vh', opacity: 0 },
          { y: 0, opacity: 1, ease: 'none' },
          0
        );

        scrollTl.fromTo(
          phone,
          { y: '60vh', scale: 0.85, opacity: 0 },
          { y: 0, scale: 1, opacity: 1, ease: 'power2.out' },
          0.06
        );

        if (glowBlob) {
          scrollTl.fromTo(
            glowBlob,
            { opacity: 0, scale: 0.9 },
            { opacity: 0.55, scale: 1, ease: 'none' },
            0.1
          );
        }

        scrollTl.fromTo(
          leftCaption,
          { x: '-10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.14
        );

        scrollTl.fromTo(
          rightCaption,
          { x: '10vw', opacity: 0 },
          { x: 0, opacity: 1, ease: 'none' },
          0.18
        );

        if (chips.length > 0) {
          scrollTl.fromTo(
            chips,
            { x: (i) => (i % 2 === 0 ? '-8vw' : '8vw'), opacity: 0 },
            { x: 0, opacity: 1, stagger: 0.04, ease: 'none' },
            0.12
          );
        }

        // SETTLE (30% - 70%): Hold position

        // EXIT (70% - 100%)
        scrollTl.fromTo(
          headline,
          { y: 0, opacity: 1 },
          { y: '-8vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          phone,
          { y: 0, scale: 1, opacity: 1 },
          { y: '-18vh', scale: 0.92, opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          leftCaption,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        scrollTl.fromTo(
          rightCaption,
          { y: 0, opacity: 1 },
          { y: '6vh', opacity: 0, ease: 'power2.in' },
          0.7
        );

        if (chips.length > 0) {
          scrollTl.fromTo(
            chips,
            { x: 0, opacity: 1 },
            { x: (i) => (i % 2 === 0 ? '-6vw' : '6vw'), opacity: 0, ease: 'power2.in' },
            0.75
          );
        }
      }, section);
    });

    return () => {
      triggers.forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div id="features">
      {/* Section 1: OCR - Point. Shoot. Logged. */}
      <section
        ref={section1Ref}
        className="section-pinned bg-dark flex items-center justify-center z-20"
      >
        {/* Glow Blob */}
        <div
          className="glow-blob animate-pulse-glow"
          style={{
            left: '50%',
            top: '55%',
            transform: 'translate(-50%, -50%)',
            width: '70vw',
            height: '70vw',
          }}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Headline */}
          <h2 className="feature-headline font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary text-center absolute top-[10vh] left-1/2 -translate-x-1/2 w-[70vw]">
            Point. Shoot. <span className="text-lime glow-text">Logged.</span>
          </h2>

          {/* Phone */}
          <div className="feature-phone absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2">
            <PhoneMockup>
              {/* WhatsApp Header */}
              <div className="bg-dark-lighter px-4 py-3 flex items-center gap-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                  <Camera size={20} className="text-lime" />
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
                <ChatBubble isUser={true} timestamp="2:15 PM">
                  <div className="relative">
                    <img
                      src="/images/receipt_coffee.jpg"
                      alt="Coffee receipt scanned by AI Ledger Bot OCR"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                    <div className="absolute bottom-2 right-2 bg-lime text-dark text-xs font-semibold px-2 py-1 rounded-full">
                      📎 Receipt
                    </div>
                  </div>
                </ChatBubble>

                <ChatBubble isUser={false} timestamp="2:15 PM">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles size={16} className="text-lime" />
                    <span className="text-lime font-semibold text-xs">
                      OCR Complete
                    </span>
                  </div>
                  ✅ Logged: The Daily Grind
                  <br />
                  💰 Total: ₹856.00
                  <br />
                  📅 Date: Today
                  <br />
                  🏷️ Category: Food & Dining
                </ChatBubble>

                <div className="mt-2 inline-flex items-center gap-2 bg-lime/10 border border-lime/30 rounded-full px-3 py-1.5">
                  <svg
                    className="w-4 h-4 text-lime"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span className="text-xs text-lime font-medium">
                    Logged
                  </span>
                </div>
              </div>
            </PhoneMockup>
          </div>

          {/* Captions */}
          <p className="left-caption absolute left-[7vw] top-[78vh] w-[28vw] max-w-sm text-gray-secondary leading-relaxed">
            Take a photo of any receipt. We read the total, date, and
            merchant—instantly.
          </p>

          <p className="right-caption absolute right-[7vw] top-[78vh] w-[28vw] max-w-sm text-gray-secondary leading-relaxed text-right">
            No typing. No folders. Just send it like a message.
          </p>
        </div>
      </section>

      {/* Section 2: Auto-Categorize - It knows where it goes. */}
      <section
        ref={section2Ref}
        className="section-pinned bg-dark flex items-center justify-center z-30"
      >
        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Headline */}
          <h2 className="feature-headline font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary text-center absolute top-[10vh] left-1/2 -translate-x-1/2 w-[70vw]">
            It knows where it <span className="text-lime glow-text">goes.</span>
          </h2>

          {/* Category Chips */}
          <div className="category-chip absolute left-[18vw] top-[34vh] bg-dark-light border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 animate-float">
            <span className="text-lime">🍔</span>
            <span className="text-sm text-gray-primary font-medium">Food</span>
          </div>

          <div
            className="category-chip absolute left-[22vw] top-[62vh] bg-dark-light border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 animate-float animation-delay-200"
          >
            <span className="text-lime">✈️</span>
            <span className="text-sm text-gray-primary font-medium">Travel</span>
          </div>

          <div className="category-chip absolute right-[18vw] top-[36vh] bg-dark-light border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 animate-float animation-delay-300">
            <span className="text-lime">💡</span>
            <span className="text-sm text-gray-primary font-medium">Bills</span>
          </div>

          <div
            className="category-chip absolute right-[16vw] top-[60vh] bg-dark-light border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 animate-float animation-delay-400"
          >
            <span className="text-lime">🛍️</span>
            <span className="text-sm text-gray-primary font-medium">
              Shopping
            </span>
          </div>

          {/* Phone */}
          <div className="feature-phone absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2">
            <PhoneMockup>
              {/* WhatsApp Header */}
              <div className="bg-dark-lighter px-4 py-3 flex items-center gap-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                  <Tags size={20} className="text-lime" />
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
                <ChatBubble isUser={true} timestamp="10:30 AM">
                  Uber ₹340
                </ChatBubble>

                <ChatBubble isUser={false} timestamp="10:30 AM">
                  ✅ Logged: Uber ₹340
                  <br />
                  <span className="text-lime">🏷️ Auto-categorized: Travel</span>
                </ChatBubble>

                <ChatBubble isUser={true} timestamp="11:45 AM">
                  Electricity bill ₹2,400
                </ChatBubble>

                <ChatBubble isUser={false} timestamp="11:45 AM">
                  ✅ Logged: Electricity ₹2,400
                  <br />
                  <span className="text-lime">🏷️ Auto-categorized: Bills</span>
                  <br />
                  <span className="text-gray-secondary text-xs">
                    💡 This looks like a monthly bill. Set a reminder?
                  </span>
                </ChatBubble>
              </div>
            </PhoneMockup>
          </div>

          {/* Captions */}
          <p className="left-caption absolute left-[7vw] top-[78vh] w-[28vw] max-w-sm text-gray-secondary leading-relaxed">
            Smart categories that learn your habits. Rename anytime.
          </p>

          <p className="right-caption absolute right-[7vw] top-[78vh] w-[28vw] max-w-sm text-gray-secondary leading-relaxed text-right">
            Split shared ledgers. Tag who paid. Keep it fair.
          </p>
        </div>
      </section>

      {/* Section 3: Insights - See the story. */}
      <section
        ref={section3Ref}
        className="section-pinned bg-dark flex items-center justify-center z-40"
      >
        {/* Bottom Vignette */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[50vh] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 90%, rgba(182,255,46,0.10), transparent 55%)',
          }}
        />

        <div className="relative w-full h-full flex flex-col items-center justify-center">
          {/* Headline */}
          <h2 className="feature-headline font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary text-center absolute top-[10vh] left-1/2 -translate-x-1/2 w-[70vw]">
            See the <span className="text-lime glow-text">story.</span>
          </h2>

          {/* Phone */}
          <div className="feature-phone absolute left-1/2 top-[56%] -translate-x-1/2 -translate-y-1/2">
            <PhoneMockup>
              {/* WhatsApp Header */}
              <div className="bg-dark-lighter px-4 py-3 flex items-center gap-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                  <BarChart3 size={20} className="text-lime" />
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
                <ChatBubble isUser={true} timestamp="8:00 AM">
                  Weekly summary
                </ChatBubble>

                <ChatBubble isUser={false} timestamp="8:00 AM">
                  📊 <span className="font-semibold">This Week&apos;s Summary</span>
                  <br />
                  <br />
                  💰 Total: ₹8,450
                  <br />
                  📈 vs last week: +12%
                  <br />
                  <br />
                  <span className="text-lime">Top categories:</span>
                  <br />
                  🍔 Food: ₹3,200 (38%)
                  <br />
                  🚗 Travel: ₹2,100 (25%)
                  <br />
                  🛍️ Shopping: ₹1,800 (21%)
                  <br />
                  💡 Bills: ₹1,350 (16%)
                </ChatBubble>

                {/* Mini Chart */}
                <div className="mt-3 bg-dark-lighter rounded-xl p-3 border border-white/5">
                  <p className="text-xs text-gray-secondary mb-2">
                    Spending trend
                  </p>
                  <div className="flex items-end gap-2 h-16">
                    {[40, 65, 45, 80, 55, 70, 85].map((height, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-lime/20 rounded-t-sm relative overflow-hidden"
                        style={{ height: `${height}%` }}
                      >
                        <div
                          className="absolute bottom-0 left-0 right-0 bg-lime rounded-t-sm transition-all duration-500"
                          style={{ height: `${height * 0.7}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1 text-[10px] text-gray-secondary">
                    <span>Mon</span>
                    <span>Tue</span>
                    <span>Wed</span>
                    <span>Thu</span>
                    <span>Fri</span>
                    <span>Sat</span>
                    <span>Sun</span>
                  </div>
                </div>
              </div>
            </PhoneMockup>
          </div>

          {/* Captions */}
          <p className="left-caption absolute left-[7vw] top-[78vh] w-[28vw] max-w-sm text-gray-secondary leading-relaxed">
            Weekly summaries in plain text. No spreadsheets.
          </p>

          <p className="right-caption absolute right-[7vw] top-[78vh] w-[28vw] max-w-sm text-gray-secondary leading-relaxed text-right">
            Spot trends, cut waste, stay on budget—without leaving the chat.
          </p>
        </div>
      </section>
    </div>
  );
}
