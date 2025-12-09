/**
 * DashboardTabsView
 * Pure presentational component for dashboard tabs
 * UIKit pattern: value/onChange, no hooks, no side effects
 */

import React from 'react';
import type { DashboardTab } from '../../types';
import { TabItem } from './TabItem';
import { AddTabButton } from './AddTabButton';

export interface DashboardTabsViewProps {
  /** Array of tabs */
  tabs: DashboardTab[];
  /** Currently active tab ID */
  activeTabId: string | null;
  /** Tab currently being edited */
  editingTabId: string | null;
  /** Called when add tab button clicked */
  onAddTab: () => void;
  /** Called when a tab is selected */
  onSelectTab: (tabId: string) => void;
  /** Called when a tab is renamed */
  onRenameTab: (tabId: string, name: string) => void;
  /** Called when edit mode starts */
  onStartEdit: (tabId: string) => void;
  /** Called when edit mode is cancelled */
  onCancelEdit: () => void;
  /** Called when a tab is cloned */
  onCloneTab: (tabId: string) => void;
  /** Called when a tab is moved left */
  onMoveLeft: (tabId: string) => void;
  /** Called when a tab is moved right */
  onMoveRight: (tabId: string) => void;
  /** Called when a tab is deleted */
  onDeleteTab: (tabId: string) => void;
}

/**
 * DashboardTabsView - Presentational tabs component
 * Receives all data and callbacks as props
 */
export const DashboardTabsView: React.FC<DashboardTabsViewProps> = ({
  tabs,
  activeTabId,
  editingTabId,
  onAddTab,
  onSelectTab,
  onRenameTab,
  onStartEdit,
  onCancelEdit,
  onCloneTab,
  onMoveLeft,
  onMoveRight,
  onDeleteTab,
}) => {
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
          onSelect={() => onSelectTab(tab.id)}
          onRename={(name) => onRenameTab(tab.id, name)}
          onStartEdit={() => onStartEdit(tab.id)}
          onCancelEdit={onCancelEdit}
          onClone={() => onCloneTab(tab.id)}
          onMoveLeft={() => onMoveLeft(tab.id)}
          onMoveRight={() => onMoveRight(tab.id)}
          onDelete={() => onDeleteTab(tab.id)}
        />
      ))}
      <div className="flex items-center pt-2">
        <AddTabButton onClick={onAddTab} />
      </div>
    </div>
  );
};

DashboardTabsView.displayName = 'DashboardTabsView';

export default DashboardTabsView;
