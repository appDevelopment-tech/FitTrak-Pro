import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock, User, Plus, Trash2, Edit, Calendar, Users } from "lucide-react";

interface Student {
  id: number;
  name: string;
  phone: string;
  email: string;
}

interface TrainerSession {
  id: number;
  time: string;
  studentName: string;
  status: 'confirmed' | 'pending' | 'free';
}

interface CalendarDay {
  date: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  hasSession: boolean;
  sessionCount: number;
}

export function TrainerSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [activeTab, setActiveTab] = useState<'schedule' | 'students'>('schedule');
  
  // Автоматически определяем активную вкладку
  useEffect(() => {
    // Проверяем текущий активный раздел из navigation
    const urlParams = new URLSearchParams(window.location.search);
    const section = urlParams.get('section');
    if (section === 'students') {
      setActiveTab('students');
    } else {
      setActiveTab('schedule');
    }
  }, []);
  const [sessions, setSessions] = useState<TrainerSession[]>([
    { id: 1, time: '09:00', studentName: 'Анна Петрова', status: 'confirmed' },
    { id: 2, time: '11:00', studentName: 'Михаил Сидоров', status: 'pending' },
    { id: 3, time: '14:00', studentName: 'Елена Козлова', status: 'confirmed' },
    { id: 4, time: '16:00', studentName: 'Дмитрий Волков', status: 'pending' },
    { id: 5, time: '18:00', studentName: 'София Морозова', status: 'confirmed' },
  ]);
  const [students, setStudents] = useState<Student[]>([
    { id: 1, name: 'Анна Петрова', phone: '+7 (999) 123-45-67', email: 'anna@email.com' },
    { id: 2, name: 'Михаил Сидоров', phone: '+7 (999) 234-56-78', email: 'mikhail@email.com' },
    { id: 3, name: 'Елена Козлова', phone: '+7 (999) 345-67-89', email: 'elena@email.com' },
    { id: 4, name: 'Дмитрий Волков', phone: '+7 (999) 456-78-90', email: 'dmitry@email.com' },
    { id: 5, name: 'София Морозова', phone: '+7 (999) 567-89-01', email: 'sofia@email.com' },
    { id: 6, name: 'Алексей Иванов', phone: '+7 (999) 678-90-12', email: 'alexey@email.com' },
    { id: 7, name: 'Мария Смирнова', phone: '+7 (999) 789-01-23', email: 'maria@email.com' },
  ]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showConflictDialog, setShowConflictDialog] = useState(false);
  const [showDuplicateDialog, setShowDuplicateDialog] = useState(false);
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false);
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedStudentId, setSelectedStudentId] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentPhone, setNewStudentPhone] = useState('');
  const [newStudentEmail, setNewStudentEmail] = useState('');
  const [conflictMessage, setConflictMessage] = useState('');
  const [duplicateMessage, setDuplicateMessage] = useState('');

  // Генерируем временные слоты с 8:00 до 20:00
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour.toString().padStart(2, '0')}:00`);
  }

  const getSessionsForTime = (time: string) => {
    return sessions.filter(session => session.time === time);
  };

  const handleAddStudent = (time: string) => {
    setSelectedTime(time);
    setSelectedStudentId('');
    setShowAddDialog(true);
  };

  const checkForConflicts = (time: string, studentId: string) => {
    const student = students.find(s => s.id.toString() === studentId);
    if (!student) return false;
    
    const existingSessions = getSessionsForTime(time);
    
    // Проверка на дублирование ученика
    const duplicateSession = existingSessions.find(session => 
      session.studentName.toLowerCase() === student.name.toLowerCase()
    );
    
    if (duplicateSession) {
      setDuplicateMessage(`Ученик ${student.name} записан на ${time}`);
      setShowDuplicateDialog(true);
      return false;
    }
    
    // Проверка на занятое время
    if (existingSessions.length > 0) {
      setConflictMessage(`Время ${time} занято! Добавить?`);
      setShowConflictDialog(true);
      return false;
    }
    
    return true;
  };

  const addStudentToSchedule = () => {
    if (!selectedStudentId) return;
    
    if (checkForConflicts(selectedTime, selectedStudentId)) {
      confirmAddStudent();
    }
  };

  const confirmAddStudent = () => {
    const student = students.find(s => s.id.toString() === selectedStudentId);
    if (!student) return;
    
    const newId = Math.max(...sessions.map(s => s.id), 0) + 1;
    const newSession: TrainerSession = {
      id: newId,
      time: selectedTime,
      studentName: student.name,
      status: 'confirmed'
    };
    
    setSessions([...sessions, newSession]);
    setShowAddDialog(false);
    setShowConflictDialog(false);
    setSelectedStudentId('');
  };

  const addNewStudent = () => {
    if (!newStudentName.trim()) return;
    
    const newId = Math.max(...students.map(s => s.id), 0) + 1;
    const newStudent: Student = {
      id: newId,
      name: newStudentName,
      phone: newStudentPhone,
      email: newStudentEmail
    };
    
    setStudents([...students, newStudent]);
    setShowAddStudentDialog(false);
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentEmail('');
  };

  const removeStudentFromList = (studentId: number) => {
    setStudents(students.filter(student => student.id !== studentId));
    // Также удаляем из расписания
    setSessions(sessions.filter(session => {
      const student = students.find(s => s.name === session.studentName);
      return !student || student.id !== studentId;
    }));
  };

  const removeStudent = (sessionId: number) => {
    setSessions(sessions.filter(session => session.id !== sessionId));
  };

  const getDaysInMonth = (date: Date): CalendarDay[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days: CalendarDay[] = [];
    const current = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      const isCurrentMonth = current.getMonth() === month;
      const isToday = current.toDateString() === new Date().toDateString();
      
      days.push({
        date: current.getDate(),
        isCurrentMonth,
        isToday,
        hasSession: isCurrentMonth && Math.random() > 0.7,
        sessionCount: Math.floor(Math.random() * 4)
      });

      current.setDate(current.getDate() + 1);
    }

    return days;
  };

  const handleDayClick = (day: CalendarDay) => {
    if (day.isCurrentMonth) {
      const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day.date);
      setSelectedDate(newDate);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('ru-RU', { 
      weekday: 'long',
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  const isToday = (date: Date) => {
    return date.toDateString() === new Date().toDateString();
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const days = getDaysInMonth(currentMonth);
  const monthName = currentMonth.toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  const renderStudentsList = () => (
    <Card>
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">Список учеников</CardTitle>
          <Button onClick={() => setShowAddStudentDialog(true)} className="text-xs">
            <Plus className="h-4 w-4 mr-1" />
            Добавить ученика
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div key={student.id} className="p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-gray-800">{student.name}</h4>
                  <p className="text-xs text-gray-500">{student.phone}</p>
                  <p className="text-xs text-gray-400">{student.email}</p>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={() => removeStudentFromList(student.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex">
        {/* Левая навигация */}
        <div className="w-48 mr-6">
          <div className="space-y-2">
            <Button
              variant={activeTab === 'schedule' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('schedule')}
              className="w-full justify-start"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Расписание
            </Button>
            <Button
              variant={activeTab === 'students' ? 'default' : 'ghost'}
              onClick={() => setActiveTab('students')}
              className="w-full justify-start"
            >
              <Users className="h-4 w-4 mr-2" />
              Ученики
            </Button>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex-1">
          {activeTab === 'students' ? (
            renderStudentsList()
          ) : (
            <>
              {/* Переключатель вида для расписания */}
              <div className="flex justify-end items-center mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    variant={viewMode === 'day' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('day')}
                    className="text-xs"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Сегодня
                  </Button>
                  <Button
                    variant={viewMode === 'month' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('month')}
                    className="text-xs"
                  >
                    <Calendar className="h-4 w-4 mr-1" />
                    Месяц
                  </Button>
                </div>
              </div>

              {viewMode === 'day' ? (
                <Card>
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                          {formatDate(selectedDate)}
                        </CardTitle>
                      </div>
                      <div className="flex space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 24 * 60 * 60 * 1000))}
                          className="p-1"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                          className="p-1"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-0">
                    <div className="divide-y divide-gray-100">
                      {timeSlots.map((time) => {
                        const timeSessions = getSessionsForTime(time);
                        
                        return (
                          <div key={time} className="py-3 px-4 hover:bg-gray-50">
                            {/* Заголовок времени */}
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                                <span className="text-sm font-medium text-gray-700">{time}</span>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAddStudent(time)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Добавить ученика
                              </Button>
                            </div>

                            {/* Список учеников на это время */}
                            {timeSessions.length > 0 ? (
                              <div className="space-y-2 ml-6">
                                {timeSessions.map((session) => (
                                  <div key={session.id} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                                    <div className="flex items-center">
                                      <div className={`w-3 h-3 rounded-full mr-3 ${
                                        session.status === 'confirmed' ? 'bg-green-500' : 
                                        session.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                                      }`}></div>
                                      <h4 className="text-sm font-semibold text-gray-800">{session.studentName}</h4>
                                    </div>
                                    <div className="flex space-x-2">
                                      <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                                        На тренировку
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => removeStudent(session.id)}
                                        className="text-red-600 hover:text-red-700 p-1"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="ml-6 text-sm text-gray-400">Свободно</div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                        {monthName}
                      </CardTitle>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigateMonth('prev')}
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigateMonth('next')}
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-6">
                    <div className="grid grid-cols-7 gap-1 mb-4">
                      {['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'].map((day) => (
                        <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1">
                      {days.map((day, index) => {
                        const isSelected = selectedDate && 
                          selectedDate.getDate() === day.date && 
                          selectedDate.getMonth() === currentMonth.getMonth() &&
                          day.isCurrentMonth;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              handleDayClick(day);
                              setViewMode('day');
                            }}
                            className={`
                              text-center py-2 relative rounded-lg transition-colors text-sm
                              ${!day.isCurrentMonth ? 'text-gray-400' : 'hover:bg-gray-100'}
                              ${day.isToday ? 'bg-orange-100 text-orange-800 font-bold' : ''}
                              ${isSelected ? 'bg-blue-100 text-blue-800 font-semibold' : ''}
                            `}
                          >
                            {day.date}
                            {day.hasSession && (
                              <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                <div className="w-1 h-1 bg-orange-500 rounded-full"></div>
                              </div>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Статистика дня */}
              <div className="grid grid-cols-3 gap-4 mt-6">
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-orange-500">{sessions.length}</p>
                    <p className="text-sm text-gray-600">Тренировок</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-green-500">
                      {sessions.filter(s => s.status === 'confirmed').length}
                    </p>
                    <p className="text-sm text-gray-600">Подтверждено</p>
                  </div>
                </Card>
                <Card className="p-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-yellow-500">
                      {sessions.filter(s => s.status === 'pending').length}
                    </p>
                    <p className="text-sm text-gray-600">Ожидает</p>
                  </div>
                </Card>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Диалог добавления ученика в расписание */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить ученика на {selectedTime}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="studentSelect">Выберите ученика</Label>
              <Select value={selectedStudentId} onValueChange={setSelectedStudentId}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите ученика" />
                </SelectTrigger>
                <SelectContent>
                  {students.map((student) => (
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
            <Button onClick={addStudentToSchedule}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог добавления нового ученика */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить нового ученика</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="studentName">Имя</Label>
              <Input
                id="studentName"
                value={newStudentName}
                onChange={(e) => setNewStudentName(e.target.value)}
                placeholder="Введите имя ученика"
              />
            </div>
            <div>
              <Label htmlFor="studentPhone">Телефон</Label>
              <Input
                id="studentPhone"
                value={newStudentPhone}
                onChange={(e) => setNewStudentPhone(e.target.value)}
                placeholder="+7 (999) 123-45-67"
              />
            </div>
            <div>
              <Label htmlFor="studentEmail">Email</Label>
              <Input
                id="studentEmail"
                value={newStudentEmail}
                onChange={(e) => setNewStudentEmail(e.target.value)}
                placeholder="email@example.com"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>
              Отмена
            </Button>
            <Button onClick={addNewStudent}>
              Добавить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог конфликта времени */}
      <Dialog open={showConflictDialog} onOpenChange={setShowConflictDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Подтверждение</DialogTitle>
          </DialogHeader>
          <p>{conflictMessage}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConflictDialog(false)}>
              НЕТ
            </Button>
            <Button onClick={confirmAddStudent}>
              ДА
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Диалог дублирования ученика */}
      <Dialog open={showDuplicateDialog} onOpenChange={setShowDuplicateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ученик уже записан</DialogTitle>
          </DialogHeader>
          <p>{duplicateMessage}</p>
          <DialogFooter>
            <Button onClick={() => setShowDuplicateDialog(false)}>
              ОК
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}