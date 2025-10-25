import React from 'react';
import { ClientAppError, ClientErrorHandler } from '@/lib/error-handler';

// Компонент для отображения ошибок
interface ErrorDisplayProps {
  error: ClientAppError;
  onDismiss?: () => void;
  showDetails?: boolean;
  className?: string;
}

export function ErrorDisplay({ 
  error, 
  onDismiss, 
  showDetails = false, 
  className = "p-4 bg-red-50 border border-red-200 rounded-md" 
}: ErrorDisplayProps) {
  const userMessage = ClientErrorHandler.getUserMessage(error);
  const isCritical = ClientErrorHandler.isCriticalError(error);

  return (
    <div className={`${className} ${isCritical ? 'border-red-500 bg-red-100' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-red-800">
            {isCritical ? 'Критическая ошибка' : 'Ошибка'}
          </h4>
          <p className="mt-1 text-sm text-red-700">{userMessage}</p>
          
          {showDetails && (
            <details className="mt-2">
              <summary className="text-xs text-red-600 cursor-pointer">
                Технические детали
              </summary>
              <div className="mt-1 text-xs text-red-600 font-mono bg-red-100 p-2 rounded">
                <div>Тип: {error.type}</div>
                <div>Код: {error.code}</div>
                <div>Статус: {error.statusCode}</div>
                {error.context?.endpoint && (
                  <div>Эндпоинт: {error.context.endpoint}</div>
                )}
                {error.context?.requestId && (
                  <div>ID запроса: {error.context.requestId}</div>
                )}
              </div>
            </details>
          )}
        </div>
        
        {onDismiss && (
          <button
            onClick={onDismiss}
            className="ml-2 text-red-400 hover:text-red-600"
            aria-label="Закрыть ошибку"
          >
            ×
          </button>
        )}
      </div>
    </div>
  );
}

// Компонент для отображения списка ошибок
interface ErrorListProps {
  errors: ClientAppError[];
  onDismiss?: (index: number) => void;
  showDetails?: boolean;
  maxErrors?: number;
}

export function ErrorList({ 
  errors, 
  onDismiss, 
  showDetails = false, 
  maxErrors = 5 
}: ErrorListProps) {
  const displayErrors = errors.slice(-maxErrors);

  if (displayErrors.length === 0) {
    return null;
  }

  return (
    <div className="space-y-2">
      {displayErrors.map((error, index) => (
        <ErrorDisplay
          key={`${Date.now()}-${index}`}
          error={error}
          onDismiss={onDismiss ? () => onDismiss(index) : undefined}
          showDetails={showDetails}
        />
      ))}
      
      {errors.length > maxErrors && (
        <p className="text-xs text-gray-500 text-center">
          И еще {errors.length - maxErrors} ошибок...
        </p>
      )}
    </div>
  );
}

// Компонент для отображения состояния загрузки с возможностью повтора
interface RetryableErrorProps {
  error: ClientAppError;
  onRetry: () => void;
  isRetrying: boolean;
  className?: string;
}

export function RetryableError({ 
  error, 
  onRetry, 
  isRetrying, 
  className = "p-4 bg-yellow-50 border border-yellow-200 rounded-md" 
}: RetryableErrorProps) {
  const userMessage = ClientErrorHandler.getUserMessage(error);
  const canRetry = ClientErrorHandler.shouldRetry(error);

  return (
    <div className={className}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h4 className="text-sm font-medium text-yellow-800">
            Ошибка
          </h4>
          <p className="mt-1 text-sm text-yellow-700">{userMessage}</p>
        </div>
        
        {canRetry && (
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="ml-2 px-3 py-1 text-xs bg-yellow-200 text-yellow-800 rounded hover:bg-yellow-300 disabled:opacity-50"
          >
            {isRetrying ? 'Повтор...' : 'Повторить'}
          </button>
        )}
      </div>
    </div>
  );
}

// Компонент для отображения критических ошибок
interface CriticalErrorProps {
  error: ClientAppError;
  onReport?: () => void;
  className?: string;
}

export function CriticalError({ 
  error, 
  onReport, 
  className = "p-6 bg-red-100 border border-red-300 rounded-lg" 
}: CriticalErrorProps) {
  const userMessage = ClientErrorHandler.getUserMessage(error);

  return (
    <div className={className}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3 flex-1">
          <h3 className="text-sm font-medium text-red-800">
            Критическая ошибка
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{userMessage}</p>
            <p className="mt-2">
              Пожалуйста, обновите страницу или обратитесь в поддержку.
            </p>
          </div>
          <div className="mt-4">
            <div className="-mx-2 -my-1.5 flex">
              <button
                onClick={() => window.location.reload()}
                className="bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
              >
                Обновить страницу
              </button>
              {onReport && (
                <button
                  onClick={onReport}
                  className="ml-3 bg-red-50 px-2 py-1.5 rounded-md text-sm font-medium text-red-800 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-50 focus:ring-red-600"
                >
                  Сообщить об ошибке
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
