/**
 * acronisAnalytics Effects
 * Listen to events and update slice
 * Following Flux: Effects subscribe to events and update their own slice only
 */

import { type AppDispatch, eventBus } from '@hai3/uicore';
import { AcronisAnalyticsEvents } from '../events/acronisAnalyticsEvents';
import {
  addDashboard,
  setActiveDashboard,
  renameDashboard,
  cloneDashboard,
  moveDashboardLeft,
  moveDashboardRight,
  deleteDashboard,
} from '../slices/acronisAnalyticsSlice';

/**
 * Initialize effects
 * Called once during slice registration
 */
export const initializeAcronisAnalyticsEffects = (_appDispatch: AppDispatch): void => {
  // Store dispatch for use in event listeners
  const dispatch = _appDispatch;

  // Listen to dashboard added event
  eventBus.on(AcronisAnalyticsEvents.DashboardAdded, (dashboard) => {
    dispatch(addDashboard(dashboard));
  });

  // Listen to dashboard selected event
  eventBus.on(AcronisAnalyticsEvents.DashboardSelected, ({ id }) => {
    dispatch(setActiveDashboard(id));
  });

  // Listen to dashboard renamed event
  eventBus.on(AcronisAnalyticsEvents.DashboardRenamed, ({ id, name }) => {
    dispatch(renameDashboard({ id, name }));
  });

  // Listen to dashboard cloned event
  eventBus.on(AcronisAnalyticsEvents.DashboardCloned, ({ id }) => {
    dispatch(cloneDashboard({ id, name: '' }));
  });

  // Listen to dashboard moved left event
  eventBus.on(AcronisAnalyticsEvents.DashboardMovedLeft, ({ id }) => {
    dispatch(moveDashboardLeft(id));
  });

  // Listen to dashboard moved right event
  eventBus.on(AcronisAnalyticsEvents.DashboardMovedRight, ({ id }) => {
    dispatch(moveDashboardRight(id));
  });

  // Listen to dashboard deleted event
  eventBus.on(AcronisAnalyticsEvents.DashboardDeleted, ({ id }) => {
    dispatch(deleteDashboard(id));
  });
};
