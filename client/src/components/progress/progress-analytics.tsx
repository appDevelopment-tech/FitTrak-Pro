import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart3, 
  TrendingUp, 
  Calendar, 
  Target, 
  Award, 
  Activity,
  Users,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell } from 'recharts';
import { useQuery } from '@tanstack/react-query';
import { studentsDb, appointmentsDb } from '@/lib/database';
import type { Pupil, Appointment } from '@shared/schema';

interface ProgressData {
  date: string;
  completed: number;
  missed: number;
  total: number;
}

interface PupilProgress {
  pupil: Pupil;
  totalSessions: number;
  completedSessions: number;
  missedSessions: number;
  completionRate: number;
  lastSession?: string;
  streak: number;
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export function ProgressAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter' | 'year'>('month');
  const [selectedPupil, setSelectedPupil] = useState<number | null>(null);

  const trainerId = 1; // В реальном приложении это будет из контекста пользователя

  // Получаем данные учеников
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => studentsDb.getByTrainerId(trainerId),
  });

  // Получаем данные записей
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  // Аналитика по периодам
  const periodAnalytics = useMemo(() => {
    const now = new Date();
    let startDate: Date;
    let endDate = new Date();

    switch (selectedPeriod) {
      case 'week':
        startDate = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        break;
      case 'quarter':
        const quarter = Math.floor(now.getMonth() / 3);
        startDate = new Date(now.getFullYear(), quarter * 3, 1);
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        startDate = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    }

    const filteredAppointments = appointments.filter(apt => {
      const aptDate = new Date(apt.date);
      return aptDate >= startDate && aptDate <= endDate;
    });

    const totalSessions = filteredAppointments.length;
    const completedSessions = filteredAppointments.filter(apt => apt.status === 'confirmed').length;
    const missedSessions = filteredAppointments.filter(apt => apt.status === 'pending').length;
    const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;

    return {
      totalSessions,
      completedSessions,
      missedSessions,
      completionRate,
      startDate,
      endDate
    };
  }, [appointments, selectedPeriod]);

  // Данные для графиков
  const chartData = useMemo(() => {
    const data: ProgressData[] = [];
    const now = new Date();
    const days = selectedPeriod === 'week' ? 7 : selectedPeriod === 'month' ? 30 : 90;

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
      const dateString = date.toISOString().split('T')[0];
      
      const dayAppointments = appointments.filter(apt => apt.date === dateString);
      const completed = dayAppointments.filter(apt => apt.status === 'confirmed').length;
      const missed = dayAppointments.filter(apt => apt.status === 'pending').length;

      data.push({
        date: dateString,
        completed,
        missed,
        total: completed + missed
      });
    }

    return data;
  }, [appointments, selectedPeriod]);

  // Прогресс учеников
  const pupilsProgress = useMemo((): PupilProgress[] => {
    return pupils.map(pupil => {
      const pupilAppointments = appointments.filter(apt => apt.pupilId === pupil.id);
      const totalSessions = pupilAppointments.length;
      const completedSessions = pupilAppointments.filter(apt => apt.status === 'confirmed').length;
      const missedSessions = pupilAppointments.filter(apt => apt.status === 'pending').length;
      const completionRate = totalSessions > 0 ? (completedSessions / totalSessions) * 100 : 0;
      
      // Последняя сессия
      const lastSession = pupilAppointments
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];
      
      // Серия (упрощенная логика)
      let streak = 0;
      const sortedSessions = pupilAppointments
        .filter(apt => apt.status === 'confirmed')
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      
      for (let i = 0; i < sortedSessions.length; i++) {
        const sessionDate = new Date(sortedSessions[i].date);
        const expectedDate = new Date(new Date().getTime() - i * 7 * 24 * 60 * 60 * 1000);
        
        if (Math.abs(sessionDate.getTime() - expectedDate.getTime()) < 3 * 24 * 60 * 60 * 1000) {
          streak++;
        } else {
          break;
        }
      }

      return {
        pupil,
        totalSessions,
        completedSessions,
        missedSessions,
        completionRate,
        lastSession: lastSession?.date,
        streak
      };
    });
  }, [pupils, appointments]);

  // Статистика по группам мышц (заглушка)
  const muscleGroupStats = [
    { name: 'Грудь', value: 25, color: '#0088FE' },
    { name: 'Спина', value: 20, color: '#00C49F' },
    { name: 'Ноги', value: 30, color: '#FFBB28' },
    { name: 'Руки', value: 15, color: '#FF8042' },
    { name: 'Плечи', value: 10, color: '#8884D8' }
  ];

  return (
    <div className="space-y-6">
      {/* Заголовок и фильтры */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Аналитика и прогресс</h2>
          <p className="text-muted-foreground">Отслеживайте результаты тренировок</p>
        </div>
        
        <div className="flex items-center gap-2">
          <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)}>
            <TabsList>
              <TabsTrigger value="week">Неделя</TabsTrigger>
              <TabsTrigger value="month">Месяц</TabsTrigger>
              <TabsTrigger value="quarter">Квартал</TabsTrigger>
              <TabsTrigger value="year">Год</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Общая статистика */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="flex items-center p-6">
            <Calendar className="h-8 w-8 text-blue-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Всего сессий</p>
              <p className="text-2xl font-bold">{periodAnalytics.totalSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <CheckCircle className="h-8 w-8 text-green-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Завершено</p>
              <p className="text-2xl font-bold">{periodAnalytics.completedSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Пропущено</p>
              <p className="text-2xl font-bold">{periodAnalytics.missedSessions}</p>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="flex items-center p-6">
            <Target className="h-8 w-8 text-purple-500" />
            <div className="ml-4">
              <p className="text-sm font-medium text-muted-foreground">Успешность</p>
              <p className="text-2xl font-bold">{periodAnalytics.completionRate.toFixed(1)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Графики */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* График прогресса */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Прогресс тренировок
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="date" 
                  tickFormatter={(value) => new Date(value).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                />
                <YAxis />
                <Tooltip 
                  labelFormatter={(value) => new Date(value).toLocaleDateString('ru-RU')}
                />
                <Line type="monotone" dataKey="completed" stroke="#00C49F" strokeWidth={2} name="Завершено" />
                <Line type="monotone" dataKey="missed" stroke="#FF8042" strokeWidth={2} name="Пропущено" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Статистика по группам мышц */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              Группы мышц
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={muscleGroupStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {muscleGroupStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Прогресс учеников */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Прогресс учеников
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pupilsProgress.map((progress) => (
              <div key={progress.pupil.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium">
                    {progress.pupil.firstName.charAt(0)}{progress.pupil.lastName.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-medium">
                      {progress.pupil.firstName} {progress.pupil.lastName}
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      {progress.totalSessions} сессий • Последняя: {progress.lastSession ? new Date(progress.lastSession).toLocaleDateString('ru-RU') : 'Нет'}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-medium">
                      {progress.completionRate.toFixed(1)}% успешность
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Серия: {progress.streak} недель
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={progress.completionRate >= 80 ? 'default' : progress.completionRate >= 60 ? 'secondary' : 'destructive'}>
                      {progress.completionRate >= 80 ? 'Отлично' : progress.completionRate >= 60 ? 'Хорошо' : 'Нужно улучшить'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

