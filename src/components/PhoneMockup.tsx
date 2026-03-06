import type { ReactNode } from 'react';

interface PhoneMockupProps {
  children: ReactNode;
  className?: string;
}

export default function PhoneMockup({ children, className = '' }: PhoneMockupProps) {
  return (
    <div
      className={`relative mx-auto ${className}`}
      style={{
        width: 'clamp(280px, 34vw, 420px)',
      }}
    >
      {/* Phone Frame */}
      <div className="phone-mockup bg-dark">
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-dark rounded-b-2xl z-20" />
        
        {/* Screen */}
        <div className="relative bg-dark overflow-hidden rounded-[40px]">
          {/* Status Bar */}
          <div className="flex items-center justify-between px-6 pt-3 pb-2 text-xs font-medium text-gray-primary">
            <span>9:41</span>
            <div className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 3C7.46 3 3.34 4.78.29 7.67c-.18.18-.29.43-.29.71 0 .28.11.53.29.71l11 11c.39.39 1.02.39 1.41 0l11-11c.18-.18.29-.43.29-.71 0-.28-.11-.53-.29-.71C20.66 4.78 16.54 3 12 3z"/>
              </svg>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/>
              </svg>
            </div>
          </div>
          
          {/* Content */}
          <div className="relative">
            {children}
          </div>
          
          {/* Home Indicator */}
          <div className="flex justify-center pb-2 pt-1">
            <div className="w-32 h-1 bg-gray-primary/30 rounded-full" />
          </div>
        </div>
      </div>
      
      {/* Glow Effect */}
      <div className="absolute -inset-4 bg-lime/5 rounded-[60px] blur-3xl -z-10 opacity-50" />
    </div>
  );
}
