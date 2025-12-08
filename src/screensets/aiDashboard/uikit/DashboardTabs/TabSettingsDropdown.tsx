/**
 * TabSettingsDropdown
 * Dropdown menu with tab actions (rename, clone, move, delete)
 */

import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@hai3/uikit';
import { Button } from '@hai3/uikit';
import { ButtonVariant, ButtonSize } from '@hai3/uikit-contracts';
import { MoreHorizontal, Pencil, Copy, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';

interface TabSettingsDropdownProps {
  tabId: string;
  isFirst: boolean;
  isLast: boolean;
  onRename: () => void;
  onClone: () => void;
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onDelete: () => void;
}

export const TabSettingsDropdown: React.FC<TabSettingsDropdownProps> = ({
  isFirst,
  isLast,
  onRename,
  onClone,
  onMoveLeft,
  onMoveRight,
  onDelete,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={ButtonVariant.Ghost}
          size={ButtonSize.Icon}
          className="h-6 w-6 rounded bg-primary/10"
        >
          <MoreHorizontal className="h-4 w-4 text-primary" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-36">
        <DropdownMenuItem onClick={onRename} className="gap-4">
          <Pencil className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">Rename</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onClone} className="gap-4">
          <Copy className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">Clone</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onClick={onMoveLeft}
          disabled={isFirst}
          className="gap-4"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">Move left</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={onMoveRight}
          disabled={isLast}
          className="gap-4"
        >
          <ArrowRight className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">Move right</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={onDelete} className="gap-4">
          <Trash2 className="h-4 w-4 text-primary" />
          <span className="font-semibold text-primary">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

TabSettingsDropdown.displayName = 'TabSettingsDropdown';

export default TabSettingsDropdown;
