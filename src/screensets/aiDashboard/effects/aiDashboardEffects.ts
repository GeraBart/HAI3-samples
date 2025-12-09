/**
 * aiDashboard Effects
 * Listen to events and update slice
 * Following Flux: Effects subscribe to events and update their own slice only
 */

import { type AppDispatch, eventBus } from '@hai3/uicore';
import { AiDashboardEvents } from '../events/aiDashboardEvents';
import {
  addTab,
  setActiveTab,
  renameTab,
  cloneTab,
  moveTabLeft,
  moveTabRight,
  deleteTab,
  setEditingTab,
  setDeleteDialogTab,
  startGeneration,
  advanceGenerationStep,
  completeGeneration,
  resetGeneration,
  toggleAiInsights,
  updateWidgetPosition,
  updateWidgetColumnSpan,
  openWidgetSettings,
  closeWidgetSettings,
  updateWidgetConfig,
  removeWidget,
} from '../slices/aiDashboardSlice';

/**
 * Initialize effects
 * Called once during slice registration
 */
export const initializeAiDashboardEffects = (appDispatch: AppDispatch): void => {
  const dispatch = appDispatch;

  eventBus.on(AiDashboardEvents.TabAdded, ({ tab }) => {
    dispatch(addTab(tab));
  });

  eventBus.on(AiDashboardEvents.TabSelected, ({ tabId }) => {
    dispatch(setActiveTab(tabId));
  });

  eventBus.on(AiDashboardEvents.TabRenamed, ({ tabId, name }) => {
    dispatch(renameTab({ id: tabId, name }));
  });

  eventBus.on(AiDashboardEvents.TabCloned, ({ tabId }) => {
    dispatch(cloneTab(tabId));
  });

  eventBus.on(AiDashboardEvents.TabMovedLeft, ({ tabId }) => {
    dispatch(moveTabLeft(tabId));
  });

  eventBus.on(AiDashboardEvents.TabMovedRight, ({ tabId }) => {
    dispatch(moveTabRight(tabId));
  });

  eventBus.on(AiDashboardEvents.TabDeleted, ({ tabId }) => {
    dispatch(deleteTab(tabId));
  });

  eventBus.on(AiDashboardEvents.TabEditStarted, ({ tabId }) => {
    dispatch(setEditingTab(tabId));
  });

  eventBus.on(AiDashboardEvents.TabEditCancelled, () => {
    dispatch(setEditingTab(null));
  });

  eventBus.on(AiDashboardEvents.DeleteDialogOpened, ({ tabId }) => {
    dispatch(setDeleteDialogTab(tabId));
  });

  eventBus.on(AiDashboardEvents.DeleteDialogClosed, () => {
    dispatch(setDeleteDialogTab(null));
  });

  eventBus.on(AiDashboardEvents.GenerationStarted, ({ prompt }) => {
    dispatch(startGeneration(prompt));
  });

  eventBus.on(AiDashboardEvents.GenerationStepAdvanced, () => {
    dispatch(advanceGenerationStep());
  });

  eventBus.on(AiDashboardEvents.GenerationCompleted, ({ widgets, insights }) => {
    dispatch(completeGeneration({ widgets, insights }));
  });

  eventBus.on(AiDashboardEvents.GenerationReset, () => {
    dispatch(resetGeneration());
  });

  eventBus.on(AiDashboardEvents.AiInsightsToggled, () => {
    dispatch(toggleAiInsights());
  });

  eventBus.on(AiDashboardEvents.WidgetPositionUpdated, ({ widgetId, position }) => {
    dispatch(updateWidgetPosition({ widgetId, position }));
  });

  eventBus.on(AiDashboardEvents.WidgetColumnSpanUpdated, ({ widgetId, columnSpan }) => {
    dispatch(updateWidgetColumnSpan({ widgetId, columnSpan }));
  });

  eventBus.on(AiDashboardEvents.WidgetSettingsOpened, ({ widgetId }) => {
    dispatch(openWidgetSettings(widgetId));
  });

  eventBus.on(AiDashboardEvents.WidgetSettingsClosed, () => {
    dispatch(closeWidgetSettings());
  });

  eventBus.on(AiDashboardEvents.WidgetConfigUpdated, ({ widgetId, config }) => {
    dispatch(updateWidgetConfig({ widgetId, config }));
  });

  eventBus.on(AiDashboardEvents.WidgetRemoved, ({ widgetId }) => {
    dispatch(removeWidget(widgetId));
  });
};
