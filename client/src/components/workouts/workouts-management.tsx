import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dumbbell, Plus, Edit, Calendar as CalendarIcon, Clock, Target, User, CheckCircle, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WorkoutPlan {
  id: number;
  name: string;
  description: string;
  difficulty: string;
  sessionsPerWeek: number;
  type: 'ready' | 'custom';
  exercises?: string[];
}

interface CustomWorkout {
  name: string;
  level: 'начальный' | 'базовый' | 'средний' | 'высокий';
  sessionsPerWeek: number;
  sessionDuration: number;
  totalSessions: number;
  selectedDates: Date[];
  trainerNotes: string;
}

export function WorkoutsManagement() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showCalendarSelector, setShowCalendarSelector] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [customWorkout, setCustomWorkout] = useState<CustomWorkout>({
    name: '',
    level: 'начальный',
    sessionsPerWeek: 3,
    sessionDuration: 60,
    totalSessions: 12,
    selectedDates: [],
    trainerNotes: ''
  });

  const { toast } = useToast();

  // Готовые планы тренировок
  const readyPlans: WorkoutPlan[] = [
    {
      id: 1,
      name: "Все тело",
      description: "Комплексная тренировка всех групп мышц за одну сессию",
      difficulty: "начальный",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Приседания", "Отжимания", "Подтягивания", "Планка"]
    },
    {
      id: 2,
      name: "Тяни-толкай",
      description: "Разделение на тянущие и толкающие движения",
      difficulty: "базовый",
      sessionsPerWeek: 4,
      type: 'ready',
      exercises: ["Становая тяга", "Жим лежа", "Тяга штанги", "Жим стоя"]
    },
    {
      id: 3,
      name: "Верх-низ",
      description: "Разделение тренировок на верх и низ тела",
      difficulty: "средний",
      sessionsPerWeek: 4,
      type: 'ready',
      exercises: ["Приседания", "Жим лежа", "Становая тяга", "Подтягивания"]
    },
    {
      id: 4,
      name: "Грудь-спина-кардио / Ноги-плечи / Руки-живот",
      description: "Трехдневный сплит с кардио",
      difficulty: "средний",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Жим лежа", "Тяга", "Приседания", "Жим стоя", "Бицепс", "Трицепс"]
    },
    {
      id: 5,
      name: "Грудь-спина / Ноги / Плечи-руки",
      description: "Классический трехдневный сплит",
      difficulty: "высокий",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Жим лежа", "Тяга штанги", "Присед", "Жим стоя", "Подъемы на бицепс"]
    },
    {
      id: 6,
      name: "Грудь-трицепс / Спина-бицепс / Ноги-плечи-живот",
      description: "Продвинутый сплит по группам мышц",
      difficulty: "высокий",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Жим лежа", "Разгибания", "Тяга", "Подъемы", "Присед", "Жим стоя"]
    }
  ];

  const handleSelectPlan = (plan: WorkoutPlan) => {
    toast({
      title: "План выбран",
      description: `План "${plan.name}" готов для прикрепления к ученику`,
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    const isSelected = selectedDates.some(d => d.toDateString() === date.toDateString());
    
    if (isSelected) {
      setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
    } else {
      setSelectedDates(prev => [...prev, date]);
    }
  };

  const canConfirmSchedule = selectedDates.length === customWorkout.sessionsPerWeek;

  const handleCreateWorkout = () => {
    if (!customWorkout.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название тренировки",
        variant: "destructive",
      });
      return;
    }

    if (selectedDates.length !== customWorkout.sessionsPerWeek) {
      toast({
        title: "Ошибка",
        description: `Выберите ${customWorkout.sessionsPerWeek} дней для тренировок`,
        variant: "destructive",
      });
      return;
    }

    // Создание кастомной тренировки
    toast({
      title: "Успешно",
      description: `Тренировка "${customWorkout.name}" создана`,
    });

    // Сброс формы
    setCustomWorkout({
      name: '',
      level: 'начальный',
      sessionsPerWeek: 3,
      sessionDuration: 60,
      totalSessions: 12,
      selectedDates: [],
      trainerNotes: ''
    });
    setSelectedDates([]);
    setShowCreateDialog(false);
    setShowCalendarSelector(false);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'начальный': return 'bg-green-100 text-green-800';
      case 'базовый': return 'bg-blue-100 text-blue-800';
      case 'средний': return 'bg-yellow-100 text-yellow-800';
      case 'высокий': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Dumbbell className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold">Тренировки</h2>
        </div>
        <Button 
          onClick={() => setShowCreateDialog(true)}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Создать тренировку
        </Button>
      </div>

      <Tabs defaultValue="ready-plans" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="ready-plans">Готовые планы</TabsTrigger>
          <TabsTrigger value="create-workout">Создать тренировку</TabsTrigger>
        </TabsList>

        {/* Готовые планы */}
        <TabsContent value="ready-plans" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {readyPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{plan.name}</CardTitle>
                    <Badge className={getDifficultyColor(plan.difficulty)}>
                      {plan.difficulty}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {plan.description}
                  </p>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="h-4 w-4" />
                      {plan.sessionsPerWeek}/неделя
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-medium text-gray-500">ОСНОВНЫЕ УПРАЖНЕНИЯ</Label>
                    <div className="flex flex-wrap gap-1">
                      {plan.exercises?.slice(0, 3).map((exercise, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {exercise}
                        </Badge>
                      ))}
                      {plan.exercises && plan.exercises.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{plan.exercises.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1"
                    >
                      <Edit className="h-4 w-4 mr-1" />
                      Редактировать
                    </Button>
                    <Button
                      onClick={() => handleSelectPlan(plan)}
                      size="sm"
                      className="flex-1"
                    >
                      Выбрать
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Создать тренировку */}
        <TabsContent value="create-workout" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Создание новой тренировки</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="workout-name">Название тренировки</Label>
                    <Input
                      id="workout-name"
                      value={customWorkout.name}
                      onChange={(e) => setCustomWorkout(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Введите название тренировки"
                    />
                  </div>

                  <div>
                    <Label htmlFor="level">Уровень сложности</Label>
                    <Select
                      value={customWorkout.level}
                      onValueChange={(value: any) => setCustomWorkout(prev => ({ ...prev, level: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="начальный">Начальный</SelectItem>
                        <SelectItem value="базовый">Базовый</SelectItem>
                        <SelectItem value="средний">Средний</SelectItem>
                        <SelectItem value="высокий">Высокий</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sessions-per-week">Количество тренировок в неделю</Label>
                    <Select
                      value={customWorkout.sessionsPerWeek.toString()}
                      onValueChange={(value) => {
                        const newValue = parseInt(value);
                        setCustomWorkout(prev => ({ ...prev, sessionsPerWeek: newValue }));
                        setSelectedDates([]); // Сброс выбранных дат при изменении количества
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 раза в неделю</SelectItem>
                        <SelectItem value="3">3 раза в неделю</SelectItem>
                        <SelectItem value="4">4 раза в неделю</SelectItem>
                        <SelectItem value="5">5 раз в неделю</SelectItem>
                        <SelectItem value="6">6 раз в неделю</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="session-duration">Время тренировки (минуты)</Label>
                    <Input
                      id="session-duration"
                      type="number"
                      value={customWorkout.sessionDuration}
                      onChange={(e) => setCustomWorkout(prev => ({ ...prev, sessionDuration: parseInt(e.target.value) || 60 }))}
                      min="30"
                      max="180"
                    />
                  </div>

                  <div>
                    <Label htmlFor="total-sessions">Всего тренировок</Label>
                    <Input
                      id="total-sessions"
                      type="number"
                      value={customWorkout.totalSessions}
                      onChange={(e) => setCustomWorkout(prev => ({ ...prev, totalSessions: parseInt(e.target.value) || 12 }))}
                      min="1"
                      max="100"
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Выбор дней тренировок</Label>
                      <Badge variant={canConfirmSchedule ? "default" : "secondary"}>
                        {selectedDates.length} из {customWorkout.sessionsPerWeek}
                      </Badge>
                    </div>
                    <Button
                      variant="outline"
                      onClick={() => setShowCalendarSelector(true)}
                      className="w-full"
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDates.length > 0 
                        ? `Выбрано дней: ${selectedDates.length}` 
                        : "Выбрать дни в календаре"
                      }
                    </Button>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="trainer-notes">Отметка тренера</Label>
                <Textarea
                  id="trainer-notes"
                  value={customWorkout.trainerNotes}
                  onChange={(e) => setCustomWorkout(prev => ({ ...prev, trainerNotes: e.target.value }))}
                  placeholder="Записи о самочувствии ученика и ходе тренировки..."
                  rows={3}
                />
              </div>

              <div className="flex items-center gap-4 pt-4 border-t">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  {canConfirmSchedule ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Готово к созданию
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      Выберите все {customWorkout.sessionsPerWeek} дней
                    </>
                  )}
                </div>
                <Button
                  onClick={handleCreateWorkout}
                  disabled={!canConfirmSchedule || !customWorkout.name.trim()}
                  className="ml-auto"
                >
                  Создать тренировку
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог выбора календаря */}
      <Dialog open={showCalendarSelector} onOpenChange={setShowCalendarSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Выберите дни тренировок</DialogTitle>
            <DialogDescription>
              Выберите {customWorkout.sessionsPerWeek} дней в неделю для тренировок
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => {
                if (dates) {
                  setSelectedDates(Array.isArray(dates) ? dates : [dates]);
                }
              }}
              disabled={(date) => {
                // Ограничиваем выбор только будущими датами
                return date < new Date();
              }}
              className="rounded-md border"
            />
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="text-sm text-gray-600">
                Выбрано: {selectedDates.length} из {customWorkout.sessionsPerWeek}
              </div>
              <div className="flex gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedDates([]);
                    setShowCalendarSelector(false);
                  }}
                >
                  Отмена
                </Button>
                <Button 
                  onClick={() => setShowCalendarSelector(false)}
                  disabled={selectedDates.length !== customWorkout.sessionsPerWeek}
                >
                  Применить
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}