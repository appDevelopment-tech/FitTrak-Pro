import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { Exercise } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { workoutProgramsDb } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";

export function TrainerCabinet() {
  const [programName, setProgramName] = useState("");
  const [programType, setProgramType] = useState("");
  const [duration, setDuration] = useState("");
  const [level, setLevel] = useState("");
  const [exercises, setExercises] = useState<Exercise[]>([]);
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const createProgramMutation = useMutation({
    mutationFn: async (programData: any) => {
      return await workoutProgramsDb.create(programData);
    },
    onSuccess: () => {
      toast({
        title: "Успех",
        description: "Программа тренировок создана",
      });
      // Reset form
      setProgramName("");
      setProgramType("");
      setDuration("");
      setLevel("");
      setExercises([]);
      queryClient.invalidateQueries({ queryKey: ['/api/workout-programs'] });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось создать программу",
        variant: "destructive",
      });
    },
  });

  const addExercise = () => {
    const newExercise: Exercise = {
      name: "",
      sets: 3,
      reps: "8-12",
      weight: null,
    };
    setExercises([...exercises, newExercise]);
  };

  const updateExercise = (index: number, field: keyof Exercise, value: any) => {
    const updatedExercises = [...exercises];
    updatedExercises[index] = { ...updatedExercises[index], [field]: value };
    setExercises(updatedExercises);
  };

  const removeExercise = (index: number) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  const handleSaveProgram = () => {
    if (!programName || !programType || !duration || !level) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive",
      });
      return;
    }

    const programData = {
      name: programName,
      type: programType,
      duration: parseInt(duration),
      level: level,
      createdBy: 1, // Current user ID
      exercises: exercises,
    };

    createProgramMutation.mutate(programData);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Кабинет тренера</h2>
            <p className="text-gray-600">Управление программами и клиентами</p>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Новая программа тренировок
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="program-name" className="text-sm font-medium text-gray-700 mb-2">
                Название программы
              </Label>
              <Input
                id="program-name"
                name="program-name"
                value={programName}
                onChange={(e) => setProgramName(e.target.value)}
                placeholder="Силовая тренировка верха"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="program-type" className="text-sm font-medium text-gray-700 mb-2">
                Тип тренировки
              </Label>
              <Select value={programType} onValueChange={setProgramType}>
                <SelectTrigger id="program-type">
                  <SelectValue placeholder="Выберите тип" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="strength">Силовая</SelectItem>
                  <SelectItem value="cardio">Кардио</SelectItem>
                  <SelectItem value="functional">Функциональная</SelectItem>
                  <SelectItem value="stretching">Растяжка</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration" className="text-sm font-medium text-gray-700 mb-2">
                Длительность (мин)
              </Label>
              <Input
                id="duration"
                name="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="60"
                className="w-full"
              />
            </div>
            <div>
              <Label htmlFor="level" className="text-sm font-medium text-gray-700 mb-2">
                Уровень сложности
              </Label>
              <Select value={level} onValueChange={setLevel}>
                <SelectTrigger id="level">
                  <SelectValue placeholder="Выберите уровень" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Начинающий</SelectItem>
                  <SelectItem value="intermediate">Средний</SelectItem>
                  <SelectItem value="advanced">Продвинутый</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-800">Упражнения</h4>
              <Button onClick={addExercise} className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Добавить упражнение
              </Button>
            </div>
            
            <div className="space-y-4">
              {exercises.map((exercise, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <Input
                      value={exercise.name}
                      onChange={(e) => updateExercise(index, 'name', e.target.value)}
                      placeholder="Название упражнения"
                      className="font-semibold bg-white flex-1 mr-3"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeExercise(index)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1">Подходы</Label>
                      <Input
                        type="number"
                        value={exercise.sets}
                        onChange={(e) => updateExercise(index, 'sets', parseInt(e.target.value))}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1">Повторения</Label>
                      <Input
                        value={exercise.reps}
                        onChange={(e) => updateExercise(index, 'reps', e.target.value)}
                        className="text-sm"
                      />
                    </div>
                    <div>
                      <Label className="text-xs font-medium text-gray-600 mb-1">Вес (кг)</Label>
                      <Input
                        type="number"
                        value={exercise.weight || ''}
                        onChange={(e) => updateExercise(index, 'weight', e.target.value ? parseInt(e.target.value) : null)}
                        className="text-sm"
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {exercises.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  Упражнения не добавлены. Нажмите "Добавить упражнение" чтобы начать.
                </div>
              )}
            </div>
          </div>
          
          <div className="mt-8 flex justify-end space-x-4">
            <Button
              variant="outline"
              onClick={() => {
                setProgramName("");
                setProgramType("");
                setDuration("");
                setLevel("");
                setExercises([]);
              }}
            >
              Отмена
            </Button>
            <Button
              onClick={handleSaveProgram}
              disabled={createProgramMutation.isPending}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {createProgramMutation.isPending ? "Сохранение..." : "Сохранить программу"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
