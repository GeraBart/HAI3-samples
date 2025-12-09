/**
 * DeleteTabDialog Container
 * Business logic layer connecting Redux state to presentational component
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../slices/aiDashboardSlice';
import { deleteTab, closeDeleteDialog } from '../actions/aiDashboardActions';
import { DeleteTabDialogView } from '../uikit/DeleteTabDialog/DeleteTabDialog';

/**
 * DeleteTabDialog - Container component with business logic
 * Connects to Redux store and dispatches actions
 */
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
    <DeleteTabDialogView
      isOpen={isOpen}
      tabName={tabToDelete?.name || 'Untitled'}
      onClose={handleClose}
      onDelete={handleDelete}
    />
  );
};

DeleteTabDialog.displayName = 'DeleteTabDialog';

export default DeleteTabDialog;
