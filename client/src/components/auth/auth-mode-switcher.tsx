import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface AuthModeSwitcherProps {
  isRealAuth: boolean;
  onToggle: () => void;
}

export function AuthModeSwitcher({ isRealAuth, onToggle }: AuthModeSwitcherProps) {
  return (
    <Card className="w-full max-w-md mx-auto mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center justify-between">
          Режим аутентификации
          <Badge variant={isRealAuth ? "default" : "secondary"}>
            {isRealAuth ? "Реальная" : "Тестовая"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-start space-x-2">
          {isRealAuth ? (
            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
          )}
          <div className="text-xs text-muted-foreground">
            {isRealAuth ? (
              <div>
                <p className="font-medium text-green-700">Реальная аутентификация активна</p>
                <p>Используется Supabase для входа и регистрации</p>
              </div>
            ) : (
              <div>
                <p className="font-medium text-yellow-700">Тестовый режим активен</p>
                <p>Настройте Supabase для реальной аутентификации</p>
              </div>
            )}
          </div>
        </div>
        
        <Button
          onClick={onToggle}
          variant="outline"
          size="sm"
          className="w-full"
        >
          {isRealAuth ? "Переключить в тестовый режим" : "Настроить реальную аутентификацию"}
        </Button>
        
        {!isRealAuth && (
          <div className="text-xs text-muted-foreground bg-yellow-50 p-2 rounded">
            <p className="font-medium text-yellow-800 mb-1">Для настройки Supabase:</p>
            <ol className="list-decimal list-inside space-y-1 text-yellow-700">
              <li>Создайте проект на supabase.com</li>
              <li>Скопируйте URL и ключ</li>
              <li>Создайте файл .env с переменными</li>
              <li>Настройте базу данных (см. SUPABASE_SETUP.md)</li>
            </ol>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

