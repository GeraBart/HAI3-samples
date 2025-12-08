/**
 * GenerationStep
 * Single step component with icon, title, and description
 */

import React from 'react';
import { useTranslation, TextLoader } from '@hai3/uicore';
import type { GenerationStep as GenerationStepType } from '../../../../types';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../../../ids';
import { StepIcon } from './StepIcon';

interface GenerationStepProps {
  step: GenerationStepType;
}

export const GenerationStep: React.FC<GenerationStepProps> = ({ step }) => {
  const { t } = useTranslation();
  const { titleKey, descriptionKey, status } = step;

  const isActive = status === 'active';
  const isCompleted = status === 'completed';
  const isPending = status === 'pending';

  return (
    <div
      className={`flex items-start gap-4 rounded-lg border p-4 transition-all ${
        isActive
          ? 'border-primary bg-white shadow-lg'
          : isCompleted
          ? 'border-primary bg-white'
          : 'border-primary/30 bg-transparent'
      }`}
    >
      <div className="pt-1">
        <StepIcon status={status} />
      </div>
      <div className="flex flex-col gap-1">
        <h3
          className={`text-sm font-semibold ${
            isPending ? 'text-muted-foreground/70' : 'text-foreground'
          }`}
        >
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:${titleKey}`)}
          </TextLoader>
        </h3>
        <p className="text-sm text-muted-foreground">
          <TextLoader>
            {t(`screen.${AI_DASHBOARD_SCREENSET_ID}.${HOME_SCREEN_ID}:${descriptionKey}`)}
          </TextLoader>
        </p>
      </div>
    </div>
  );
};

GenerationStep.displayName = 'GenerationStep';

export default GenerationStep;
