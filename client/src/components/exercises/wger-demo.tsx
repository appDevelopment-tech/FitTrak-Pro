import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Database, Info } from "lucide-react";

interface WgerExercise {
  id: number;
  uuid: string;
  name: string;
  nameRu: string;
  category: number;
  categoryName: string;
  categoryNameRu: string;
  muscles: number[];
  muscleNames: string[];
  muscleNamesRu: string[];
  muscles_secondary: number[];
  secondaryMuscleNames: string[];
  secondaryMuscleNamesRu: string[];
  equipment: number[];
  equipmentNames: string[];
  equipmentNamesRu: string[];
  description: string;
  descriptionRu: string;
  variations: number | null;
  license_author: string;
  images: string[];
  comments: string[];
  commentsRu: string[];
}

// Демонстрационные данные на основе реальной структуры Wger API
const wgerExercises: WgerExercise[] = [
  {
    id: 41,
    uuid: "a6bced3c-72f5-42a3-9438-5569d46f49fd",
    name: "Barbell Bench Press",
    nameRu: "Жим штанги лежа",
    category: 11,
    categoryName: "Chest",
    categoryNameRu: "Грудь",
    muscles: [14],
    muscleNames: ["Pectoralis major"],
    muscleNamesRu: ["Большая грудная мышца"],
    muscles_secondary: [1, 5],
    secondaryMuscleNames: ["Anterior deltoid", "Triceps brachii"],
    secondaryMuscleNamesRu: ["Передние дельты", "Трицепс"],
    equipment: [1],
    equipmentNames: ["Barbell"],
    equipmentNamesRu: ["Штанга"],
    description: "Lie on a bench and press the barbell from chest to arms extended.",
    descriptionRu: "Лягте на скамью и выжимайте штангу от груди до полного выпрямления рук.",
    variations: 3,
    license_author: "wger",
    images: ["https://wger.de/media/exercise-images/74/74.png"],
    comments: [
      "Keep your feet firmly on the ground",
      "Maintain a slight arch in your back",
      "Control the weight on the way down"
    ],
    commentsRu: [
      "Держите ноги твердо на полу",
      "Сохраняйте небольшой прогиб в спине",
      "Контролируйте вес при опускании"
    ]
  },
  {
    id: 12,
    uuid: "53906cd1-61f1-4d56-ac60-e4fcc5824861",
    name: "Squats",
    nameRu: "Приседания",
    category: 9,
    categoryName: "Legs",
    categoryNameRu: "Ноги",
    muscles: [8],
    muscleNames: ["Quadriceps femoris"],
    muscleNamesRu: ["Четырехглавая мышца бедра"],
    muscles_secondary: [11, 7],
    secondaryMuscleNames: ["Gluteus maximus", "Soleus"],
    secondaryMuscleNamesRu: ["Большая ягодичная мышца", "Камбаловидная мышца"],
    equipment: [],
    equipmentNames: [],
    equipmentNamesRu: [],
    description: "Stand with feet shoulder-width apart and squat down keeping the back straight.",
    descriptionRu: "Встаньте, ноги на ширине плеч, приседайте, держа спину прямой.",
    variations: null,
    license_author: "wger",
    images: ["https://wger.de/media/exercise-images/12/12.png"],
    comments: [
      "Keep knees in line with toes",
      "Don't let knees cave inward",
      "Go down until thighs are parallel to floor"
    ],
    commentsRu: [
      "Держите колени на одной линии с носками",
      "Не позволяйте коленям заваливаться внутрь", 
      "Опускайтесь до параллели бедер с полом"
    ]
  },
  {
    id: 20,
    uuid: "f24cb758-9c0d-42d4-ad9e-6025c527dd13",
    name: "Dumbbell Shoulder Press",
    nameRu: "Жим гантелей стоя",
    category: 13,
    categoryName: "Shoulders",
    categoryNameRu: "Плечи",
    muscles: [2],
    muscleNames: ["Deltoid"],
    muscleNamesRu: ["Дельтовидная мышца"],
    muscles_secondary: [5],
    secondaryMuscleNames: ["Triceps brachii"],
    secondaryMuscleNamesRu: ["Трицепс"],
    equipment: [3],
    equipmentNames: ["Dumbbell"],
    equipmentNamesRu: ["Гантели"],
    description: "Press dumbbells overhead from shoulder height to arms extended.",
    descriptionRu: "Выжимайте гантели над головой от уровня плеч до полного выпрямления рук.",
    variations: 5,
    license_author: "wger",
    images: ["https://wger.de/media/exercise-images/20/20.png"],
    comments: [
      "Keep core engaged",
      "Don't arch your back excessively",
      "Control the weight on both up and down movements"
    ],
    commentsRu: [
      "Держите корпус напряженным",
      "Не прогибайте спину чрезмерно",
      "Контролируйте вес при подъеме и опускании"
    ]
  }
];

const wgerCategories = [
  { id: 0, name: "All", nameRu: "Все" },
  { id: 10, name: "Abs", nameRu: "Пресс" },
  { id: 8, name: "Arms", nameRu: "Руки" },
  { id: 12, name: "Back", nameRu: "Спина" },
  { id: 11, name: "Chest", nameRu: "Грудь" },
  { id: 9, name: "Legs", nameRu: "Ноги" },
  { id: 13, name: "Shoulders", nameRu: "Плечи" },
  { id: 15, name: "Cardio", nameRu: "Кардио" }
];

export function WgerDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<WgerExercise | null>(null);

  const filteredExercises = wgerExercises.filter(exercise => {
    const matchesSearch = exercise.nameRu.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 0 || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Демо: Wger Workout Manager API</h1>
        <p className="text-gray-600">Открытый API с многоязычной поддержкой и бесплатным доступом</p>
      </div>

      {/* API Information */}
      <Card className="mb-6 border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-lg text-green-800 flex items-center">
            <Database className="h-5 w-5 mr-2" />
            Структура данных Wger API
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2 flex items-center">
                <Globe className="h-4 w-4 mr-1" />
                Основные преимущества:
              </h4>
              <ul className="space-y-1 text-gray-700">
                <li>• Полностью бесплатный доступ</li>
                <li>• Многоязычная поддержка (русский включен)</li>
                <li>• Открытый исходный код</li>
                <li>• 658+ упражнений в базе</li>
                <li>• Изображения и вариации упражнений</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Структура данных:</h4>
              <ul className="space-y-1 text-gray-700">
                <li>• <code>id</code>, <code>uuid</code> - идентификаторы</li>
                <li>• <code>category</code> - ID категории мышц</li>
                <li>• <code>muscles[]</code> - основные мышцы (ID)</li>
                <li>• <code>muscles_secondary[]</code> - вспомогательные</li>
                <li>• <code>equipment[]</code> - оборудование (ID)</li>
                <li>• <code>variations</code> - количество вариаций</li>
              </ul>
            </div>
          </div>
          <div className="mt-4 p-3 bg-white rounded border-l-4 border-green-400">
            <p className="text-sm text-gray-700">
              <strong>API Endpoint:</strong> <code>https://wger.de/api/v2/exercise/</code><br/>
              <strong>Документация:</strong> <code>https://wger.de/en/software/api</code>
            </p>
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
              {wgerCategories.map((category) => (
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <Card key={exercise.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-2">
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-3">
                <div className="text-center">
                  <img 
                    src="/api/placeholder/200/150" 
                    alt="Wger exercise"
                    className="w-16 h-16 mx-auto mb-2 opacity-60"
                  />
                  <span className="text-xs text-green-600">Изображение Wger</span>
                  <p className="text-xs text-green-400 mt-1">ID: {exercise.id}</p>
                </div>
              </div>
              <CardTitle className="text-lg">{exercise.nameRu}</CardTitle>
              <p className="text-sm text-gray-500">{exercise.name}</p>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{exercise.categoryNameRu}</Badge>
                {exercise.equipmentNamesRu.length > 0 && (
                  <Badge variant="outline">{exercise.equipmentNamesRu[0]}</Badge>
                )}
                {exercise.variations && (
                  <Badge variant="outline" className="text-xs">
                    {exercise.variations} вариации
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-3">
                <strong>Основные:</strong> {exercise.muscleNamesRu.join(", ")}
              </p>
              {exercise.secondaryMuscleNamesRu.length > 0 && (
                <p className="text-xs text-gray-500 mb-4">
                  <strong>Вспомогательные:</strong> {exercise.secondaryMuscleNamesRu.join(", ")}
                </p>
              )}
              <Button 
                variant="outline" 
                size="sm" 
                className="w-full"
                onClick={() => setSelectedExercise(exercise)}
              >
                <Info className="h-4 w-4 mr-2" />
                Подробная информация
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredExercises.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Упражнения не найдены</h3>
            <p className="text-gray-500">Попробуйте изменить параметры поиска</p>
          </CardContent>
        </Card>
      )}

      {/* Exercise Detail Modal */}
      {selectedExercise && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl">{selectedExercise.nameRu}</CardTitle>
                  <p className="text-gray-500">{selectedExercise.name}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge>ID: {selectedExercise.id}</Badge>
                    <Badge variant="outline">UUID: {selectedExercise.uuid.slice(0, 8)}...</Badge>
                    {selectedExercise.license_author && (
                      <Badge variant="secondary">© {selectedExercise.license_author}</Badge>
                    )}
                  </div>
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
                <Badge>{selectedExercise.categoryNameRu}</Badge>
                {selectedExercise.equipmentNamesRu.map((eq, index) => (
                  <Badge key={index} variant="outline">{eq}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-6">
                <div className="text-center">
                  <img 
                    src="/api/placeholder/300/200" 
                    alt="Wger exercise demonstration"
                    className="w-24 h-24 mx-auto mb-2 opacity-60"
                  />
                  <span className="text-green-600 font-medium">Изображение упражнения Wger</span>
                  <p className="text-xs text-green-400 mt-1">{selectedExercise.images[0] || 'Изображение доступно в API'}</p>
                </div>
              </div>

              <Tabs defaultValue="description" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="description">Описание</TabsTrigger>
                  <TabsTrigger value="muscles">Мышцы</TabsTrigger>
                  <TabsTrigger value="api-structure">Структура API</TabsTrigger>
                </TabsList>
                
                <TabsContent value="description" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-3">Описание упражнения:</h4>
                    <p className="text-gray-700 leading-relaxed mb-4">{selectedExercise.descriptionRu}</p>
                    {selectedExercise.commentsRu.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-2">Рекомендации:</h4>
                        <ul className="list-disc list-inside space-y-1">
                          {selectedExercise.commentsRu.map((comment, index) => (
                            <li key={index} className="text-sm text-gray-700">{comment}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="muscles" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Основные мышцы:</h4>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {selectedExercise.muscleNamesRu.map((muscle, index) => (
                        <Badge key={index} variant="default">{muscle}</Badge>
                      ))}
                    </div>
                    {selectedExercise.secondaryMuscleNamesRu.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-2">Вспомогательные мышцы:</h4>
                        <div className="flex gap-2 flex-wrap mb-4">
                          {selectedExercise.secondaryMuscleNamesRu.map((muscle, index) => (
                            <Badge key={index} variant="outline">{muscle}</Badge>
                          ))}
                        </div>
                      </>
                    )}
                    {selectedExercise.equipmentNamesRu.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-2">Оборудование:</h4>
                        <div className="flex gap-2 flex-wrap">
                          {selectedExercise.equipmentNamesRu.map((equipment, index) => (
                            <Badge key={index} variant="secondary">{equipment}</Badge>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </TabsContent>
                
                <TabsContent value="api-structure" className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="font-semibold mb-3">Исходные данные API:</h4>
                    <div className="space-y-2 text-sm font-mono">
                      <div><strong>category:</strong> {selectedExercise.category}</div>
                      <div><strong>muscles:</strong> [{selectedExercise.muscles.join(", ")}]</div>
                      <div><strong>muscles_secondary:</strong> [{selectedExercise.muscles_secondary.join(", ")}]</div>
                      <div><strong>equipment:</strong> [{selectedExercise.equipment.join(", ")}]</div>
                      <div><strong>variations:</strong> {selectedExercise.variations || "null"}</div>
                      <div><strong>license_author:</strong> "{selectedExercise.license_author}"</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    <p><strong>Особенности Wger API:</strong></p>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      <li>Числовые ID для всех связанных данных (мышцы, оборудование, категории)</li>
                      <li>Отдельные запросы для получения названий по ID</li>
                      <li>UUID для глобальной уникальности</li>
                      <li>Информация об авторских правах</li>
                      <li>Поддержка вариаций упражнений</li>
                      <li>Изображения упражнений в высоком качестве</li>
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