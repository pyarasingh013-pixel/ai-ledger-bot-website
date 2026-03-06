import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown, MessageCircle } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How does the WhatsApp integration work?',
    answer:
      'Simply save our bot number to your contacts and start chatting on WhatsApp. Send text messages like "Coffee ₹250" or share receipt photos. Our AI processes your messages instantly and maintains your expense ledger.',
  },
  {
    question: 'Is my financial data secure?',
    answer:
      'Absolutely. We use 256-bit encryption for all data at rest and in transit. Your information is stored securely on AWS with SOC 2 compliance. We never sell your data or show ads. You can export or delete your data anytime.',
  },
  {
    question: 'Can I share expenses with friends or family?',
    answer:
      'Yes! Our Pro plan includes shared group ledgers. Create a group, invite members, and everyone can add expenses. The bot automatically calculates who owes what and makes settling up easy.',
  },
  {
    question: 'How accurate is the receipt OCR?',
    answer:
      'Our AI-powered OCR achieves 95%+ accuracy on clear receipt photos. It extracts merchant name, date, items, and total amount automatically. You can always edit any details if needed.',
  },
  {
    question: 'What currencies are supported?',
    answer:
      'We support all major currencies including INR, USD, EUR, GBP, and more. The bot automatically detects currency symbols and formats amounts correctly. You can set your preferred currency in settings.',
  },
  {
    question: 'Can I export my expense data?',
    answer:
      'Yes! Pro users can export their data to CSV or PDF formats anytime. Free users can view their data in the chat and request a simple text export. We believe your data belongs to you.',
  },
  {
    question: 'Is there a limit on how many expenses I can track?',
    answer:
      'Free users can track up to 50 expenses per month. Pro users enjoy unlimited entries, making it perfect for heavy users, small businesses, or families managing shared expenses.',
  },
  {
    question: 'How do I cancel my Pro subscription?',
    answer:
      'You can cancel anytime by sending "Cancel Pro" to the bot or emailing support. Your Pro features remain active until the end of your billing period. We offer a 30-day money-back guarantee.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const header = headerRef.current;
    const list = listRef.current;

    if (!section || !header || !list) return;

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
        list.querySelectorAll('.faq-item'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: list,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative bg-dark py-24 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div ref={headerRef} className="text-center mb-12">
            <h2 className="font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary leading-tight mb-4">
              Frequently asked{' '}
              <span className="text-lime glow-text">questions.</span>
            </h2>
            <p className="text-lg text-gray-secondary">
              Everything you need to know about AI Ledger Bot.
            </p>
          </div>

          {/* FAQ List */}
          <div ref={listRef} className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="faq-item bg-dark-light rounded-xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/10"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-semibold text-gray-primary pr-4">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`text-lime flex-shrink-0 transition-transform duration-300 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-5 pb-5">
                    <p className="text-gray-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-gray-secondary mb-4">
              Still have questions? We&apos;re here to help.
            </p>
            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-lime hover:text-lime-light transition-colors"
            >
              <MessageCircle size={18} />
              Chat with us on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
