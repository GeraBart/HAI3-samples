/**
 * aiDashboard Events
 * Domain-specific events for this screenset
 */

import '@hai3/uicore';
import { AI_DASHBOARD_SCREENSET_ID } from '../ids';
import type { DashboardTab, Widget, AiInsight, WidgetPosition, WidgetConfig, WidgetColumnSpan } from '../types';

const DOMAIN_ID = 'aiDashboard';

/**
 * Events enum
 */
export enum AiDashboardEvents {
  TabAdded = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabAdded`,
  TabSelected = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabSelected`,
  TabRenamed = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabRenamed`,
  TabCloned = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabCloned`,
  TabMovedLeft = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabMovedLeft`,
  TabMovedRight = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabMovedRight`,
  TabDeleted = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabDeleted`,
  TabEditStarted = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabEditStarted`,
  TabEditCancelled = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/tabEditCancelled`,
  DeleteDialogOpened = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/deleteDialogOpened`,
  DeleteDialogClosed = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/deleteDialogClosed`,
  GenerationStarted = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/generationStarted`,
  GenerationStepAdvanced = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/generationStepAdvanced`,
  GenerationCompleted = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/generationCompleted`,
  GenerationReset = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/generationReset`,
  AiInsightsToggled = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/aiInsightsToggled`,
  TemplateSelected = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/templateSelected`,
  WidgetPositionUpdated = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/widgetPositionUpdated`,
  WidgetColumnSpanUpdated = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/widgetColumnSpanUpdated`,
  WidgetSettingsOpened = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/widgetSettingsOpened`,
  WidgetSettingsClosed = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/widgetSettingsClosed`,
  WidgetConfigUpdated = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/widgetConfigUpdated`,
  WidgetRemoved = `${AI_DASHBOARD_SCREENSET_ID}/${DOMAIN_ID}/widgetRemoved`,
}

void AI_DASHBOARD_SCREENSET_ID;
void DOMAIN_ID;

/**
 * Module augmentation for type-safe event payloads
 */
declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [AiDashboardEvents.TabAdded]: { tab: DashboardTab };
    [AiDashboardEvents.TabSelected]: { tabId: string };
    [AiDashboardEvents.TabRenamed]: { tabId: string; name: string };
    [AiDashboardEvents.TabCloned]: { tabId: string };
    [AiDashboardEvents.TabMovedLeft]: { tabId: string };
    [AiDashboardEvents.TabMovedRight]: { tabId: string };
    [AiDashboardEvents.TabDeleted]: { tabId: string };
    [AiDashboardEvents.TabEditStarted]: { tabId: string };
    [AiDashboardEvents.TabEditCancelled]: void;
    [AiDashboardEvents.DeleteDialogOpened]: { tabId: string };
    [AiDashboardEvents.DeleteDialogClosed]: void;
    [AiDashboardEvents.GenerationStarted]: { prompt: string };
    [AiDashboardEvents.GenerationStepAdvanced]: void;
    [AiDashboardEvents.GenerationCompleted]: { widgets: Widget[]; insights: AiInsight[] };
    [AiDashboardEvents.GenerationReset]: void;
    [AiDashboardEvents.AiInsightsToggled]: void;
    [AiDashboardEvents.TemplateSelected]: { templateId: string };
    [AiDashboardEvents.WidgetPositionUpdated]: { widgetId: string; position: WidgetPosition };
    [AiDashboardEvents.WidgetColumnSpanUpdated]: { widgetId: string; columnSpan: WidgetColumnSpan };
    [AiDashboardEvents.WidgetSettingsOpened]: { widgetId: string };
    [AiDashboardEvents.WidgetSettingsClosed]: void;
    [AiDashboardEvents.WidgetConfigUpdated]: { widgetId: string; config: WidgetConfig };
    [AiDashboardEvents.WidgetRemoved]: { widgetId: string };
  }
}
