import React, { useState } from 'react';

interface AIPromptSectionProps {
  /** AI icon element */
  aiIcon: React.ReactNode;
  /** Send button icon element */
  sendIcon: React.ReactNode;
  /** Title text */
  title: string;
  /** Subtitle text */
  subtitle: string;
  /** Input placeholder text */
  placeholder: string;
  /** Submit callback */
  onSubmit?: (prompt: string) => void;
}

/**
 * AIPromptSection - Presentational AI dashboard builder section
 * Receives icons and text as props for UIKit presentational pattern
 */
export const AIPromptSection: React.FC<AIPromptSectionProps> = ({ 
  aiIcon,
  sendIcon,
  title,
  subtitle,
  placeholder,
  onSubmit,
}) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim() && onSubmit) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center text-center">
      {/* AI Icon */}
      <div className="mb-4">
        {aiIcon}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-normal text-foreground mb-2">
        {title}
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-foreground mb-6 max-w-xl">
        {subtitle}
      </p>

      {/* Input */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-3 pr-12 border border-primary/30 rounded-md text-sm text-foreground placeholder:text-foreground/70 focus:outline-none focus:border-primary"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-primary/10 rounded"
        >
          {sendIcon}
        </button>
      </div>
    </div>
  );
};

AIPromptSection.displayName = 'AIPromptSection';
