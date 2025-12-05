/**
 * Sidebar Sections Component
 * Custom sidebar navigation with MONITORING parent and child sections
 * Based on Figma design with 3-dot menus for parent and child items
 */

import React, { useState } from 'react';
import { useTranslation } from '@hai3/uicore';
import {
  Button,
  ButtonVariant,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  Input,
} from '@hai3/uikit';
import {
  MoreHorizontal,
  Plus,
  Pencil,
  ArrowUp,
  ArrowDown,
  Trash2,
  Activity,
} from 'lucide-react';
import { NEW_TEST_SCREENSET_ID, OVERVIEW_SCREEN_ID } from '../../../ids';

/**
 * Translation key helper
 */
const tk = (key: string) => `screen.${NEW_TEST_SCREENSET_ID}.${OVERVIEW_SCREEN_ID}:${key}`;

/**
 * Section item interface
 */
export interface SectionItem {
  id: string;
  name: string;
}

/**
 * Props for SidebarSections component
 */
interface SidebarSectionsProps {
  sections: SectionItem[];
  activeSectionId: string;
  onSectionClick: (sectionId: string) => void;
  onAddSection: (name: string) => void;
  onRenameSection: (sectionId: string, newName: string) => void;
  onDeleteSection: (sectionId: string) => void;
  onMoveSection: (sectionId: string, direction: 'up' | 'down') => void;
}

/**
 * Sidebar Sections Component
 */
export const SidebarSections: React.FC<SidebarSectionsProps> = ({
  sections,
  activeSectionId,
  onSectionClick,
  onAddSection,
  onRenameSection,
  onDeleteSection,
  onMoveSection,
}) => {
  const { t } = useTranslation();
  
  // State for parent menu dropdown (MONITORING 3-dot)
  const [isParentMenuOpen, setIsParentMenuOpen] = useState(false);
  
  // State for child menu dropdown
  const [openChildMenuId, setOpenChildMenuId] = useState<string | null>(null);
  
  // State for add section dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newSectionName, setNewSectionName] = useState('');
  
  // State for rename dialog
  const [renamingSectionId, setRenamingSectionId] = useState<string | null>(null);
  const [renamingSectionName, setRenamingSectionName] = useState('');

  // Handle add section
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      onAddSection(newSectionName.trim());
      setNewSectionName('');
      setIsAddDialogOpen(false);
    }
  };

  // Handle rename section
  const handleRenameSection = () => {
    if (renamingSectionId && renamingSectionName.trim()) {
      onRenameSection(renamingSectionId, renamingSectionName.trim());
      setRenamingSectionId(null);
      setRenamingSectionName('');
    }
  };

  // Start renaming
  const handleStartRename = (sectionId: string, currentName: string) => {
    setRenamingSectionId(sectionId);
    setRenamingSectionName(currentName);
    setOpenChildMenuId(null);
  };

  // Handle delete
  const handleDelete = (sectionId: string) => {
    onDeleteSection(sectionId);
    setOpenChildMenuId(null);
  };

  // Handle move
  const handleMove = (sectionId: string, direction: 'up' | 'down') => {
    onMoveSection(sectionId, direction);
    setOpenChildMenuId(null);
  };

  return (
    <div data-custom-sidebar className="flex w-64 flex-col bg-[hsl(222,47%,11%)] text-white min-h-full">
      {/* MONITORING Parent Section */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex items-center gap-3">
          <Activity className="h-5 w-5 text-white" />
          <span className="text-sm font-semibold uppercase tracking-wide text-white">
            {t(tk('sidebar.monitoring'))}
          </span>
        </div>
        
        {/* Parent 3-dot menu */}
        <div className="relative">
          <button
            onClick={() => setIsParentMenuOpen(!isParentMenuOpen)}
            className="rounded p-1 text-white/70 hover:text-white"
          >
            <MoreHorizontal className="h-5 w-5" />
          </button>
          
          {isParentMenuOpen && (
            <>
              <div 
                className="fixed inset-0 z-40" 
                onClick={() => setIsParentMenuOpen(false)} 
              />
              <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                <button
                  onClick={() => {
                    setIsAddDialogOpen(true);
                    setIsParentMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4 text-primary" />
                  <span>{t(tk('sidebar.add_new_section'))}</span>
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Child Sections (tabs) */}
      <div className="flex-1 overflow-visible">
        {sections.map((section, index) => (
          <div
            key={section.id}
            className={`group flex items-center justify-between pl-6 pr-4 py-2.5 cursor-pointer ${
              activeSectionId === section.id
                ? 'bg-primary text-white'
                : 'text-white hover:bg-white/10'
            }`}
            onClick={() => onSectionClick(section.id)}
          >
            <span className="text-sm">{section.name}</span>
            
            {/* Child 3-dot menu */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenChildMenuId(openChildMenuId === section.id ? null : section.id);
                }}
                className={`rounded p-1 transition-opacity ${
                  openChildMenuId === section.id
                    ? 'opacity-100'
                    : 'opacity-0 group-hover:opacity-100'
                } text-white hover:bg-white/20`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </button>
              
              {openChildMenuId === section.id && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={(e) => {
                      e.stopPropagation();
                      setOpenChildMenuId(null);
                    }} 
                  />
                  <div className="absolute right-0 top-full z-50 mt-1 min-w-[200px] rounded-lg border border-gray-200 bg-white py-2 shadow-xl">
                    {/* Rename */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartRename(section.id, section.name);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-gray-900 hover:bg-gray-100"
                    >
                      <Pencil className="h-4 w-4 text-primary" />
                      <span>{t(tk('sidebar.rename'))}</span>
                    </button>
                    
                    {/* Move up */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(section.id, 'up');
                      }}
                      disabled={index === 0}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm ${
                        index === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <ArrowUp className="h-4 w-4 text-primary" />
                      <span>{t(tk('sidebar.move_up'))}</span>
                    </button>
                    
                    {/* Move down */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleMove(section.id, 'down');
                      }}
                      disabled={index === sections.length - 1}
                      className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm ${
                        index === sections.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <ArrowDown className="h-4 w-4 text-primary" />
                      <span>{t(tk('sidebar.move_down'))}</span>
                    </button>
                    
                    {/* Delete */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(section.id);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span>{t(tk('sidebar.delete'))}</span>
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Section Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>{t(tk('sidebar.add_section_dialog.title'))}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={t(tk('sidebar.add_section_dialog.placeholder'))}
              className="w-full"
              value={newSectionName}
              onChange={(e) => setNewSectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddSection();
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={ButtonVariant.Outline}>
                {t(tk('sidebar.add_section_dialog.cancel'))}
              </Button>
            </DialogClose>
            <Button variant={ButtonVariant.Default} onClick={handleAddSection}>
              {t(tk('sidebar.add_section_dialog.add'))}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Section Dialog */}
      <Dialog open={!!renamingSectionId} onOpenChange={(open) => !open && setRenamingSectionId(null)}>
        <DialogContent className="sm:max-w-[512px]">
          <DialogHeader>
            <DialogTitle>{t(tk('sidebar.rename_dialog.title'))}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder={t(tk('sidebar.rename_dialog.placeholder'))}
              className="w-full"
              value={renamingSectionName}
              onChange={(e) => setRenamingSectionName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleRenameSection();
              }}
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={ButtonVariant.Outline}>
                {t(tk('sidebar.rename_dialog.cancel'))}
              </Button>
            </DialogClose>
            <Button variant={ButtonVariant.Default} onClick={handleRenameSection}>
              {t(tk('sidebar.rename_dialog.save'))}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
