import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock, User, Plus, Trash2, Edit, Calendar, Users, Save } from "lucide-react";

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

export function TrainerSchedule() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'month'>('day');
  const [activeTab, setActiveTab] = useState<'schedule' | 'students' | 'profile'>('schedule');
  const [selectedStudentProfile, setSelectedStudentProfile] = useState<Student | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);
  
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

  // Следим за изменениями URL
  useEffect(() => {
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section');

      if (section === 'students') {
        setActiveTab('students');
      } else if (section === 'profile') {
        setActiveTab('profile');
      } else {
        setActiveTab('schedule');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Слушаем изменения URL в реальном времени
  useEffect(() => {
    const handleLocationChange = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const section = urlParams.get('section');

      
      if (section === 'students') {
        setActiveTab('students');
      } else if (section === 'profile') {
        setActiveTab('profile');
      } else {
        setActiveTab('schedule');
      }
    };

    // Слушаем изменения истории браузера
    window.addEventListener('popstate', handleLocationChange);
    
    // Проверяем URL при каждом изменении location
    const originalPushState = window.history.pushState;
    window.history.pushState = function(...args) {
      originalPushState.apply(this, args);
      setTimeout(handleLocationChange, 0);
    };

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.history.pushState = originalPushState;
    };
  }, []);
  const [sessions, setSessions] = useState<TrainerSession[]>([
    { id: 1, time: '09:00', studentName: 'Анна Петрова', status: 'confirmed', date: new Date().toISOString().split('T')[0] },
    { id: 2, time: '11:00', studentName: 'Михаил Сидоров', status: 'pending', date: new Date().toISOString().split('T')[0] },
    { id: 3, time: '14:00', studentName: 'Елена Козлова', status: 'confirmed', date: new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0] },
    { id: 4, time: '16:00', studentName: 'Дмитрий Волков', status: 'pending', date: new Date(Date.now() + 2*24*60*60*1000).toISOString().split('T')[0] },
    { id: 5, time: '18:00', studentName: 'София Морозова', status: 'confirmed', date: new Date(Date.now() + 3*24*60*60*1000).toISOString().split('T')[0] },
  ]);
  const [students, setStudents] = useState<Student[]>([
    { 
      id: 1, 
      name: 'Анна Петрова', 
      firstName: 'Анна', 
      lastName: 'Петрова', 
      middleName: 'Ивановна',
      phone: '+7 (999) 123-45-67', 
      email: 'anna@email.com',
      birthDate: '1990-05-15',
      weight: 65,
      height: 170,
      goal: 'Похудение и укрепление мышц',
      medicalNotes: 'Травма правого колена 2020г.'
    },
    { 
      id: 2, 
      name: 'Михаил Сидоров', 
      firstName: 'Михаил', 
      lastName: 'Сидоров', 
      middleName: 'Александрович',
      phone: '+7 (999) 234-56-78', 
      email: 'mikhail@email.com',
      birthDate: '1985-12-03',
      weight: 85,
      height: 180,
      goal: 'Набор мышечной массы',
      medicalNotes: 'Здоров'
    },
    { 
      id: 3, 
      name: 'Елена Козлова', 
      firstName: 'Елена', 
      lastName: 'Козлова', 
      middleName: 'Дмитриевна',
      phone: '+7 (999) 345-67-89', 
      email: 'elena@email.com',
      birthDate: '1992-08-20',
      weight: 58,
      height: 165,
      goal: 'Улучшение выносливости',
      medicalNotes: 'Артрит тазобедренного сустава'
    },
    { 
      id: 4, 
      name: 'Дмитрий Волков', 
      firstName: 'Дмитрий', 
      lastName: 'Волков', 
      middleName: 'Сергеевич',
      phone: '+7 (999) 456-78-90', 
      email: 'dmitry@email.com',
      birthDate: '1988-03-10',
      weight: 90,
      height: 185,
      goal: 'Поддержание формы',
      medicalNotes: 'Здоров'
    },
    { 
      id: 5, 
      name: 'София Морозова', 
      firstName: 'София', 
      lastName: 'Морозова', 
      middleName: 'Андреевна',
      phone: '+7 (999) 567-89-01', 
      email: 'sofia@email.com',
      birthDate: '1995-11-25',
      weight: 62,
      height: 168,
      goal: 'Растяжка и йога',
      medicalNotes: 'Сколиоз, рекомендована лечебная физкультура'
    },
    { 
      id: 6, 
      name: 'Алексей Иванов', 
      firstName: 'Алексей', 
      lastName: 'Иванов', 
      middleName: 'Петрович',
      phone: '+7 (999) 678-90-12', 
      email: 'alexey@email.com',
      birthDate: '1983-07-14',
      weight: 78,
      height: 175,
      goal: 'Восстановление после травмы',
      medicalNotes: 'Разрыв связок левого плеча, реабилитация'
    },
    { 
      id: 7, 
      name: 'Мария Смирнова', 
      firstName: 'Мария', 
      lastName: 'Смирнова', 
      middleName: 'Владимировна',
      phone: '+7 (999) 789-01-23', 
      email: 'maria@email.com',
      birthDate: '1991-01-30',
      weight: 55,
      height: 160,
      goal: 'Общее укрепление здоровья',
      medicalNotes: 'Здорова'
    },
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
  const [conflictTime, setConflictTime] = useState('');
  const [draggedSession, setDraggedSession] = useState<TrainerSession | null>(null);
  const [dragOverTime, setDragOverTime] = useState<string | null>(null);

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

  const checkForConflicts = (time: string, studentId: string) => {
    const student = students.find(s => s.id.toString() === studentId);
    if (!student) return false;
    
    const currentDateString = selectedDate.toISOString().split('T')[0];
    const existingSessions = getSessionsForTime(time);
    
    // Проверка на дублирование ученика в этот же день на другое время
    const duplicateInDay = sessions.find(session => 
      session.date === currentDateString && 
      session.studentName.toLowerCase() === student.name.toLowerCase() &&
      session.time !== time
    );
    
    if (duplicateInDay) {
      setDuplicateMessage(`${student.name} уже записан на ${duplicateInDay.time} в этот день. Вы точно хотите добавить ученика на ${time}?`);
      setShowDuplicateDialog(true);
      return false;
    }
    
    // Проверка на дублирование ученика на это же время
    const duplicateAtTime = existingSessions.find(session => 
      session.studentName.toLowerCase() === student.name.toLowerCase()
    );
    
    if (duplicateAtTime) {
      setDuplicateMessage(`${student.name} уже записан на ${time}`);
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
      status: 'confirmed',
      date: selectedDate.toISOString().split('T')[0]
    };
    
    setSessions([...sessions, newSession]);
    setShowAddDialog(false);
    setShowConflictDialog(false);
    setSelectedStudentId('');
  };

  const addNewStudent = () => {
    if (!newStudentName.trim()) return;
    
    const nameParts = newStudentName.split(' ');
    const newId = Math.max(...students.map(s => s.id), 0) + 1;
    const newStudent: Student = {
      id: newId,
      name: newStudentName,
      firstName: nameParts[1] || '',
      lastName: nameParts[0] || '',
      middleName: nameParts[2] || '',
      phone: newStudentPhone,
      email: newStudentEmail
    };
    
    setStudents([...students, newStudent]);
    setShowAddStudentDialog(false);
    setNewStudentName('');
    setNewStudentPhone('');
    setNewStudentEmail('');
  };

  const openStudentProfile = (student: Student) => {
    setSelectedStudentProfile(student);
    setIsEditingProfile(false);
    setEditedStudent(null);
    setActiveTab('profile');
    
    // Обновляем URL для корректной навигации
    const url = new URL(window.location.href);
    url.searchParams.set('section', 'profile');
    window.history.pushState({}, '', url);
  };

  const backToStudents = () => {
    setSelectedStudentProfile(null);
    setIsEditingProfile(false);
    setEditedStudent(null);
    setActiveTab('students');
    
    // Обновляем URL для возврата к списку учеников
    const url = new URL(window.location.href);
    url.searchParams.set('section', 'students');
    window.history.pushState({}, '', url);
  };

  const openAddStudentForm = () => {
    // Создаем пустой профиль для нового ученика
    const newStudentProfile: Student = {
      id: 0, // Временный ID
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      birthDate: '',
      weight: undefined,
      height: undefined,
      goal: '',
      medicalNotes: '',
      get name() { return `${this.firstName} ${this.lastName}`.trim(); }
    };
    setSelectedStudentProfile(newStudentProfile);
    setEditedStudent({...newStudentProfile});
    setIsEditingProfile(true);
    setActiveTab('profile');
  };

  const startEditingProfile = () => {
    if (selectedStudentProfile) {
      setEditedStudent({...selectedStudentProfile});
      setIsEditingProfile(true);
    }
  };

  const cancelEditing = () => {
    setEditedStudent(null);
    setIsEditingProfile(false);
  };

  const saveStudentProfile = () => {
    if (!editedStudent) return;
    
    if (editedStudent.id === 0) {
      // Создание нового ученика
      const newId = Math.max(...students.map(s => s.id), 0) + 1;
      const newStudent = {...editedStudent, id: newId};
      setStudents([...students, newStudent]);
      setSelectedStudentProfile(newStudent);
    } else {
      // Обновление существующего ученика
      setStudents(students.map(s => s.id === editedStudent.id ? editedStudent : s));
      setSelectedStudentProfile(editedStudent);
    }
    
    setIsEditingProfile(false);
    setEditedStudent(null);
  };

  const updateEditedField = (field: keyof Student, value: any) => {
    if (editedStudent) {
      setEditedStudent({
        ...editedStudent,
        [field]: value
      });
    }
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

  // Drag and Drop handlers
  const handleDragStart = (e: React.DragEvent, session: TrainerSession) => {
    setDraggedSession(session);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, time: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverTime(time);
  };

  const handleDragLeave = () => {
    setDragOverTime(null);
  };

  const handleDrop = (e: React.DragEvent, targetTime: string) => {
    e.preventDefault();
    setDragOverTime(null);
    
    if (!draggedSession || draggedSession.time === targetTime) {
      setDraggedSession(null);
      return;
    }

    // Проверяем конфликты на новом времени
    const existingSessions = getSessionsForTime(targetTime);
    if (existingSessions.length > 0) {
      setConflictMessage(`Время ${targetTime} уже занято! Переместить ученика ${draggedSession.studentName}?`);
      setConflictTime(targetTime);
      setShowConflictDialog(true);
      return;
    }

    // Перемещаем ученика
    setSessions(sessions.map(session => 
      session.id === draggedSession.id 
        ? { ...session, time: targetTime }
        : session
    ));
    
    setDraggedSession(null);
  };

  const confirmDragMove = () => {
    if (draggedSession) {
      setSessions(sessions.map(session => 
        session.id === draggedSession.id 
          ? { ...session, time: conflictTime }
          : session
      ));
    }
    setShowConflictDialog(false);
    setDraggedSession(null);
    setConflictTime('');
    setConflictMessage('');
  };

  const toggleSessionStatus = (sessionId: number) => {
    setSessions(sessions.map(session => {
      if (session.id === sessionId) {
        const newStatus = session.status === 'confirmed' ? 'pending' : 'confirmed';
        return { ...session, status: newStatus };
      }
      return session;
    }));
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
      
      // Проверяем, есть ли тренировки на эту дату
      const dateString = current.toISOString().split('T')[0];
      const sessionsOnDate = sessions.filter(session => session.date === dateString);
      
      days.push({
        date: current.getDate(),
        isCurrentMonth,
        isToday,
        hasSession: isCurrentMonth && sessionsOnDate.length > 0,
        sessionCount: sessionsOnDate.length
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

  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const renderStudentProfile = () => {
    if (!selectedStudentProfile) return null;
    
    const student = isEditingProfile ? editedStudent! : selectedStudentProfile;
    const isNewStudent = student.id === 0;
    
    const formatDate = (dateString?: string) => {
      if (!dateString) return 'Не указана';
      const date = new Date(dateString);
      return date.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    };
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={backToStudents} className="text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад к списку учеников
          </Button>
          {!isEditingProfile && !isNewStudent && (
            <Button className="bg-orange-500 hover:bg-orange-600 text-white">
              <Calendar className="h-4 w-4 mr-1" />
              Создать тренировку
            </Button>
          )}
        </div>
        
        <Card>
          <CardHeader className="border-b border-gray-100">
            <CardTitle className="text-xl font-bold text-gray-800">
              {isNewStudent ? 'Добавление нового ученика' : 
               isEditingProfile ? 'Редактирование профиля' : 'Профиль ученика'}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Фото */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div className="mx-auto h-40 w-40 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center mb-4 shadow-lg">
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} className="h-40 w-40 rounded-full object-cover" />
                    ) : (
                      <User className="h-20 w-20 text-white" />
                    )}
                  </div>
                  {isEditingProfile && (
                    <Button variant="outline" size="sm" className="text-xs">
                      Выбрать фото
                    </Button>
                  )}
                </div>
              </div>
              
              {/* Основная информация */}
              <div className="lg:col-span-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Личные данные */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Личные данные</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Фамилия *</Label>
                        {isEditingProfile ? (
                          <Input
                            value={student.lastName}
                            onChange={(e) => updateEditedField('lastName', e.target.value)}
                            placeholder="Введите фамилию"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm font-medium">
                            {student.lastName}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Имя *</Label>
                        {isEditingProfile ? (
                          <Input
                            value={student.firstName}
                            onChange={(e) => updateEditedField('firstName', e.target.value)}
                            placeholder="Введите имя"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm font-medium">
                            {student.firstName}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Отчество</Label>
                        {isEditingProfile ? (
                          <Input
                            value={student.middleName || ''}
                            onChange={(e) => updateEditedField('middleName', e.target.value)}
                            placeholder="Введите отчество"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.middleName || 'Не указано'}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Дата рождения</Label>
                        {isEditingProfile ? (
                          <Input
                            type="date"
                            value={student.birthDate || ''}
                            onChange={(e) => updateEditedField('birthDate', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {formatDate(student.birthDate)}
                            {student.birthDate && (
                              <span className="text-gray-500 ml-2">
                                ({calculateAge(student.birthDate)} лет)
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Контакты и физические данные */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Контакты и параметры</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Телефон *</Label>
                        {isEditingProfile ? (
                          <Input
                            value={student.phone}
                            onChange={(e) => updateEditedField('phone', e.target.value)}
                            placeholder="+7 (999) 123-45-67"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm font-medium">
                            {student.phone}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email *</Label>
                        {isEditingProfile ? (
                          <Input
                            type="email"
                            value={student.email}
                            onChange={(e) => updateEditedField('email', e.target.value)}
                            placeholder="email@example.com"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.email}
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Вес (кг)</Label>
                          {isEditingProfile ? (
                            <Input
                              type="number"
                              value={student.weight || ''}
                              onChange={(e) => updateEditedField('weight', e.target.value ? parseInt(e.target.value) : undefined)}
                              placeholder="70"
                              className="mt-1"
                            />
                          ) : (
                            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm font-medium">
                              {student.weight || 'Не указан'}
                            </div>
                          )}
                        </div>
                        
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Рост (см)</Label>
                          {isEditingProfile ? (
                            <Input
                              type="number"
                              value={student.height || ''}
                              onChange={(e) => updateEditedField('height', e.target.value ? parseInt(e.target.value) : undefined)}
                              placeholder="175"
                              className="mt-1"
                            />
                          ) : (
                            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm font-medium">
                              {student.height || 'Не указан'}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Цели и медицинские особенности */}
                  <div className="md:col-span-2 space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Цели и медицинские особенности</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Цель тренировки</Label>
                        {isEditingProfile ? (
                          <Select
                            value={student.goal || ''}
                            onValueChange={(value) => updateEditedField('goal', value)}
                          >
                            <SelectTrigger className="mt-1">
                              <SelectValue placeholder="Выберите цель тренировки" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Похудение">Похудение</SelectItem>
                              <SelectItem value="Набор мышечной массы">Набор мышечной массы</SelectItem>
                              <SelectItem value="Поддержание формы">Поддержание формы</SelectItem>
                              <SelectItem value="Силовые показатели">Силовые показатели</SelectItem>
                              <SelectItem value="Общая физическая подготовка">Общая физическая подготовка</SelectItem>
                              <SelectItem value="Растяжка и йога">Растяжка и йога</SelectItem>
                              <SelectItem value="Восстановление после травмы">Восстановление после травмы</SelectItem>
                              <SelectItem value="Улучшение выносливости">Улучшение выносливости</SelectItem>
                            </SelectContent>
                          </Select>
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.goal || 'Не указана'}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <Label className="text-sm font-medium text-gray-700">
                          Медицинские особенности и ограничения
                        </Label>
                        {isEditingProfile ? (
                          <textarea
                            value={student.medicalNotes || ''}
                            onChange={(e) => updateEditedField('medicalNotes', e.target.value)}
                            placeholder="Опишите медицинские особенности, травмы, ограничения..."
                            className="mt-1 w-full p-3 border border-gray-300 rounded-md text-sm min-h-[100px] resize-y focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                          />
                        ) : (
                          <div className="mt-1 p-4 bg-gray-50 rounded-md text-sm min-h-[100px] border-l-4 border-orange-500">
                            {student.medicalNotes || 'Медицинские особенности не указаны'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Кнопки действий */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t">
                  {isEditingProfile ? (
                    <div className="flex space-x-3">
                      <Button variant="outline" onClick={cancelEditing}>
                        Отмена
                      </Button>
                      <Button 
                        onClick={saveStudentProfile}
                        className="bg-green-600 hover:bg-green-700 text-white"
                        disabled={!student.firstName || !student.lastName || !student.phone || !student.email}
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isNewStudent ? 'Создать ученика' : 'Сохранить изменения'}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-between w-full">
                      <Button variant="outline" onClick={startEditingProfile}>
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать профиль
                      </Button>
                      <Button className="bg-orange-500 hover:bg-orange-600 text-white">
                        <Calendar className="h-4 w-4 mr-2" />
                        Создать тренировку
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  const renderStudentsList = () => (
    <Card>
      <CardHeader className="border-b border-gray-100">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-bold text-gray-800">Список учеников</CardTitle>
          <Button onClick={openAddStudentForm} className="text-xs">
            <Plus className="h-4 w-4 mr-1" />
            Добавить ученика
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-gray-100">
          {students.map((student) => (
            <div 
              key={student.id} 
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => openStudentProfile(student)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    {student.photo ? (
                      <img src={student.photo} alt={student.name} className="w-10 h-10 rounded-full object-cover" />
                    ) : (
                      <User className="h-5 w-5 text-gray-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-gray-800">{student.name}</h4>
                    <p className="text-xs text-gray-500">{student.phone}</p>
                    <p className="text-xs text-gray-400">{student.goal || 'Цель не указана'}</p>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStudentFromList(student.id);
                  }}
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
          {activeTab === 'profile' ? (
            renderStudentProfile()
          ) : activeTab === 'students' ? (
            renderStudentsList()
          ) : (
            <>


              {viewMode === 'day' ? (
                <Card>
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <Button
                            variant={viewMode === 'day' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => {
                              setViewMode('day');
                              setSelectedDate(new Date());
                            }}
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
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 24 * 60 * 60 * 1000))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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
                          <div 
                            key={time} 
                            className={`flex items-center justify-between py-1.5 px-4 hover:bg-gray-50 transition-colors ${
                              dragOverTime === time ? 'bg-blue-100 border-2 border-blue-300 border-dashed' : ''
                            }`}
                            onDragOver={(e) => handleDragOver(e, time)}
                            onDragLeave={handleDragLeave}
                            onDrop={(e) => handleDrop(e, time)}
                          >
                            {/* Время */}
                            <div className="flex items-center w-20">
                              <Clock className="h-4 w-4 text-gray-400 mr-2" />
                              <span className="text-sm font-medium text-gray-700">{time}</span>
                            </div>

                            {/* Ученики */}
                            <div className="flex-1 mx-4">
                              {timeSessions.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {timeSessions.map((session) => (
                                    <div 
                                      key={session.id} 
                                      className={`flex items-center bg-gray-50 rounded px-2 py-0.5 group hover:bg-gray-100 cursor-move transition-all ${
                                        draggedSession?.id === session.id ? 'opacity-50 scale-95' : ''
                                      }`}
                                      draggable
                                      onDragStart={(e) => handleDragStart(e, session)}
                                    >
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleSessionStatus(session.id);
                                        }}
                                        className={`w-3 h-3 rounded-full mr-2 cursor-pointer transition-all hover:scale-110 ${
                                          session.status === 'confirmed' ? 'bg-green-500 hover:bg-green-600' : 
                                          session.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-gray-400 hover:bg-gray-500'
                                        }`}
                                        title={`Статус: ${session.status === 'confirmed' ? 'Подтверждено' : 'Ожидает'}. Нажмите для изменения`}
                                      ></button>
                                      <button 
                                        className="text-sm font-medium text-gray-800 hover:text-orange-600 hover:underline transition-colors cursor-pointer"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          const student = students.find(s => s.name === session.studentName);
                                          if (student) {
                                            openStudentProfile(student);
                                          }
                                        }}
                                        title="Открыть профиль ученика"
                                      >
                                        {session.studentName}
                                      </button>
                                      <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        onClick={() => removeStudent(session.id)}
                                        className="ml-2 h-5 w-5 p-0 text-red-500 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                                      >
                                        <Trash2 className="h-3 w-3" />
                                      </Button>
                                    </div>
                                  ))}
                                </div>
                              ) : null}
                            </div>

                            {/* Кнопки */}
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAddStudent(time)}
                                className="text-xs text-gray-500 hover:text-gray-700"
                              >
                                <Plus className="h-4 w-4 mr-1" />
                                Добавить ученика
                              </Button>
                              {timeSessions.length > 0 && (
                                <Button size="sm" variant="outline" className="text-xs px-3 py-1">
                                  На тренировку
                                </Button>
                              )}
                            </div>
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
                      <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <Button
                            variant={viewMode === 'day' ? 'default' : 'ghost'}
                            size="sm"
                            onClick={() => {
                              setViewMode('day');
                              setSelectedDate(new Date());
                            }}
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
                          {monthName}
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigateMonth('prev')}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => navigateMonth('next')}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
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

      {/* Диалоги */}
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
            <Button variant="outline" onClick={() => {
              setShowConflictDialog(false);
              setDraggedSession(null);
            }}>
              НЕТ
            </Button>
            <Button onClick={draggedSession ? confirmDragMove : confirmAddStudent}>
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
            <Button variant="outline" onClick={() => setShowDuplicateDialog(false)}>
              НЕТ
            </Button>
            {duplicateMessage.includes('Вы точно хотите добавить') && (
              <Button onClick={() => {
                confirmAddStudent();
                setShowDuplicateDialog(false);
              }}>
                ДА
              </Button>
            )}
            {!duplicateMessage.includes('Вы точно хотите добавить') && (
              <Button onClick={() => setShowDuplicateDialog(false)}>
                ОК
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}