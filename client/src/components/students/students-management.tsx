import { useState, useRef } from "react";
import { Plus, Search, X, Save, User, Target, AlertCircle, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  status: 'active' | 'inactive';
  joinDate: string;
}

export function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      firstName: "Анна",
      lastName: "Петрова",
      middleName: "Сергеевна",
      phone: "+7 (999) 123-45-67",
      email: "anna.petrova@email.com",
      birthDate: "1990-05-15",
      weight: 65,
      height: 170,
      goal: "Похудение и поддержание формы",
      status: "active",
      joinDate: "2024-01-15"
    },
    {
      id: 2,
      firstName: "Михаил",
      lastName: "Иванов",
      phone: "+7 (888) 987-65-43",
      email: "mikhail.ivanov@email.com",
      birthDate: "1985-08-22",
      weight: 80,
      height: 180,
      goal: "Набор мышечной массы",
      status: "active",
      joinDate: "2024-02-01"
    },
    {
      id: 3,
      firstName: "Екатерина",
      lastName: "Смирнова",
      phone: "+7 (777) 555-12-34",
      email: "ekaterina.smirnova@email.com",
      birthDate: "1995-12-03",
      weight: 58,
      height: 165,
      goal: "Общая физическая подготовка",
      status: "inactive",
      joinDate: "2023-11-10"
    }
  ]);

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

  const handleStudentClick = (student: Student) => {
    setEditingStudent({ ...student });
  };

  const handleSaveStudent = () => {
    if (editingStudent) {
      setStudents(prev => 
        prev.map(student => 
          student.id === editingStudent.id ? editingStudent : student
        )
      );
      setEditingStudent(null);
    }
  };

  const handleInputChange = (field: keyof Student, value: string | number) => {
    if (editingStudent) {
      setEditingStudent(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingStudent) {
      // Проверяем тип файла
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        return;
      }

      // Создаем URL для предварительного просмотра
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ученики</h1>
          <p className="text-gray-600">Управление базой учеников</p>
        </div>
        <Button onClick={() => setShowAddForm(true)} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Добавить ученика
        </Button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
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
            {filteredStudents.map((student) => (
              <div
                key={student.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handleStudentClick(student)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
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
                  
                  {/* Status */}
                  <div className="flex items-center">
                    <Badge variant={student.status === 'active' ? 'default' : 'secondary'}>
                      {student.status === 'active' ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Ученики не найдены</p>
          {searchTerm && (
            <Button
              variant="ghost"
              onClick={() => setSearchTerm("")}
              className="mt-2"
            >
              Очистить поиск
            </Button>
          )}
        </div>
      )}

      {/* Add Student Form Placeholder */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Добавить ученика</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Форма добавления ученика в разработке</p>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="w-full"
              >
                Закрыть
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Student Edit Form */}
      {editingStudent && (
        <Dialog open={true} onOpenChange={() => setEditingStudent(null)}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Редактирование профиля ученика
              </DialogTitle>
            </DialogHeader>
            
            <div className="space-y-6 py-4">
              {/* Photo Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Camera className="h-5 w-5" />
                  Фотография
                </h3>
                <div className="flex items-center space-x-4">
                  <div 
                    className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors border-2 border-dashed border-gray-400 hover:border-gray-500"
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
                        <Camera className="h-8 w-8 text-gray-500 mx-auto mb-1" />
                        <span className="text-xs text-gray-500">Добавить фото</span>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600">
                      Нажмите на круг чтобы выбрать фото с компьютера
                    </p>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Личная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={editingStudent.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={editingStudent.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="middleName">Отчество</Label>
                    <Input
                      id="middleName"
                      value={editingStudent.middleName || ''}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="birthDate">Дата рождения</Label>
                    <Input
                      id="birthDate"
                      type="date"
                      value={editingStudent.birthDate || ''}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Контактная информация</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Телефон</Label>
                    <Input
                      id="phone"
                      value={editingStudent.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editingStudent.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Physical Parameters */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Физические параметры</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="height">Рост (см)</Label>
                    <Input
                      id="height"
                      type="number"
                      value={editingStudent.height || ''}
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="weight">Вес (кг)</Label>
                    <Input
                      id="weight"
                      type="number"
                      value={editingStudent.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {/* Training Goals */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Target className="h-4 w-4" />
                  Цели тренировок
                </h3>
                <Textarea
                  value={editingStudent.goal || ''}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  placeholder="Опишите цели ученика..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Medical Notes */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Медицинские заметки
                </h3>
                <Textarea
                  value={editingStudent.medicalNotes || ''}
                  onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                  placeholder="Противопоказания, особенности здоровья..."
                  className="min-h-[80px]"
                />
              </div>

              {/* Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Статус</h3>
                <Select
                  value={editingStudent.status}
                  onValueChange={(value: 'active' | 'inactive') => handleInputChange('status', value)}
                >
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-4 border-t">
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
              >
                <Save className="h-4 w-4 mr-2" />
                Сохранить
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}