import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    session: null,
  },
  reducers: {
    addUserSession: (state, action) => {
      state.session = action.payload;
    },
    clearUserSession: (state) => {
      state.session = null;
    },
  },
});

// Extract the action creators object and the reducer
const { actions, reducer } = userSlice;
// Extract and export each action creator by name
export const { addUserSession, clearUserSession } = actions;
// Export the reducer, either as a default or named export
export default reducer;
