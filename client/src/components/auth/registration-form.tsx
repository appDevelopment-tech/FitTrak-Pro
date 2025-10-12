import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Схема валидации для регистрации
const registrationSchema = z.object({
  firstName: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  lastName: z.string().min(2, 'Фамилия должна содержать минимум 2 символа'),
  middleName: z.string().optional(),
  birthDate: z.string()
    .min(1, 'Дата рождения обязательна')
    .regex(/^\d{2}\.\d{2}\.\d{4}$/, 'Дата должна быть в формате ДД.ММ.ГГГГ')
    .refine((date) => {
      const [day, month, year] = date.split('.').map(Number);
      const inputDate = new Date(year, month - 1, day);
      const today = new Date();
      const age = today.getFullYear() - year;
      return inputDate <= today && age >= 0 && age <= 120;
    }, 'Некорректная дата рождения'),
  phone: z.string().min(10, 'Некорректный номер телефона'),
  email: z.string().email('Некорректный email'),
  password: z.string().min(6, 'Пароль должен содержать минимум 6 символов'),
  
  // Поля для родителей (условные)
  parentFirstName: z.string().optional(),
  parentLastName: z.string().optional(),
  parentMiddleName: z.string().optional(),
  parentPhone: z.string().optional(),
  parentEmail: z.string().email().optional().or(z.literal('')),
  isParentRepresentative: z.boolean().optional(),
  
  // Согласия
  privacyPolicyAccepted: z.boolean().refine(val => val === true, {
    message: 'Необходимо согласиться с политикой обработки персональных данных',
  }),
  contractAccepted: z.boolean().refine(val => val === true, {
    message: 'Необходимо принять условия договора-оферты',
  }),
  educationConsentAccepted: z.boolean().refine(val => val === true, {
    message: 'Необходимо дать согласие на образовательную деятельность',
  }),
}).refine((data) => {
  // Если возраст меньше 16 лет, поля родителей обязательны
  const age = calculateAge(data.birthDate);
  if (age < 16) {
    return data.parentFirstName && data.parentLastName && data.parentPhone;
  }
  return true;
}, {
  message: 'Для несовершеннолетних обязательны данные родителей',
  path: ['parentFirstName'],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

function calculateAge(birthDateString: string): number {
  if (!birthDateString || !birthDateString.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
    return 0;
  }
  
  const [day, month, year] = birthDateString.split('.').map(Number);
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();
  
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}

function formatDateInput(value: string): string {
  // Удаляем все нецифровые символы
  const numbers = value.replace(/\D/g, '');
  
  // Ограничиваем до 8 цифр
  const limitedNumbers = numbers.slice(0, 8);
  
  // Форматируем как ДД.ММ.ГГГГ
  if (limitedNumbers.length <= 2) {
    return limitedNumbers;
  } else if (limitedNumbers.length <= 4) {
    return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(2)}`;
  } else {
    return `${limitedNumbers.slice(0, 2)}.${limitedNumbers.slice(2, 4)}.${limitedNumbers.slice(4)}`;
  }
}

interface RegistrationFormProps {
  onSuccess?: () => void;
}

export function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const { toast } = useToast();
  const [isMinor, setIsMinor] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      privacyPolicyAccepted: false,
      contractAccepted: false,
      educationConsentAccepted: false,
      isParentRepresentative: false,
    },
  });

  const birthDate = watch('birthDate');

  // Отслеживаем изменения даты рождения
  useEffect(() => {
    if (birthDate && birthDate.match(/^\d{2}\.\d{2}\.\d{4}$/)) {
      const age = calculateAge(birthDate);
      setIsMinor(age < 16);
      
      // Если несовершеннолетний, автоматически отмечаем чекбокс представителя
      if (age < 16) {
        setValue('isParentRepresentative', true);
      }
    }
  }, [birthDate, setValue]);

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true);
    
    try {
      // Подготавливаем данные для отправки
      const registrationData = {
        firstName: data.firstName,
        lastName: data.lastName,
        middleName: data.middleName || '',
        birthDate: data.birthDate,
        phone: data.phone,
        email: data.email,
        password: data.password,
        joinDate: new Date().toISOString().split('T')[0],
        status: 'pending',
        
        // Поля для родителей (если несовершеннолетний)
        parentFirstName: data.parentFirstName || '',
        parentLastName: data.parentLastName || '',
        parentMiddleName: data.parentMiddleName || '',
        parentPhone: data.parentPhone || '',
        parentEmail: data.parentEmail || '',
        isParentRepresentative: data.isParentRepresentative || false,
        
        // Согласия
        privacyPolicyAccepted: data.privacyPolicyAccepted,
        privacyPolicyAcceptedDate: new Date().toISOString().split('T')[0],
        contractAccepted: data.contractAccepted,
        contractAcceptedDate: new Date().toISOString().split('T')[0],
        educationConsentAccepted: data.educationConsentAccepted,
        educationConsentAcceptedDate: new Date().toISOString().split('T')[0],
      };

      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка регистрации');
      }

      const result = await response.json();
      
      toast({
        title: 'Регистрация успешна!',
        description: 'Ваш аккаунт создан. Ожидайте подтверждения от администратора.',
      });
      
      onSuccess?.();
    } catch (error: any) {
      toast({
        title: 'Ошибка регистрации',
        description: error.message || 'Произошла ошибка при регистрации',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Регистрация нового ученика</CardTitle>
        <CardDescription>
          Заполните форму для создания аккаунта в системе FitTrak-Pro
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Основные данные */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Основные данные</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя *</Label>
                <Input
                  id="firstName"
                  {...register('firstName')}
                  placeholder="Введите имя"
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">{errors.firstName.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия *</Label>
                <Input
                  id="lastName"
                  {...register('lastName')}
                  placeholder="Введите фамилию"
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">{errors.lastName.message}</p>
                )}
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="middleName">Отчество</Label>
              <Input
                id="middleName"
                {...register('middleName')}
                placeholder="Введите отчество (необязательно)"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="birthDate">Дата рождения *</Label>
              <Input
                id="birthDate"
                {...register('birthDate')}
                placeholder="ДД.ММ.ГГГГ"
                maxLength={10}
                onChange={(e) => {
                  const formatted = formatDateInput(e.target.value);
                  setValue('birthDate', formatted);
                }}
                className="font-mono"
              />
              {errors.birthDate && (
                <p className="text-sm text-red-500">{errors.birthDate.message}</p>
              )}
              {birthDate && birthDate.match(/^\d{2}\.\d{2}\.\d{4}$/) && (
                <p className="text-sm text-muted-foreground">
                  Возраст: {calculateAge(birthDate)} лет
                </p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Телефон *</Label>
              <Input
                id="phone"
                {...register('phone')}
                placeholder="+7 (999) 123-45-67"
                type="tel"
              />
              {errors.phone && (
                <p className="text-sm text-red-500">{errors.phone.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                {...register('email')}
                placeholder="example@email.com"
                type="email"
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Пароль *</Label>
              <Input
                id="password"
                {...register('password')}
                placeholder="Минимум 6 символов"
                type="password"
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password.message}</p>
              )}
            </div>
          </div>

          {/* Данные родителей для несовершеннолетних */}
          {isMinor && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Данные родителя/законного представителя</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parentFirstName">Имя родителя *</Label>
                  <Input
                    id="parentFirstName"
                    {...register('parentFirstName')}
                    placeholder="Введите имя родителя"
                  />
                  {errors.parentFirstName && (
                    <p className="text-sm text-red-500">{errors.parentFirstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="parentLastName">Фамилия родителя *</Label>
                  <Input
                    id="parentLastName"
                    {...register('parentLastName')}
                    placeholder="Введите фамилию родителя"
                  />
                  {errors.parentLastName && (
                    <p className="text-sm text-red-500">{errors.parentLastName.message}</p>
                  )}
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentMiddleName">Отчество родителя</Label>
                <Input
                  id="parentMiddleName"
                  {...register('parentMiddleName')}
                  placeholder="Введите отчество родителя (необязательно)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Телефон родителя *</Label>
                <Input
                  id="parentPhone"
                  {...register('parentPhone')}
                  placeholder="+7 (999) 123-45-67"
                  type="tel"
                />
                {errors.parentPhone && (
                  <p className="text-sm text-red-500">{errors.parentPhone.message}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Email родителя</Label>
                <Input
                  id="parentEmail"
                  {...register('parentEmail')}
                  placeholder="parent@email.com"
                  type="email"
                />
                {errors.parentEmail && (
                  <p className="text-sm text-red-500">{errors.parentEmail.message}</p>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="isParentRepresentative"
                  {...register('isParentRepresentative')}
                />
                <Label htmlFor="isParentRepresentative">
                  Я являюсь родителем/законным представителем
                </Label>
              </div>
            </div>
          )}

          {/* Согласия */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Согласия и документы</h3>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="privacyPolicyAccepted"
                  {...register('privacyPolicyAccepted')}
                />
                <Label htmlFor="privacyPolicyAccepted" className="text-sm">
                  Соглашаюсь с{' '}
                  <a href="/documents/privacy.pdf" target="_blank" className="text-blue-600 hover:underline">
                    политикой обработки персональных данных
                  </a>{' '}
                  *
                </Label>
              </div>
              {errors.privacyPolicyAccepted && (
                <p className="text-sm text-red-500">{errors.privacyPolicyAccepted.message}</p>
              )}
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="contractAccepted"
                  {...register('contractAccepted')}
                />
                <Label htmlFor="contractAccepted" className="text-sm">
                  Принимаю условия{' '}
                  <a href="/documents/contract.pdf" target="_blank" className="text-blue-600 hover:underline">
                    договора-оферты
                  </a>{' '}
                  *
                </Label>
              </div>
              {errors.contractAccepted && (
                <p className="text-sm text-red-500">{errors.contractAccepted.message}</p>
              )}
              
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="educationConsentAccepted"
                  {...register('educationConsentAccepted')}
                />
                <Label htmlFor="educationConsentAccepted" className="text-sm">
                  Даю согласие на{' '}
                  <a href="/documents/education_consent.pdf" target="_blank" className="text-blue-600 hover:underline">
                    образовательную деятельность
                  </a>{' '}
                  *
                </Label>
              </div>
              {errors.educationConsentAccepted && (
                <p className="text-sm text-red-500">{errors.educationConsentAccepted.message}</p>
              )}
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? 'Регистрация...' : 'Зарегистрироваться'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
