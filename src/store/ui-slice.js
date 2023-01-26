import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		isCartShown: false,
	},
	reducers: {
		toggle(state) {
			state.isCartShown = !state.isCartShown;
		},
	},
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
