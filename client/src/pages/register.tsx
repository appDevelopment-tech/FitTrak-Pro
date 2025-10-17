import { RegistrationForm } from '@/components/auth/registration-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function RegisterPage() {
  const handleSuccess = () => {
    // После успешной регистрации перенаправляем на страницу входа
    window.location.href = '/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            FitTrak-Pro
          </h1>
          <p className="text-lg text-gray-600">
            Система управления фитнес-тренировками
          </p>
        </div>
        
        <RegistrationForm onSuccess={handleSuccess} />
        
        <div className="text-center mt-6">
          <p className="text-gray-600">
            Уже есть аккаунт?{' '}
            <a href="/login" className="text-blue-600 hover:underline font-medium">
              Войти в систему
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
