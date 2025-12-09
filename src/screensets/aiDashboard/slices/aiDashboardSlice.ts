/**
 * aiDashboard Slice
 * Redux state management for this screenset
 * Following Flux: Effects dispatch these reducers after listening to events
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import { AI_DASHBOARD_SCREENSET_ID } from '../ids';
import type { 
  DashboardTab, 
  DashboardState, 
  Widget, 
  AiInsight,
  GenerationStep,
  GenerationStepStatus,
  WidgetPosition,
  WidgetConfig,
  WidgetColumnSpan,
} from '../types';
import { DEFAULT_GENERATION_STEPS } from '../types';

const SLICE_KEY = `${AI_DASHBOARD_SCREENSET_ID}/aiDashboard` as const;

/**
 * State interface
 */
export interface AiDashboardState {
  tabs: DashboardTab[];
  activeTabId: string;
  dashboardStates: Record<string, DashboardState>;
  widgets: Record<string, Widget[]>;
  aiInsights: Record<string, AiInsight[]>;
  isGenerating: boolean;
  generationPrompt: string;
  generationSteps: GenerationStep[];
  currentStepIndex: number;
  showAiInsights: boolean;
  editingTabId: string | null;
  deleteDialogTabId: string | null;
  widgetLayouts: Record<string, WidgetPosition>;
  activeSettingsWidgetId: string | null;
  widgetConfigs: Record<string, WidgetConfig>;
}

const initialState: AiDashboardState = {
  tabs: [{ id: 'dashboard-1', name: 'Dashboard' }],
  activeTabId: 'dashboard-1',
  dashboardStates: { 'dashboard-1': 'empty' },
  widgets: {},
  aiInsights: {},
  isGenerating: false,
  generationPrompt: '',
  generationSteps: DEFAULT_GENERATION_STEPS,
  currentStepIndex: -1,
  showAiInsights: true,
  editingTabId: null,
  deleteDialogTabId: null,
  widgetLayouts: {},
  activeSettingsWidgetId: null,
  widgetConfigs: {},
};

export const aiDashboardSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    addTab: (state, action: PayloadAction<DashboardTab>) => {
      state.tabs.push(action.payload);
      state.activeTabId = action.payload.id;
      state.dashboardStates[action.payload.id] = 'empty';
      state.editingTabId = action.payload.id;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTabId = action.payload;
    },
    renameTab: (state, action: PayloadAction<{ id: string; name: string }>) => {
      const tab = state.tabs.find((t) => t.id === action.payload.id);
      if (tab) {
        tab.name = action.payload.name;
        tab.isNew = false;
      }
      state.editingTabId = null;
    },
    cloneTab: (state, action: PayloadAction<string>) => {
      const sourceTab = state.tabs.find((t) => t.id === action.payload);
      if (sourceTab) {
        const newId = `${action.payload}-clone-${Date.now()}`;
        const newTab: DashboardTab = {
          id: newId,
          name: `${sourceTab.name} (Copy)`,
        };
        const index = state.tabs.findIndex((t) => t.id === action.payload);
        state.tabs.splice(index + 1, 0, newTab);
        state.activeTabId = newId;
        state.dashboardStates[newId] = state.dashboardStates[action.payload] || 'empty';
        if (state.widgets[action.payload]) {
          state.widgets[newId] = [...state.widgets[action.payload]];
        }
        if (state.aiInsights[action.payload]) {
          state.aiInsights[newId] = [...state.aiInsights[action.payload]];
        }
      }
    },
    moveTabLeft: (state, action: PayloadAction<string>) => {
      const index = state.tabs.findIndex((t) => t.id === action.payload);
      if (index > 0) {
        const [tab] = state.tabs.splice(index, 1);
        state.tabs.splice(index - 1, 0, tab);
      }
    },
    moveTabRight: (state, action: PayloadAction<string>) => {
      const index = state.tabs.findIndex((t) => t.id === action.payload);
      if (index !== -1 && index < state.tabs.length - 1) {
        const [tab] = state.tabs.splice(index, 1);
        state.tabs.splice(index + 1, 0, tab);
      }
    },
    deleteTab: (state, action: PayloadAction<string>) => {
      const index = state.tabs.findIndex((t) => t.id === action.payload);
      if (index !== -1 && state.tabs.length > 1) {
        state.tabs.splice(index, 1);
        delete state.dashboardStates[action.payload];
        delete state.widgets[action.payload];
        delete state.aiInsights[action.payload];
        if (state.activeTabId === action.payload) {
          state.activeTabId = state.tabs[Math.max(0, index - 1)].id;
        }
      }
      state.deleteDialogTabId = null;
    },
    setEditingTab: (state, action: PayloadAction<string | null>) => {
      state.editingTabId = action.payload;
    },
    setDeleteDialogTab: (state, action: PayloadAction<string | null>) => {
      state.deleteDialogTabId = action.payload;
    },
    setDashboardState: (state, action: PayloadAction<{ tabId: string; dashboardState: DashboardState }>) => {
      state.dashboardStates[action.payload.tabId] = action.payload.dashboardState;
    },
    startGeneration: (state, action: PayloadAction<string>) => {
      state.isGenerating = true;
      state.generationPrompt = action.payload;
      state.currentStepIndex = 0;
      state.generationSteps = DEFAULT_GENERATION_STEPS.map((step, index) => ({
        ...step,
        status: index === 0 ? 'active' : 'pending',
      }));
      state.dashboardStates[state.activeTabId] = 'generating';
    },
    advanceGenerationStep: (state) => {
      if (state.currentStepIndex < state.generationSteps.length - 1) {
        state.generationSteps[state.currentStepIndex].status = 'completed';
        state.currentStepIndex += 1;
        state.generationSteps[state.currentStepIndex].status = 'active';
      }
    },
    completeGeneration: (state, action: PayloadAction<{ widgets: Widget[]; insights: AiInsight[] }>) => {
      state.generationSteps[state.currentStepIndex].status = 'completed';
      state.isGenerating = false;
      state.dashboardStates[state.activeTabId] = 'preview';
      state.widgets[state.activeTabId] = action.payload.widgets;
      state.aiInsights[state.activeTabId] = action.payload.insights;
    },
    resetGeneration: (state) => {
      state.isGenerating = false;
      state.generationPrompt = '';
      state.currentStepIndex = -1;
      state.generationSteps = DEFAULT_GENERATION_STEPS;
    },
    toggleAiInsights: (state) => {
      state.showAiInsights = !state.showAiInsights;
    },
    setStepStatus: (state, action: PayloadAction<{ stepIndex: number; status: GenerationStepStatus }>) => {
      if (state.generationSteps[action.payload.stepIndex]) {
        state.generationSteps[action.payload.stepIndex].status = action.payload.status;
      }
    },
    updateWidgetPosition: (state, action: PayloadAction<{ widgetId: string; position: WidgetPosition }>) => {
      state.widgetLayouts[action.payload.widgetId] = action.payload.position;
    },
    updateWidgetColumnSpan: (state, action: PayloadAction<{ widgetId: string; columnSpan: WidgetColumnSpan }>) => {
      if (state.widgetLayouts[action.payload.widgetId]) {
        state.widgetLayouts[action.payload.widgetId].columnSpan = action.payload.columnSpan;
      } else {
        state.widgetLayouts[action.payload.widgetId] = {
          row: 0,
          column: 0,
          columnSpan: action.payload.columnSpan,
        };
      }
    },
    openWidgetSettings: (state, action: PayloadAction<string>) => {
      state.activeSettingsWidgetId = action.payload;
    },
    closeWidgetSettings: (state) => {
      state.activeSettingsWidgetId = null;
    },
    updateWidgetConfig: (state, action: PayloadAction<{ widgetId: string; config: WidgetConfig }>) => {
      state.widgetConfigs[action.payload.widgetId] = {
        ...state.widgetConfigs[action.payload.widgetId],
        ...action.payload.config,
      };
    },
    removeWidget: (state, action: PayloadAction<string>) => {
      const tabId = state.activeTabId;
      if (state.widgets[tabId]) {
        state.widgets[tabId] = state.widgets[tabId].filter((w) => w.id !== action.payload);
      }
      delete state.widgetLayouts[action.payload];
      delete state.widgetConfigs[action.payload];
      state.activeSettingsWidgetId = null;
    },
  },
});

export const {
  addTab,
  setActiveTab,
  renameTab,
  cloneTab,
  moveTabLeft,
  moveTabRight,
  deleteTab,
  setEditingTab,
  setDeleteDialogTab,
  setDashboardState,
  startGeneration,
  advanceGenerationStep,
  completeGeneration,
  resetGeneration,
  toggleAiInsights,
  setStepStatus,
  updateWidgetPosition,
  updateWidgetColumnSpan,
  openWidgetSettings,
  closeWidgetSettings,
  updateWidgetConfig,
  removeWidget,
} = aiDashboardSlice.actions;

export default aiDashboardSlice;

declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: AiDashboardState;
  }
}

/**
 * Type-safe selector for this slice's state
 */
export const selectAiDashboardState = (state: RootState): AiDashboardState => {
  return state[SLICE_KEY];
};
