import React, { useState, useEffect, useCallback } from 'react';
import { uikitRegistry } from '@hai3/uicore';
import { AI_ICON_ID } from '../icons/AIIcon';
import { SEND_ICON_ID } from '../icons/SendIcon';
import { dashboardMockMap } from '../../api/dashboard/mocks';

interface WidgetSuggestion {
  id: string;
  label: string;
}

interface WidgetOption {
  id: string;
  icon: 'custom' | 'catalog';
  title: string;
  description: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

type PanelView = 'initial' | 'creating';

type CreationStep = 'analyzing' | 'identifying' | 'generating';

interface AddWidgetPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onWidgetCreate?: (widgetId: string) => void;
  onStepChange?: (step: CreationStep, isCreating: boolean) => void;
}

/**
 * Custom Widget Icon
 */
const CustomWidgetIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3L14.5 8.5L20 9.5L16 14L17 20L12 17L7 20L8 14L4 9.5L9.5 8.5L12 3Z" 
      stroke="#2668C5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
  </svg>
);

/**
 * Catalog Icon
 */
const CatalogIcon: React.FC = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="7" height="9" rx="1" stroke="#2668C5" strokeWidth="2"/>
    <rect x="14" y="3" width="7" height="5" rx="1" stroke="#2668C5" strokeWidth="2"/>
    <rect x="14" y="12" width="7" height="9" rx="1" stroke="#2668C5" strokeWidth="2"/>
    <rect x="3" y="16" width="7" height="5" rx="1" stroke="#2668C5" strokeWidth="2"/>
  </svg>
);

/**
 * AddWidgetPanel - Side panel for adding widgets matching Figma design
 */
export const AddWidgetPanel: React.FC<AddWidgetPanelProps> = ({
  isOpen,
  onClose,
  onWidgetCreate,
  onStepChange,
}) => {
  const [prompt, setPrompt] = useState('');
  const [suggestions, setSuggestions] = useState<WidgetSuggestion[]>([]);
  const [options, setOptions] = useState<WidgetOption[]>([]);
  const [showAllSuggestions, setShowAllSuggestions] = useState(false);
  
  // Creation flow state
  const [view, setView] = useState<PanelView>('initial');
  const [currentStep, setCurrentStep] = useState<CreationStep>('analyzing');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);

  // Load data from API
  useEffect(() => {
    if (isOpen) {
      const data = dashboardMockMap['GET /dashboard/widget-builder']();
      setSuggestions(data.suggestions);
      setOptions(data.options);
      // Reset state when opening
      setView('initial');
      setCurrentStep('analyzing');
      setMessages([]);
      setIsThinking(false);
      setPrompt('');
    }
  }, [isOpen]);

  // Notify parent about step changes - only when creating
  useEffect(() => {
    if (isOpen) {
      onStepChange?.(currentStep, view === 'creating');
    }
  }, [currentStep, view, onStepChange, isOpen]);

  // Simulate creation progress
  useEffect(() => {
    if (view !== 'creating') return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Step 1: Analyzing (already set)
    timers.push(setTimeout(() => setCurrentStep('identifying'), 1500));
    
    // Step 2: Identifying
    timers.push(setTimeout(() => setCurrentStep('generating'), 3000));
    
    // Step 3: Complete
    timers.push(setTimeout(() => {
      setIsThinking(false);
      setMessages(prev => [...prev, {
        id: `assistant-${Date.now()}`,
        role: 'assistant',
        content: `I'll help you create a dashboard empty state similar to Figma's approach with an AI prompt field, suggestions, and a drag-and-drop area. Let me reorganize the imported design to follow that cleaner flow.

I've created a clean dashboard empty state following Figma's approach! The layout now flows naturally with:

1. AI Prompt Area - A focused text input at the top where users describe what they want
2. Suggestion Examples - Quick-start buttons below the prompt for common dashboard types
3. Drag & Drop Zone - A prominent file upload area at the bottom with visual feedback`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      }]);
    }, 4500));

    return () => timers.forEach(clearTimeout);
  }, [view]);

  const handleSubmit = useCallback(() => {
    if (prompt.trim()) {
      // Add user message
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: prompt.trim(),
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([userMessage]);
      setIsThinking(true);
      setView('creating');
      setCurrentStep('analyzing');
    }
  }, [prompt]);

  const handleSuggestionClick = (suggestion: WidgetSuggestion) => {
    setPrompt(suggestion.label);
    // Auto-submit after selecting suggestion
    setTimeout(() => {
      const userMessage: ChatMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: suggestion.label,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([userMessage]);
      setIsThinking(true);
      setView('creating');
      setCurrentStep('analyzing');
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleBack = () => {
    setView('initial');
    setMessages([]);
    setIsThinking(false);
    setPrompt('');
  };

  const handleAddWidget = () => {
    const result = dashboardMockMap['POST /dashboard/widget']({ prompt });
    onWidgetCreate?.(result.widgetId);
  };

  if (!isOpen) return null;

  const visibleSuggestions = showAllSuggestions ? suggestions : suggestions.slice(0, 3);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 z-40"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-[400px] bg-white shadow-xl z-50 flex flex-col border-l border-[#E5E7EB]">
        {/* Header - aligned with app header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] min-h-[64px]">
          <h2 className="text-xl font-medium text-[#243143]">
            {view === 'initial' ? 'Add widget' : 'AI widget'}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-[#F4F7FC] rounded-md transition-colors"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M12 4L4 12M4 4L12 12" stroke="#243143" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {view === 'initial' ? (
            <>
              {/* AI Section */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="mb-3">
                  {uikitRegistry.getIcon(AI_ICON_ID)}
                </div>
                <p className="text-sm text-[#243143]">
                  Describe the widget you need, and we will build it instantly
                </p>
              </div>

              {/* Suggestions */}
              <div className="flex flex-wrap gap-2 mb-4">
                {visibleSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-3 py-1.5 text-xs border border-[#2668C5] text-[#2668C5] rounded-full hover:bg-[#2668C5] hover:text-white transition-all duration-200"
                  >
                    {suggestion.label}
                  </button>
                ))}
                {!showAllSuggestions && suggestions.length > 3 && (
                  <button
                    onClick={() => setShowAllSuggestions(true)}
                    className="px-3 py-1.5 text-xs text-[#2668C5] hover:underline"
                  >
                    Show more
                  </button>
                )}
              </div>

              {/* Input */}
              <div className="relative mb-8">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the widget you want to create"
                  className="w-full px-4 py-3 pr-12 border border-[#E5E7EB] rounded-md text-sm text-[#243143] placeholder:text-[#243143]/50 focus:outline-none focus:border-[#2668C5]"
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 hover:bg-[#2668C5]/10 rounded"
                >
                  {uikitRegistry.getIcon(SEND_ICON_ID)}
                </button>
              </div>

              {/* Other Options */}
              <div>
                <h3 className="text-sm font-medium text-[#243143] mb-4">Other options</h3>
                <div className="flex flex-col gap-3">
                  {options.map((option) => (
                    <button
                      key={option.id}
                      className="flex items-start gap-4 p-4 border border-[#E5E7EB] rounded-md hover:border-[#2668C5] hover:shadow-md hover:bg-[#F4F7FC]/30 transition-all duration-200 text-left"
                    >
                      <div className="flex items-center justify-center w-10 h-10 bg-[#ECF3FD] rounded-md shrink-0">
                        {option.icon === 'custom' ? <CustomWidgetIcon /> : <CatalogIcon />}
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-[#243143]">{option.title}</h4>
                        <p className="text-xs text-[#243143]/70 mt-0.5">{option.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col h-full">
              {/* Chat Messages - scrollable area */}
              <div className="flex-1 flex flex-col gap-4 overflow-y-auto">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                    <div className="text-xs text-[#243143]/50 mb-1">
                      {msg.role === 'user' ? 'You' : 'AI'} {msg.timestamp}
                    </div>
                    <div className={`
                      max-w-[85%] px-4 py-2 rounded-lg text-sm
                      ${msg.role === 'user' ? 'bg-[#00204D] text-white' : 'bg-[#F4F7FC] text-[#243143]'}
                    `}>
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isThinking && (
                  <div className="flex items-center gap-2 text-sm text-[#2668C5]">
                    {uikitRegistry.getIcon(AI_ICON_ID)}
                    <span>Thinking...</span>
                  </div>
                )}

                {/* Version Card - shown after generation complete */}
                {!isThinking && messages.some(m => m.role === 'assistant') && (
                  <div className="mt-4">
                    <div className="bg-[#00204D] text-white rounded-lg p-3 flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium">Generating standard and organised dashboard</div>
                        <div className="text-xs text-white/70">Version 1</div>
                      </div>
                      <button className="p-1 hover:bg-white/10 rounded">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.5 8.5L12 10M12 10L10.5 8.5M12 10V6C12 4.89543 11.1046 4 10 4H6M2.5 7.5L4 6M4 6L5.5 7.5M4 6V10C4 11.1046 4.89543 12 6 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>

                    {/* Action Icons */}
                    <div className="flex items-center gap-2 mt-3">
                      <button className="p-2 hover:bg-[#F4F7FC] rounded transition-colors" title="Regenerate">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M13.5 8.5L12 10M12 10L10.5 8.5M12 10V6C12 4.89543 11.1046 4 10 4H6M2.5 7.5L4 6M4 6L5.5 7.5M4 6V10C4 11.1046 4.89543 12 6 12H10" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#F4F7FC] rounded transition-colors" title="Pin">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M9.5 6.5L6.5 9.5M10 3L13 6L9.5 9.5L6.5 9.5L6.5 6.5L10 3Z" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          <path d="M6.5 9.5L3 13" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#F4F7FC] rounded transition-colors" title="Bookmark">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 3H12V13L8 10L4 13V3Z" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#F4F7FC] rounded transition-colors" title="Download">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M8 3V10M8 10L5 7M8 10L11 7M3 13H13" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#F4F7FC] rounded transition-colors" title="Like">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M4 7V13H2V7H4ZM6 13C5.44772 13 5 12.5523 5 12V7.5L8.5 2H9.5C10.0523 2 10.5 2.44772 10.5 3V6H13C13.5523 6 14 6.44772 14 7V8L12 13H6Z" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                      <button className="p-2 hover:bg-[#F4F7FC] rounded transition-colors" title="Dislike">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                          <path d="M12 9V3H14V9H12ZM10 3C10.5523 3 11 3.44772 11 4V8.5L7.5 14H6.5C5.94772 14 5.5 13.5523 5.5 13V10H3C2.44772 10 2 9.55228 2 9V8L4 3H10Z" stroke="#2668C5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Input at bottom */}
              <div className="relative mt-4 pt-4 border-t border-[#E5E7EB]">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Describe the widget you want to create"
                  className="w-full px-4 py-3 pr-12 border border-[#E5E7EB] rounded-md text-sm text-[#243143] placeholder:text-[#243143]/50 focus:outline-none focus:border-[#2668C5]"
                />
                <button
                  onClick={handleSubmit}
                  className="absolute right-2 top-1/2 translate-y-[-25%] p-2 hover:bg-[#2668C5]/10 rounded"
                >
                  {uikitRegistry.getIcon(SEND_ICON_ID)}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer - only in creating view */}
        {view === 'creating' && (
          <div className="flex items-center justify-between p-4 border-t border-[#E5E7EB]">
            <button
              onClick={handleBack}
              className="text-sm text-[#2668C5] hover:underline"
            >
              Back
            </button>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-[#E5E7EB] rounded-md hover:bg-[#F4F7FC] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWidget}
                disabled={isThinking}
                className="px-4 py-2 text-sm bg-[#2668C5] text-white rounded-md hover:bg-[#1E5BB0] transition-colors disabled:opacity-50"
              >
                Add widget
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

AddWidgetPanel.displayName = 'AddWidgetPanel';
