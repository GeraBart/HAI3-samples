/**
 * Dashboard effects - subscribe to events and update slice
 */

import { eventBus, store } from '@hai3/uicore';
import { dashboardEvents } from '../events/dashboardEvents';
import {
  setAddWidgetOpen,
  setViewState,
  setCreationStep,
  setGenerationComplete,
  setGeneratedWidget,
  setError,
} from '../slices/dashboardSlice';

/**
 * Initialize dashboard effects
 * Called when slice is registered
 */
export const initDashboardEffects = (): void => {
  // Panel opened
  eventBus.on(dashboardEvents.addWidgetPanelOpened, () => {
    store.dispatch(setAddWidgetOpen(true));
  });

  // Panel closed
  eventBus.on(dashboardEvents.addWidgetPanelClosed, () => {
    store.dispatch(setAddWidgetOpen(false));
  });

  // Creation started
  eventBus.on(dashboardEvents.widgetCreationStarted, () => {
    store.dispatch(setViewState('creating'));
    store.dispatch(setCreationStep('analyzing'));
    store.dispatch(setGenerationComplete(false));
  });

  // Creation step changed
  eventBus.on(dashboardEvents.widgetCreationStepChanged, ({ step }) => {
    store.dispatch(setCreationStep(step));
  });

  // Creation completed
  eventBus.on(dashboardEvents.widgetCreationCompleted, ({ widget }) => {
    store.dispatch(setViewState('preview'));
    store.dispatch(setGenerationComplete(true));
    store.dispatch(setGeneratedWidget(widget));
  });

  // Creation failed
  eventBus.on(dashboardEvents.widgetCreationFailed, ({ error }) => {
    store.dispatch(setError(error));
    store.dispatch(setViewState('initial'));
  });

  // Widget added
  eventBus.on(dashboardEvents.widgetAdded, () => {
    store.dispatch(setAddWidgetOpen(false));
  });
};
