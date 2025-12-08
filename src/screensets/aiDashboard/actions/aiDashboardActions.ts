/**
 * aiDashboard Actions
 * Emit events AND interact with APIs (Flux pattern)
 * Following Flux: Actions emit events for effects to update Redux, and call APIs
 */

import { eventBus } from '@hai3/uicore';
import { AiDashboardEvents } from '../events/aiDashboardEvents';
import type { DashboardTab, Widget, AiInsight, WidgetPosition, WidgetConfig, WidgetColumnSpan } from '../types';

/**
 * Tab actions
 */
export const addNewTab = (): void => {
  const tab: DashboardTab = {
    id: `dashboard-${Date.now()}`,
    name: '',
    isNew: true,
  };
  eventBus.emit(AiDashboardEvents.TabAdded, { tab });
};

export const selectTab = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.TabSelected, { tabId });
};

export const renameTab = (tabId: string, name: string): void => {
  eventBus.emit(AiDashboardEvents.TabRenamed, { tabId, name });
};

export const cloneTab = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.TabCloned, { tabId });
};

export const moveTabLeft = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.TabMovedLeft, { tabId });
};

export const moveTabRight = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.TabMovedRight, { tabId });
};

export const deleteTab = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.TabDeleted, { tabId });
};

export const startEditingTab = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.TabEditStarted, { tabId });
};

export const cancelEditingTab = (): void => {
  eventBus.emit(AiDashboardEvents.TabEditCancelled);
};

export const openDeleteDialog = (tabId: string): void => {
  eventBus.emit(AiDashboardEvents.DeleteDialogOpened, { tabId });
};

export const closeDeleteDialog = (): void => {
  eventBus.emit(AiDashboardEvents.DeleteDialogClosed);
};

/**
 * AI Generation actions
 */
export const startAiGeneration = (prompt: string): void => {
  eventBus.emit(AiDashboardEvents.GenerationStarted, { prompt });
};

export const advanceGenerationStep = (): void => {
  eventBus.emit(AiDashboardEvents.GenerationStepAdvanced);
};

export const completeGeneration = (widgets: Widget[], insights: AiInsight[]): void => {
  eventBus.emit(AiDashboardEvents.GenerationCompleted, { widgets, insights });
};

export const resetGeneration = (): void => {
  eventBus.emit(AiDashboardEvents.GenerationReset);
};

export const toggleAiInsights = (): void => {
  eventBus.emit(AiDashboardEvents.AiInsightsToggled);
};

export const selectTemplate = (templateId: string): void => {
  eventBus.emit(AiDashboardEvents.TemplateSelected, { templateId });
};

/**
 * Widget layout actions
 */
export const updateWidgetPosition = (widgetId: string, position: WidgetPosition): void => {
  eventBus.emit(AiDashboardEvents.WidgetPositionUpdated, { widgetId, position });
};

export const updateWidgetColumnSpan = (widgetId: string, columnSpan: WidgetColumnSpan): void => {
  eventBus.emit(AiDashboardEvents.WidgetColumnSpanUpdated, { widgetId, columnSpan });
};

export const openWidgetSettings = (widgetId: string): void => {
  eventBus.emit(AiDashboardEvents.WidgetSettingsOpened, { widgetId });
};

export const closeWidgetSettings = (): void => {
  eventBus.emit(AiDashboardEvents.WidgetSettingsClosed);
};

export const updateWidgetConfig = (widgetId: string, config: WidgetConfig): void => {
  eventBus.emit(AiDashboardEvents.WidgetConfigUpdated, { widgetId, config });
};

export const removeWidget = (widgetId: string): void => {
  eventBus.emit(AiDashboardEvents.WidgetRemoved, { widgetId });
};
