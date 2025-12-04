/**
 * acronisAnalytics Slice
 * Redux state management for this screenset
 * Following Flux: Effects dispatch these reducers after listening to events
 */

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import { ACRONIS_ANALYTICS_SCREENSET_ID } from '../ids';

const SLICE_KEY = `${ACRONIS_ANALYTICS_SCREENSET_ID}/acronisAnalytics` as const;

/**
 * Dashboard tab interface
 */
export interface DashboardTab {
  id: string;
  name: string;
}

/**
 * State interface
 * Add your state properties here
 */
export interface AcronisAnalyticsState {
  dashboards: DashboardTab[];
  activeDashboardId: string;
}

const initialState: AcronisAnalyticsState = {
  dashboards: [{ id: 'dashboard-1', name: 'Dashboard 1' }],
  activeDashboardId: 'dashboard-1',
};

export const acronisAnalyticsSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    addDashboard: (state, action: { payload: DashboardTab }) => {
      state.dashboards.push(action.payload);
      state.activeDashboardId = action.payload.id;
    },
    setActiveDashboard: (state, action: { payload: string }) => {
      state.activeDashboardId = action.payload;
    },
    renameDashboard: (state, action: { payload: { id: string; name: string } }) => {
      const dashboard = state.dashboards.find((d) => d.id === action.payload.id);
      if (dashboard) {
        dashboard.name = action.payload.name;
      }
    },
    cloneDashboard: (state, action: { payload: DashboardTab }) => {
      const index = state.dashboards.findIndex((d) => d.id === action.payload.id);
      if (index !== -1) {
        const cloned: DashboardTab = {
          id: `${action.payload.id}-clone-${Date.now()}`,
          name: `${action.payload.name} (Copy)`,
        };
        state.dashboards.splice(index + 1, 0, cloned);
        state.activeDashboardId = cloned.id;
      }
    },
    moveDashboardLeft: (state, action: { payload: string }) => {
      const index = state.dashboards.findIndex((d) => d.id === action.payload);
      if (index > 0) {
        const [dashboard] = state.dashboards.splice(index, 1);
        state.dashboards.splice(index - 1, 0, dashboard);
      }
    },
    moveDashboardRight: (state, action: { payload: string }) => {
      const index = state.dashboards.findIndex((d) => d.id === action.payload);
      if (index !== -1 && index < state.dashboards.length - 1) {
        const [dashboard] = state.dashboards.splice(index, 1);
        state.dashboards.splice(index + 1, 0, dashboard);
      }
    },
    deleteDashboard: (state, action: { payload: string }) => {
      const index = state.dashboards.findIndex((d) => d.id === action.payload);
      if (index !== -1 && state.dashboards.length > 1) {
        state.dashboards.splice(index, 1);
        if (state.activeDashboardId === action.payload) {
          state.activeDashboardId = state.dashboards[Math.max(0, index - 1)].id;
        }
      }
    },
  },
});

// Export actions
export const {
  addDashboard,
  setActiveDashboard,
  renameDashboard,
  cloneDashboard,
  moveDashboardLeft,
  moveDashboardRight,
  deleteDashboard,
} = acronisAnalyticsSlice.actions;

// Export the slice object (not just the reducer) for registerSlice()
export default acronisAnalyticsSlice;

// Module augmentation - extends uicore RootState
declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: AcronisAnalyticsState;
  }
}

/**
 * Type-safe selector for this slice's state
 */
export const selectAcronisAnalyticsState = (state: RootState): AcronisAnalyticsState => {
  return state[SLICE_KEY];
};
