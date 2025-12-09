/**
 * WidgetEditButton
 * Pencil icon that appears on widget hover to open settings sidebar
 */

import React from 'react';
import { Button } from '@hai3/uikit';
import { ButtonVariant } from '@hai3/uikit-contracts';
import { Pencil } from 'lucide-react';

interface WidgetEditButtonProps {
  onClick: () => void;
  className?: string;
}

export const WidgetEditButton: React.FC<WidgetEditButtonProps> = ({
  onClick,
  className = '',
}) => {
  return (
    <Button
      variant={ButtonVariant.Ghost}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className={`opacity-0 transition-opacity group-hover:opacity-100 ${className}`}
    >
      <Pencil className="h-4 w-4" />
    </Button>
  );
};

WidgetEditButton.displayName = 'WidgetEditButton';

export default WidgetEditButton;
