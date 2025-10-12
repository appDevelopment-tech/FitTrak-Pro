import { useState } from 'react';
import { useLocation } from 'wouter';
import { useAuth } from '@/lib/auth';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Shield, Lock } from 'lucide-react';

export default function AdminLoginPage() {
  const [, setLocation] = useLocation();
  const { signIn } = useAuth();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await signIn(formData.emailOrUsername, formData.password, 'trainer');

      toast({
        title: 'Вход выполнен!',
        description: 'Добро пожаловать в панель администратора',
      });

      setLocation('/admin/dashboard');
    } catch (error: any) {
      toast({
        title: 'Ошибка входа',
        description: error.message || 'Неверные данные для входа',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-md">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="mx-auto w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">FitTrak-Pro</h1>
          <p className="text-slate-300">
            Панель администратора
          </p>
        </div>

        {/* Форма входа */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Вход для персонала
            </CardTitle>
            <CardDescription className="text-slate-400">
              Доступ только для тренеров и администраторов
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOrUsername" className="text-slate-300">
                  Email или имя пользователя
                </Label>
                <Input
                  id="emailOrUsername"
                  value={formData.emailOrUsername}
                  onChange={(e) => setFormData({ ...formData, emailOrUsername: e.target.value })}
                  placeholder="admin@fittrak.pro или admin"
                  type="text"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-300">Пароль</Label>
                <div className="relative">
                  <Input
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Введите пароль"
                    type={showPassword ? 'text' : 'password'}
                    className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 pr-10"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-slate-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Вход...' : 'Войти в панель'}
              </Button>
            </form>

            {/* Предупреждение */}
            <div className="mt-6 p-3 bg-slate-700 rounded-lg border border-slate-600">
              <p className="text-xs text-slate-400 text-center">
                ⚠️ Этот вход предназначен только для персонала. 
                Обычные пользователи должны использовать{' '}
                <a href="/login" className="text-blue-400 hover:underline">
                  публичный вход
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Тестовые данные */}
        <Card className="mt-4 bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white text-sm">Тестовые данные</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-slate-400 space-y-1">
            <p><strong>Админ:</strong> admin@fittrak.pro / admin123</p>
            <p><strong>Тренер:</strong> trainer@fittrak.pro / trainer123</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
