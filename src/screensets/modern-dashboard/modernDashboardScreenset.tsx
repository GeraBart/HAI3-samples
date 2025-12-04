import { type ScreensetConfig, ScreensetCategory, uikitRegistry, I18nRegistry, Language, apiRegistry, screensetRegistry, registerSlice } from '@hai3/uicore';
import { MODERN_DASHBOARD_SCREENSET_ID, DASHBOARD_SCREEN_ID, DASHBOARD_API_DOMAIN } from './ids';
import { DashboardIcon, DASHBOARD_ICON_ID } from './uikit/icons/DashboardIcon';
import { AIIcon, AI_ICON_ID } from './uikit/icons/AIIcon';
import { UploadIcon, UPLOAD_ICON_ID } from './uikit/icons/UploadIcon';
import { GridIcon, GRID_ICON_ID } from './uikit/icons/GridIcon';
import { SendIcon, SEND_ICON_ID } from './uikit/icons/SendIcon';

// Import mocks for dashboard service
import { dashboardMockMap } from './api/dashboard/mocks';

// Import slice and effects
import dashboardSlice from './slices/dashboardSlice';
import { initDashboardEffects } from './effects/dashboardEffects';

// Import events for side effect (augments EventPayloadMap)
import './events/dashboardEvents';

/**
 * Screenset-level translations
 * All 36 languages must be provided for type safety
 */
const screensetTranslations = I18nRegistry.createLoader({
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
 * Register mock data for dashboard service
 */
apiRegistry.registerMocks(DASHBOARD_API_DOMAIN, dashboardMockMap);

/**
 * Register dashboard slice with effects
 */
registerSlice(dashboardSlice, () => {
  initDashboardEffects();
});

/**
 * Register screenset-specific icons
 */
uikitRegistry.registerIcons({
  [DASHBOARD_ICON_ID]: <DashboardIcon />,
  [AI_ICON_ID]: <AIIcon />,
  [UPLOAD_ICON_ID]: <UploadIcon />,
  [GRID_ICON_ID]: <GridIcon />,
  [SEND_ICON_ID]: <SendIcon />,
});

/**
 * Modern Dashboard Screenset Configuration
 * Analytics dashboard with AI-powered dashboard builder
 * Based on Figma design: Acronis Analytics
 */
export const modernDashboardScreenset: ScreensetConfig = {
  id: MODERN_DASHBOARD_SCREENSET_ID,
  name: 'Modern Dashboard',
  category: ScreensetCategory.Drafts,
  defaultScreen: DASHBOARD_SCREEN_ID,
  localization: screensetTranslations,
  menu: [
    {
      menuItem: {
        id: DASHBOARD_SCREEN_ID,
        label: `screenset.${MODERN_DASHBOARD_SCREENSET_ID}:screens.${DASHBOARD_SCREEN_ID}.title`,
        icon: DASHBOARD_ICON_ID,
      },
      screen: () => import('./screens/dashboard/DashboardScreen'),
    },
  ],
};

/**
 * Self-register screenset
 * Auto-discovered via Vite glob import in screensetRegistry.tsx
 */
screensetRegistry.register(modernDashboardScreenset);
