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
import type { PupilTrainingPlan, Pupil, InsertPupil } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function StudentsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPupil, setSelectedPupil] = useState<Pupil | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingPupil, setEditingPupil] = useState<Pupil | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // Загружаем учеников для тренера с ID 1
  const { data: pupils = [], isLoading } = useQuery<Pupil[]>({
    queryKey: ['/api/trainers/1/pupils'],
  });

  // Мутация для создания нового ученика
  const createPupilMutation = useMutation({
    mutationFn: (data: InsertPupil) => apiRequest('/api/trainers/1/pupils', 'POST', data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/pupils'] });
      setShowAddForm(false);
      toast({
        title: "Успешно",
        description: "Ученик добавлен",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось добавить ученика",
        variant: "destructive",
      });
    },
  });

  // Мутация для обновления ученика
  const updatePupilMutation = useMutation({
    mutationFn: (data: { id: number; updates: Partial<InsertPupil> }) => 
      apiRequest(`/api/pupils/${data.id}`, 'PUT', data.updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/trainers/1/pupils'] });
      setEditingPupil(null);
      toast({
        title: "Успешно",
        description: "Данные ученика обновлены",
      });
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить данные ученика",
        variant: "destructive",
      });
    },
  });

  const [newPupil, setNewPupil] = useState<Partial<InsertPupil>>({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    trainerId: 1
  });

  const filteredPupils = pupils.filter(pupil =>
    `${pupil.firstName} ${pupil.lastName} ${pupil.middleName || ''}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) ||
    pupil.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pupil.phone.includes(searchTerm)
  );

  const getPupilFullName = (pupil: Pupil) => {
    return `${pupil.firstName} ${pupil.lastName}${pupil.middleName ? ` ${pupil.middleName}` : ''}`;
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

  const handlePupilClick = (pupil: Pupil) => {
    setEditingPupil({ ...pupil });
  };

  const handleSavePupil = () => {
    if (editingPupil) {
      updatePupilMutation.mutate({
        id: editingPupil.id,
        updates: editingPupil
      });
    }
  };

  const handleInputChange = (field: keyof Pupil, value: string | number) => {
    if (editingPupil) {
      setEditingPupil(prev => prev ? { ...prev, [field]: value } : null);
    }
  };

  const handleAddPupil = () => {
    if (newPupil.firstName && newPupil.lastName && newPupil.phone && newPupil.email) {
      createPupilMutation.mutate(newPupil as InsertPupil);
      setNewPupil({
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        trainerId: 1
      });
    }
  };

  const handleNewPupilChange = (field: keyof InsertPupil, value: string | number) => {
    setNewPupil(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && editingPupil) {
      if (!file.type.startsWith('image/')) {
        alert('Пожалуйста, выберите файл изображения');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setEditingPupil(prev => prev ? { ...prev, photo: result } : null);
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
          <CardTitle>Список учеников ({filteredPupils.length})</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-200">
            {filteredPupils.map((pupil, index) => (
              <div
                key={pupil.id}
                className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                onClick={() => handlePupilClick(pupil)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    {/* Pupil Number */}
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-semibold text-sm">
                      {index + 1}
                    </div>
                    
                    {/* Pupil Photo */}
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 flex items-center justify-center">
                      {pupil.photo ? (
                        <img 
                          src={pupil.photo} 
                          alt={getPupilFullName(pupil)}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-600 font-medium text-lg">
                          {pupil.firstName.charAt(0)}{pupil.lastName.charAt(0)}
                        </span>
                      )}
                    </div>
                    
                    {/* Pupil Name */}
                    <div>
                      <h3 className="text-xl font-medium text-gray-900">
                        {pupil.lastName} {pupil.firstName}
                      </h3>
                    </div>
                  </div>

                  {/* Status Badge */}
                  <Badge variant={pupil.status === 'active' ? 'default' : 'secondary'}>
                    {pupil.status === 'active' ? 'Активен' : 'Неактивен'}
                  </Badge>
                </div>
              </div>
            ))}
            
            {filteredPupils.length === 0 && (
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
                    value={newPupil.firstName}
                    onChange={(e) => handleNewPupilChange('firstName', e.target.value)}
                    placeholder="Введите имя"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Фамилия*</Label>
                  <Input
                    id="lastName"
                    value={newPupil.lastName}
                    onChange={(e) => handleNewPupilChange('lastName', e.target.value)}
                    placeholder="Введите фамилию"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="middleName">Отчество</Label>
                  <Input
                    id="middleName"
                    value={newPupil.middleName || ''}
                    onChange={(e) => handleNewPupilChange('middleName', e.target.value)}
                    placeholder="Введите отчество"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон*</Label>
                  <Input
                    id="phone"
                    value={newPupil.phone}
                    onChange={(e) => handleNewPupilChange('phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    id="email"
                    type="email"
                    value={newPupil.email}
                    onChange={(e) => handleNewPupilChange('email', e.target.value)}
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
                    value={newPupil.birthDate || ''}
                    onChange={(e) => handleNewPupilChange('birthDate', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="weight">Вес (кг)</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={newPupil.weight || ''}
                    onChange={(e) => handleNewPupilChange('weight', parseInt(e.target.value) || 0)}
                    placeholder="65"
                  />
                </div>
                <div>
                  <Label htmlFor="height">Рост (см)</Label>
                  <Input
                    id="height"
                    type="number"
                    value={newPupil.height || ''}
                    onChange={(e) => handleNewPupilChange('height', parseInt(e.target.value) || 0)}
                    placeholder="170"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="goal">Цель тренировок</Label>
                <Textarea
                  id="goal"
                  value={newPupil.goal || ''}
                  onChange={(e) => handleNewPupilChange('goal', e.target.value)}
                  placeholder="Похудение, набор массы, общая физическая подготовка..."
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="medicalNotes">Медицинские заметки</Label>
                <Textarea
                  id="medicalNotes"
                  value={newPupil.medicalNotes || ''}
                  onChange={(e) => handleNewPupilChange('medicalNotes', e.target.value)}
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
                  onClick={handleAddPupil}
                  className="bg-green-600 hover:bg-green-700"
                  disabled={createPupilMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {createPupilMutation.isPending ? "Сохранение..." : "Добавить"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* Edit Pupil Dialog */}
      {editingPupil && (
        <Dialog open={!!editingPupil} onOpenChange={() => setEditingPupil(null)}>
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
                    {editingPupil.photo ? (
                      <img 
                        src={editingPupil.photo} 
                        alt={getPupilFullName(editingPupil)}
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
                      value={editingPupil.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editLastName">Фамилия</Label>
                    <Input
                      id="editLastName"
                      value={editingPupil.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editMiddleName">Отчество</Label>
                    <Input
                      id="editMiddleName"
                      value={editingPupil.middleName || ''}
                      onChange={(e) => handleInputChange('middleName', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editPhone">Телефон</Label>
                    <Input
                      id="editPhone"
                      value={editingPupil.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="editEmail">Email</Label>
                    <Input
                      id="editEmail"
                      type="email"
                      value={editingPupil.email}
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
                      value={editingPupil.birthDate || ''}
                      onChange={(e) => handleInputChange('birthDate', e.target.value)}
                    />
                    {editingPupil.birthDate && (
                      <p className="text-sm text-gray-500 mt-1">
                        Возраст: {calculateAge(editingPupil.birthDate)} лет
                      </p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="editWeight">Вес (кг)</Label>
                    <Input
                      id="editWeight"
                      type="number"
                      value={editingPupil.weight || ''}
                      onChange={(e) => handleInputChange('weight', parseInt(e.target.value) || 0)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="editHeight">Рост (см)</Label>
                    <Input
                      id="editHeight"
                      type="number"
                      value={editingPupil.height || ''}
                      onChange={(e) => handleInputChange('height', parseInt(e.target.value) || 0)}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="editGoal">Цель тренировок</Label>
                  <Textarea
                    id="editGoal"
                    value={editingPupil.goal || ''}
                    onChange={(e) => handleInputChange('goal', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="editMedicalNotes">Медицинские заметки</Label>
                  <Textarea
                    id="editMedicalNotes"
                    value={editingPupil.medicalNotes || ''}
                    onChange={(e) => handleInputChange('medicalNotes', e.target.value)}
                    rows={3}
                  />
                </div>

                <div>
                  <Label htmlFor="editStatus">Статус</Label>
                  <Select value={editingPupil.status} onValueChange={(value) => handleInputChange('status', value)}>
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
              <TrainingPlanButton pupilId={editingPupil.id} />
              
              <div className="flex space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setEditingPupil(null)}
                >
                  <X className="h-4 w-4 mr-2" />
                  Отмена
                </Button>
                <Button
                  onClick={handleSavePupil}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={updatePupilMutation.isPending}
                >
                  <Save className="h-4 w-4 mr-2" />
                  {updatePupilMutation.isPending ? "Сохранение..." : "Сохранить"}
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
function TrainingPlanButton({ pupilId }: { pupilId: number }) {
  const { data: activePlan, isLoading } = useQuery<PupilTrainingPlan | null>({
    queryKey: [`/api/pupils/${pupilId}/active-training-plan`],
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
        console.log('Создать новый план тренировки для ученика:', pupilId);
        // Здесь будет логика создания нового плана тренировки
      }}
      className="bg-green-600 hover:bg-green-700"
    >
      <Dumbbell className="h-4 w-4 mr-2" />
      Создать тренировку
    </Button>
  );
}