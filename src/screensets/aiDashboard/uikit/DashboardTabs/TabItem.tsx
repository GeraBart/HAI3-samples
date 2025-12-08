/**
 * TabItem
 * Single tab component with active state indicator
 */

import React from 'react';
import type { DashboardTab } from '../../types';
import { TabInput } from './TabInput';
import { TabSettingsDropdown } from './TabSettingsDropdown';

interface TabItemProps {
  tab: DashboardTab;
  isActive: boolean;
  isEditing: boolean;
  isFirst: boolean;
  isLast: boolean;
  canDelete: boolean;
  onSelect: () => void;
  onRename: (name: string) => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onClone: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDelete: () => void;
}

export const TabItem: React.FC<TabItemProps> = ({
  tab,
  isActive,
  isEditing,
  isFirst,
  isLast,
  canDelete,
  onSelect,
  onRename,
  onStartEdit,
  onCancelEdit,
  onClone,
  onMoveLeft,
  onMoveRight,
  onDelete,
}) => {
  return (
    <div className="flex flex-col items-start">
      <div
        className="flex cursor-pointer items-center gap-2 pb-0 pt-5"
        onClick={isEditing ? undefined : onSelect}
      >
        {isEditing ? (
          <TabInput
            initialValue={tab.name}
            onSubmit={onRename}
            onCancel={onCancelEdit}
            placeholder="Tab name"
          />
        ) : (
          <>
            <span
              className={`text-sm font-semibold uppercase tracking-wide ${
                isActive ? 'text-foreground' : 'text-muted-foreground'
              }`}
            >
              {tab.name || 'Untitled'}
            </span>
            {isActive && (
              <TabSettingsDropdown
                tabId={tab.id}
                isFirst={isFirst}
                isLast={isLast}
                onRename={onStartEdit}
                onClone={onClone}
                onMoveLeft={onMoveLeft}
                onMoveRight={onMoveRight}
                onDelete={canDelete ? onDelete : () => {}}
              />
            )}
          </>
        )}
      </div>
      <div className="mt-4 flex w-full flex-col items-start">
        <div
          className={`h-[3px] w-full rounded ${
            isActive ? 'bg-primary' : 'bg-transparent'
          }`}
        />
      </div>
    </div>
  );
};

TabItem.displayName = 'TabItem';

export default TabItem;
