import { RootState } from "@/store/store";

export const selectAlertQueue = (state: RootState) => state.alertDialog.queue;
export const selectActiveAlert = (state: RootState) => state.alertDialog.queue[0] ?? null;