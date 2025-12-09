/**
 * DashboardTabs Container
 * Business logic layer connecting Redux state to presentational component
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../slices/aiDashboardSlice';
import {
  addNewTab,
  selectTab,
  renameTab,
  cloneTab,
  moveTabLeft,
  moveTabRight,
  startEditingTab,
  cancelEditingTab,
  openDeleteDialog,
} from '../actions/aiDashboardActions';
import { DashboardTabsView } from '../uikit/DashboardTabs/DashboardTabs';

/**
 * DashboardTabs - Container component with business logic
 * Connects to Redux store and dispatches actions
 */
export const DashboardTabs: React.FC = () => {
  const { tabs, activeTabId, editingTabId } = useAppSelector(selectAiDashboardState);

  return (
    <DashboardTabsView
      tabs={tabs}
      activeTabId={activeTabId}
      editingTabId={editingTabId}
      onAddTab={addNewTab}
      onSelectTab={selectTab}
      onRenameTab={renameTab}
      onStartEdit={startEditingTab}
      onCancelEdit={cancelEditingTab}
      onCloneTab={cloneTab}
      onMoveLeft={moveTabLeft}
      onMoveRight={moveTabRight}
      onDeleteTab={openDeleteDialog}
    />
  );
};

DashboardTabs.displayName = 'DashboardTabs';

export default DashboardTabs;
