/**
 * AddTabButton
 * "+" button to create new dashboard tab
 */

import React from 'react';
import { Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { Plus } from 'lucide-react';

interface AddTabButtonProps {
  onClick: () => void;
}

export const AddTabButton: React.FC<AddTabButtonProps> = ({ onClick }) => {
  return (
    <Button
      variant={ButtonVariant.Ghost}
      size={ButtonSize.Icon}
      onClick={onClick}
      className="h-6 w-6"
    >
      <Plus className="h-4 w-4 text-primary" />
    </Button>
  );
};

AddTabButton.displayName = 'AddTabButton';

export default AddTabButton;
