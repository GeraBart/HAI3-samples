import React, { useState } from 'react';
import { uikitRegistry } from '@hai3/uicore';
import { AI_ICON_ID } from '../icons/AIIcon';
import { SEND_ICON_ID } from '../icons/SendIcon';

interface AIPromptSectionProps {
  onSubmit?: (prompt: string) => void;
}

/**
 * AIPromptSection - AI dashboard builder section matching Figma design
 * Shows: AI icon, title, subtitle, text input with send button
 */
export const AIPromptSection: React.FC<AIPromptSectionProps> = ({ onSubmit }) => {
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
        {uikitRegistry.getIcon(AI_ICON_ID)}
      </div>

      {/* Title */}
      <h2 className="text-2xl font-normal text-[#243143] mb-2">
        Describe your dashboard, and we'll build it.
      </h2>

      {/* Subtitle */}
      <p className="text-sm text-[#243143] mb-6 max-w-xl">
        Skip manual setup. Tell us what you want to track, and our AI builds a full dashboard for you.
      </p>

      {/* Input */}
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder='Ask AI to help build your dashboard... e.g. "Generate a dashboard showing vulnerabilities"'
          className="w-full px-4 py-3 pr-12 border border-[#2668C5]/30 rounded-md text-sm text-[#243143] placeholder:text-[#243143]/70 focus:outline-none focus:border-[#2668C5]"
        />
        <button
          onClick={handleSubmit}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-[#2668C5]/10 rounded"
        >
          {uikitRegistry.getIcon(SEND_ICON_ID)}
        </button>
      </div>
    </div>
  );
};

AIPromptSection.displayName = 'AIPromptSection';
