import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, User, Plus, Trash2, Edit, Save, Calendar } from "lucide-react";

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

export function StudentsManagement() {
  const [currentView, setCurrentView] = useState<'list' | 'profile'>('list');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedStudent, setEditedStudent] = useState<Student | null>(null);

  // Данные учеников
  const [students, setStudents] = useState<Student[]>([
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

  const openStudentProfile = (student: Student) => {
    setSelectedStudent(student);
    setCurrentView('profile');
    setIsEditing(false);
    setEditedStudent(null);
  };

  const backToList = () => {
    setSelectedStudent(null);
    setCurrentView('list');
    setIsEditing(false);
    setEditedStudent(null);
  };

  const startEditing = () => {
    if (selectedStudent) {
      setEditedStudent({...selectedStudent});
      setIsEditing(true);
    }
  };

  const saveChanges = () => {
    if (editedStudent && selectedStudent) {
      setStudents(students.map(s => s.id === selectedStudent.id ? editedStudent : s));
      setSelectedStudent(editedStudent);
      setIsEditing(false);
      setEditedStudent(null);
    }
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditedStudent(null);
  };

  const updateField = (field: keyof Student, value: any) => {
    if (editedStudent) {
      setEditedStudent({
        ...editedStudent,
        [field]: value
      });
    }
  };

  const removeStudent = (studentId: number) => {
    setStudents(students.filter(s => s.id !== studentId));
    if (selectedStudent?.id === studentId) {
      backToList();
    }
  };

  const addNewStudent = () => {
    const newStudent: Student = {
      id: Math.max(...students.map(s => s.id), 0) + 1,
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
    setSelectedStudent(newStudent);
    setEditedStudent({...newStudent});
    setIsEditing(true);
    setCurrentView('profile');
  };

  if (currentView === 'profile' && selectedStudent) {
    const student = isEditing ? editedStudent! : selectedStudent;
    const isNewStudent = selectedStudent.firstName === '' && selectedStudent.lastName === '';

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={backToList} className="text-sm">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Назад к списку учеников
          </Button>
          {!isEditing && !isNewStudent && (
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
               isEditing ? 'Редактирование профиля' : 'Профиль ученика'}
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
                  {isEditing && (
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
                        {isEditing ? (
                          <Input
                            value={student.lastName}
                            onChange={(e) => updateField('lastName', e.target.value)}
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
                        {isEditing ? (
                          <Input
                            value={student.firstName}
                            onChange={(e) => updateField('firstName', e.target.value)}
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
                        {isEditing ? (
                          <Input
                            value={student.middleName || ''}
                            onChange={(e) => updateField('middleName', e.target.value)}
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
                        <Label className="text-sm font-medium text-gray-700">Телефон *</Label>
                        {isEditing ? (
                          <Input
                            value={student.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            placeholder="+7 (999) 123-45-67"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.phone}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Email *</Label>
                        {isEditing ? (
                          <Input
                            value={student.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            placeholder="email@example.com"
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.email}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Физические данные и цели */}
                  <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Физические данные</h3>
                    
                    <div className="space-y-4">
                      <div>
                        <Label className="text-sm font-medium text-gray-700">Дата рождения</Label>
                        {isEditing ? (
                          <Input
                            type="date"
                            value={student.birthDate || ''}
                            onChange={(e) => updateField('birthDate', e.target.value)}
                            className="mt-1"
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.birthDate ? new Date(student.birthDate).toLocaleDateString('ru-RU') : 'Не указана'}
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Вес (кг)</Label>
                          {isEditing ? (
                            <Input
                              type="number"
                              value={student.weight || ''}
                              onChange={(e) => updateField('weight', e.target.value ? Number(e.target.value) : undefined)}
                              placeholder="70"
                              className="mt-1"
                            />
                          ) : (
                            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                              {student.weight ? `${student.weight} кг` : 'Не указан'}
                            </div>
                          )}
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-gray-700">Рост (см)</Label>
                          {isEditing ? (
                            <Input
                              type="number"
                              value={student.height || ''}
                              onChange={(e) => updateField('height', e.target.value ? Number(e.target.value) : undefined)}
                              placeholder="170"
                              className="mt-1"
                            />
                          ) : (
                            <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                              {student.height ? `${student.height} см` : 'Не указан'}
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Цель тренировок</Label>
                        {isEditing ? (
                          <Textarea
                            value={student.goal || ''}
                            onChange={(e) => updateField('goal', e.target.value)}
                            placeholder="Опишите цели ученика..."
                            className="mt-1"
                            rows={3}
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.goal || 'Цель не указана'}
                          </div>
                        )}
                      </div>

                      <div>
                        <Label className="text-sm font-medium text-gray-700">Медицинские особенности</Label>
                        {isEditing ? (
                          <Textarea
                            value={student.medicalNotes || ''}
                            onChange={(e) => updateField('medicalNotes', e.target.value)}
                            placeholder="Травмы, ограничения, аллергии..."
                            className="mt-1"
                            rows={3}
                          />
                        ) : (
                          <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm">
                            {student.medicalNotes || 'Особенности не указаны'}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Кнопки действий */}
                <div className="flex justify-end mt-8 pt-6 border-t border-gray-100">
                  {isEditing ? (
                    <div className="space-x-3">
                      <Button variant="outline" onClick={cancelEditing}>
                        Отмена
                      </Button>
                      <Button onClick={saveChanges} className="bg-orange-500 hover:bg-orange-600">
                        <Save className="h-4 w-4 mr-2" />
                        Сохранить
                      </Button>
                    </div>
                  ) : (
                    <div className="space-x-3">
                      {!isNewStudent && (
                        <Button 
                          variant="outline" 
                          onClick={() => removeStudent(student.id)}
                          className="text-red-600 border-red-200 hover:bg-red-50"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Удалить
                        </Button>
                      )}
                      <Button onClick={startEditing} className="bg-orange-500 hover:bg-orange-600">
                        <Edit className="h-4 w-4 mr-2" />
                        Редактировать
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
  }

  // Список учеников
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader className="border-b border-gray-100">
          <div className="flex items-center justify-between">
            <CardTitle className="text-xl font-bold text-gray-800">
              Список учеников ({students.length})
            </CardTitle>
            <Button onClick={addNewStudent} className="bg-orange-500 hover:bg-orange-600">
              <Plus className="h-4 w-4 mr-2" />
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
                onClick={() => openStudentProfile(student)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center">
                      {student.photo ? (
                        <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full object-cover" />
                      ) : (
                        <User className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-gray-800">{student.name}</h4>
                      <p className="text-sm text-gray-500">{student.phone}</p>
                      <p className="text-sm text-gray-400">{student.goal || 'Цель не указана'}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    {student.medicalNotes && student.medicalNotes !== 'Здоров' && student.medicalNotes !== 'Здорова' && (
                      <Badge variant="outline" className="text-orange-600 border-orange-200">
                        Есть особенности
                      </Badge>
                    )}
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeStudent(student.id);
                      }}
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}