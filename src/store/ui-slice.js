import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
	name: "ui",
	initialState: {
		isCartShown: false,
		notification: null,
	},
	reducers: {
		toggle(state) {
			state.isCartShown = !state.isCartShown;
		},
		showNotification(state, action) {
			state.notification = {
				status: action.payload.status,
				title: action.payload.title,
				message: action.payload.message,
			};
		},
	},
});

export const uiActions = uiSlice.actions;
export const uiReducer = uiSlice.reducer;
