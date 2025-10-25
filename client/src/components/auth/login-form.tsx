import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/lib/auth';
import { Eye, EyeOff, User } from 'lucide-react';
import { clientValidationSchemas, type LoginFormData, useFormValidation } from '@/lib/validation';
import { FormErrors, FieldError } from '@/components/ui/validation-errors';
import { useErrorContext } from '@/components/providers/error-provider';

interface LoginFormProps {
  onSuccess?: () => void;
  onForgotPassword?: () => void;
  userType?: 'trainer' | 'pupil';
}

export function LoginForm({ onSuccess, onForgotPassword, userType }: LoginFormProps) {
  const { toast } = useToast();
  const { signIn } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { validationErrors, setErrors, clearErrors } = useFormValidation();
  const { handleApiError } = useErrorContext();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(clientValidationSchemas.login),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    clearErrors();
    
    try {
      await signIn(data.email, data.password);
      
      toast({
        description: 'Добро пожаловать в расписание Константина!',
      });
      
      onSuccess?.();
    } catch (error: any) {
      // Используем глобальную обработку ошибок
      const clientError = handleApiError(error);
      
      // Если это ошибка валидации, показываем в форме
      if (clientError.type === 'VALIDATION_ERROR' && clientError.details?.errors) {
        setErrors(clientError.details.errors);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Вход в систему</CardTitle>
        <CardDescription>
          Войдите в свой аккаунт
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Общие ошибки формы */}
          <FormErrors errors={validationErrors} />
          
          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Email
            </Label>
            <Input
              id="email"
              {...register('email')}
              placeholder="example@email.com"
              type="email"
            />
            {/* Ошибки валидации поля */}
            <FieldError errors={validationErrors} fieldName="email" />
            {/* Ошибки React Hook Form */}
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Пароль</Label>
            <div className="relative">
              <Input
                id="password"
                {...register('password')}
                placeholder="Введите пароль"
                type={showPassword ? 'text' : 'password'}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
            {/* Ошибки валидации поля */}
            <FieldError errors={validationErrors} fieldName="password" />
            {/* Ошибки React Hook Form */}
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              className="p-0 h-auto text-sm"
              onClick={onForgotPassword}
            >
              Забыли пароль?
            </Button>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Вход...' : 'Войти'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
