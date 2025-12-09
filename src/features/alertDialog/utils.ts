import { AlertDialogConfig, AlertDialogInput } from "./types";

export const generateAlertId = (): string => {
    return `alert_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export const normalizeAlertConfig = (
    config: AlertDialogInput,
    id: string
): AlertDialogConfig => ({
    id,
    title: config.title,
    description: config.description,
    icon: config.icon,
    variant: config.variant || 'info',
    buttons: config.buttons,
})