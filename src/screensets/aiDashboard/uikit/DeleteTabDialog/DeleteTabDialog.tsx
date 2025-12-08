/**
 * DeleteTabDialog
 * Confirmation dialog for deleting a dashboard tab
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
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
import { selectAiDashboardState } from '../../slices/aiDashboardSlice';
import { deleteTab, closeDeleteDialog } from '../../actions/aiDashboardActions';

export const DeleteTabDialog: React.FC = () => {
  const { tabs, deleteDialogTabId } = useAppSelector(selectAiDashboardState);

  const tabToDelete = tabs.find((t: { id: string; name: string }) => t.id === deleteDialogTabId);
  const isOpen = deleteDialogTabId !== null;

  const handleClose = () => {
    closeDeleteDialog();
  };

  const handleDelete = () => {
    if (deleteDialogTabId) {
      deleteTab(deleteDialogTabId);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete tab "{tabToDelete?.name || 'Untitled'}"</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the tab
            and all its content, including widgets, charts, and any custom
            configurations.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant={ButtonVariant.Outline} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={ButtonVariant.Destructive} onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

DeleteTabDialog.displayName = 'DeleteTabDialog';

export default DeleteTabDialog;
