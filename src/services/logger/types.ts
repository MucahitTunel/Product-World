/**
 * Error Log Levels
 */
export enum ErrorLogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARNING = 'warning',
  ERROR = 'error',
  CRITICAL = 'critical',
}

/**
 * Error Categories
 */
export enum ErrorCategory {
  AUTHENTICATION = 'authentication',
  AUTHORIZATION = 'authorization',
  VALIDATION = 'validation',
  NETWORK = 'network',
  DATABASE = 'database',
  API = 'api',
  UI = 'ui',
  BUSINESS_LOGIC = 'business_logic',
  UNKNOWN = 'unknown',
}

/**
 * Error Types
 */
export enum ErrorType {
  // Authentication & Authorization
  LOGIN_FAILED = 'login_failed',
  LOGOUT_FAILED = 'logout_failed',
  TOKEN_EXPIRED = 'token_expired',
  UNAUTHORIZED = 'unauthorized',
  FORBIDDEN = 'forbidden',

  // Validation
  VALIDATION_ERROR = 'validation_error',
  INVALID_INPUT = 'invalid_input',
  MISSING_REQUIRED_FIELD = 'missing_required_field',

  // Network
  NETWORK_ERROR = 'network_error',
  TIMEOUT = 'timeout',
  CONNECTION_LOST = 'connection_lost',

  // API
  API_ERROR = 'api_error',
  SERVER_ERROR = 'server_error',
  BAD_REQUEST = 'bad_request',
  NOT_FOUND = 'not_found',

  // Service lifecycle events
  SERVICE_REQUEST_STARTED = 'service_request_started',
  SERVICE_REQUEST_SUCCEEDED = 'service_request_succeeded',

  // Database
  DATABASE_ERROR = 'database_error',
  QUERY_FAILED = 'query_failed',

  // UI
  RENDER_ERROR = 'render_error',
  COMPONENT_ERROR = 'component_error',

  // Business Logic
  BUSINESS_LOGIC_ERROR = 'business_logic_error',
  DATA_PROCESSING_ERROR = 'data_processing_error',

  // General
  UNKNOWN_ERROR = 'unknown_error',
  RUNTIME_ERROR = 'runtime_error',
}

/**
 * User information for context
 */
export interface ErrorUserContext {
  id?: string;
  email?: string;
  name?: string;
  [key: string]: any;
}

/**
 * Additional metadata for error context
 */
export interface ErrorMetadata {
  [key: string]: any;
  url?: string;
  userAgent?: string;
  timestamp?: number;
  component?: string;
  action?: string;
  stackTrace?: string;
}

/**
 * Error Log Entry
 */
export interface ErrorLogEntry {
  // Core fields
  id: string;
  level: ErrorLogLevel;
  category: ErrorCategory;
  type: ErrorType;
  message: string;
  description?: string;

  // Context
  timestamp: number;
  error?: Error;
  metadata?: ErrorMetadata;
  userContext?: ErrorUserContext;

  // Environment
  environment?: string;
  version?: string;
}

/**
 * Configuration for ErrorLogger
 */
export interface ErrorLoggerConfig {
  // Environment
  environment?: 'development' | 'staging' | 'production';
  version?: string;

  // Logging options
  enabled?: boolean;
  logToConsole?: boolean;
  minLevel?: ErrorLogLevel;

  // User context
  getUserContext?: () => ErrorUserContext | null;

  // Automatic metadata
  captureStackTrace?: boolean;
  captureBrowserInfo?: boolean;
  captureUrlInfo?: boolean;
}

/**
 * Error Logger Options for individual log calls
 */
export interface ErrorLogOptions {
  category?: ErrorCategory;
  type?: ErrorType;
  description?: string;
  metadata?: ErrorMetadata;
  userContext?: ErrorUserContext;
  skipTransports?: boolean;
}
