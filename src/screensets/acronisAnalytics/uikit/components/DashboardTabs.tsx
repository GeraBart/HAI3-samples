/**
 * Dashboard Tabs Component
 * Implements Figma design specifications for tab navigation
 * 
 * Design specs from Figma:
 * - Background: #f5f7fb (inactive)
 * - Text: #243143, 14px, Semi Bold, 24px line-height, 0.3px letter-spacing
 * - Active state: white background
 * - Border radius: 4px (top corners)
 * - Dropdown: white bg, blue border (#2668c5), shadow
 */

import React from 'react';
import { MoreHorizontal, Edit3, Copy, ArrowLeft, ArrowRight, Trash2 } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from '@hai3/uikit';

export interface Tab {
  id: string;
  name: string;
}

export interface DashboardTabsProps {
  tabs: Tab[];
  activeTabId: string;
  onTabSelect: (id: string) => void;
  onTabRename?: (id: string) => void;
  onTabClone?: (id: string) => void;
  onTabMoveLeft?: (id: string) => void;
  onTabMoveRight?: (id: string) => void;
  onTabDelete?: (id: string) => void;
  className?: string;
}

/**
 * DashboardTabs Component
 * Horizontal tab navigation matching Figma design system
 */
export const DashboardTabs: React.FC<DashboardTabsProps> = ({
  tabs,
  activeTabId,
  onTabSelect,
  onTabRename,
  onTabClone,
  onTabMoveLeft,
  onTabMoveRight,
  onTabDelete,
  className = '',
}) => {
  return (
    <div className={`flex items-end gap-0 ${className}`}>
      {tabs.map((tab, index) => {
        const isActive = tab.id === activeTabId;
        const isFirst = index === 0;
        const isLast = index === tabs.length - 1;
        
        return (
          <div key={tab.id} className="relative flex items-end">
            <button
              onClick={() => onTabSelect(tab.id)}
              className={`
                group relative flex items-center gap-2 px-4 h-8
                rounded-t transition-colors
                ${isActive 
                  ? 'bg-background' 
                  : 'bg-muted hover:bg-muted/80'
                }
                rounded-t
              `}
            >
              <span
                className={`
                  text-sm font-semibold whitespace-nowrap leading-6 tracking-wide font-inter
                  ${isActive 
                    ? 'text-foreground' 
                    : 'text-foreground/70'
                  }
                `}
              >
                {tab.name}
              </span>
              
              {isActive && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-0.5 hover:bg-muted rounded"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4 text-primary" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    className="w-[135px] bg-background border-primary shadow-lg"
                  >
                    {onTabRename && (
                      <DropdownMenuItem
                        onClick={() => onTabRename(tab.id)}
                        className="gap-4 px-4 py-2"
                      >
                        <Edit3 className="h-4 w-4 text-primary" />
                        <span className="text-primary font-semibold text-sm leading-6">
                          Rename
                        </span>
                      </DropdownMenuItem>
                    )}
                    
                    {onTabClone && (
                      <DropdownMenuItem
                        onClick={() => onTabClone(tab.id)}
                        className="gap-4 px-4 py-2"
                      >
                        <Copy className="h-4 w-4 text-primary" />
                        <span className="text-primary font-semibold text-sm leading-6">
                          Clone
                        </span>
                      </DropdownMenuItem>
                    )}
                    
                    <DropdownMenuSeparator className="bg-primary/10" />
                    
                    {onTabMoveLeft && (
                      <DropdownMenuItem
                        onClick={() => onTabMoveLeft(tab.id)}
                        disabled={isFirst}
                        className="gap-4 px-4 py-2"
                      >
                        <ArrowLeft className="h-4 w-4 text-primary" />
                        <span className="text-primary font-semibold text-sm leading-6">
                          Move left
                        </span>
                      </DropdownMenuItem>
                    )}
                    
                    {onTabMoveRight && (
                      <DropdownMenuItem
                        onClick={() => onTabMoveRight(tab.id)}
                        disabled={isLast}
                        className="gap-4 px-4 py-2"
                      >
                        <ArrowRight className="h-4 w-4 text-primary" />
                        <span className="text-primary font-semibold text-sm leading-6">
                          Move right
                        </span>
                      </DropdownMenuItem>
                    )}
                    
                    {onTabDelete && tabs.length > 1 && (
                      <DropdownMenuItem
                        onClick={() => onTabDelete(tab.id)}
                        className="gap-4 px-4 py-2"
                      >
                        <Trash2 className="h-4 w-4 text-primary" />
                        <span className="text-primary font-semibold text-sm leading-6">
                          Delete
                        </span>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

DashboardTabs.displayName = 'DashboardTabs';
