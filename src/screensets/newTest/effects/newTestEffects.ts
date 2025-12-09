/**
 * newTest Effects
 * Listen to events and update slice
 * Following Flux: Effects subscribe to events and update their own slice only
 */

import { type AppDispatch, eventBus, setMenuConfig } from '@hai3/uicore';
import { NewTestEvents } from '../events/newTestEvents';

/**
 * Initialize effects
 * Called once during slice registration
 */
export const initializeNewTestEffects = (appDispatch: AppDispatch): void => {
  const dispatch = appDispatch;

  // Listen to menu visibility changes and update menu config
  eventBus.on(NewTestEvents.MenuVisibilityChanged, ({ visible }) => {
    dispatch(setMenuConfig({ visible }));
  });
};
