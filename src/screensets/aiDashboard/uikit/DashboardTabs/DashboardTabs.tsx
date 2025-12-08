/**
 * DashboardTabs
 * Container component orchestrating all tab components
 */

import React from 'react';
import { useAppSelector } from '@hai3/uicore';
import { selectAiDashboardState } from '../../slices/aiDashboardSlice';
import type { DashboardTab } from '../../types';
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
} from '../../actions/aiDashboardActions';
import { TabItem } from './TabItem';
import { AddTabButton } from './AddTabButton';

export const DashboardTabs: React.FC = () => {
  const { tabs, activeTabId, editingTabId } = useAppSelector(selectAiDashboardState);

  const handleAddTab = () => {
    addNewTab();
  };

  const handleSelectTab = (tabId: string) => {
    selectTab(tabId);
  };

  const handleRenameTab = (tabId: string, name: string) => {
    renameTab(tabId, name);
  };

  const handleStartEdit = (tabId: string) => {
    startEditingTab(tabId);
  };

  const handleCancelEdit = () => {
    cancelEditingTab();
  };

  const handleCloneTab = (tabId: string) => {
    cloneTab(tabId);
  };

  const handleMoveLeft = (tabId: string) => {
    moveTabLeft(tabId);
  };

  const handleMoveRight = (tabId: string) => {
    moveTabRight(tabId);
  };

  const handleDeleteTab = (tabId: string) => {
    openDeleteDialog(tabId);
  };

  return (
    <div className="flex items-center gap-6 border-b px-6">
      {tabs.map((tab: DashboardTab, index: number) => (
        <TabItem
          key={tab.id}
          tab={tab}
          isActive={tab.id === activeTabId}
          isEditing={tab.id === editingTabId}
          isFirst={index === 0}
          isLast={index === tabs.length - 1}
          canDelete={tabs.length > 1}
          onSelect={() => handleSelectTab(tab.id)}
          onRename={(name) => handleRenameTab(tab.id, name)}
          onStartEdit={() => handleStartEdit(tab.id)}
          onCancelEdit={handleCancelEdit}
          onClone={() => handleCloneTab(tab.id)}
          onMoveLeft={() => handleMoveLeft(tab.id)}
          onMoveRight={() => handleMoveRight(tab.id)}
          onDelete={() => handleDeleteTab(tab.id)}
        />
      ))}
      <div className="flex items-center pt-2">
        <AddTabButton onClick={handleAddTab} />
      </div>
    </div>
  );
};

DashboardTabs.displayName = 'DashboardTabs';

export default DashboardTabs;
