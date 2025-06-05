import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChevronLeft, Clock, Target, Dumbbell, Calendar, Users } from "lucide-react";
import { muscleGroups, trainingPrograms, workoutSplits } from "@/data/muscle-groups";

export function WorkoutPrograms() {
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const backToPrograms = () => {
    setSelectedProgram(null);
    setSelectedDay(0);
  };

  if (selectedProgram) {
    const program = trainingPrograms[selectedProgram as keyof typeof trainingPrograms];
    const currentDay = program.days[selectedDay];

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={backToPrograms} className="text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад к программам
          </Button>
          <Button className="bg-orange-500 hover:bg-orange-600 text-white">
            <Users className="h-4 w-4 mr-1" />
            Назначить ученику
          </Button>
        </div>

        <Card>
          <CardHeader className="border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">{program.name}</CardTitle>
                <p className="text-gray-600 mt-2">{program.description}</p>
              </div>
              <div className="text-right">
                <Badge variant="outline" className="text-orange-600 border-orange-200 mb-2">
                  {program.weeks} недель
                </Badge>
                <p className="text-sm text-gray-500">{program.days.length} дней в цикле</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="grid grid-cols-1 lg:grid-cols-4">
              {/* Список дней */}
              <div className="lg:col-span-1 border-r border-gray-100">
                <div className="p-4 border-b border-gray-100 bg-gray-50">
                  <h3 className="font-semibold text-gray-800">Дни программы</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {program.days.map((day, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedDay(index)}
                      className={`w-full p-4 text-left hover:bg-blue-50 transition-colors ${
                        selectedDay === index ? 'bg-blue-100 border-r-4 border-blue-500' : ''
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-800 text-sm">День {index + 1}</h4>
                          <p className="text-xs text-gray-600 mt-1">{day.name}</p>
                        </div>
                        <div className="text-xs text-gray-500">
                          {day.exercises.length} упр.
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Детали дня */}
              <div className="lg:col-span-3">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-800">{currentDay.name}</h2>
                      <p className="text-gray-600">День {selectedDay + 1} из {program.days.length}</p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Dumbbell className="h-4 w-4 mr-1" />
                        {currentDay.exercises.length} упражнений
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        ~{Math.ceil(currentDay.exercises.length * 3)} мин
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {currentDay.exercises.map((exercise, index) => (
                      <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <div className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium mr-3">
                              {index + 1}
                            </div>
                            <h3 className="font-semibold text-gray-800">{exercise.name}</h3>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 text-sm">
                          <div className="bg-white rounded-md p-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">Подходы</div>
                            <div className="font-semibold text-gray-800">{exercise.sets}</div>
                          </div>
                          <div className="bg-white rounded-md p-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">Повторения</div>
                            <div className="font-semibold text-gray-800">{exercise.reps}</div>
                          </div>
                          <div className="bg-white rounded-md p-2 text-center">
                            <div className="text-xs text-gray-500 mb-1">Отдых</div>
                            <div className="font-semibold text-gray-800">{exercise.rest}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-xl font-bold text-gray-800">Программы тренировок</CardTitle>
          <p className="text-gray-600">Выберите готовую программу или создайте собственную</p>
        </CardHeader>

        <CardContent className="p-6">
          <Tabs defaultValue="programs" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="programs">Готовые программы</TabsTrigger>
              <TabsTrigger value="splits">Схемы тренировок</TabsTrigger>
              <TabsTrigger value="muscles">Группы мышц</TabsTrigger>
            </TabsList>

            <TabsContent value="programs" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(trainingPrograms).map(([key, program]) => (
                  <Card key={key} className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-transparent hover:border-orange-200">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className="text-orange-600 border-orange-200">
                          {program.weeks} недель
                        </Badge>
                        <div className="text-sm text-gray-500">{program.days.length} дней</div>
                      </div>
                      <CardTitle className="text-lg">{program.name}</CardTitle>
                      <p className="text-sm text-gray-600 line-clamp-2">{program.description}</p>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        {program.days.slice(0, 2).map((day, index) => (
                          <div key={index} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                            День {index + 1}: {day.name}
                          </div>
                        ))}
                        {program.days.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{program.days.length - 2} дней...
                          </div>
                        )}
                      </div>
                      <Button 
                        onClick={() => setSelectedProgram(key)}
                        className="w-full bg-orange-500 hover:bg-orange-600"
                      >
                        Подробнее
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="splits" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(workoutSplits).map(([key, split]) => (
                  <Card key={key} className="border-2 border-gray-100">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{split.name}</CardTitle>
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {split.frequency}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">{split.description}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="text-sm font-semibold text-gray-800">Подходит для:</h4>
                        <div className="flex flex-wrap gap-2">
                          {split.suitableFor.map((item, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {item}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="muscles" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Object.entries(muscleGroups).map(([key, group]) => (
                  <Card key={key} className="border-2 border-gray-100 hover:border-orange-200 transition-colors">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-center">{group.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {group.exercises.slice(0, 4).map((exercise, index) => (
                          <div key={index} className="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1">
                            {exercise}
                          </div>
                        ))}
                        {group.exercises.length > 4 && (
                          <div className="text-xs text-gray-500 text-center pt-2">
                            +{group.exercises.length - 4} упражнений...
                          </div>
                        )}
                      </div>
                      <Button variant="outline" className="w-full mt-4 border-orange-200 text-orange-600 hover:bg-orange-50">
                        Все упражнения
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}