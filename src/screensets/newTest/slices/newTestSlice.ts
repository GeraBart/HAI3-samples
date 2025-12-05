/**
 * newTest Slice
 * Redux state management for this screenset
 * Following Flux: Effects dispatch these reducers after listening to events
 */

import { createSlice } from '@reduxjs/toolkit';
import type { RootState } from '@hai3/uicore';
import { NEW_TEST_SCREENSET_ID } from '../ids';

const SLICE_KEY = `${NEW_TEST_SCREENSET_ID}/newTest` as const;

/**
 * State interface
 * Add your state properties here
 */
export interface NewTestState {
  // Add your state properties here
}

const initialState: NewTestState = {
  // Initialize your state here
};

export const newTestSlice = createSlice({
  name: SLICE_KEY,
  initialState,
  reducers: {
    // Add your reducers here
    // Example:
    // setData: (state, action: PayloadAction<Data>) => {
    //   state.data = action.payload;
    // },
  },
});

// Export actions
// export const { } = newTestSlice.actions;

// Export the slice object (not just the reducer) for registerSlice()
export default newTestSlice;

// Module augmentation - extends uicore RootState
declare module '@hai3/uicore' {
  interface RootState {
    [SLICE_KEY]: NewTestState;
  }
}

/**
 * Type-safe selector for this slice's state
 */
export const selectNewTestState = (state: RootState): NewTestState => {
  return state[SLICE_KEY];
};
