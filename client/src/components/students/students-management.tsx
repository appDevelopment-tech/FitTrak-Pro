import { useState, useRef } from "react";
import { Plus, Search, X, Save, User, Target, AlertCircle, Camera, Dumbbell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { StudentTrainingPlan, Student, InsertStudent } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Загружаем студентов для тренера с ID 1
  const { data: students = [], isLoading } = useQuery<Student[]>({
    queryKey: ['/api/trainers/1/students'],
  });

  // Мутация для создания нового студента
  const createStudentMutation = useMutation({
    mutationFn: (data: InsertStudent) => apiRequest('/api/trainers/1/students', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/students'] });
      setShowAddForm(false);
      toast({
        title: "Успешно",
        description: "Студент добавлен",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить студента",
        variant: "destructive",
      });
    },
  });

  // Мутация для обновления студента
  const updateStudentMutation = useMutation({
    mutationFn: (data: { id: number; updates: Partial<InsertStudent> }) => 
      apiRequest(`/api/students/${data.id}`, 'PUT', data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/students'] });
      setEditingStudent(null);
      toast({
        title: "Успешно",
        description: "Данные студента обновлены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные студента",
        variant: "destructive",
      });
    },
  });

  const [newStudent, setNewStudent] = useState<Partial<InsertStudent>>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    trainerId: 1
  });

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName} ${student.middleName || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.phone.includes(searchTerm)
  );

  const getStudentFullName = (student: Student) => {
    return `${student.firstName} ${student.lastName}${student.middleName ? ` ${student.middleName}` : ''}`;
  };

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleStudentClick = (student: Student) => {
    setEditingStudent({ ...student });
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      updateStudentMutation.mutate({
        id: editingStudent.id,
        updates: editingStudent
      });
    }
  };

  const handleAddStudent = () => {
    if (newStudent.firstName && newStudent.lastName && newStudent.phone && newStudent.email) {
      createStudentMutation.mutate(newStudent as InsertStudent);
      setNewStudent({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        trainerId: 1
      });
    }
  };

  const handleInputChange = (field: keyof Student, value: string | number) => {
    if (editingStudent) {
      setEditingStudent(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleNewStudentChange = (field: keyof InsertStudent, value: string | number) => {
    setNewStudent(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingStudent) {
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditingStudent(prev => prev ? { ...prev, photo: result } : null);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">Загрузка...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Ученики</h1>
          <p className="text-gray-500 mt-1">Управление учениками и их профилями</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-green-600 hover:bg-green-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Добавить ученика
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Поиск по имени, email или телефону..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Students List */}
      <Card>
        <CardHeader>
          <CardTitle>Список учеников ({filteredStudents.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleStudentClick(student)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Student Number */}
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    
                    {/* Student Photo */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {student.photo ? (
                        <img 
                          src={student.photo} 
                          alt={getStudentFullName(student)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-medium text-lg">
                          {student.firstName.charAt(0)}{student.lastName.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    {/* Student Name */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {student.lastName} {student.firstName}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                    {student.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
              </div>
            ))}
            
            {filteredStudents.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                {searchTerm ? "Ученики не найдены" : "Нет учеников"}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Add Student Dialog */}
      {showAddForm && (
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить нового ученика</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">Имя*</Label>
                  <Input
                    id="firstName"
                    value={newStudent.firstName}
                    onChange={(e) => handleNewStudentChange('firstName', e.target.value)}
                    placeholder="Введите имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия*</Label>
                  <Input
                    id="lastName"
                    value={newStudent.lastName}
                    onChange={(e) => handleNewStudentChange('lastName', e.target.value)}
                    placeholder="Введите фамилию"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input
                    id="middleName"
                    value={newStudent.middleName || ''}
                    onChange={(e) => handleNewStudentChange('middleName', e.target.value)}
                    placeholder="Введите отчество"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон*</Label>
                  <Input
                    id="phone"
                    value={newStudent.phone}
                    onChange={(e) => handleNewStudentChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newStudent.email}
                    onChange={(e) => handleNewStudentChange('email', e.target.value)}
                    placeholder="example@email.com"
                    required
                  />
                </div>
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="birthDate">Дата рождения</Label>
                  <Input
                    id="birthDate"
                    type="date"
                    value={newStudent.birthDate || ''}
                    onChange={(e) => handleNewStudentChange('birthDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newStudent.weight || ''}
                    onChange={(e) => handleNewStudentChange('weight', parseInt(e.target.value) || 0)}
                    placeholder="65"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Рост (см)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={newStudent.height || ''}
                    onChange={(e) => handleNewStudentChange('height', parseInt(e.target.value) || 0)}
                    placeholder="170"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="goal">Цель тренировок</Label>
                <Textarea
                  id="goal"
                  value={newStudent.goal || ''}
                  onChange={(e) => handleNewStudentChange('goal', e.target.value)}
                  placeholder="Похудение, набор массы, общая физическая подготовка..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medicalNotes">Медицинские заметки</Label>
                <Textarea
                  id="medicalNotes"
                  value={newStudent.medicalNotes || ''}
                  onChange={(e) => handleNewStudentChange('medicalNotes', e.target.value)}
                  placeholder="Травмы, противопоказания, особенности..."
                  rows={3}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Отмена
                </Button>
                <Button
                  onClick={handleAddStudent}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createStudentMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {createStudentMutation.isPending ? "Сохранение..." : "Добавить"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Student Dialog */}
      {editingStudent && (
        <Dialog open={!!editingStudent} onOpenChange={() => setEditingStudent(null)}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Профиль ученика</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Photo Section */}
              <div className="lg:col-span-1">
                <div className="text-center">
                  <div 
                    className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors"
                    onClick={triggerFileUpload}
                  >
                    {editingStudent.photo ? (
                      <img 
                        src={editingStudent.photo} 
                        alt={getStudentFullName(editingStudent)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500">Добавить фото</span>
                      </div>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <p className="text-sm text-gray-500 mt-2">Нажмите для изменения фото</p>
                </div>
              </div>

              {/* Info Section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="editFirstName">Имя</Label>
                    <Input
                      id="editFirstName"
                      value={editingStudent.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editLastName">Фамилия</Label>
                    <Input
                      id="editLastName"
                      value={editingStudent.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editMiddleName">Отчество</Label>
                    <Input
                      id="editMiddleName"
                      value={editingStudent.middleName || ''}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPhone">Телефон</Label>
                    <Input
                      id="editPhone"
                      value={editingStudent.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="editEmail">Email</Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>

                {/* Physical Info */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="editBirthDate">Дата рождения</Label>
                    <Input
                      id="editBirthDate"
                      type="date"
                      value={editingStudent.birthDate || ''}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                    {editingStudent.birthDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Возраст: {calculateAge(editingStudent.birthDate)} лет
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="editWeight">Вес (кг)</Label>
                    <Input
                      id="editWeight"
                      type="number"
                      value={editingStudent.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editHeight">Рост (см)</Label>
                    <Input
                      id="editHeight"
                      type="number"
                      value={editingStudent.height || ''}
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editGoal">Цель тренировок</Label>
                  <Textarea
                    id="editGoal"
                    value={editingStudent.goal || ''}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="editMedicalNotes">Медицинские заметки</Label>
                  <Textarea
                    id="editMedicalNotes"
                    value={editingStudent.medicalNotes || ''}
                    onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="editStatus">Статус</Label>
                  <Select value={editingStudent.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Активен</SelectItem>
                      <SelectItem value="inactive">Неактивен</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-between items-center pt-4 border-t">
              <TrainingPlanButton studentId={editingStudent.id} />
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingStudent(null)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Отмена
                </Button>
                <Button
                  onClick={handleSaveStudent}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={updateStudentMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {updateStudentMutation.isPending ? "Сохранение..." : "Сохранить"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

// Компонент кнопки для работы с планами тренировок
function TrainingPlanButton({ studentId }: { studentId: number }) {
  const { data: activePlan, isLoading } = useQuery<StudentTrainingPlan | null>({
    queryKey: [`/api/students/${studentId}/active-training-plan`],
  });

  if (isLoading) {
    return (
      <Button disabled className="bg-gray-400">
        <Dumbbell className="h-4 w-4 mr-2" />
        Загрузка...
      </Button>
    );
  }

  if (activePlan) {
    return (
      <Button
        onClick={() => {
          console.log('Начать тренировку с планом:', activePlan.name);
          // Здесь будет логика перехода на активную тренировку
        }}
        className="bg-blue-600 hover:bg-blue-700"
      >
        <Dumbbell className="h-4 w-4 mr-2" />
        На тренировку
      </Button>
    );
  }

  return (
    <Button
      onClick={() => {
        console.log('Создать новый план тренировки для ученика:', studentId);
        // Здесь будет логика создания нового плана тренировки
      }}
      className="bg-green-600 hover:bg-green-700"
    >
      <Dumbbell className="h-4 w-4 mr-2" />
      Создать тренировку
    </Button>
  );
}