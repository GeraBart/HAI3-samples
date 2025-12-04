/**
 * Dashboard actions - emit events only, no direct slice dispatch
 */

import { eventBus } from '@hai3/uicore';
import { dashboardEvents } from '../events/dashboardEvents';
import type { CreationStep } from '../types/dashboard';
import type { WidgetConfig } from '../api/dashboard/types';

/**
 * Open add widget panel
 */
export const openAddWidgetPanel = (): void => {
  eventBus.emit(dashboardEvents.addWidgetPanelOpened);
};

/**
 * Close add widget panel
 */
export const closeAddWidgetPanel = (): void => {
  eventBus.emit(dashboardEvents.addWidgetPanelClosed);
};

/**
 * Start widget creation with prompt
 */
export const startWidgetCreation = (prompt: string): void => {
  eventBus.emit(dashboardEvents.widgetCreationStarted, { prompt });
};

/**
 * Update creation step
 */
export const updateCreationStep = (step: CreationStep): void => {
  eventBus.emit(dashboardEvents.widgetCreationStepChanged, { step });
};

/**
 * Complete widget creation
 */
export const completeWidgetCreation = (widget: WidgetConfig): void => {
  eventBus.emit(dashboardEvents.widgetCreationCompleted, { widget });
};

/**
 * Fail widget creation
 */
export const failWidgetCreation = (error: string): void => {
  eventBus.emit(dashboardEvents.widgetCreationFailed, { error });
};

/**
 * Add widget to dashboard
 */
export const addWidget = (widgetId: string): void => {
  eventBus.emit(dashboardEvents.widgetAdded, { widgetId });
};
