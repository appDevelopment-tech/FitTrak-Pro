import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dumbbell, Clock, User, Play } from "lucide-react";
import type { WorkoutSession, WorkoutProgram } from "@shared/schema";

interface TodayScheduleProps {
  sessions: (WorkoutSession & { program?: WorkoutProgram })[];
  onStartWorkout: (sessionId: number) => void;
}

export function TodaySchedule({ sessions, onStartWorkout }: TodayScheduleProps) {
  const today = new Date().toLocaleDateString('ru-RU', { 
    day: 'numeric', 
    month: 'long' 
  });

  const getWorkoutGradient = (type: string) => {
    switch (type) {
      case 'strength':
        return 'bg-gradient-to-r from-orange-500 to-orange-600';
      case 'cardio':
        return 'bg-gradient-to-r from-blue-600 to-blue-700';
      case 'functional':
        return 'bg-gradient-to-r from-green-500 to-green-600';
      case 'stretching':
        return 'bg-gradient-to-r from-purple-500 to-purple-600';
      default:
        return 'bg-gradient-to-r from-gray-500 to-gray-600';
    }
  };

  const getWorkoutIcon = (type: string) => {
    switch (type) {
      case 'cardio':
        return '🏃';
      default:
        return '💪';
    }
  };

  return (
    <Card>
      <CardHeader className="border-b border-gray-100">
        <CardTitle className="text-lg font-semibold text-gray-800">
          Сегодня - {today}
        </CardTitle>
        <p className="text-sm text-gray-500">
          {sessions.length} {sessions.length === 1 ? 'тренировка запланирована' : 'тренировки запланировано'}
        </p>
      </CardHeader>
      
      <CardContent className="p-6 space-y-4">
        {sessions.length === 0 ? (
          <div className="text-center py-8">
            <Dumbbell className="h-12 w-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500">На сегодня тренировки не запланированы</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className={`flex items-center p-4 text-white rounded-lg ${getWorkoutGradient(session.program?.type || 'strength')}`}
            >
              <div className="flex-shrink-0 mr-4">
                <div className="bg-white bg-opacity-20 rounded-lg p-2">
                  <span className="text-lg">{getWorkoutIcon(session.program?.type || 'strength')}</span>
                </div>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">{session.program?.name || 'Тренировка'}</h4>
                <div className="flex items-center text-sm text-white text-opacity-90 mt-1">
                  <User className="h-3 w-3 mr-1" />
                  <span>Тренер: Вячеслав Л.</span>
                </div>
                <div className="flex items-center text-sm text-white text-opacity-90 mt-1">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{session.startTime} - {session.endTime}</span>
                </div>
              </div>
              <Button
                onClick={() => onStartWorkout(session.id)}
                size="sm"
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white border-0"
              >
                <Play className="h-4 w-4 mr-1" />
                Начать
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
