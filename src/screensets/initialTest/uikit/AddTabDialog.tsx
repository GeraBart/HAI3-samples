/**
 * AddTabDialog - screenset-specific dialog for adding a dashboard tab
 * Presentational component: state for open/close lives in parent; owns only local input value.
 */

import React from 'react';
import {
  Button,
  ButtonSize,
  ButtonVariant,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  Input,
} from '@hai3/uikit';

export interface AddTabDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (name: string) => void;
  title: string;
  description: string;
  nameLabel: string;
  namePlaceholder: string;
  addLabel: string;
  cancelLabel: string;
}

export const AddTabDialog: React.FC<AddTabDialogProps> = ({
  isOpen,
  onOpenChange,
  onConfirm,
  title,
  description,
  nameLabel,
  namePlaceholder,
  addLabel,
  cancelLabel,
}) => {
  const [name, setName] = React.useState('');

  React.useEffect(() => {
    if (!isOpen) {
      setName('');
    }
  }, [isOpen]);

  const handleAdd = (): void => {
    const trimmed = name.trim();
    onConfirm(trimmed);
    onOpenChange(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleAdd();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 py-2">
          <label htmlFor="add-tab-name" className="text-sm font-medium text-left">
            {nameLabel}
          </label>
          <Input
            id="add-tab-name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={namePlaceholder}
          />
        </div>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button
              variant={ButtonVariant.Outline}
              size={ButtonSize.Sm}
            >
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            size={ButtonSize.Sm}
            onClick={handleAdd}
            disabled={!name.trim()}
          >
            {addLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

AddTabDialog.displayName = 'AddTabDialog';
