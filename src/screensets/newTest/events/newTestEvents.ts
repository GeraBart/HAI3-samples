/**
 * newTest Events
 * Domain-specific events for this screenset
 */

import '@hai3/uicore';
import { NEW_TEST_SCREENSET_ID } from '../ids';

const DOMAIN_ID = 'newTest';

/**
 * Events enum
 * Add your events here following the pattern:
 * EventName = `${NEW_TEST_SCREENSET_ID}/${DOMAIN_ID}/eventName`
 */
export enum NewTestEvents {
  MenuVisibilityChanged = `${NEW_TEST_SCREENSET_ID}/${DOMAIN_ID}/menuVisibilityChanged`,
}

// These are used in the event enum pattern above
void NEW_TEST_SCREENSET_ID;
void DOMAIN_ID;

/**
 * Module augmentation for type-safe event payloads
 * Add your event payload types here
 */
declare module '@hai3/uicore' {
  interface EventPayloadMap {
    [NewTestEvents.MenuVisibilityChanged]: { visible: boolean };
  }
}
