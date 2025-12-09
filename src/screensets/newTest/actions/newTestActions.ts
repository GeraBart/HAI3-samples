/**
 * newTest Actions
 * Emit events AND interact with APIs (Flux pattern)
 * Following Flux: Actions emit events for effects to update Redux, and call APIs
 */

import { eventBus } from '@hai3/uicore';
import { NewTestEvents } from '../events/newTestEvents';

/**
 * Set menu visibility
 * Emits event for effects to update Redux
 */
export const setMenuVisibility = (visible: boolean): void => {
  eventBus.emit(NewTestEvents.MenuVisibilityChanged, { visible });
};
