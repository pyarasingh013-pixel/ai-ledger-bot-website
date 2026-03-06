import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Play, Twitter, Github, Linkedin, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const footerLinks = {
  Product: ['Features', 'Pricing', 'Security', 'Updates'],
  Company: ['About', 'Careers', 'Contact'],
  Legal: ['Privacy', 'Terms', 'Cookies'],
  Support: ['Help Center', 'Contact'],
};

export default function CTAFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cta = ctaRef.current;
    const footer = footerRef.current;

    if (!section || !cta || !footer) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cta,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        footer.querySelectorAll('.footer-col'),
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToDemo = () => {
    const element = document.getElementById('demo');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={sectionRef} className="relative z-50">
      {/* CTA Section */}
      <div
        className="relative py-24 lg:py-32"
        style={{
          background:
            'linear-gradient(180deg, #0B0B0D 0%, #0F110C 65%, #141a0e 100%)',
        }}
      >
        {/* Glow Effect */}
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at 50% 100%, rgba(182,255,46,0.12), transparent 60%)',
          }}
        />

        <div ref={ctaRef} className="relative w-full px-6 lg:px-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="font-display font-bold text-[clamp(44px,5vw,72px)] text-gray-primary leading-tight mb-6">
              Start <span className="text-lime glow-text">now.</span>
            </h2>
            <p className="text-xl text-gray-secondary mb-10">
              Your first expense takes 10 seconds.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary flex items-center gap-2 text-lg px-8 py-4"
              >
                Add to WhatsApp
                <ArrowRight size={20} />
              </a>
              <button
                onClick={scrollToDemo}
                className="flex items-center gap-2 text-gray-primary hover:text-lime transition-colors"
              >
                <Play size={20} />
                View demo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        ref={footerRef}
        className="bg-dark border-t border-white/5 py-16"
      >
        <div className="w-full px-6 lg:px-12">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-12">
            {/* Logo & Description */}
            <div className="col-span-2 footer-col">
              <a href="#" className="flex items-center gap-2 mb-4">
                <span className="font-display font-bold text-xl text-gray-primary">
                  AI Ledger Bot
                </span>
                <span className="w-2 h-2 rounded-full bg-lime" />
              </a>
              <p className="text-sm text-gray-secondary mb-6 max-w-xs">
                Track expenses, split bills, and stay on budget—inside WhatsApp.
                No apps to install.
              </p>
              <div className="flex items-center gap-4">
                <a
                  href="#"
                  className="text-gray-secondary hover:text-lime transition-colors"
                >
                  <Twitter size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-secondary hover:text-lime transition-colors"
                >
                  <Github size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-secondary hover:text-lime transition-colors"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="#"
                  className="text-gray-secondary hover:text-lime transition-colors"
                >
                  <Mail size={20} />
                </a>
              </div>
            </div>

            {/* Link Columns */}
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title} className="footer-col">
                <h4 className="font-semibold text-gray-primary mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href="#"
                        className="text-sm text-gray-secondary hover:text-lime transition-colors"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-secondary">
              © {new Date().getFullYear()} AI Ledger Bot. Built for India.
              Available worldwide.
            </p>
            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-sm text-gray-secondary hover:text-lime transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-sm text-gray-secondary hover:text-lime transition-colors"
              >
                Terms of Use
              </a>
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
