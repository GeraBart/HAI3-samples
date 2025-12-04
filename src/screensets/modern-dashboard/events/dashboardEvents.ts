/**
 * Dashboard domain events
 */

import { MODERN_DASHBOARD_SCREENSET_ID } from '../ids';
import type { CreationStep } from '../types/dashboard';
import type { WidgetConfig } from '../api/dashboard/types';

// Local domain ID (required by lint rule)
const DOMAIN_ID = 'dashboard';
const DOMAIN = `${MODERN_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}`;

/**
 * Dashboard event keys
 */
export const dashboardEvents = {
  addWidgetPanelOpened: `${DOMAIN}/addWidgetPanelOpened`,
  addWidgetPanelClosed: `${DOMAIN}/addWidgetPanelClosed`,
  widgetCreationStarted: `${DOMAIN}/widgetCreationStarted`,
  widgetCreationStepChanged: `${DOMAIN}/widgetCreationStepChanged`,
  widgetCreationCompleted: `${DOMAIN}/widgetCreationCompleted`,
  widgetCreationFailed: `${DOMAIN}/widgetCreationFailed`,
  widgetAdded: `${DOMAIN}/widgetAdded`,
} as const;

/**
 * Augment EventPayloadMap with dashboard events
 */
declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [dashboardEvents.addWidgetPanelOpened]: undefined;
    [dashboardEvents.addWidgetPanelClosed]: undefined;
    [dashboardEvents.widgetCreationStarted]: { prompt: string };
    [dashboardEvents.widgetCreationStepChanged]: { step: CreationStep };
    [dashboardEvents.widgetCreationCompleted]: { widget: WidgetConfig };
    [dashboardEvents.widgetCreationFailed]: { error: string };
    [dashboardEvents.widgetAdded]: { widgetId: string };
  }
}
