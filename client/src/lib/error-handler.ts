import React from 'react';

// Типы ошибок клиента
export enum ClientErrorType {
  NETWORK_ERROR = 'NETWORK_ERROR',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  NOT_FOUND_ERROR = 'NOT_FOUND_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

// Структура ошибки клиента
export interface ClientError {
  type: ClientErrorType;
  message: string;
  code?: string;
  statusCode?: number;
  details?: any;
  timestamp: string;
  context?: {
    endpoint?: string;
    method?: string;
    userId?: string;
    requestId?: string;
  };
}

// Класс ошибки клиента
export class ClientAppError extends Error {
  public readonly type: ClientErrorType;
  public readonly code?: string;
  public readonly statusCode?: number;
  public readonly details?: any;
  public readonly context?: ClientError['context'];

  constructor(
    message: string,
    type: ClientErrorType,
    code?: string,
    statusCode?: number,
    details?: any,
    context?: ClientError['context']
  ) {
    super(message);
    this.type = type;
    this.code = code;
    this.statusCode = statusCode;
    this.details = details;
    this.context = context;
    this.name = 'ClientAppError';
  }
}

// Утилиты для обработки ошибок
export class ClientErrorHandler {
  // Обработка ошибок API
  public static handleApiError(error: any): ClientAppError {
    const timestamp = new Date().toISOString();
    
    // Сетевая ошибка
    if (!error.response) {
      return new ClientAppError(
        'Ошибка сети. Проверьте подключение к интернету.',
        ClientErrorType.NETWORK_ERROR,
        'NETWORK_ERROR',
        undefined,
        { originalError: error.message }
      );
    }

    const { status, data } = error.response;
    const context = {
      endpoint: error.config?.url,
      method: error.config?.method,
      requestId: error.response.headers?.['x-request-id']
    };

    // Ошибки валидации
    if (status === 400 && data?.type === 'VALIDATION_ERROR') {
      return new ClientAppError(
        data.message || 'Ошибка валидации данных',
        ClientErrorType.VALIDATION_ERROR,
        data.type,
        status,
        data.context,
        context
      );
    }

    // Ошибки аутентификации
    if (status === 401) {
      return new ClientAppError(
        data?.message || 'Необходима авторизация',
        ClientErrorType.AUTHENTICATION_ERROR,
        data?.type || 'AUTHENTICATION_ERROR',
        status,
        data,
        context
      );
    }

    // Ошибки авторизации
    if (status === 403) {
      return new ClientAppError(
        data?.message || 'Недостаточно прав доступа',
        ClientErrorType.AUTHORIZATION_ERROR,
        data?.type || 'AUTHORIZATION_ERROR',
        status,
        data,
        context
      );
    }

    // Ошибки "не найдено"
    if (status === 404) {
      return new ClientAppError(
        data?.message || 'Ресурс не найден',
        ClientErrorType.NOT_FOUND_ERROR,
        data?.type || 'NOT_FOUND_ERROR',
        status,
        data,
        context
      );
    }

    // Ошибки сервера
    if (status >= 500) {
      return new ClientAppError(
        data?.message || 'Ошибка сервера. Попробуйте позже.',
        ClientErrorType.SERVER_ERROR,
        data?.type || 'SERVER_ERROR',
        status,
        data,
        context
      );
    }

    // Таймаут
    if (error.code === 'ECONNABORTED') {
      return new ClientAppError(
        'Превышено время ожидания запроса',
        ClientErrorType.TIMEOUT_ERROR,
        'TIMEOUT_ERROR',
        undefined,
        { timeout: error.config?.timeout },
        context
      );
    }

    // Неизвестная ошибка
    return new ClientAppError(
      data?.message || 'Произошла неизвестная ошибка',
      ClientErrorType.UNKNOWN_ERROR,
      data?.type || 'UNKNOWN_ERROR',
      status,
      data,
      context
    );
  }

  // Получение пользовательского сообщения об ошибке
  public static getUserMessage(error: ClientAppError): string {
    switch (error.type) {
      case ClientErrorType.NETWORK_ERROR:
        return 'Проблемы с подключением к интернету. Проверьте соединение.';
      
      case ClientErrorType.VALIDATION_ERROR:
        return error.message;
      
      case ClientErrorType.AUTHENTICATION_ERROR:
        return 'Сессия истекла. Войдите в систему заново.';
      
      case ClientErrorType.AUTHORIZATION_ERROR:
        return 'У вас нет прав для выполнения этого действия.';
      
      case ClientErrorType.NOT_FOUND_ERROR:
        return 'Запрашиваемый ресурс не найден.';
      
      case ClientErrorType.SERVER_ERROR:
        return 'Временные проблемы с сервером. Попробуйте позже.';
      
      case ClientErrorType.TIMEOUT_ERROR:
        return 'Запрос выполняется слишком долго. Попробуйте еще раз.';
      
      default:
        return 'Произошла ошибка. Попробуйте еще раз.';
    }
  }

  // Проверка, является ли ошибка критической
  public static isCriticalError(error: ClientAppError): boolean {
    return [
      ClientErrorType.SERVER_ERROR,
      ClientErrorType.NETWORK_ERROR,
      ClientErrorType.TIMEOUT_ERROR
    ].includes(error.type);
  }

  // Проверка, требует ли ошибка повторной попытки
  public static shouldRetry(error: ClientAppError): boolean {
    return [
      ClientErrorType.NETWORK_ERROR,
      ClientErrorType.SERVER_ERROR,
      ClientErrorType.TIMEOUT_ERROR
    ].includes(error.type);
  }
}

// Хук для обработки ошибок в компонентах
export function useErrorHandler() {
  const [errors, setErrors] = React.useState<ClientAppError[]>([]);
  const [isRetrying, setIsRetrying] = React.useState(false);

  const addError = (error: ClientAppError) => {
    setErrors(prev => [...prev, error]);
  };

  const removeError = (index: number) => {
    setErrors(prev => prev.filter((_, i) => i !== index));
  };

  const clearErrors = () => {
    setErrors([]);
  };

  const handleApiError = (error: any) => {
    const clientError = ClientErrorHandler.handleApiError(error);
    addError(clientError);
    return clientError;
  };

  const retryOperation = async (operation: () => Promise<any>, maxRetries: number = 3) => {
    setIsRetrying(true);
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation();
        setIsRetrying(false);
        return result;
      } catch (error) {
        const clientError = ClientErrorHandler.handleApiError(error);
        
        if (attempt === maxRetries || !ClientErrorHandler.shouldRetry(clientError)) {
          addError(clientError);
          setIsRetrying(false);
          throw clientError;
        }
        
        // Ждем перед повторной попыткой
        await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
      }
    }
    
    setIsRetrying(false);
  };

  return {
    errors,
    isRetrying,
    addError,
    removeError,
    clearErrors,
    handleApiError,
    retryOperation
  };
}

// Утилита для логирования ошибок в консоль (для разработки)
export function logError(error: ClientAppError, context?: string) {
  if (process.env.NODE_ENV === 'development') {
    console.group(`🚨 Client Error${context ? ` - ${context}` : ''}`);
    console.error('Message:', error.message);
    console.error('Type:', error.type);
    console.error('Code:', error.code);
    console.error('Status:', error.statusCode);
    console.error('Context:', error.context);
    console.error('Details:', error.details);
    console.groupEnd();
  }
}

// Утилита для отправки ошибок на сервер (для мониторинга)
export async function reportError(error: ClientAppError, userId?: string) {
  try {
    // В production здесь можно отправлять ошибки в систему мониторинга
    // например, Sentry, LogRocket, или собственный API
    console.log('Error reported:', {
      ...error,
      userId,
      userAgent: navigator.userAgent,
      url: window.location.href,
      timestamp: new Date().toISOString()
    });
  } catch (reportingError) {
    console.error('Failed to report error:', reportingError);
  }
}
