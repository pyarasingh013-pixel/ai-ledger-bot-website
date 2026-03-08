import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Home, Plane, Briefcase, PartyPopper, Heart, Building2, Receipt, TrendingUp, Calculator } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const useCases = [
  {
    id: 1,
    title: 'Roommate Sharing',
    subtitle: 'Split rent, utilities & groceries effortlessly',
    icon: Home,
    color: 'from-lime/20 to-lime/5',
    accentColor: 'text-lime',
    features: [
      '🏠 Create shared ledgers for rent & bills',
      '📸 Scan grocery receipts and split automatically',
      '⏰ Get reminders who owes what, when',
      '💳 Send UPI payment links instantly',
      '👥 Multiple roommates, clear accountability',
    ],
  },
  {
    id: 2,
    title: 'Group Travel',
    subtitle: 'Settle trip expenses without the headache',
    icon: Plane,
    color: 'from-purple-500/20 to-purple-500/5',
    accentColor: 'text-purple-400',
    features: [
      '✈️ One person pays, others contribute later',
      '📸 Scan every bill—flights, hotels, meals',
      '🧮 Automatic split among travelers',
      '📊 See who-owes-who at a glance',
      '💰 Settle instantly with payment links',
    ],
  },
  {
    id: 3,
    title: 'Family Budget',
    subtitle: 'Track household & teach kids money management',
    icon: Heart,
    color: 'from-rose-500/20 to-rose-500/5',
    accentColor: 'text-rose-400',
    features: [
      '👨‍👩‍👧‍👦 Parents track all household spending',
      '🎓 Kids learn by seeing real expenses',
      '📌 Set allowances & track balance',
      '📱 Everything on WhatsApp—no app fatigue',
      '💡 Weekly insights on where money goes',
    ],
  },
  {
    id: 4,
    title: 'Small Business',
    subtitle: 'Manage client reimbursements & project costs',
    icon: Briefcase,
    color: 'from-blue-500/20 to-blue-500/5',
    accentColor: 'text-blue-400',
    features: [
      '💼 Track project expenses across teams',
      '🧾 Invoice clients with OCR-extracted receipts',
      '👤 Role-based access: editors vs viewers',
      '📊 Export reports for accounting',
      '⚙️ Category expenses automatically',
    ],
  },
  {
    id: 5,
    title: 'Event Planning',
    subtitle: 'Coordinate costs with co-organizers',
    icon: PartyPopper,
    color: 'from-yellow-500/20 to-yellow-500/5',
    accentColor: 'text-yellow-400',
    features: [
      '🎉 Multiple organizers, one ledger',
      '🛍️ Scan every vendor invoice & bill',
      '✅ Clear record of "who paid what"',
      '🤝 Settle up with co-organizers via UPI',
      '📱 Everyone stays in sync on WhatsApp',
    ],
  },
  {
    id: 6,
    title: 'Friend Groups',
    subtitle: 'Everything from dinner splits to gaming bets',
    icon: Users,
    color: 'from-teal-500/20 to-teal-500/5',
    accentColor: 'text-teal-400',
    features: [
      '🍽️ Split restaurant bills instantly',
      '🎮 Track gaming bets & payouts',
      '🎬 Movie night cost sharing',
      '🎁 Gift pool contributions',
      '💬 Friendly reminders—no awkward asks',
    ],
  },
  {
    id: 7,
    title: 'MSME Vendor Management',
    subtitle: 'Streamline supplier payments & invoice tracking',
    icon: Building2,
    color: 'from-orange-500/20 to-orange-500/5',
    accentColor: 'text-orange-400',
    features: [
      '🏪 Track all vendor invoices automatically',
      '⏰ Never miss payment deadlines',
      '📊 Compare vendor costs & negotiate better',
      '💳 Send UPI payments directly from WhatsApp',
      '📈 Reduce late payment penalties',
    ],
  },
  {
    id: 8,
    title: 'Client Collections',
    subtitle: 'Professional invoicing & payment tracking',
    icon: Receipt,
    color: 'from-cyan-500/20 to-cyan-500/5',
    accentColor: 'text-cyan-400',
    features: [
      '📄 Generate professional invoices instantly',
      '📅 Automated payment reminders to clients',
      '💰 Track outstanding receivables',
      '📊 Cash flow visibility in real-time',
      '⚡ Faster collections, better cash flow',
    ],
  },
  {
    id: 9,
    title: 'Expense Reimbursements',
    subtitle: 'Employee expenses made simple & accountable',
    icon: Calculator,
    color: 'from-emerald-500/20 to-emerald-500/5',
    accentColor: 'text-emerald-400',
    features: [
      '👥 Employees submit expenses via WhatsApp',
      '✅ Manager approval workflow',
      '💸 Automatic reimbursement calculations',
      '📋 Audit trail for all expenses',
      '⏱️ Cut processing time from days to minutes',
    ],
  },
  {
    id: 10,
    title: 'Multi-Location Operations',
    subtitle: 'Manage expenses across branches seamlessly',
    icon: TrendingUp,
    color: 'from-indigo-500/20 to-indigo-500/5',
    accentColor: 'text-indigo-400',
    features: [
      '🏢 Branch-wise expense tracking',
      '👀 Centralized visibility for owners',
      '📊 Compare performance across locations',
      '🎯 Identify cost-saving opportunities',
      '📱 Real-time updates from any location',
    ],
  },
];

export default function UseCases() {
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
        { y: 24, opacity: 0 },
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
        cards.querySelectorAll('.usecase-card'),
        { y: 40, opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
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
      id="usecases"
      className="relative bg-dark py-24 lg:py-32 z-40"
    >
      {/* Background Gradient */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(182,255,46,0.1), transparent 70%)',
        }}
      />

      <div className="w-full px-6 lg:px-12 relative">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <h2 className="font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary leading-tight mb-6">
            Built for <span className="text-lime glow-text">every scenario.</span>
          </h2>
          <p className="text-lg text-gray-secondary max-w-2xl mx-auto">
            From splitting rent with roommates to managing business expenses—AI Ledger Bot adapts to how you spend and share money.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto"
        >
          {useCases.map((useCase) => {
            const Icon = useCase.icon;
            return (
              <div
                key={useCase.id}
                className="usecase-card group relative"
              >
                {/* Card Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/2 to-white/0 rounded-2xl border border-white/5 group-hover:border-lime/20 transition-all duration-500" />

                {/* Colored Accent */}
                <div className={`absolute -inset-0.5 bg-gradient-to-br ${useCase.color} rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500 -z-10`} />

                <div className="relative p-8 lg:p-10">
                  {/* Icon & Title */}
                  <div className="mb-6">
                    <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:bg-white/10 transition-colors`}>
                      <Icon size={28} className={`${useCase.accentColor}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-primary mb-2">
                      {useCase.title}
                    </h3>
                    <p className="text-sm text-lime font-medium">
                      {useCase.subtitle}
                    </p>
                  </div>

                  {/* Features List */}
                  <div className="space-y-3">
                    {useCase.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime mt-1.5 flex-shrink-0" />
                        <p className="text-sm text-gray-secondary leading-relaxed">
                          {feature}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 text-center">
          <div className="inline-flex flex-col items-center gap-4">
            <p className="text-gray-secondary">
              Your use case isn't listed? <span className="text-lime font-medium">It probably still works.</span>
            </p>
            <button className="px-8 py-3 bg-lime text-dark font-semibold rounded-lg hover:bg-lime/90 transition-all duration-300 transform hover:scale-105">
              Try on WhatsApp Free
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
