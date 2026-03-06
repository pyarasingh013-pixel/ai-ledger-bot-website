import type { ReactNode } from 'react';

interface ChatBubbleProps {
  children: ReactNode;
  isUser?: boolean;
  timestamp?: string;
  className?: string;
}

export default function ChatBubble({
  children,
  isUser = false,
  timestamp = '9:41 AM',
  className = '',
}: ChatBubbleProps) {
  if (isUser) {
    return (
      <div className={`flex justify-end mb-3 ${className}`}>
        <div className="chat-bubble-right bg-lime text-dark px-4 py-2.5 max-w-[80%]">
          <p className="text-sm font-medium leading-relaxed">{children}</p>
          <span className="text-[10px] opacity-60 mt-1 block text-right">{timestamp}</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex justify-start mb-3 ${className}`}>
      <div className="flex gap-2 max-w-[85%]">
        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-lime/20 flex items-center justify-center flex-shrink-0">
          <svg className="w-4 h-4 text-lime" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        
        {/* Bubble */}
        <div className="chat-bubble-left bg-dark-lighter border border-white/10 px-4 py-2.5">
          <p className="text-sm text-gray-primary leading-relaxed">{children}</p>
          <span className="text-[10px] text-gray-secondary mt-1 block">{timestamp}</span>
        </div>
      </div>
    </div>
  );
}
