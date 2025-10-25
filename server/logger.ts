import { Request, Response, NextFunction } from 'express';
import { ZodError } from 'zod';

// Уровни логирования
export enum LogLevel {
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
}

// Структура лога
export interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  context?: {
    userId?: string;
    requestId?: string;
    endpoint?: string;
    method?: string;
    userAgent?: string;
    ip?: string;
  };
  error?: {
    name: string;
    message: string;
    stack?: string;
    code?: string;
  };
  data?: Record<string, any>;
}

// Типы ошибок приложения
export enum AppErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR',
  EXTERNAL_SERVICE_ERROR = 'EXTERNAL_SERVICE_ERROR',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  RATE_LIMIT_ERROR = 'RATE_LIMIT_ERROR'
}

// Кастомный класс ошибки приложения
export class AppError extends Error {
  public readonly type: AppErrorType;
  public readonly statusCode: number;
  public readonly isOperational: boolean;
  public readonly context?: Record<string, any>;

  constructor(
    message: string,
    type: AppErrorType,
    statusCode: number = 500,
    isOperational: boolean = true,
    context?: Record<string, any>
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.context = context;

    Error.captureStackTrace(this, this.constructor);
  }
}

// Класс для логирования
export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private createLogEntry(
    level: LogLevel,
    message: string,
    context?: LogEntry['context'],
    error?: LogEntry['error'],
    data?: Record<string, any>
  ): LogEntry {
    return {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      error,
      data
    };
  }

  private addLog(entry: LogEntry): void {
    this.logs.push(entry);
    
    // Ограничиваем количество логов в памяти
    if (this.logs.length > this.maxLogs) {
      this.logs = this.logs.slice(-this.maxLogs);
    }

    // В production здесь можно добавить отправку в внешние системы логирования
    this.outputLog(entry);
  }

  private outputLog(entry: LogEntry): void {
    const logString = JSON.stringify(entry, null, 2);
    
    switch (entry.level) {
      case LogLevel.ERROR:
        console.error(logString);
        break;
      case LogLevel.WARN:
        console.warn(logString);
        break;
      case LogLevel.INFO:
        console.info(logString);
        break;
      case LogLevel.DEBUG:
        console.debug(logString);
        break;
    }
  }

  public error(message: string, error?: Error, context?: LogEntry['context'], data?: Record<string, any>): void {
    const logEntry = this.createLogEntry(
      LogLevel.ERROR,
      message,
      context,
      error ? {
        name: error.name,
        message: error.message,
        stack: error.stack,
        code: (error as any).code
      } : undefined,
      data
    );
    this.addLog(logEntry);
  }

  public warn(message: string, context?: LogEntry['context'], data?: Record<string, any>): void {
    const logEntry = this.createLogEntry(LogLevel.WARN, message, context, undefined, data);
    this.addLog(logEntry);
  }

  public info(message: string, context?: LogEntry['context'], data?: Record<string, any>): void {
    const logEntry = this.createLogEntry(LogLevel.INFO, message, context, undefined, data);
    this.addLog(logEntry);
  }

  public debug(message: string, context?: LogEntry['context'], data?: Record<string, any>): void {
    const logEntry = this.createLogEntry(LogLevel.DEBUG, message, context, undefined, data);
    this.addLog(logEntry);
  }

  public getLogs(level?: LogLevel, limit?: number): LogEntry[] {
    let filteredLogs = this.logs;
    
    if (level) {
      filteredLogs = this.logs.filter(log => log.level === level);
    }
    
    if (limit) {
      filteredLogs = filteredLogs.slice(-limit);
    }
    
    return filteredLogs;
  }

  public clearLogs(): void {
    this.logs = [];
  }
}

// Утилиты для работы с ошибками
export class ErrorHandler {
  private static logger = Logger.getInstance();

  // Обработка ошибок валидации Zod
  public static handleValidationError(error: ZodError, req: Request): AppError {
    const errorMessages = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message,
      code: err.code
    }));

    this.logger.warn('Validation error', {
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    }, { errors: errorMessages });

    return new AppError(
      'Ошибка валидации данных',
      AppErrorType.VALIDATION_ERROR,
      400,
      true,
      { errors: errorMessages }
    );
  }

  // Обработка ошибок базы данных
  public static handleDatabaseError(error: Error, req: Request): AppError {
    this.logger.error('Database error', error, {
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    return new AppError(
      'Ошибка базы данных',
      AppErrorType.DATABASE_ERROR,
      500,
      true
    );
  }

  // Обработка ошибок аутентификации
  public static handleAuthenticationError(message: string, req: Request): AppError {
    this.logger.warn('Authentication error', {
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    }, { message });

    return new AppError(
      message,
      AppErrorType.AUTHENTICATION_ERROR,
      401,
      true
    );
  }

  // Обработка ошибок авторизации
  public static handleAuthorizationError(message: string, req: Request): AppError {
    this.logger.warn('Authorization error', {
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    }, { message });

    return new AppError(
      message,
      AppErrorType.AUTHORIZATION_ERROR,
      403,
      true
    );
  }

  // Обработка ошибок "не найдено"
  public static handleNotFoundError(resource: string, req: Request): AppError {
    this.logger.info('Resource not found', {
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    }, { resource });

    return new AppError(
      `${resource} не найден`,
      AppErrorType.NOT_FOUND_ERROR,
      404,
      true
    );
  }

  // Обработка неожиданных ошибок
  public static handleUnexpectedError(error: Error, req: Request): AppError {
    this.logger.error('Unexpected error', error, {
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });

    return new AppError(
      'Внутренняя ошибка сервера',
      AppErrorType.INTERNAL_ERROR,
      500,
      false
    );
  }
}

// Middleware для обработки ошибок
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const logger = Logger.getInstance();
  
  let appError: AppError;

  if (error instanceof AppError) {
    appError = error;
  } else if (error instanceof ZodError) {
    appError = ErrorHandler.handleValidationError(error, req);
  } else {
    appError = ErrorHandler.handleUnexpectedError(error, req);
  }

  // Логируем ошибку
  logger.error(`Request failed: ${appError.message}`, appError, {
    endpoint: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    requestId: req.headers['x-request-id'] as string
  });

  // Отправляем ответ
  const response: any = {
    message: appError.message,
    type: appError.type,
    timestamp: new Date().toISOString()
  };

  // Добавляем контекст для операционных ошибок
  if (appError.isOperational && appError.context) {
    response.context = appError.context;
  }

  // В development режиме добавляем stack trace
  if (process.env.NODE_ENV === 'development') {
    response.stack = appError.stack;
  }

  res.status(appError.statusCode).json(response);
}

// Middleware для логирования запросов
export function requestLogger(req: Request, res: Response, next: NextFunction): void {
  const logger = Logger.getInstance();
  const startTime = Date.now();

  // Генерируем уникальный ID запроса
  const requestId = req.headers['x-request-id'] as string || 
                   `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

  req.headers['x-request-id'] = requestId;

  logger.info('Request started', {
    requestId,
    endpoint: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Перехватываем завершение ответа
  res.on('finish', () => {
    const duration = Date.now() - startTime;
    const level = res.statusCode >= 400 ? LogLevel.WARN : LogLevel.INFO;

    logger[level](`Request completed`, {
      requestId,
      endpoint: req.path,
      method: req.method,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    }, { duration: `${duration}ms`, statusCode: res.statusCode });
  });

  next();
}

// Утилита для создания контекста запроса
export function createRequestContext(req: Request): LogEntry['context'] {
  return {
    requestId: req.headers['x-request-id'] as string,
    endpoint: req.path,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id
  };
}

// Экспорт синглтона логгера
export const logger = Logger.getInstance();
