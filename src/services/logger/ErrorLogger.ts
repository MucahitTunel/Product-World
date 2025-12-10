import { ErrorCategory, ErrorLogEntry, ErrorLoggerConfig, ErrorLogLevel, ErrorLogOptions, ErrorMetadata, ErrorType } from "./types";

export class ErrorLogger {
    private static instance: ErrorLogger;
    private config: Required<ErrorLoggerConfig>;

    private logBuffer: ErrorLogEntry[] = [];

    private constructor(config?: ErrorLoggerConfig) {
        this.config = {
            environment: config?.environment || 'development',
            version: config?.version || '1.0.0',

            enabled: config?.enabled ?? true,
            logToConsole: config?.logToConsole ?? true,
            minLevel: config?.minLevel || ErrorLogLevel.INFO,

            getUserContext: config?.getUserContext || (() => null),

            captureStackTrace: config?.captureStackTrace ?? true,
            captureBrowserInfo: config?.captureBrowserInfo ?? true,
            captureUrlInfo: config?.captureUrlInfo ?? true,
        };
    }

    public static getInstance(config?: ErrorLoggerConfig): ErrorLogger {
        if (!ErrorLogger.instance) {
            ErrorLogger.instance = new ErrorLogger(config);
        }
        return ErrorLogger.instance;
    }

    public updateConfig(newConfig: Partial<ErrorLoggerConfig>) {
        this.config = { ...this.config, ...newConfig };
    }

    public debug(
        message: string,
        options: ErrorLogOptions = {}
    ): ErrorLogEntry {
        return this.log(ErrorLogLevel.DEBUG, message, options);
    }

    public info(
        message: string,
        options: ErrorLogOptions = {}
    ): ErrorLogEntry {
        return this.log(ErrorLogLevel.INFO, message, options);
    }

    public warning(
        message: string,
        options: ErrorLogOptions = {}
    ): ErrorLogEntry {
        return this.log(ErrorLogLevel.WARNING, message, options);
    }

    public error(
        message: string,
        options: ErrorLogOptions = {}
    ): ErrorLogEntry {
        return this.log(ErrorLogLevel.ERROR, message, options);
    }

    public critical(
        message: string,
        options: ErrorLogOptions = {}
    ): ErrorLogEntry {
        return this.log(ErrorLogLevel.CRITICAL, message, options);
    }

    private log(
        level: ErrorLogLevel,
        message: string,
        options: ErrorLogOptions
    ): ErrorLogEntry {
        if (!this.config.enabled || !this.shouldLog(level)) {
            return this.createLogEntry(level, message, options);
        }

        const entry = this.createLogEntry(level, message, options);

        if (this.config.logToConsole) {
            this.logToConsole(entry);
        }

        // Gelecekteki uzantılar için logBuffer'a ekle
        this.logBuffer.push(entry);

        return entry;
    }


    private createLogEntry(
        level: ErrorLogLevel,
        message: string,
        options: ErrorLogOptions
    ): ErrorLogEntry {
        const entry: ErrorLogEntry = {
            id: this.generateId(),
            level,
            category: options.category || ErrorCategory.UNKNOWN,
            type: options.type || ErrorType.UNKNOWN_ERROR,
            message,
            timestamp: Date.now(),
            environment: this.config.environment,
            version: this.config.version,
            metadata: this.buildMetadata(options.metadata),
            userContext: options.userContext || this.config.getUserContext() || undefined,
        }

        return entry;
    }

    private buildMetadata(customMetadata?: ErrorMetadata): ErrorMetadata {
        const metadata: ErrorMetadata = { ...customMetadata };

        if (this.config.captureUrlInfo && typeof window !== 'undefined') {
            metadata.url = window.location.href;
            metadata.pathname = window.location.pathname;
            metadata.search = window.location.search;
        }

        if (this.config.captureBrowserInfo && typeof navigator !== 'undefined') {
            metadata.userAgent = navigator.userAgent;
            metadata.platform = navigator.platform;
            metadata.language = navigator.language;
        }

        if (this.config.captureStackTrace) {
            const stack = new Error().stack;
            if (stack) {
                metadata.stackTrace = stack;
            }
        }

        return metadata;
    }

    private shouldLog(level: ErrorLogLevel): boolean {
        const levels: ErrorLogLevel[] = [
            ErrorLogLevel.DEBUG,
            ErrorLogLevel.INFO,
            ErrorLogLevel.WARNING,
            ErrorLogLevel.ERROR,
            ErrorLogLevel.CRITICAL
        ];

        const currentLevelIndex = levels.indexOf(this.config.minLevel);
        const messageLevelIndex = levels.indexOf(level);

        return messageLevelIndex >= currentLevelIndex;
    }

    private logToConsole(entry: ErrorLogEntry) {
        const styles = this.getConsoleStyles(entry.level);
        const emoji = this.getEmoji(entry.level);

        console.group(
            `%c${emoji} [${entry.level}] ${entry.message}`,
            styles
        )

        console.log('Category:', entry.category);
        console.log('Type:', entry.type);

        if (entry.userContext) {
            console.log('User Context:', entry.userContext);
        }

        if (entry.metadata) {
            console.log('Metadata:', entry.metadata);
        }

        console.log('Timestamp:', entry.timestamp);
        console.groupEnd();
    }

    private getConsoleStyles(level: ErrorLogLevel): string {
        const styles: Record<ErrorLogLevel, string> = {
            [ErrorLogLevel.DEBUG]: 'color: #6b7280; font-weight: bold',
            [ErrorLogLevel.INFO]: 'color: #3b82f6; font-weight: bold',
            [ErrorLogLevel.WARNING]: 'color: #f59e0b; font-weight: bold',
            [ErrorLogLevel.ERROR]: 'color: #ef4444; font-weight: bold',
            [ErrorLogLevel.CRITICAL]: 'color: #dc2626; font-weight: bold; font-size: 14px',
        };
        return styles[level] || '';
    }

    private getEmoji(level: ErrorLogLevel): string {
        const emojis: Record<ErrorLogLevel, string> = {
            [ErrorLogLevel.DEBUG]: '🐛',
            [ErrorLogLevel.INFO]: 'ℹ️',
            [ErrorLogLevel.WARNING]: '⚠️',
            [ErrorLogLevel.ERROR]: '❌',
            [ErrorLogLevel.CRITICAL]: '💀',
        };
        return emojis[level] || '';
    }

    private generateId(): string {
        return Math.random().toString(36).substr(2, 9);
    }
}

export const logger = ErrorLogger.getInstance();