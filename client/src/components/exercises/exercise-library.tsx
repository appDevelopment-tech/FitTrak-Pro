import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Play, Info } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  nameRu: string;
  bodyPart: string;
  bodyPartRu: string;
  equipment: string;
  equipmentRu: string;
  target: string;
  targetRu: string;
  gifUrl: string;
  secondaryMuscles: string[];
  secondaryMusclesRu: string[];
  instructions: string[];
  instructionsRu: string[];
}

// Пример структуры данных ExerciseDB API (переведено на русский)
const exerciseDbExample: Exercise[] = [
  {
    id: "0025",
    name: "barbell bench press",
    nameRu: "Жим штанги лежа",
    bodyPart: "chest",
    bodyPartRu: "Грудь",
    equipment: "barbell",
    equipmentRu: "Штанга",
    target: "pectorals",
    targetRu: "Грудные мышцы",
    gifUrl: "https://v2.exercisedb.io/image/WOOt7W1Hue1Gbs",
    secondaryMuscles: ["anterior deltoid", "triceps"],
    secondaryMusclesRu: ["Передние дельты", "Трицепс"],
    instructions: [
      "Lie flat on a bench with your feet firmly on the ground.",
      "Grasp the barbell with an overhand grip, slightly wider than shoulder-width apart.",
      "Lower the barbell to your chest in a controlled manner.",
      "Pause briefly at the bottom, then press the barbell back up to the starting position.",
      "Repeat for the desired number of repetitions."
    ],
    instructionsRu: [
      "Лягте на скамью, ноги твердо стоят на полу.",
      "Возьмите штангу прямым хватом, чуть шире плеч.",
      "Опустите штангу к груди контролируемым движением.",
      "Сделайте небольшую паузу внизу, затем выжмите штангу в исходное положение.",
      "Повторите необходимое количество раз."
    ]
  },
  {
    id: "0046",
    name: "barbell squat",
    nameRu: "Приседания со штангой",
    bodyPart: "legs",
    bodyPartRu: "Ноги",
    equipment: "barbell",
    equipmentRu: "Штанга",
    target: "quadriceps",
    targetRu: "Квадрицепс",
    gifUrl: "https://v2.exercisedb.io/image/abc123",
    secondaryMuscles: ["glutes", "hamstrings", "calves"],
    secondaryMusclesRu: ["Ягодицы", "Бицепс бедра", "Икры"],
    instructions: [
      "Stand with feet shoulder-width apart, bar resting on upper back.",
      "Lower your body by bending at hips and knees.",
      "Keep chest up and knees tracking over toes.",
      "Lower until thighs are parallel to ground.",
      "Drive through heels to return to starting position."
    ],
    instructionsRu: [
      "Встаньте, ноги на ширине плеч, штанга на верхней части спины.",
      "Опуститесь, сгибая тазобедренные и коленные суставы.",
      "Держите грудь прямо, колени направлены по линии носков.",
      "Опускайтесь до параллели бедер с полом.",
      "Оттолкнитесь пятками, возвращаясь в исходное положение."
    ]
  }
];

const bodyPartCategories = [
  { id: "all", nameRu: "Все", name: "all" },
  { id: "chest", nameRu: "Грудь", name: "chest" },
  { id: "legs", nameRu: "Ноги", name: "legs" },
  { id: "back", nameRu: "Спина", name: "back" },
  { id: "shoulders", nameRu: "Плечи", name: "shoulders" },
  { id: "arms", nameRu: "Руки", name: "arms" }
];

export function ExerciseLibrary() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  const filteredExercises = exerciseDbExample.filter(exercise => {
    const matchesSearch = exercise.nameRu.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || exercise.bodyPart === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Демо: ExerciseDB API</h1>
        <p className="text-gray-600">Пример структуры данных из ExerciseDB (RapidAPI)</p>
      </div>

      {/* API Information */}
      <Card className="mb-6 border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800">Структура данных ExerciseDB API</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Основные поля:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <code>id</code> - уникальный идентификатор</li>
                <li>• <code>name</code> - название на английском</li>
                <li>• <code>bodyPart</code> - группа мышц (chest, legs, back...)</li>
                <li>• <code>equipment</code> - оборудование (barbell, dumbbell...)</li>
                <li>• <code>target</code> - основная целевая мышца</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Дополнительные данные:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <code>gifUrl</code> - анимация техники выполнения</li>
                <li>• <code>secondaryMuscles</code> - вспомогательные мышцы</li>
                <li>• <code>instructions</code> - пошаговая техника</li>
                <li>• API содержит 1000+ упражнений</li>
                <li>• Бесплатно до 100 запросов/день</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Search and Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Поиск упражнений..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-2 flex-wrap">
              {bodyPartCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {category.nameRu}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center mb-3">
                <div className="text-center">
                  <Play className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                  <span className="text-xs text-gray-500">GIF анимация ExerciseDB</span>
                  <p className="text-xs text-gray-400 mt-1">{exercise.gifUrl}</p>
                </div>
              </div>
              <CardTitle className="text-lg">{exercise.nameRu}</CardTitle>
              <p className="text-sm text-gray-500">{exercise.name}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{exercise.bodyPartRu}</Badge>
                <Badge variant="outline">{exercise.equipmentRu}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Основные:</strong> {exercise.targetRu}
              </p>
              <p className="text-xs text-gray-500 mb-4">
                <strong>Вспомогательные:</strong> {exercise.secondaryMusclesRu.join(", ")}
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setSelectedExercise(exercise)}
              >
                <Info className="h-4 w-4 mr-2" />
                Подробная техника
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedExercise.nameRu}</CardTitle>
                  <p className="text-gray-500">{selectedExercise.name}</p>
                  <p className="text-xs text-gray-400 mt-1">ID: {selectedExercise.id}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setSelectedExercise(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge>{selectedExercise.bodyPartRu}</Badge>
                <Badge variant="outline">{selectedExercise.equipmentRu}</Badge>
                <Badge variant="secondary">{selectedExercise.targetRu}</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <Play className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                  <span className="text-blue-600 font-medium">GIF анимация техники</span>
                  <p className="text-xs text-blue-400 mt-1">{selectedExercise.gifUrl}</p>
                </div>
              </div>

              <Tabs defaultValue="technique" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="technique">Техника выполнения</TabsTrigger>
                  <TabsTrigger value="api-data">Данные API</TabsTrigger>
                </TabsList>
                
                <TabsContent value="technique" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Пошаговая техника:</h4>
                    <ol className="list-decimal list-inside space-y-2">
                      {selectedExercise.instructionsRu.map((instruction, index) => (
                        <li key={index} className="text-sm text-gray-700 leading-relaxed">{instruction}</li>
                      ))}
                    </ol>
                  </div>
                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-2">Работающие мышцы:</h4>
                    <div className="space-y-2">
                      <div>
                        <span className="font-medium">Основные: </span>
                        <Badge variant="default">{selectedExercise.targetRu}</Badge>
                      </div>
                      <div>
                        <span className="font-medium">Вспомогательные: </span>
                        {selectedExercise.secondaryMusclesRu.map((muscle, index) => (
                          <Badge key={index} variant="outline" className="mr-1 mb-1">{muscle}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="api-data" className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Оригинальные данные API:</h4>
                    <div className="space-y-2 text-sm">
                      <div><strong>bodyPart:</strong> <code>{selectedExercise.bodyPart}</code></div>
                      <div><strong>equipment:</strong> <code>{selectedExercise.equipment}</code></div>
                      <div><strong>target:</strong> <code>{selectedExercise.target}</code></div>
                      <div><strong>secondaryMuscles:</strong> <code>[{selectedExercise.secondaryMuscles.join(", ")}]</code></div>
                      <div><strong>gifUrl:</strong> <code className="text-xs break-all">{selectedExercise.gifUrl}</code></div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Преимущества ExerciseDB API:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Готовые GIF-анимации для каждого упражнения</li>
                      <li>Структурированные данные о мышцах и оборудовании</li>
                      <li>Подробные инструкции по технике</li>
                      <li>Фильтрация по группам мышц и типу оборудования</li>
                    </ul>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}