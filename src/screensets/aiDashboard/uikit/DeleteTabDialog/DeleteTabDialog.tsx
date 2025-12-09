/**
 * DeleteTabDialogView
 * Pure presentational confirmation dialog for deleting a dashboard tab
 * UIKit pattern: value/onChange, no hooks, no side effects
 */

import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@hai3/uikit';
import { Button } from '@hai3/uikit';
import { ButtonVariant } from '@hai3/uikit-contracts';

export interface DeleteTabDialogViewProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Name of the tab being deleted */
  tabName: string;
  /** Title text */
  title?: string;
  /** Description text */
  description?: string;
  /** Cancel button text */
  cancelText?: string;
  /** Delete button text */
  deleteText?: string;
  /** Called when dialog should close */
  onClose: () => void;
  /** Called when delete is confirmed */
  onDelete: () => void;
}

/**
 * DeleteTabDialogView - Presentational delete confirmation dialog
 * Receives all data and callbacks as props
 */
export const DeleteTabDialogView: React.FC<DeleteTabDialogViewProps> = ({
  isOpen,
  tabName,
  title,
  description,
  cancelText = 'Cancel',
  deleteText = 'Delete',
  onClose,
  onDelete,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title || `Delete tab "${tabName}"`}</DialogTitle>
          <DialogDescription>
            {description || 'This action cannot be undone. This will permanently delete the tab and all its content, including widgets, charts, and any custom configurations.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant={ButtonVariant.Outline} onClick={onClose}>
            {cancelText}
          </Button>
          <Button variant={ButtonVariant.Destructive} onClick={onDelete}>
            {deleteText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

DeleteTabDialogView.displayName = 'DeleteTabDialogView';

export default DeleteTabDialogView;
