import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Dumbbell, Plus, Edit } from "lucide-react";
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

  const addExerciseToEditedPlan = () => {
    if (!editedPlan) return;
    setEditedPlan({
      ...editedPlan,
      exercises: [...(editedPlan.exercises || []), "Новое упражнение"]
    });
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

  const updateExerciseInEditedPlan = (index: number, newValue: string) => {
    if (!editedPlan) return;
    const newExercises = [...(editedPlan.exercises || [])];
    newExercises[index] = newValue;
    setEditedPlan({
      ...editedPlan,
      exercises: newExercises
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Dumbbell className="h-6 w-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Тренировки</h2>
      </div>

      <Tabs defaultValue="ready-plans" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="ready-plans">Готовые планы</TabsTrigger>
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
                  <Label htmlFor="edit-plan-difficulty">Сложность</Label>
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
                    onClick={addExerciseToEditedPlan}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Добавить упражнение
                  </Button>
                </div>
                <div className="space-y-2">
                  {editedPlan.exercises?.map((exercise, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={exercise}
                        onChange={(e) => updateExerciseInEditedPlan(index, e.target.value)}
                        placeholder="Название упражнения"
                      />
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
                  Сохранить изменения
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}