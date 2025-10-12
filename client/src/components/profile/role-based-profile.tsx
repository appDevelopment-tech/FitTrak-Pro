import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
// import { usePermissions } from '@/hooks/use-permissions';
// import { PermissionGuard, AdminGuard, PupilGuard } from '@/components/auth/permission-guard';
import { pupilsDb } from '@/lib/database';
import type { Pupil } from '@shared/schema';
import { User, Edit, Trash2, Save, X, Shield, Eye } from 'lucide-react';

interface RoleBasedProfileProps {
  pupilId?: number; // Для тренеров - ID ученика, для учеников - undefined (текущий)
}

export function RoleBasedProfile({ pupilId }: RoleBasedProfileProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  // const { userRole, isAdminOrTrainer, canViewOtherUsersData } = usePermissions();
  const userRole = 'trainer'; // временно
  const isAdminOrTrainer = true; // временно
  const canViewOtherUsersData = true; // временно
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Pupil>>({});

  // Определяем, какого ученика показывать
  const targetPupilId = pupilId || 'current';

  // Загружаем данные ученика
  const { data: pupil, isLoading } = useQuery({
    queryKey: ['pupil', targetPupilId],
    queryFn: () => {
      if (targetPupilId === 'current') {
        return pupilsDb.getCurrentUser(); // Нужно реализовать
      }
      return pupilsDb.getById(targetPupilId as number);
    },
    enabled: !!targetPupilId,
  });

  // Мутация для обновления профиля
  const updateMutation = useMutation({
    mutationFn: (data: Partial<Pupil>) => {
      if (!pupil) throw new Error('Ученик не найден');
      return pupilsDb.update(pupil.id, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pupil', targetPupilId] });
      setIsEditing(false);
      setEditedData({});
      toast({
        title: 'Профиль обновлен',
        description: 'Данные профиля успешно сохранены',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Ошибка обновления',
        description: error.message || 'Не удалось обновить профиль',
        variant: 'destructive',
      });
    },
  });

  // Мутация для удаления профиля
  const deleteMutation = useMutation({
    mutationFn: () => {
      if (!pupil) throw new Error('Ученик не найден');
      return pupilsDb.delete(pupil.id);
    },
    onSuccess: () => {
      toast({
        title: 'Профиль удален',
        description: 'Профиль успешно удален',
      });
      // Редирект или выход из системы
    },
    onError: (error: any) => {
      toast({
        title: 'Ошибка удаления',
        description: error.message || 'Не удалось удалить профиль',
        variant: 'destructive',
      });
    },
  });

  const handleEdit = () => {
    if (pupil) {
      setEditedData({ ...pupil });
      setIsEditing(true);
    }
  };

  const handleSave = () => {
    updateMutation.mutate(editedData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedData({});
  };

  const handleDelete = () => {
    if (confirm('Вы уверены, что хотите удалить профиль? Это действие нельзя отменить.')) {
      deleteMutation.mutate();
    }
  };

  const handleInputChange = (field: keyof Pupil, value: string) => {
    setEditedData(prev => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Загрузка профиля...</div>
        </CardContent>
      </Card>
    );
  }

  if (!pupil) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center text-gray-500">Профиль не найден</div>
        </CardContent>
      </Card>
    );
  }

  const displayData = isEditing ? editedData : pupil;

  return (
    <div className="space-y-4">
      {/* Заголовок с информацией о доступе */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Профиль ученика
            </CardTitle>
            
            <div className="flex items-center gap-2">
              {/* Индикатор роли */}
              <Badge variant={isAdminOrTrainer ? 'default' : 'secondary'}>
                {isAdminOrTrainer ? 'Тренер/Админ' : 'Ученик'}
              </Badge>
              
              {/* Кнопки управления */}
              <div className="flex gap-2">
                {/* <PermissionGuard permission="pupil.edit_profile"> */}
                  {isEditing ? (
                    <>
                      <Button
                        size="sm"
                        onClick={handleSave}
                        disabled={updateMutation.isPending}
                      >
                        <Save className="w-4 h-4 mr-1" />
                        Сохранить
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={handleCancel}
                      >
                        <X className="w-4 h-4 mr-1" />
                        Отмена
                      </Button>
                    </>
                  ) : (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={handleEdit}
                    >
                      <Edit className="w-4 h-4 mr-1" />
                      Редактировать
                    </Button>
                  )}
                {/* </PermissionGuard> */}
                
                {/* <PermissionGuard permission="pupil.delete_profile"> */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={deleteMutation.isPending}
                  >
                    <Trash2 className="w-4 h-4 mr-1" />
                    Удалить
                  </Button>
                {/* </PermissionGuard> */}
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {/* Информация о доступе */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg">
            <div className="text-sm text-blue-700">
              {isAdminOrTrainer ? (
                <>
                  <Shield className="w-4 h-4 inline mr-1" />
                  Вы имеете полный доступ к управлению профилем ученика
                </>
              ) : (
                <>
                  <Eye className="w-4 h-4 inline mr-1" />
                  Вы можете редактировать только свой профиль
                </>
              )}
            </div>
          </div>

          {/* Форма профиля */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Основная информация */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Основная информация</h3>
              
              <div className="space-y-2">
                <Label htmlFor="firstName">Имя</Label>
                <Input
                  id="firstName"
                  value={displayData.firstName || ''}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="lastName">Фамилия</Label>
                <Input
                  id="lastName"
                  value={displayData.lastName || ''}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="middleName">Отчество</Label>
                <Input
                  id="middleName"
                  value={displayData.middleName || ''}
                  onChange={(e) => handleInputChange('middleName', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={displayData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input
                  id="phone"
                  value={displayData.phone || ''}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {/* Дополнительная информация */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Дополнительная информация</h3>
              
              <div className="space-y-2">
                <Label htmlFor="birthDate">Дата рождения</Label>
                <Input
                  id="birthDate"
                  value={displayData.birthDate || ''}
                  onChange={(e) => handleInputChange('birthDate', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="weight">Вес (кг)</Label>
                <Input
                  id="weight"
                  type="number"
                  value={displayData.weight || ''}
                  onChange={(e) => handleInputChange('weight', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="height">Рост (см)</Label>
                <Input
                  id="height"
                  type="number"
                  value={displayData.height || ''}
                  onChange={(e) => handleInputChange('height', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="goal">Цели тренировок</Label>
                <Input
                  id="goal"
                  value={displayData.goal || ''}
                  onChange={(e) => handleInputChange('goal', e.target.value)}
                  disabled={!isEditing}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="status">Статус</Label>
                <Badge variant={pupil.status === 'active' ? 'default' : 'secondary'}>
                  {pupil.status === 'active' ? 'Активен' : 'Неактивен'}
                </Badge>
              </div>
            </div>
          </div>

          {/* Информация о согласиях (только для тренеров/админов) */}
          {/* <AdminGuard> */}
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-3">Согласия и документы</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <strong>Политика конфиденциальности:</strong>
                  <br />
                  {pupil.privacyPolicyAccepted ? '✅ Принята' : '❌ Не принята'}
                  <br />
                  Дата: {pupil.privacyPolicyAcceptedDate || 'Не указана'}
                </div>
                <div>
                  <strong>Договор-оферта:</strong>
                  <br />
                  {pupil.contractAccepted ? '✅ Принят' : '❌ Не принят'}
                  <br />
                  Дата: {pupil.contractAcceptedDate || 'Не указана'}
                </div>
                <div>
                  <strong>Образовательная деятельность:</strong>
                  <br />
                  {pupil.educationConsentAccepted ? '✅ Согласие дано' : '❌ Согласие не дано'}
                  <br />
                  Дата: {pupil.educationConsentAcceptedDate || 'Не указана'}
                </div>
              </div>
            </div>
          {/* </AdminGuard> */}
        </CardContent>
      </Card>
    </div>
  );
}







