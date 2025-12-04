/**
 * Dashboard slice - manages dashboard UI state
 */

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { DashboardState, CreationStep } from '../types/dashboard';
import type { WidgetConfig } from '../api/dashboard/types';

const initialState: DashboardState = {
  viewState: 'initial',
  creationStep: 'analyzing',
  isAddWidgetOpen: false,
  isGenerationComplete: false,
  generatedWidget: null,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'modernDashboard/dashboard',
  initialState,
  reducers: {
    setAddWidgetOpen(state, action: PayloadAction<boolean>) {
      state.isAddWidgetOpen = action.payload;
      if (!action.payload) {
        // Reset state when closing
        state.viewState = 'initial';
        state.creationStep = 'analyzing';
        state.isGenerationComplete = false;
        state.generatedWidget = null;
      }
    },
    setViewState(state, action: PayloadAction<DashboardState['viewState']>) {
      state.viewState = action.payload;
    },
    setCreationStep(state, action: PayloadAction<CreationStep>) {
      state.creationStep = action.payload;
    },
    setGenerationComplete(state, action: PayloadAction<boolean>) {
      state.isGenerationComplete = action.payload;
    },
    setGeneratedWidget(state, action: PayloadAction<WidgetConfig | null>) {
      state.generatedWidget = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetDashboard(state) {
      Object.assign(state, initialState);
    },
  },
});

export const {
  setAddWidgetOpen,
  setViewState,
  setCreationStep,
  setGenerationComplete,
  setGeneratedWidget,
  setError,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice;
