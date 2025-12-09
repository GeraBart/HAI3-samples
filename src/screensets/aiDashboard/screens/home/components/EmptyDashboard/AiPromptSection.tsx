/**
 * AiPromptSection
 * AI icon, heading, description, and textarea for dashboard generation
 */

import React, { useState } from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import { Textarea, Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { Send } from 'lucide-react';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import { AiSparkleIcon } from '../../../../uikit/icons/AiSparkleIcon';
import { startAiGeneration } from '../../../../actions/aiDashboardActions';

export const AiPromptSection: React.FC = () => {
  const { t } = useTranslation();
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      startAiGeneration(prompt.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="flex w-full max-w-[912px] flex-col items-center gap-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
        <AiSparkleIcon size={32} />
      </div>

      <div className="text-center">
        <h1 className="mb-2 text-2xl font-normal text-foreground">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:ai_heading`)}
          </TextLoader>
        </h1>
        <p className="text-sm text-foreground">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:ai_description`)}
          </TextLoader>
        </p>
      </div>

      <div className="relative w-full">
        <Textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:ai_placeholder`)}
          className="min-h-[48px] resize-none pr-12"
          rows={1}
        />
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          onClick={handleSubmit}
          disabled={!prompt.trim()}
          className="absolute right-2 top-2 h-8 w-8"
        >
          <Send className="h-4 w-4 text-primary" />
        </Button>
      </div>
    </div>
  );
};

AiPromptSection.displayName = 'AiPromptSection';

export default AiPromptSection;
