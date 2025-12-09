/**
 * Home Screen
 * Main screen for the acronisAnalytics screenset
 */

import React, { useState } from 'react';
import {
  useTranslation,
  TextLoader,
  useScreenTranslations,
  I18nRegistry,
  Language,
  useAppSelector,
} from '@hai3/uicore';
import {
  Input,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@hai3/uikit';
import { Plus, X } from 'lucide-react';
import { ACRONIS_ANALYTICS_SCREENSET_ID, HOME_SCREEN_ID } from '../../ids';
import { selectAcronisAnalyticsState, type DashboardTab } from '../../slices/acronisAnalyticsSlice';
import {
  createDashboard,
  selectDashboard,
  renameDashboard,
  cloneDashboard,
  moveDashboardLeft,
  moveDashboardRight,
  deleteDashboard,
} from '../../actions/acronisAnalyticsActions';
import { DashboardTabs } from '../../uikit/components/DashboardTabs';

/**
 * Screen-level translations (loaded lazily when screen mounts)
 */
const translations = I18nRegistry.createLoader({
  [Language.English]: () => import('./i18n/en.json'),
  [Language.Arabic]: () => import('./i18n/ar.json'),
  [Language.Bengali]: () => import('./i18n/bn.json'),
  [Language.Czech]: () => import('./i18n/cs.json'),
  [Language.Danish]: () => import('./i18n/da.json'),
  [Language.German]: () => import('./i18n/de.json'),
  [Language.Greek]: () => import('./i18n/el.json'),
  [Language.Spanish]: () => import('./i18n/es.json'),
  [Language.Persian]: () => import('./i18n/fa.json'),
  [Language.Finnish]: () => import('./i18n/fi.json'),
  [Language.French]: () => import('./i18n/fr.json'),
  [Language.Hebrew]: () => import('./i18n/he.json'),
  [Language.Hindi]: () => import('./i18n/hi.json'),
  [Language.Hungarian]: () => import('./i18n/hu.json'),
  [Language.Indonesian]: () => import('./i18n/id.json'),
  [Language.Italian]: () => import('./i18n/it.json'),
  [Language.Japanese]: () => import('./i18n/ja.json'),
  [Language.Korean]: () => import('./i18n/ko.json'),
  [Language.Malay]: () => import('./i18n/ms.json'),
  [Language.Dutch]: () => import('./i18n/nl.json'),
  [Language.Norwegian]: () => import('./i18n/no.json'),
  [Language.Polish]: () => import('./i18n/pl.json'),
  [Language.Portuguese]: () => import('./i18n/pt.json'),
  [Language.Romanian]: () => import('./i18n/ro.json'),
  [Language.Russian]: () => import('./i18n/ru.json'),
  [Language.Swedish]: () => import('./i18n/sv.json'),
  [Language.Swahili]: () => import('./i18n/sw.json'),
  [Language.Tamil]: () => import('./i18n/ta.json'),
  [Language.Thai]: () => import('./i18n/th.json'),
  [Language.Tagalog]: () => import('./i18n/tl.json'),
  [Language.Turkish]: () => import('./i18n/tr.json'),
  [Language.Ukrainian]: () => import('./i18n/uk.json'),
  [Language.Urdu]: () => import('./i18n/ur.json'),
  [Language.Vietnamese]: () => import('./i18n/vi.json'),
  [Language.ChineseSimplified]: () => import('./i18n/zh.json'),
  [Language.ChineseTraditional]: () => import('./i18n/zh-TW.json'),
});

/**
 * Home Screen Component
 */
export const HomeScreen: React.FC = () => {
  // Register translations for this screen
  useScreenTranslations(ACRONIS_ANALYTICS_SCREENSET_ID, HOME_SCREEN_ID, translations);

  const { t } = useTranslation();
  const { dashboards, activeDashboardId } = useAppSelector(selectAcronisAnalyticsState);
  const [isAddingDashboard, setIsAddingDashboard] = useState(false);
  const [newDashboardName, setNewDashboardName] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [dashboardToDelete, setDashboardToDelete] = useState<string | null>(null);

  const handleAddDashboard = () => {
    setIsAddingDashboard(true);
  };

  const handleCreateDashboard = () => {
    if (newDashboardName.trim()) {
      createDashboard(newDashboardName.trim());
      setNewDashboardName('');
      setIsAddingDashboard(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCreateDashboard();
    } else if (e.key === 'Escape') {
      setIsAddingDashboard(false);
      setNewDashboardName('');
    }
  };

  const activeDashboard = dashboards.find((d: DashboardTab) => d.id === activeDashboardId);

  const handleRename = (id: string) => {
    const dashboard = dashboards.find((d: DashboardTab) => d.id === id);
    if (dashboard) {
      const newName = prompt('Enter new dashboard name:', dashboard.name);
      if (newName && newName.trim()) {
        renameDashboard(id, newName.trim());
      }
    }
  };

  const handleClone = (id: string) => {
    cloneDashboard(id);
  };

  const handleMoveLeft = (id: string) => {
    moveDashboardLeft(id);
  };

  const handleMoveRight = (id: string) => {
    moveDashboardRight(id);
  };

  const handleDelete = (id: string) => {
    if (dashboards.length > 1) {
      setDashboardToDelete(id);
      setDeleteDialogOpen(true);
    }
  };

  const confirmDelete = () => {
    if (dashboardToDelete) {
      deleteDashboard(dashboardToDelete);
      setDeleteDialogOpen(false);
      setDashboardToDelete(null);
    }
  };

  const cancelDelete = () => {
    setDeleteDialogOpen(false);
    setDashboardToDelete(null);
  };

  return (
    <div className="flex flex-col gap-8 p-8">
      <div className="flex flex-col gap-4">
        <div className="flex items-end gap-2">
          <DashboardTabs
            tabs={dashboards}
            activeTabId={activeDashboardId}
            onTabSelect={selectDashboard}
            onTabRename={handleRename}
            onTabClone={handleClone}
            onTabMoveLeft={handleMoveLeft}
            onTabMoveRight={handleMoveRight}
            onTabDelete={handleDelete}
          />

          {isAddingDashboard ? (
            <Input
              autoFocus
              placeholder={t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${HOME_SCREEN_ID}:dashboard_name_placeholder`)}
              value={newDashboardName}
              onChange={(e) => setNewDashboardName(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={() => {
                if (!newDashboardName.trim()) {
                  setIsAddingDashboard(false);
                }
              }}
              className="w-48 h-8"
            />
          ) : (
            <button
              onClick={handleAddDashboard}
              className="flex items-center gap-2 px-2 py-1 rounded transition-colors hover:bg-muted"
              style={{
                borderRadius: '4px',
              }}
            >
              <Plus className="h-4 w-4 text-[#2668c5]" />
              <span
                className="text-[#2668c5] font-semibold whitespace-nowrap"
                style={{
                  fontSize: '14px',
                  lineHeight: '24px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 600,
                }}
              >
                <TextLoader skeletonClassName="h-4 w-16">
                  {t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${HOME_SCREEN_ID}:add_dashboard`)}
                </TextLoader>
              </span>
            </button>
          )}
        </div>

        {activeDashboard && (
          <div className="p-6 border rounded-lg bg-background">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <TextLoader skeletonClassName="h-6 w-48">
                  <p className="text-lg font-medium">{activeDashboard.name}</p>
                </TextLoader>
                <TextLoader skeletonClassName="h-4 w-64 mt-2">
                  <p className="text-sm text-muted-foreground">
                    {t(`screen.${ACRONIS_ANALYTICS_SCREENSET_ID}.${HOME_SCREEN_ID}:dashboard_content`)}
                  </p>
                </TextLoader>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[512px] p-0">
          {/* Header */}
          <DialogHeader className="px-5 py-4 border-b border-[rgba(38,104,197,0.1)]">
            <div className="flex items-center justify-between">
              <DialogTitle
                className="text-[#243143] font-normal"
                style={{
                  fontSize: '24px',
                  lineHeight: '32px',
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                }}
              >
                Delete tab &quot;{dashboards.find((d) => d.id === dashboardToDelete)?.name}&quot;
              </DialogTitle>
              <button
                onClick={cancelDelete}
                className="p-1 hover:bg-muted rounded transition-colors"
              >
                <X className="h-6 w-6 text-[#243143]" />
              </button>
            </div>
          </DialogHeader>

          {/* Body */}
          <DialogDescription className="px-6 py-6 text-[#243143]" style={{
            fontSize: '14px',
            lineHeight: '24px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
          }}>
            This action cannot be undone. This will permanently delete the tab and all its content, including widgets, charts, and any custom configurations.
          </DialogDescription>

          {/* Footer */}
          <DialogFooter className="px-6 py-4 flex items-center justify-end gap-4">
            <button
              onClick={cancelDelete}
              className="px-2 py-1 border border-[#2668c5] rounded text-[#2668c5] font-semibold hover:bg-[#2668c5]/5 transition-colors"
              style={{
                fontSize: '14px',
                lineHeight: '24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                borderRadius: '4px',
              }}
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="px-2 py-1 bg-[#c62020] rounded text-white font-semibold hover:bg-[#a01818] transition-colors"
              style={{
                fontSize: '14px',
                lineHeight: '24px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                borderRadius: '4px',
              }}
            >
              Delete
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

HomeScreen.displayName = 'HomeScreen';

// Default export for lazy loading
export default HomeScreen;
