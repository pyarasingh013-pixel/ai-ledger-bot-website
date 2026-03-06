import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Plus, MessageSquare, Receipt, Users } from 'lucide-react';
import PhoneMockup from '../components/PhoneMockup';

gsap.registerPlugin(ScrollTrigger);

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: string;
}

const initialMessages: Message[] = [
  {
    id: 1,
    text: "👋 Welcome! I'm your AI Ledger Bot. Try these commands:",
    isUser: false,
    timestamp: 'Just now',
  },
  {
    id: 2,
    text: '• Type "Coffee ₹250" to add an expense\n• Say "Summary" for weekly stats\n• Try "Split ₹500 with @friend"',
    isUser: false,
    timestamp: 'Just now',
  },
];

const botResponses: Record<string, string> = {
  coffee: '☕ Logged: Coffee ₹250\n🏷️ Category: Food & Dining\n📊 Today: ₹250',
  lunch: '🍽️ Logged: Lunch ₹450\n🏷️ Category: Food & Dining\n📊 Today: ₹700',
  uber: '🚗 Logged: Uber ₹340\n🏷️ Category: Travel\n📊 Today: ₹1,040',
  grocery: '🛒 Logged: Groceries ₹1,200\n🏷️ Category: Shopping\n📊 Today: ₹2,240',
  summary:
    '📊 This Week\n💰 Total: ₹8,450\n📈 +12% vs last week\n\nTop: Food ₹3,200',
  split: '💰 Split: ₹500\n👤 You: ₹250\n👤 Friend: ₹250\n✅ Logged!',
  help: 'Available commands:\n• Add expense: "Coffee ₹250"\n• View summary: "Summary"\n• Split bills: "Split ₹500 with @name"',
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const section = sectionRef.current;
    const leftCol = leftColRef.current;
    const phone = phoneRef.current;

    if (!section || !leftCol || !phone) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        leftCol,
        { x: '-6vw', opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );

      gsap.fromTo(
        phone,
        { y: '10vh', opacity: 0, scale: 0.96 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: true,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputValue,
      isUser: true,
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let responseText =
        "I didn't understand that. Try typing 'help' for available commands.";

      for (const [key, response] of Object.entries(botResponses)) {
        if (lowerInput.includes(key)) {
          responseText = response;
          break;
        }
      }

      const botMessage: Message = {
        id: messages.length + 2,
        text: responseText,
        isUser: false,
        timestamp: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
      };

      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickCommands = [
    { label: 'Coffee ₹250', icon: <Plus size={14} /> },
    { label: 'Summary', icon: <MessageSquare size={14} /> },
    { label: 'Split ₹500', icon: <Users size={14} /> },
  ];

  return (
    <section
      id="demo"
      ref={sectionRef}
      className="relative bg-dark-light py-24 lg:py-32 z-50"
    >
      <div className="w-full px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left Column */}
          <div ref={leftColRef} className="w-full lg:w-[44vw] lg:ml-[7vw]">
            <h2 className="font-display font-bold text-[clamp(34px,3.6vw,56px)] text-gray-primary leading-tight mb-6">
              Try it. <span className="text-lime glow-text">Right here.</span>
            </h2>

            <p className="text-lg text-gray-secondary leading-relaxed mb-8">
              No signup required. This demo works like the real bot—so you can
              feel the difference.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                  <Plus size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-primary mb-1">
                    Add an expense in seconds
                  </h3>
                  <p className="text-sm text-gray-secondary">
                    Just type what you bought and how much. We handle the rest.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-primary mb-1">
                    Ask &quot;What did I spend this week?&quot;
                  </h3>
                  <p className="text-sm text-gray-secondary">
                    Get instant summaries and insights in plain English.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-lime/10 flex items-center justify-center flex-shrink-0">
                  <Users size={20} className="text-lime" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-primary mb-1">
                    Split bills and settle up
                  </h3>
                  <p className="text-sm text-gray-secondary">
                    Tag friends, split expenses, and track who owes what.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-flex items-center gap-2"
            >
              Start free on WhatsApp
              <Send size={18} />
            </a>
          </div>

          {/* Right Column - Interactive Phone */}
          <div ref={phoneRef} className="w-full lg:w-[40vw] flex justify-center">
            <PhoneMockup className="w-full max-w-[380px]">
              {/* WhatsApp Header */}
              <div className="bg-dark-lighter px-4 py-3 flex items-center gap-3 border-b border-white/5">
                <div className="w-10 h-10 rounded-full bg-lime/20 flex items-center justify-center">
                  <Receipt size={20} className="text-lime" />
                </div>
                <div>
                  <p className="font-semibold text-gray-primary text-sm">
                    AI Ledger Bot
                  </p>
                  <p className="text-xs text-lime">
                    {isTyping ? 'typing...' : 'Online'}
                  </p>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="px-4 py-4 h-[380px] overflow-y-auto bg-gradient-to-b from-dark to-dark-light">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-3 ${
                      message.isUser ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {!message.isUser && (
                      <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0 mr-2">
                        <Receipt size={14} className="text-lime" />
                      </div>
                    )}
                    <div
                      className={`max-w-[80%] px-4 py-2.5 ${
                        message.isUser
                          ? 'bg-lime text-dark rounded-2xl rounded-tr-sm'
                          : 'bg-dark-lighter border border-white/10 text-gray-primary rounded-2xl rounded-tl-sm'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line leading-relaxed">
                        {message.text}
                      </p>
                      <span
                        className={`text-[10px] mt-1 block ${
                          message.isUser ? 'opacity-60' : 'text-gray-secondary'
                        }`}
                      >
                        {message.timestamp}
                      </span>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start mb-3">
                    <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0 mr-2">
                      <Receipt size={14} className="text-lime" />
                    </div>
                    <div className="bg-dark-lighter border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                      <div className="flex gap-1">
                        <span
                          className="w-2 h-2 bg-gray-secondary rounded-full animate-bounce"
                          style={{ animationDelay: '0ms' }}
                        />
                        <span
                          className="w-2 h-2 bg-gray-secondary rounded-full animate-bounce"
                          style={{ animationDelay: '150ms' }}
                        />
                        <span
                          className="w-2 h-2 bg-gray-secondary rounded-full animate-bounce"
                          style={{ animationDelay: '300ms' }}
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Quick Commands */}
              <div className="px-3 py-2 bg-dark-lighter border-t border-white/5">
                <div className="flex gap-2 overflow-x-auto pb-1">
                  {quickCommands.map((cmd, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setInputValue(cmd.label);
                        setTimeout(handleSend, 100);
                      }}
                      className="flex items-center gap-1.5 bg-dark border border-white/10 rounded-full px-3 py-1.5 text-xs text-gray-primary hover:border-lime/50 hover:text-lime transition-colors whitespace-nowrap"
                    >
                      {cmd.icon}
                      {cmd.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Input Area */}
              <div className="px-4 py-3 bg-dark-lighter border-t border-white/5">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type a message..."
                    className="flex-1 bg-dark border border-white/10 rounded-full px-4 py-2.5 text-sm text-gray-primary placeholder:text-gray-secondary focus:outline-none focus:border-lime/50 transition-colors"
                  />
                  <button
                    onClick={handleSend}
                    disabled={!inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-lime flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-lime-light transition-colors"
                  >
                    <Send size={18} className="text-dark" />
                  </button>
                </div>
              </div>
            </PhoneMockup>
          </div>
        </div>
      </div>
    </section>
  );
}
