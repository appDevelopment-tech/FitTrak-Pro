import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock, Plus, Trash2, Calendar } from "lucide-react";

interface Student {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  phone: string;
  email: string;
  birthDate?: string;
  weight?: number;
  height?: number;
  goal?: string;
  medicalNotes?: string;
  photo?: string;
  get name(): string;
}

interface TrainerSession {
  id: number;
  time: string;
  studentName: string;
  status: 'confirmed' | 'pending' | 'free';
  date: string; // формат YYYY-MM-DD
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasSession: boolean;
  sessionCount: number;
}

export function ScheduleOnly() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  
  // Данные тренировок
  const [sessions, setSessions] = useState<TrainerSession[]>([
    { id: 1, time: '09:00', studentName: 'Анна Петрова', status: 'confirmed', date: new Date().toISOString().split('T')[0] },
    { id: 2, time: '11:00', studentName: 'Михаил Сидоров', status: 'pending', date: new Date().toISOString().split('T')[0] },
    { id: 3, time: '14:00', studentName: 'Елена Козлова', status: 'confirmed', date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0] },
    { id: 4, time: '16:00', studentName: 'Дмитрий Волков', status: 'pending', date: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0] },
    { id: 5, time: '18:00', studentName: 'София Морозова', status: 'confirmed', date: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0] },
  ]);

  // Список учеников для быстрого выбора
  const [students] = useState<Student[]>([
    { 
      id: 1, 
      firstName: 'Анна', 
      lastName: 'Петрова', 
      middleName: 'Ивановна',
      phone: '+7 (999) 123-45-67', 
      email: 'anna@email.com',
      birthDate: '1990-05-15',
      weight: 65,
      height: 170,
      goal: 'Похудение и укрепление мышц',
      medicalNotes: 'Травма правого колена 2020г.',
      get name() { return `${this.firstName} ${this.lastName}`; }
    },
    { 
      id: 2, 
      firstName: 'Михаил', 
      lastName: 'Сидоров', 
      middleName: 'Александрович',
      phone: '+7 (999) 234-56-78', 
      email: 'mikhail@email.com',
      birthDate: '1985-12-03',
      weight: 85,
      height: 180,
      goal: 'Набор мышечной массы',
      medicalNotes: 'Здоров',
      get name() { return `${this.firstName} ${this.lastName}`; }
    },
    { 
      id: 3, 
      firstName: 'Елена', 
      lastName: 'Козлова', 
      middleName: 'Петровна',
      phone: '+7 (999) 345-67-89', 
      email: 'elena@email.com',
      birthDate: '1992-08-20',
      weight: 58,
      height: 165,
      goal: 'Поддержание формы',
      medicalNotes: 'Аллергия на латекс',
      get name() { return `${this.firstName} ${this.lastName}`; }
    },
    { 
      id: 4, 
      firstName: 'Дмитрий', 
      lastName: 'Волков', 
      middleName: 'Сергеевич',
      phone: '+7 (999) 456-78-90', 
      email: 'dmitry@email.com',
      birthDate: '1988-11-10',
      weight: 90,
      height: 185,
      goal: 'Силовая подготовка',
      medicalNotes: 'Здоров',
      get name() { return `${this.firstName} ${this.lastName}`; }
    },
    { 
      id: 5, 
      firstName: 'София', 
      lastName: 'Морозова', 
      middleName: 'Викторовна',
      phone: '+7 (999) 567-89-01', 
      email: 'sofia@email.com',
      birthDate: '1995-03-15',
      weight: 60,
      height: 168,
      goal: 'Функциональная подготовка',
      medicalNotes: 'Здорова',
      get name() { return `${this.firstName} ${this.lastName}`; }
    },
    { 
      id: 6, 
      firstName: 'Алексей', 
      lastName: 'Иванов', 
      middleName: 'Николаевич',
      phone: '+7 (999) 678-90-12', 
      email: 'alexey@email.com',
      birthDate: '1987-07-25',
      weight: 78,
      height: 175,
      goal: 'Реабилитация после травмы',
      medicalNotes: 'Травма спины 2023г.',
      get name() { return `${this.firstName} ${this.lastName}`; }
    },
    { 
      id: 7, 
      firstName: 'Мария', 
      lastName: 'Смирнова', 
      middleName: 'Андреевна',
      phone: '+7 (999) 789-01-23', 
      email: 'maria@email.com',
      birthDate: '1993-12-05',
      weight: 55,
      height: 160,
      goal: 'Общая физическая подготовка',
      medicalNotes: 'Здорова',
      get name() { return `${this.firstName} ${this.lastName}`; }
    }
  ]);

  // Диалоги
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');

  // Генерируем временные слоты с 8:00 до 20:00
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const getSessionsForTime = (time: string) => {
    const currentDateString = selectedDate.toISOString().split('T')[0];
    return sessions.filter(session => session.time === time && session.date === currentDateString);
  };

  const handleAddStudent = (time: string) => {
    setSelectedTime(time);
    setSelectedStudentId('');
    setShowAddDialog(true);
  };

  const confirmAddStudent = () => {
    if (!selectedStudentId || !selectedTime) return;
    
    const student = students.find(s => s.id.toString() === selectedStudentId);
    if (!student) return;

    const newSession: TrainerSession = {
      id: Math.max(...sessions.map(s => s.id), 0) + 1,
      time: selectedTime,
      studentName: student.name,
      status: 'confirmed',
      date: selectedDate.toISOString().split('T')[0]
    };

    setSessions([...sessions, newSession]);
    setShowAddDialog(false);
    setSelectedTime('');
    setSelectedStudentId('');
  };

  const removeSession = (sessionId: number) => {
    setSessions(sessions.filter(s => s.id !== sessionId));
  };

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days: CalendarDay[] = [];
    
    for (let i = 0; i < 42; i++) {
      const currentDate = new Date(startDate);
      currentDate.setDate(startDate.getDate() + i);
      
      const dateString = currentDate.toISOString().split('T')[0];
      const daySessions = sessions.filter(s => s.date === dateString);
      
      days.push({
        date: currentDate.getDate(),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: isToday(currentDate),
        hasSession: daySessions.length > 0,
        sessionCount: daySessions.length
      });
    }
    
    return days;
  };

  const handleDayClick = (day: CalendarDay) => {
    if (!day.isCurrentMonth) return;
    
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
    setSelectedDate(newDate);
    setViewMode('day');
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                <Button
                  variant={viewMode === 'day' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('day')}
                  className="text-xs px-3 py-1 transition-all duration-200"
                >
                  Сегодня
                </Button>
                <Button
                  variant={viewMode === 'month' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('month')}
                  className="text-xs px-3 py-1 transition-all duration-200"
                >
                  Месяц
                </Button>
              </div>
              <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                {formatDate(selectedDate)}
              </CardTitle>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                className="text-xs"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date())}
                className="text-xs px-3"
              >
                Сегодня
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                className="text-xs"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {viewMode === 'day' ? (
            <div className="p-6">
              <div className="space-y-2">
                {timeSlots.map(time => {
                  const sessionsAtTime = getSessionsForTime(time);
                  
                  return (
                    <div key={time} className="flex items-center border rounded-lg p-3 hover:bg-gray-50 transition-colors">
                      <div className="w-16 text-sm font-medium text-gray-600">
                        {time}
                      </div>
                      <div className="flex-1 ml-4">
                        {sessionsAtTime.length > 0 ? (
                          <div className="space-y-2">
                            {sessionsAtTime.map(session => (
                              <div key={session.id} className="flex items-center justify-between bg-white border border-gray-200 rounded-md p-2">
                                <div className="flex items-center space-x-3">
                                  <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                  <span className="font-medium text-gray-800">{session.studentName}</span>
                                  <Badge 
                                    variant={session.status === 'confirmed' ? 'default' : 'secondary'}
                                    className={session.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                  >
                                    {session.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}
                                  </Badge>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeSession(session.id)}
                                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <Button
                            variant="ghost"
                            onClick={() => handleAddStudent(time)}
                            className="w-full text-left justify-start text-gray-400 hover:text-gray-600 hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4 mr-2" />
                            Добавить тренировку
                          </Button>
                        )}
                      </div>
                      {sessionsAtTime.length > 0 && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleAddStudent(time)}
                          className="ml-2"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <h3 className="text-lg font-semibold">
                  {currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
                </h3>
                <Button
                  variant="ghost"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-2">
                {['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {getDaysInMonth(currentMonth).map((day, index) => (
                  <button
                    key={index}
                    onClick={() => handleDayClick(day)}
                    className={`p-2 text-sm relative transition-colors ${
                      day.isCurrentMonth 
                        ? 'text-gray-900 hover:bg-orange-50' 
                        : 'text-gray-300'
                    } ${
                      day.isToday 
                        ? 'bg-orange-500 text-white hover:bg-orange-600' 
                        : ''
                    } ${
                      !day.isCurrentMonth ? 'cursor-default' : 'cursor-pointer'
                    }`}
                  >
                    {day.date}
                    {day.hasSession && (
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                    {day.sessionCount > 1 && (
                      <div className="absolute top-1 right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                        {day.sessionCount}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Диалог добавления тренировки */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить тренировку на {selectedTime}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>Выберите ученика</Label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите ученика" />
                </SelectTrigger>
                <SelectContent>
                  {students.map(student => (
                    <SelectItem key={student.id} value={student.id.toString()}>
                      {student.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              Отмена
            </Button>
            <Button onClick={confirmAddStudent} className="bg-orange-500 hover:bg-orange-600">
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}