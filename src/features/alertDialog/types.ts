export type AlertDialogVariant = 'info' | 'warning' | 'error' | 'success';

export interface ButtonConfig {
    label: string;
    onClick: () => void;
}

export interface AlertDialogConfig {
    id: string;
    title: string;
    description?: string;
    icon?: string;
    variant?: AlertDialogVariant;
    buttons: Array<ButtonConfig>;
}

export type AlertDialogInput = Omit<AlertDialogConfig, 'id'>;

export interface AlertDialogState {
    queue: AlertDialogConfig[];
}