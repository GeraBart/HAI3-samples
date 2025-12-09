/**
 * Home Screen
 * Main screen for the aiDashboard screenset with tabs and dashboard content
 */

import React from 'react';
import {
  useAppSelector,
  useScreenTranslations,
  I18nRegistry,
  Language,
} from '@hai3/uicore';
import { AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID } from '../../ids';
import { selectAiDashboardState } from '../../slices/aiDashboardSlice';
import { DashboardTabs } from '../../uikit/DashboardTabs';
import { DeleteTabDialog } from '../../uikit/DeleteTabDialog';
import { EmptyDashboard, GeneratingDashboard, DashboardPreview } from './components';

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
  useScreenTranslations(AI_DASHBOARD_SCREENSET_ID, HOME_SCREEN_ID, translations);

  const { activeTabId, dashboardStates } = useAppSelector(selectAiDashboardState);
  const currentState = dashboardStates[activeTabId] || 'empty';

  const renderContent = () => {
    switch (currentState) {
      case 'generating':
        return <GeneratingDashboard />;
      case 'preview':
        return <DashboardPreview />;
      default:
        return <EmptyDashboard />;
    }
  };

  return (
    <div className="flex h-full flex-col bg-background">
      <DashboardTabs />
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
      <DeleteTabDialog />
    </div>
  );
};

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;
