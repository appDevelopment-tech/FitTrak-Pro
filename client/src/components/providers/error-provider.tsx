import React, { createContext, useContext, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { 
  ClientAppError, 
  ClientErrorHandler, 
  useErrorHandler,
  logError,
  reportError
} from '@/lib/error-handler';
import { ErrorList } from '@/components/ui/error-components';

// Контекст для глобального управления ошибками
interface ErrorContextType {
  errors: ClientAppError[];
  addError: (error: ClientAppError) => void;
  removeError: (index: number) => void;
  clearErrors: () => void;
  handleApiError: (error: any) => ClientAppError;
  retryOperation: (operation: () => Promise<any>, maxRetries?: number) => Promise<any>;
  isRetrying: boolean;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

// Провайдер для контекста ошибок
export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const errorHandler = useErrorHandler();

  // Обработка ошибок с уведомлениями
  const handleApiErrorWithToast = useCallback((error: any) => {
    const clientError = errorHandler.handleApiError(error);
    
    // Логируем ошибку
    logError(clientError, 'API Error');
    
    // Отправляем ошибку на сервер для мониторинга
    reportError(clientError);
    
    // Показываем toast уведомление
    const userMessage = ClientErrorHandler.getUserMessage(clientError);
    const isCritical = ClientErrorHandler.isCriticalError(clientError);
    
    toast({
      title: isCritical ? 'Критическая ошибка' : 'Ошибка',
      description: userMessage,
      variant: isCritical ? 'destructive' : 'destructive',
      duration: isCritical ? 10000 : 5000, // Критические ошибки показываем дольше
    });
    
    return clientError;
  }, [errorHandler, toast]);

  const contextValue: ErrorContextType = {
    ...errorHandler,
    handleApiError: handleApiErrorWithToast,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
}

// Хук для использования контекста ошибок
export function useErrorContext(): ErrorContextType {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }
  return context;
}

// Компонент для отображения глобальных ошибок
export function GlobalErrorDisplay() {
  const { errors, removeError } = useErrorContext();

  if (errors.length === 0) {
    return null;
  }

  return (
    <div className="fixed top-4 right-4 z-50 max-w-md">
      <ErrorList
        errors={errors}
        onDismiss={removeError}
        showDetails={process.env.NODE_ENV === 'development'}
        maxErrors={3}
      />
    </div>
  );
}

// HOC для обработки ошибок в компонентах
export function withErrorHandlingHOC<P extends object>(
  Component: React.ComponentType<P>
) {
  return function WithErrorHandlingComponent(props: P) {
    const { handleApiError } = useErrorContext();

    const wrappedProps = {
      ...props,
      handleApiError,
    } as P & { handleApiError: (error: any) => ClientAppError };

    return <Component {...wrappedProps} />;
  };
}

// Утилита для обработки ошибок в async функциях
export function withErrorHandling<T extends any[], R>(
  fn: (...args: T) => Promise<R>,
  context?: string
) {
  return async (...args: T): Promise<R> => {
    try {
      return await fn(...args);
    } catch (error) {
      const clientError = ClientErrorHandler.handleApiError(error);
      logError(clientError, context);
      reportError(clientError);
      throw clientError;
    }
  };
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

// Граничный компонент для отлова ошибок React
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Логируем ошибку
    console.error('React Error Boundary caught an error:', error, errorInfo);
    
    // Отправляем ошибку на сервер
    const clientError = new ClientAppError(
      error.message,
      'UNKNOWN_ERROR' as any,
      'REACT_ERROR_BOUNDARY',
      undefined,
      { errorInfo, stack: error.stack }
    );
    
    reportError(clientError);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md w-full">
            <CriticalError
              error={new ClientAppError(
                this.state.error?.message || 'Произошла ошибка в приложении',
                'UNKNOWN_ERROR' as any,
                'REACT_ERROR_BOUNDARY'
              )}
              onReport={() => {
                // Здесь можно добавить логику отправки отчета об ошибке
                console.log('Error report requested');
              }}
            />
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
