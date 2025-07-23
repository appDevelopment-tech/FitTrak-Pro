import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Weight, CheckCircle, Clock, Trophy, TrendingUp, Dumbbell } from "lucide-react";
import { StatsCard } from "@/components/ui/stats-card";
import { useQuery } from "@tanstack/react-query";
import type { ExerciseProgress } from "@shared/schema";

export function ProgressView() {
  const { data: progressData = [] } = useQuery<ExerciseProgress[]>({
    queryKey: ['/api/exercise-progress/1'],
  });

  // Group progress by exercise ID and get latest entries
  const exerciseGroups = progressData.reduce((acc, progress) => {
    const exerciseKey = `exercise_${progress.exerciseId}`;
    if (!acc[exerciseKey]) {
      acc[exerciseKey] = [];
    }
    acc[exerciseKey].push(progress);
    return acc;
  }, {} as Record<string, ExerciseProgress[]>);

  const exerciseProgressSummary = Object.entries(exerciseGroups).map(([name, entries]) => {
    const sortedEntries = entries.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    const latest = sortedEntries[0];
    const previous = sortedEntries[1];
    
    let progress = "+0 кг";
    if (previous && latest.weight && previous.weight) {
      const diff = latest.weight - previous.weight;
      progress = diff > 0 ? `+${diff} кг` : `${diff} кг`;
    }
    
    return {
      name,
      lastSession: `${latest.weight || 0}кг × ${latest.reps || 0}`,
      progress,
      isPositive: !previous || !latest.weight || !previous.weight || latest.weight >= previous.weight,
    };
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Прогресс тренировок</h2>
        <p className="text-gray-600">Отслеживайте свои достижения</p>
      </div>

      {/* Progress Stats */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Общий вес поднят"
          value="12,450 кг"
          subtitle="+15% за месяц"
          icon={Weight}
          gradient="primary"
        />
        <StatsCard
          title="Тренировок завершено"
          value="47"
          subtitle="В этом месяце"
          icon={CheckCircle}
          gradient="success"
        />
        <StatsCard
          title="Время тренировок"
          value="94 ч"
          subtitle="За все время"
          icon={Clock}
          gradient="secondary"
        />
      </div>

      {/* Chart Section */}
      <Card className="mb-8">
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Прогресс по весам
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 text-lg font-medium">График прогресса по весам</p>
              <p className="text-sm text-gray-400 mt-2">
                Здесь будет отображаться динамика изменения рабочих весов
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Exercise Progress */}
      <Card>
        <CardHeader className="border-b border-gray-100">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Прогресс по упражнениям
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {exerciseProgressSummary.length === 0 ? (
            <div className="text-center py-8">
              <Dumbbell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">Данные о прогрессе отсутствуют</p>
            </div>
          ) : (
            <div className="space-y-4">
              {exerciseProgressSummary.map((exercise) => (
                <div key={exercise.name} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-orange-500 bg-opacity-10 rounded-lg p-2 mr-4">
                      <Dumbbell className="h-5 w-5 text-orange-500" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800">{exercise.name}</h4>
                      <p className="text-sm text-gray-600">Последняя: {exercise.lastSession}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-lg font-bold ${exercise.isPositive ? 'text-green-500' : 'text-red-500'}`}>
                      {exercise.progress}
                    </p>
                    <p className="text-sm text-gray-500">за неделю</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
