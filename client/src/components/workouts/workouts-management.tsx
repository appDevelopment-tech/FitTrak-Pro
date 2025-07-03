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

export function WorkoutsManagement() {
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [editingPlan, setEditingPlan] = useState<WorkoutPlan | null>(null);
  const [editedPlan, setEditedPlan] = useState<WorkoutPlan | null>(null);
  const [showCalendarSelector, setShowCalendarSelector] = useState(false);
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [showExerciseSelector, setShowExerciseSelector] = useState(false);
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
  const [selectedExercises, setSelectedExercises] = useState<string[]>([]);
  const [customWorkout, setCustomWorkout] = useState({
    name: '',
    level: 'начальный',
    totalSessions: 1,
    startDate: null as Date | null,
    startTime: '09:00',
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
      description: "Классический трехдневный сплит по группам мышц",
      difficulty: "высокий",
      sessionsPerWeek: 3,
      type: 'ready',
      exercises: ["Жим лежа", "Французский жим", "Тяга штанги", "Подъемы на бицепс", "Приседания", "Жим стоя"]
    }
  ];

  const handleSelectPlan = (plan: WorkoutPlan) => {
    console.log('Прикрепить план тренировки для ученика:', plan.id);
    toast({
      title: "План выбран",
      description: `План "${plan.name}" готов к прикреплению к ученику`,
    });
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

  // Группы мышц и упражнения
  const muscleGroups = [
    { name: 'грудь', exercises: ['Жим лежа', 'Отжимания', 'Жим гантелей лежа', 'Разводка гантелей', 'Жим в тренажере'] },
    { name: 'спина', exercises: ['Подтягивания', 'Тяга штанги', 'Тяга блока', 'Тяга гантели', 'Гиперэкстензия'] },
    { name: 'ноги', exercises: ['Приседания', 'Жим ногами', 'Выпады', 'Подъемы на носки', 'Сгибания ног'] },
    { name: 'плечи', exercises: ['Жим стоя', 'Разводка гантелей', 'Подъемы через стороны', 'Тяга к подбородку', 'Жим в тренажере'] },
    { name: 'руки', exercises: ['Подъемы на бицепс', 'Французский жим', 'Молотки', 'Отжимания на брусьях', 'Жим узким хватом'] },
    { name: 'пресс', exercises: ['Скручивания', 'Планка', 'Подъемы ног', 'Велосипед', 'Русские скручивания'] }
  ];

  // Функции для редактирования готовых планов
  const handleEditPlan = (plan: WorkoutPlan) => {
    setEditingPlan(plan);
    setEditedPlan({ ...plan });
    setShowEditDialog(true);
  };

  const handleSaveEditedPlan = () => {
    if (!editedPlan) return;

    // Здесь бы была логика сохранения в базу данных
    toast({
      title: "Успешно",
      description: `План "${editedPlan.name}" обновлен`,
    });

    setShowEditDialog(false);
    setEditingPlan(null);
    setEditedPlan(null);
  };

  const handleCancelEdit = () => {
    setShowEditDialog(false);
    setEditingPlan(null);
    setEditedPlan(null);
  };

  const handleOpenExerciseSelector = () => {
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
    setShowExerciseSelector(true);
  };

  const handleSelectMuscleGroup = (groupName: string) => {
    setSelectedMuscleGroup(groupName);
  };

  const handleToggleExercise = (exercise: string) => {
    setSelectedExercises(prev => {
      if (prev.includes(exercise)) {
        return prev.filter(e => e !== exercise);
      } else {
        return [...prev, exercise];
      }
    });
  };

  const handleAddSelectedExercises = () => {
    if (!editedPlan || selectedExercises.length === 0) return;
    
    setEditedPlan({
      ...editedPlan,
      exercises: [...(editedPlan.exercises || []), ...selectedExercises]
    });
    
    setShowExerciseSelector(false);
    setSelectedMuscleGroup('');
    setSelectedExercises([]);
  };

  const removeExerciseFromEditedPlan = (index: number) => {
    if (!editedPlan) return;
    const newExercises = [...(editedPlan.exercises || [])];
    newExercises.splice(index, 1);
    setEditedPlan({
      ...editedPlan,
      exercises: newExercises
    });
  };

  const moveExercise = (fromIndex: number, toIndex: number) => {
    if (!editedPlan) return;
    const newExercises = [...(editedPlan.exercises || [])];
    const [moved] = newExercises.splice(fromIndex, 1);
    newExercises.splice(toIndex, 0, moved);
    setEditedPlan({
      ...editedPlan,
      exercises: newExercises
    });
  };

  // Функции для создания кастомной тренировки
  const canConfirmSchedule = selectedDates.length === customWorkout.totalSessions;

  const handleCreateWorkout = () => {
    if (!canConfirmSchedule || !customWorkout.name.trim() || !customWorkout.startDate) return;

    // Здесь бы была логика создания тренировки
    toast({
      title: "Тренировка создана",
      description: `Тренировка "${customWorkout.name}" успешно создана`,
    });

    // Сбрасываем форму
    setCustomWorkout({
      name: '',
      level: 'начальный',
      totalSessions: 1,
      startDate: null,
      startTime: '09:00',
      trainerNotes: ''
    });
    setSelectedDates([]);
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || !customWorkout.startDate) return;

    const isSelected = selectedDates.some(d => d.toDateString() === date.toDateString());
    
    if (isSelected) {
      setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
    } else if (selectedDates.length < customWorkout.totalSessions) {
      setSelectedDates(prev => [...prev, date].sort((a, b) => a.getTime() - b.getTime()));
    }
  };

  const handleConfirmDates = () => {
    setShowCalendarSelector(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Тренировки</h2>
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
                  <p className="text-sm text-muted-foreground">{plan.description}</p>
                  
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      <strong>{plan.sessionsPerWeek}</strong> раз/неделю
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-2">Упражнения:</h4>
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
                      onClick={() => handleEditPlan(plan)}
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
        <TabsContent value="create-workout" className="space-y-4">
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
                    <Label htmlFor="total-sessions">Общее количество тренировок</Label>
                    <Input
                      id="total-sessions"
                      type="number"
                      min="1"
                      max="50"
                      value={customWorkout.totalSessions}
                      onChange={(e) => setCustomWorkout(prev => ({ 
                        ...prev, 
                        totalSessions: parseInt(e.target.value) || 1 
                      }))}
                    />
                  </div>

                  <div>
                    <Label htmlFor="start-date">Дата начала</Label>
                    <Input
                      id="start-date"
                      type="date"
                      value={customWorkout.startDate ? customWorkout.startDate.toISOString().split('T')[0] : ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : null;
                        setCustomWorkout(prev => ({ ...prev, startDate: date }));
                      }}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  <div>
                    <Label htmlFor="start-time">Время начала</Label>
                    <Input
                      id="start-time"
                      type="time"
                      value={customWorkout.startTime}
                      onChange={(e) => setCustomWorkout(prev => ({ ...prev, startTime: e.target.value }))}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="trainer-notes">Заметки тренера</Label>
                    <Textarea
                      id="trainer-notes"
                      value={customWorkout.trainerNotes}
                      onChange={(e) => setCustomWorkout(prev => ({ ...prev, trainerNotes: e.target.value }))}
                      placeholder="Добавьте заметки для ученика..."
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Выбор дней тренировок</Label>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setShowCalendarSelector(true)}
                      className="w-full justify-start"
                      disabled={!customWorkout.startDate}
                    >
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      {selectedDates.length > 0 
                        ? `Выбрано: ${selectedDates.length} из ${customWorkout.totalSessions}` 
                        : 'Выберите дни тренировок'
                      }
                    </Button>
                    {!customWorkout.startDate && (
                      <p className="text-sm text-muted-foreground">
                        Сначала выберите дату начала тренировки
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2">
                  {canConfirmSchedule ? (
                    <>
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      Готово к созданию
                    </>
                  ) : (
                    <>
                      <AlertCircle className="h-4 w-4 text-yellow-600" />
                      Выберите все {customWorkout.totalSessions} дней
                    </>
                  )}
                </div>
                <Button
                  onClick={handleCreateWorkout}
                  disabled={!canConfirmSchedule || !customWorkout.name.trim() || !customWorkout.startDate}
                  className="ml-auto"
                >
                  Создать тренировку
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог редактирования готового плана */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редактирование плана тренировки</DialogTitle>
            <DialogDescription>
              Измените параметры готового плана тренировки
            </DialogDescription>
          </DialogHeader>
          
          {editedPlan && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-plan-name">Название плана</Label>
                  <Input
                    id="edit-plan-name"
                    value={editedPlan.name}
                    onChange={(e) => setEditedPlan({ ...editedPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="edit-plan-difficulty">Уровень</Label>
                  <Select 
                    value={editedPlan.difficulty} 
                    onValueChange={(value) => setEditedPlan({ ...editedPlan, difficulty: value })}
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
              </div>

              <div>
                <Label htmlFor="edit-plan-description">Описание</Label>
                <Textarea
                  id="edit-plan-description"
                  value={editedPlan.description}
                  onChange={(e) => setEditedPlan({ ...editedPlan, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="edit-sessions-per-week">Тренировок в неделю</Label>
                <Input
                  id="edit-sessions-per-week"
                  type="number"
                  min="1"
                  max="7"
                  value={editedPlan.sessionsPerWeek}
                  onChange={(e) => setEditedPlan({ 
                    ...editedPlan, 
                    sessionsPerWeek: parseInt(e.target.value) || 1 
                  })}
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Упражнения</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={handleOpenExerciseSelector}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Добавить упражнение
                  </Button>
                </div>
                <div className="space-y-2">
                  {editedPlan.exercises?.map((exercise, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <div className="flex gap-1">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => index > 0 && moveExercise(index, index - 1)}
                          disabled={index === 0}
                        >
                          ↑
                        </Button>
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => index < (editedPlan.exercises?.length || 0) - 1 && moveExercise(index, index + 1)}
                          disabled={index === (editedPlan.exercises?.length || 0) - 1}
                        >
                          ↓
                        </Button>
                      </div>
                      <div className="flex-1 p-2 border rounded bg-gray-50">
                        {exercise}
                      </div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => removeExerciseFromEditedPlan(index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={handleCancelEdit}>
                  Отмена
                </Button>
                <Button onClick={handleSaveEditedPlan}>
                  Сохранить
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Диалог выбора календаря */}
      <Dialog open={showCalendarSelector} onOpenChange={setShowCalendarSelector}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Выберите дни тренировок</DialogTitle>
            <DialogDescription>
              Выберите {customWorkout.totalSessions} дней для тренировок
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <Calendar
              mode="multiple"
              selected={selectedDates}
              onSelect={(dates) => {
                if (dates && dates.length <= customWorkout.totalSessions) {
                  setSelectedDates(dates);
                }
              }}
              disabled={(date) => {
                if (!customWorkout.startDate) return true;
                return date < customWorkout.startDate;
              }}
              initialFocus
            />
            
            <div className="flex justify-between items-center text-sm text-muted-foreground">
              <span>Выбрано: {selectedDates.length} из {customWorkout.totalSessions}</span>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={() => setShowCalendarSelector(false)}
                className="flex-1"
              >
                Отмена
              </Button>
              <Button 
                onClick={handleConfirmDates}
                className="flex-1"
                disabled={selectedDates.length === 0}
              >
                Подтвердить
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Диалог выбора упражнений */}
      <Dialog open={showExerciseSelector} onOpenChange={setShowExerciseSelector}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Добавить упражнения</DialogTitle>
            <DialogDescription>
              Выберите группу мышц, затем выберите упражнения для добавления в план
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6">
            {!selectedMuscleGroup ? (
              // Выбор группы мышц
              <div>
                <h3 className="text-lg font-semibold mb-4">Выберите группу мышц</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {muscleGroups.map((group) => (
                    <Card 
                      key={group.name}
                      className="cursor-pointer hover:shadow-md transition-shadow"
                      onClick={() => handleSelectMuscleGroup(group.name)}
                    >
                      <CardContent className="p-4 text-center">
                        <div className="text-lg font-medium capitalize">{group.name}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {group.exercises.length} упражнений
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              // Выбор упражнений из группы
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setSelectedMuscleGroup('')}
                  >
                    ← Назад
                  </Button>
                  <h3 className="text-lg font-semibold capitalize">{selectedMuscleGroup}</h3>
                </div>
                
                <div className="space-y-2">
                  {muscleGroups
                    .find(group => group.name === selectedMuscleGroup)
                    ?.exercises.map((exercise) => (
                      <div 
                        key={exercise}
                        className={`p-3 border rounded cursor-pointer transition-colors ${
                          selectedExercises.includes(exercise)
                            ? 'bg-blue-50 border-blue-300'
                            : 'hover:bg-gray-50'
                        }`}
                        onClick={() => handleToggleExercise(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <span>{exercise}</span>
                          {selectedExercises.includes(exercise) && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    ))}
                </div>
                
                {selectedExercises.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 rounded border border-blue-200">
                    <div className="text-sm font-medium text-blue-800 mb-1">
                      Выбрано упражнений: {selectedExercises.length}
                    </div>
                    <div className="text-xs text-blue-600">
                      {selectedExercises.join(', ')}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          <div className="flex gap-2 pt-4">
            <Button 
              variant="outline" 
              onClick={() => {
                setShowExerciseSelector(false);
                setSelectedMuscleGroup('');
                setSelectedExercises([]);
              }}
            >
              Отмена
            </Button>
            {selectedMuscleGroup && selectedExercises.length > 0 && (
              <Button onClick={handleAddSelectedExercises}>
                Добавить выбранные ({selectedExercises.length})
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}