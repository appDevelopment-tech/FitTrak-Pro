import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Globe, Database, Info, Loader2 } from "lucide-react";
import { fetchProcessedExercises, fetchWgerCategories, type ProcessedExercise, type WgerCategory } from "@/lib/wger-api";

// Russian translations for categories
const categoryTranslations: Record<string, string> = {
  "Abs": "Пресс",
  "Arms": "Руки", 
  "Back": "Спина",
  "Calves": "Икры",
  "Cardio": "Кардио",
  "Chest": "Грудь",
  "Legs": "Ноги",
  "Shoulders": "Плечи"
};

export function WgerDemo() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [selectedExercise, setSelectedExercise] = useState<ProcessedExercise | null>(null);

  // Fetch real exercises from Wger API
  const { data: exercises = [], isLoading: exercisesLoading, error: exercisesError } = useQuery({
    queryKey: ['wger-exercises'],
    queryFn: fetchProcessedExercises,
    staleTime: 1000 * 60 * 30, // 30 minutes
  });

  // Fetch categories from Wger API
  const { data: categories = [], isLoading: categoriesLoading } = useQuery({
    queryKey: ['wger-categories'],
    queryFn: () => fetchWgerCategories(2), // English language
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  // Debug logging
  console.log('Exercises data:', exercises);
  console.log('Categories data:', categories);

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 0 || exercise.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (exercisesLoading || categoriesLoading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mr-3" />
          <span className="text-lg text-gray-600">Загружаем упражнения из Wger API...</span>
        </div>
      </div>
    );
  }

  if (exercisesError) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border-red-200 bg-red-50">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-red-800 mb-2">Ошибка загрузки данных</h3>
            <p className="text-red-600">Не удалось подключиться к Wger API. Проверьте интернет-соединение.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <Button
                variant={selectedCategory === 0 ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(0)}
                className="whitespace-nowrap"
              >
                Все
              </Button>
              {categories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="whitespace-nowrap"
                >
                  {categoryTranslations[category.name] || category.name}
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
                {exercise.images.length > 0 ? (
                  <img 
                    src={exercise.images[0]}
                    alt={exercise.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <div className="text-center" style={{display: exercise.images.length > 0 ? 'none' : 'block'}}>
                  <Database className="w-12 h-12 mx-auto mb-2 text-green-500" />
                  <span className="text-xs text-green-600">Wger API</span>
                  <p className="text-xs text-green-400 mt-1">ID: {exercise.id}</p>
                </div>
              </div>
              <CardTitle className="text-lg">{exercise.name}</CardTitle>
              <div className="flex gap-2 flex-wrap">
                <Badge variant="secondary">{categoryTranslations[exercise.categoryName] || exercise.categoryName}</Badge>
                {exercise.equipmentNames.length > 0 && (
                  <Badge variant="outline">{exercise.equipmentNames[0]}</Badge>
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
                <strong>Основные:</strong> {exercise.muscleNames.join(", ")}
              </p>
              {exercise.secondaryMuscleNames.length > 0 && (
                <p className="text-xs text-gray-500 mb-4">
                  <strong>Вспомогательные:</strong> {exercise.secondaryMuscleNames.join(", ")}
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
                  <CardTitle className="text-xl">{selectedExercise.name}</CardTitle>
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
                <Badge>{categoryTranslations[selectedExercise.categoryName] || selectedExercise.categoryName}</Badge>
                {selectedExercise.equipmentNames.map((eq, index) => (
                  <Badge key={index} variant="outline">{eq}</Badge>
                ))}
              </div>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center mb-6">
                {selectedExercise.images.length > 0 ? (
                  <img 
                    src={selectedExercise.images[0]}
                    alt={selectedExercise.name}
                    className="w-full h-full object-cover rounded-lg"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                ) : null}
                <div className="text-center" style={{display: selectedExercise.images.length > 0 ? 'none' : 'block'}}>
                  <Database className="w-16 h-16 mx-auto mb-2 text-green-500" />
                  <span className="text-green-600 font-medium">Wger API</span>
                  <p className="text-xs text-green-400 mt-1">Изображения загружаются из API</p>
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
                    <p className="text-gray-700 leading-relaxed mb-4">{selectedExercise.description}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="muscles" className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Основные мышцы:</h4>
                    <div className="flex gap-2 flex-wrap mb-4">
                      {selectedExercise.muscleNames.map((muscle, index) => (
                        <Badge key={index} variant="default">{muscle}</Badge>
                      ))}
                    </div>
                    {selectedExercise.secondaryMuscleNames.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-2">Вспомогательные мышцы:</h4>
                        <div className="flex gap-2 flex-wrap mb-4">
                          {selectedExercise.secondaryMuscleNames.map((muscle, index) => (
                            <Badge key={index} variant="outline">{muscle}</Badge>
                          ))}
                        </div>
                      </>
                    )}
                    {selectedExercise.equipmentNames.length > 0 && (
                      <>
                        <h4 className="font-semibold mb-2">Оборудование:</h4>
                        <div className="flex gap-2 flex-wrap">
                          {selectedExercise.equipmentNames.map((equipment, index) => (
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