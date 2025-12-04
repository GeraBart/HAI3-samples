/**
 * acronisAnalytics Events
 * Domain-specific events for this screenset
 */

import '@hai3/uicore';
import { ACRONIS_ANALYTICS_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'dashboard';

/**
 * Events enum
 * Add your events here following the pattern:
 * EventName = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/eventName`
 */
export enum AcronisAnalyticsEvents {
  DashboardAdded = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardAdded`,
  DashboardSelected = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardSelected`,
  DashboardRenamed = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardRenamed`,
  DashboardCloned = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardCloned`,
  DashboardMovedLeft = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardMovedLeft`,
  DashboardMovedRight = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardMovedRight`,
  DashboardDeleted = `${ACRONIS_ANALYTICS_SCREENSET_ID}/${DOMAIN_ID}/dashboardDeleted`,
}

// These are used in the event enum pattern above
void ACRONIS_ANALYTICS_SCREENSET_ID;
void DOMAIN_ID;

/**
 * Dashboard tab interface
 */
export interface DashboardTab {
  id: string;
  name: string;
}

/**
 * Module augmentation for type-safe event payloads
 * Add your event payload types here
 */
declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [AcronisAnalyticsEvents.DashboardAdded]: DashboardTab;
    [AcronisAnalyticsEvents.DashboardSelected]: { id: string };
    [AcronisAnalyticsEvents.DashboardRenamed]: { id: string; name: string };
    [AcronisAnalyticsEvents.DashboardCloned]: { id: string };
    [AcronisAnalyticsEvents.DashboardMovedLeft]: { id: string };
    [AcronisAnalyticsEvents.DashboardMovedRight]: { id: string };
    [AcronisAnalyticsEvents.DashboardDeleted]: { id: string };
  }
}
