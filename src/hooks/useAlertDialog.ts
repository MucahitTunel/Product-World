import { dequeueAlert, enqueueAlert } from "@/features/alertDialog/alertDialogSlice";
import { AlertDialogInput } from "@/features/alertDialog/types";
import { generateAlertId, normalizeAlertConfig } from "@/features/alertDialog/utils";
import { useAppDispatch } from "@/store/hooks";

export function useAlertDialog() {
    const dispatch = useAppDispatch();

    const showAlert = (input: AlertDialogInput) => {
        const id = generateAlertId();
        const payload = normalizeAlertConfig(input, id);
        dispatch(enqueueAlert(payload));
        return id;
    }

    const dismissAlert = (id: string) => {
        dispatch(dequeueAlert({ id }));
    }

    return { showAlert, dismissAlert };
}