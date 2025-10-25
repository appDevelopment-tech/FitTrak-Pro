import React from 'react';
import { AlertCircle, X } from 'lucide-react';
import { ValidationError } from '@/lib/validation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

// Утилиты для работы с ошибками валидации
function useValidationErrors() {
  const getFieldError = (errors: ValidationError[], fieldName: string): string | undefined => {
    return errors.find(err => err.field === fieldName)?.message;
  };

  const getFieldErrors = (errors: ValidationError[], fieldName: string): string[] => {
    return errors
      .filter(err => err.field === fieldName)
      .map(err => err.message);
  };

  const hasFieldError = (errors: ValidationError[], fieldName: string): boolean => {
    return errors.some(err => err.field === fieldName);
  };

  const getGeneralErrors = (errors: ValidationError[]): string[] => {
    return errors
      .filter(err => !err.field || err.field === '')
      .map(err => err.message);
  };

  const formatErrors = (errors: ValidationError[]): string => {
    if (errors.length === 0) return '';
    
    if (errors.length === 1) {
      return errors[0].message;
    }
    
    return errors.map(err => `${err.field ? `${err.field}: ` : ''}${err.message}`).join(', ');
  };

  return {
    getFieldError,
    getFieldErrors,
    hasFieldError,
    getGeneralErrors,
    formatErrors
  };
}

interface ValidationErrorsProps {
  errors: ValidationError[];
  fieldName?: string;
  className?: string;
  showIcon?: boolean;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function ValidationErrors({ 
  errors, 
  fieldName, 
  className = "text-sm text-red-500",
  showIcon = true,
  dismissible = false,
  onDismiss
}: ValidationErrorsProps) {
  const { getFieldError, getGeneralErrors } = useValidationErrors();
  
  if (fieldName) {
    const fieldError = getFieldError(errors, fieldName);
    if (!fieldError) return null;
    
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showIcon && <AlertCircle className="h-4 w-4 text-red-500" />}
        <span>{fieldError}</span>
      </div>
    );
  }
  
  const generalErrors = getGeneralErrors(errors);
  if (generalErrors.length === 0) return null;
  
  if (generalErrors.length === 1) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {showIcon && <AlertCircle className="h-4 w-4 text-red-500" />}
        <span>{generalErrors[0]}</span>
        {dismissible && onDismiss && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-4 w-4 p-0 text-red-500 hover:text-red-700"
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
    );
  }
  
  return (
    <Alert variant="destructive" className={className}>
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>
        <div className="space-y-1">
          {generalErrors.map((error: string, index: number) => (
            <div key={index} className="flex items-center justify-between">
              <span>{error}</span>
              {dismissible && onDismiss && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-4 w-4 p-0"
                >
                  <X className="h-3 w-3" />
                </Button>
              )}
            </div>
          ))}
        </div>
      </AlertDescription>
    </Alert>
  );
}

// Компонент для отображения ошибок поля в форме
interface FieldErrorProps {
  errors: ValidationError[];
  fieldName: string;
  className?: string;
}

export function FieldError({ errors, fieldName, className }: FieldErrorProps) {
  return <ValidationErrors errors={errors} fieldName={fieldName} className={className} />;
}

// Компонент для отображения общих ошибок формы
interface FormErrorsProps {
  errors: ValidationError[];
  className?: string;
  dismissible?: boolean;
  onDismiss?: () => void;
}

export function FormErrors({ errors, className, dismissible, onDismiss }: FormErrorsProps) {
  return (
    <ValidationErrors 
      errors={errors} 
      className={className}
      dismissible={dismissible}
      onDismiss={onDismiss}
    />
  );
}

// Хук для работы с ошибками валидации в формах
export function useFormValidation() {
  const [validationErrors, setValidationErrors] = React.useState<ValidationError[]>([]);
  
  const clearErrors = () => setValidationErrors([]);
  
  const setErrors = (errors: ValidationError[]) => setValidationErrors(errors);
  
  const addError = (error: ValidationError) => {
    setValidationErrors(prev => [...prev, error]);
  };
  
  const removeError = (fieldName: string) => {
    setValidationErrors(prev => prev.filter(err => err.field !== fieldName));
  };
  
  const hasError = (fieldName: string) => {
    return validationErrors.some(err => err.field === fieldName);
  };
  
  const getFieldError = (fieldName: string) => {
    return validationErrors.find(err => err.field === fieldName)?.message;
  };
  
  const getGeneralErrors = () => {
    return validationErrors
      .filter(err => !err.field || err.field === '')
      .map(err => err.message);
  };
  
  return {
    validationErrors,
    clearErrors,
    setErrors,
    addError,
    removeError,
    hasError,
    getFieldError,
    getGeneralErrors
  };
}

// Утилита для обработки ошибок API в формах
export function handleApiError(error: any, setErrors: (errors: ValidationError[]) => void) {
  if (error?.response?.data?.errors) {
    const validationErrors = error.response.data.errors as ValidationError[];
    setErrors(validationErrors);
    return true;
  }
  
  // Если это не ошибка валидации, показываем общую ошибку
  setErrors([{
    field: '',
    message: error?.response?.data?.message || error?.message || 'Произошла ошибка',
    code: 'GENERAL_ERROR'
  }]);
  
  return false;
}
