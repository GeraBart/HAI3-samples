import { type ScreensetConfig, ScreensetCategory, uikitRegistry, I18nRegistry, Language, screensetRegistry } from '@hai3/uicore';
import { MACHINE_MONITORING_SCREENSET_ID, DASHBOARD_SCREEN_ID, MACHINES_LIST_SCREEN_ID } from './ids';
import { MonitorIcon, MONITOR_ICON_ID } from './uikit/icons/MonitorIcon';
import { ServerIcon, SERVER_ICON_ID } from './uikit/icons/ServerIcon';

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
 * Register screenset-specific icons
 * Screenset is responsible for registering its own icons
 * Screen-level translations are registered by each screen component when it mounts
 */
uikitRegistry.registerIcons({
  [MONITOR_ICON_ID]: <MonitorIcon />,
  [SERVER_ICON_ID]: <ServerIcon />,
});

/**
 * Machine Monitoring Screenset Configuration
 * Self-contained - knows about its own screens, icons, translations, and structure
 * All screens are lazy-loaded for optimal performance
 * Translations are declaratively configured and auto-registered
 */
export const machineMonitoringScreenset: ScreensetConfig = {
  id: MACHINE_MONITORING_SCREENSET_ID,
  name: 'Machine Monitoring',
  category: ScreensetCategory.Drafts,
  defaultScreen: MACHINES_LIST_SCREEN_ID,
  localization: screensetTranslations,
  menu: [
    {
      menuItem: {
        id: MACHINES_LIST_SCREEN_ID,
        label: `screenset.${MACHINE_MONITORING_SCREENSET_ID}:screens.${MACHINES_LIST_SCREEN_ID}.title`,
        icon: SERVER_ICON_ID,
      },
      screen: () => import('./screens/machines-list/MachinesListScreen'),
    },
    {
      menuItem: {
        id: DASHBOARD_SCREEN_ID,
        label: `screenset.${MACHINE_MONITORING_SCREENSET_ID}:screens.${DASHBOARD_SCREEN_ID}.title`,
        icon: MONITOR_ICON_ID,
      },
      screen: () => import('./screens/dashboard/DashboardScreen'),
    },
  ],
};

/**
 * Auto-register screenset
 * This side effect runs when the module is imported by screensetRegistry.tsx
 */
screensetRegistry.register(machineMonitoringScreenset);
