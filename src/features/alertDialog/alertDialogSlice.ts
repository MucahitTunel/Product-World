import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AlertDialogConfig, AlertDialogState } from "./types";

const initialState: AlertDialogState = {
    queue: [],
}

const alertDialogSlice = createSlice({
    name: 'alertDialog',
    initialState,
    reducers: {
        enqueueAlert: (state, action: PayloadAction<AlertDialogConfig>) => {
            state.queue.push(action.payload);
        },
        dequeueAlert: (state, action: PayloadAction<{id: string}>) => {
            state.queue = state.queue.filter(alert => alert.id !== action.payload.id);
        },
        clearAlerts: (state) => {
            state.queue = [];
        },
    },
})

export const { enqueueAlert, dequeueAlert, clearAlerts } = alertDialogSlice.actions;

export default alertDialogSlice.reducer;