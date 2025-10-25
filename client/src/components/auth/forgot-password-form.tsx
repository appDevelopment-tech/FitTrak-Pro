import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { ArrowLeft } from 'lucide-react';
import { clientValidationSchemas, type ForgotPasswordFormData, handleApiError, useFormValidation } from '@/lib/validation';
import { FormErrors, FieldError } from '@/components/ui/validation-errors';

interface ForgotPasswordFormProps {
  onBack?: () => void;
  onSuccess?: () => void;
}

export function ForgotPasswordForm({ onBack, onSuccess }: ForgotPasswordFormProps) {
  const { toast } = useToast();
  const { resetPassword } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(clientValidationSchemas.forgotPassword),
  });

  const { validationErrors, setErrors, clearErrors } = useFormValidation();

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsSubmitting(true);
    clearErrors();
    
    try {
      await resetPassword(data.emailOrPhone);
      
      toast({
        title: 'Инструкции отправлены!',
        description: 'Проверьте email для восстановления пароля',
      });
      
      setIsEmailSent(true);
      onSuccess?.();
    } catch (error: any) {
      // Обрабатываем ошибки валидации с сервера
      if (handleApiError(error, setErrors)) {
        return; // Ошибки валидации уже обработаны
      }
      
      // Общие ошибки
      toast({
        title: 'Ошибка',
        description: error.message || 'Произошла ошибка при восстановлении пароля',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle>Проверьте почту</CardTitle>
          <CardDescription>
            Инструкции по восстановлению пароля отправлены
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Мы отправили инструкции по восстановлению пароля на указанный адрес.
              Проверьте почту и следуйте инструкциям.
            </p>
          </div>
          
          <div className="flex flex-col space-y-2">
            <Button onClick={onBack} variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к входу
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Восстановление пароля</CardTitle>
        <CardDescription>
          Введите email для восстановления пароля
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Общие ошибки формы */}
          <FormErrors errors={validationErrors} />
          
          <div className="space-y-2">
            <Label htmlFor="emailOrPhone">Email или телефон</Label>
            <Input
              id="emailOrPhone"
              {...register('emailOrPhone')}
              placeholder="example@email.com или +7 (999) 123-45-67"
              type="text"
            />
            {/* Ошибки валидации поля */}
            <FieldError errors={validationErrors} fieldName="emailOrPhone" />
            {/* Ошибки React Hook Form */}
            {errors.emailOrPhone && (
              <p className="text-sm text-red-500">{errors.emailOrPhone.message}</p>
            )}
          </div>

          <div className="flex flex-col space-y-2">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Отправка...' : 'Отправить инструкции'}
            </Button>
            
            <Button type="button" variant="outline" onClick={onBack}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Вернуться к входу
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
