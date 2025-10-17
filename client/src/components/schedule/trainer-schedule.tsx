import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Clock, User, Plus, Trash2, Edit, Calendar, Users, Save } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";
import { studentsDb, appointmentsDb } from "@/lib/database";
import type { Pupil, Appointment } from "@shared/schema";

// Use Pupil type from schema directly
type Student = Pupil & { name: string };

interface TrainerSession {
  id: string;
  time: string;
  pupilId: string;
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
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');
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

  // Get auth context
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get trainer ID from user (fallback to UUID if not available)
  const trainerId = user?.id || "550e8400-e29b-41d4-a716-446655440000";

  // Fetch pupils from database
  const { data: pupils = [] } = useQuery<Pupil[]>({
    queryKey: ['students', trainerId],
    queryFn: () => fetch(`/api/trainers/${trainerId}/pupils`).then(res => res.json()),
  });

  // Transform pupils to include computed name property
  const students: Student[] = pupils.map(pupil => ({
    ...pupil,
    name: `${pupil.lastName} ${pupil.firstName}${pupil.middleName ? ' ' + pupil.middleName : ''}`
  }));

  // Fetch appointments from database
  const { data: appointments = [] } = useQuery<Appointment[]>({
    queryKey: ['appointments', trainerId],
    queryFn: () => appointmentsDb.getByTrainerId(trainerId),
  });

  // Transform appointments to TrainerSession format
  const sessions: TrainerSession[] = appointments.map(apt => {
    const pupil = pupils.find(p => p.id === apt.pupilId);
    const studentName = pupil
      ? `${pupil.lastName} ${pupil.firstName}${pupil.middleName ? ' ' + pupil.middleName : ''}`
      : 'Неизвестный ученик';

    return {
      id: apt.id,
      time: apt.time,
      pupilId: apt.pupilId,
      studentName,
      status: apt.status as 'confirmed' | 'pending',
      date: apt.date
    };
  });
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

  // Mutation to create appointment
  const createAppointmentMutation = useMutation({
    mutationFn: async (data: { time: string; pupilId: string; date: string; status: string }) => {
      return await appointmentsDb.create({
        trainerId,
        pupilId: data.pupilId,
        date: data.date,
        time: data.time,
        status: data.status
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Ученик добавлен в расписание" });
      setShowAddDialog(false);
      setShowConflictDialog(false);
      setSelectedStudentId('');
    },
    onError: (error: any) => {
      toast({ title: "Ошибка", description: error.message || "Не удалось добавить ученика", variant: "destructive" });
    }
  });

  // Mutation to create student
  const createStudentMutation = useMutation({
    mutationFn: async (studentData: Partial<Pupil>) => {
      return await studentsDb.create({
        trainerId,
        firstName: studentData.firstName || '',
        lastName: studentData.lastName || '',
        middleName: studentData.middleName || null,
        phone: studentData.phone || '',
        email: studentData.email || '',
        password: 'default_password', // TODO: Generate proper password
        birthDate: studentData.birthDate || new Date().toISOString().split('T')[0],
        weight: studentData.weight || null,
        height: studentData.height || null,
        goal: studentData.goal || null,
        medicalNotes: studentData.medicalNotes || null,
        photo: studentData.photo || null,
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
        parentFirstName: null,
        parentLastName: null,
        parentMiddleName: null,
        parentPhone: null,
        parentEmail: null,
        parentSpecialInstructions: null,
        isParentRepresentative: false,
        privacyPolicyAccepted: false,
        privacyPolicyAcceptedDate: null,
        contractAccepted: false,
        contractAcceptedDate: null,
        educationConsentAccepted: false,
        educationConsentAcceptedDate: null,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
      toast({ title: "Успешно", description: "Ученик добавлен" });
      setShowAddStudentDialog(false);
      setNewStudentName('');
      setNewStudentPhone('');
      setNewStudentEmail('');
    },
    onError: (error: any) => {
      toast({ title: "Ошибка", description: error.message || "Не удалось добавить ученика", variant: "destructive" });
    }
  });

  const checkForConflicts = (time: string, studentId: string) => {
    const student = students.find(s => s.id === studentId);
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
    const student = students.find(s => s.id === selectedStudentId);
    if (!student) return;

    createAppointmentMutation.mutate({
      time: selectedTime,
      pupilId: student.id,
      date: selectedDate.toISOString().split('T')[0],
      status: 'confirmed'
    });
  };

  const addNewStudent = () => {
    if (!newStudentName.trim()) return;

    const nameParts = newStudentName.split(' ');
    createStudentMutation.mutate({
      firstName: nameParts[1] || '',
      lastName: nameParts[0] || '',
      middleName: nameParts[2] || '',
      phone: newStudentPhone,
      email: newStudentEmail
    });
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
    const newStudentProfile = {
      id: "0", // Временный ID
      trainerId: trainerId,
      firstName: '',
      lastName: '',
      middleName: '',
      phone: '',
      email: '',
      password: 'default_password',
      birthDate: '',
      weight: null,
      height: null,
      goal: null,
      medicalNotes: null,
      photo: null,
      status: 'active' as const,
      joinDate: new Date().toISOString().split('T')[0],
      parentFirstName: null,
      parentLastName: null,
      parentMiddleName: null,
      parentPhone: null,
      parentEmail: null,
      parentSpecialInstructions: null,
      isParentRepresentative: false,
      privacyPolicyAccepted: false,
      privacyPolicyAcceptedDate: null,
      contractAccepted: false,
      contractAcceptedDate: null,
      educationConsentAccepted: false,
      educationConsentAcceptedDate: null,
      get name() { return `${this.firstName} ${this.lastName}`.trim(); }
    } as Student;
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

  // Mutation to update student
  const updateStudentMutation = useMutation({
    mutationFn: async (data: { id: string; student: Partial<Pupil> }) => {
      return await studentsDb.update(data.id, data.student);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
      toast({ title: "Успешно", description: "Профиль ученика обновлен" });
    },
    onError: (error: any) => {
      toast({ title: "Ошибка", description: error.message || "Не удалось обновить профиль", variant: "destructive" });
    }
  });

  const saveStudentProfile = () => {
    if (!editedStudent) return;

    if (editedStudent.id === "0") {
      // Создание нового ученика
      createStudentMutation.mutate(editedStudent);
      setSelectedStudentProfile(null);
      setActiveTab('students');
    } else {
      // Обновление существующего ученика
      updateStudentMutation.mutate({
        id: editedStudent.id,
        student: editedStudent
      });
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

  // Mutation to delete student
  const deleteStudentMutation = useMutation({
    mutationFn: async (id: string) => {
      return await studentsDb.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['students', trainerId] });
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Ученик удален" });
    },
    onError: (error: any) => {
      toast({ title: "Ошибка", description: error.message || "Не удалось удалить ученика", variant: "destructive" });
    }
  });

  // Mutation to delete appointment
  const deleteAppointmentMutation = useMutation({
    mutationFn: async (id: string) => {
      return await appointmentsDb.delete(id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
      toast({ title: "Успешно", description: "Запись удалена" });
    },
    onError: (error: any) => {
      toast({ title: "Ошибка", description: error.message || "Не удалось удалить запись", variant: "destructive" });
    }
  });

  // Mutation to update appointment status
  const updateAppointmentMutation = useMutation({
    mutationFn: async (data: { id: string; status: string }) => {
      return await appointmentsDb.update(data.id, { status: data.status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
    },
    onError: (error: any) => {
      toast({ title: "Ошибка", description: error.message || "Не удалось обновить статус", variant: "destructive" });
    }
  });

  const removeStudentFromList = (studentId: string) => {
    deleteStudentMutation.mutate(studentId);
  };

  const removeStudent = (sessionId: string) => {
    deleteAppointmentMutation.mutate(sessionId);
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

    // Перемещаем ученика - обновляем время в базе
    appointmentsDb.update(draggedSession.id, { time: targetTime }).then(() => {
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
    });

    setDraggedSession(null);
  };

  const confirmDragMove = () => {
    if (draggedSession) {
      // Update appointment time in database
      appointmentsDb.update(draggedSession.id, { time: conflictTime });
      queryClient.invalidateQueries({ queryKey: ['appointments', trainerId] });
    }
    setShowConflictDialog(false);
    setDraggedSession(null);
    setConflictTime('');
    setConflictMessage('');
  };

  const toggleSessionStatus = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId);
    if (!session) return;

    const newStatus = session.status === 'confirmed' ? 'pending' : 'confirmed';
    updateAppointmentMutation.mutate({
      id: sessionId,
      status: newStatus
    });
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
    const isNewStudent = student.id === "0";
    
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
              className="p-4 hover:bg-blue-50 cursor-pointer transition-all duration-200 border-l-4 border-transparent hover:border-blue-400 active:bg-blue-100"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openStudentProfile(student);
              }}
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
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setViewMode('day');
                              setSelectedDate(new Date());
                            }}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'day'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            День
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('week')}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'week'
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            Неделя
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('month')}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'month'
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            Месяц
                          </Button>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                          {formatDate(selectedDate)}, день-неделя-месяц
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
                                        title={`Статус: ${session.status === 'confirmed' ? 'Подтверждено' : 'Не подтверждено'}. Нажмите для изменения`}
                                      ></button>
                                      <span className="text-sm font-medium text-gray-800">{session.studentName}</span>
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
                                  Создать тренировку
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              ) : viewMode === 'week' ? (
                <Card>
                  <CardHeader className="border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex bg-gray-100 rounded-lg p-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setViewMode('day');
                              setSelectedDate(new Date());
                            }}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'day'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            День
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('week')}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'week'
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            Неделя
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('month')}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'month'
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            Месяц
                          </Button>
                        </div>
                        <CardTitle className="text-xl font-bold text-gray-800 capitalize">
                          Неделя: {formatDate(selectedDate)}, день-неделя-месяц
                        </CardTitle>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getTime() - 7 * 24 * 60 * 60 * 1000))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedDate(new Date(selectedDate.getTime() + 7 * 24 * 60 * 60 * 1000))}
                          className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                        >
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-6">
                    <div className="text-center py-8">
                      <h3 className="text-lg font-medium text-gray-700 mb-2">Режим просмотра "Неделя"</h3>
                      <p className="text-gray-500">Здесь будет отображаться расписание на неделю</p>
                      <p className="text-sm text-gray-400 mt-4">Функциональность в разработке</p>
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
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setViewMode('day');
                              setSelectedDate(new Date());
                            }}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'day'
                                ? 'bg-blue-500 text-white hover:bg-blue-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            День
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('week')}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'week'
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
                          >
                            Неделя
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setViewMode('month')}
                            className={`text-xs px-3 py-1 transition-all duration-200 ${
                              (viewMode as string) === 'month'
                                ? 'bg-green-500 text-white hover:bg-green-600'
                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                            }`}
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
                    <p className="text-sm text-gray-600">Не подтверждено</p>
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
                    <SelectItem key={student.id} value={student.id}>
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
