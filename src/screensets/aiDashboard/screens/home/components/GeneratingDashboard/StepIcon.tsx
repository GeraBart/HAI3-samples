/**
 * StepIcon
 * Icon component for generation steps (checkmark/spinner/circle)
 */

import React from 'react';
import { Check, Loader2, Circle } from 'lucide-react';
import type { GenerationStepStatus } from '../../../../types';

interface StepIconProps {
  status: GenerationStepStatus;
}

export const StepIcon: React.FC<StepIconProps> = ({ status }) => {
  switch (status) {
    case 'completed':
      return (
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
          <Check className="h-4 w-4 text-primary" />
        </div>
      );
    case 'active':
      return (
        <div className="flex h-6 w-6 items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
        </div>
      );
    default:
      return (
        <div className="flex h-6 w-6 items-center justify-center">
          <Circle className="h-5 w-5 text-muted-foreground/30" />
        </div>
      );
  }
};

StepIcon.displayName = 'StepIcon';

export default StepIcon;
