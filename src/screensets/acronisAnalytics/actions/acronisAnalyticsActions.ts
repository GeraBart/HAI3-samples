/**
 * acronisAnalytics Actions
 * Emit events AND interact with APIs (Flux pattern)
 * Following Flux: Actions emit events for effects to update Redux, and call APIs
 */

import { eventBus } from '@hai3/uicore';
import { AcronisAnalyticsEvents, type DashboardTab } from '../events/acronisAnalyticsEvents';

/**
 * Create a new dashboard tab
 */
export const createDashboard = (name: string): void => {
  const dashboard: DashboardTab = {
    id: `dashboard-${Date.now()}`,
    name,
  };
  eventBus.emit(AcronisAnalyticsEvents.DashboardAdded, dashboard);
};

/**
 * Select a dashboard tab
 */
export const selectDashboard = (id: string): void => {
  eventBus.emit(AcronisAnalyticsEvents.DashboardSelected, { id });
};

/**
 * Rename a dashboard tab
 */
export const renameDashboard = (id: string, name: string): void => {
  eventBus.emit(AcronisAnalyticsEvents.DashboardRenamed, { id, name });
};

/**
 * Clone a dashboard tab
 */
export const cloneDashboard = (id: string): void => {
  eventBus.emit(AcronisAnalyticsEvents.DashboardCloned, { id });
};

/**
 * Move dashboard tab to the left
 */
export const moveDashboardLeft = (id: string): void => {
  eventBus.emit(AcronisAnalyticsEvents.DashboardMovedLeft, { id });
};

/**
 * Move dashboard tab to the right
 */
export const moveDashboardRight = (id: string): void => {
  eventBus.emit(AcronisAnalyticsEvents.DashboardMovedRight, { id });
};

/**
 * Delete a dashboard tab
 */
export const deleteDashboard = (id: string): void => {
  eventBus.emit(AcronisAnalyticsEvents.DashboardDeleted, { id });
};
