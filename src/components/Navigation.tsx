import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-dark/80 backdrop-blur-xl border-b border-white/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span className="font-display font-bold text-xl lg:text-2xl text-gray-primary">
                AI Ledger Bot
              </span>
              <span className="w-2 h-2 rounded-full bg-lime group-hover:shadow-glow transition-shadow" />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <button
                onClick={() => scrollToSection('features')}
                className="nav-link"
              >
                Features
              </button>
                <button
                  onClick={() => scrollToSection('usecases')}
                  className="nav-link hover:text-lime"
                >
                  Use Cases
                </button>
              <button
                onClick={() => scrollToSection('demo')}
                className="nav-link"
              >
                Demo
              </button>
              <button
                onClick={() => scrollToSection('pricing')}
                className="nav-link"
              >
                Pricing
              </button>
              <button
                onClick={() => scrollToSection('faq')}
                className="nav-link"
              >
                FAQ
              </button>
            </div>

            {/* CTA Button */}
            <div className="hidden md:block">
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline text-sm"
              >
                Add to WhatsApp
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-primary"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-dark/95 backdrop-blur-xl transition-all duration-300 md:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          <button
            onClick={() => scrollToSection('features')}
            className="text-2xl font-display font-semibold text-gray-primary hover:text-lime transition-colors"
          >
            Features
          </button>
            <button
              onClick={() => scrollToSection('usecases')}
              className="text-2xl font-display font-semibold text-gray-primary hover:text-lime transition-colors"
            >
              Use Cases
            </button>
          <button
            onClick={() => scrollToSection('demo')}
            className="text-2xl font-display font-semibold text-gray-primary hover:text-lime transition-colors"
          >
            Demo
          </button>
          <button
            onClick={() => scrollToSection('pricing')}
            className="text-2xl font-display font-semibold text-gray-primary hover:text-lime transition-colors"
          >
            Pricing
          </button>
          <button
            onClick={() => scrollToSection('faq')}
            className="text-2xl font-display font-semibold text-gray-primary hover:text-lime transition-colors"
          >
            FAQ
          </button>
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-4"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Add to WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
