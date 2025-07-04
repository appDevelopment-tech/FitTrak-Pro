import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Users, User } from 'lucide-react';
import { Pupil, WorkoutProgram } from '@shared/schema';
import { useActiveWorkout } from '@/contexts/ActiveWorkoutContext';
import { useToast } from '@/hooks/use-toast';

interface StudentSelectionDialogProps {
  isOpen: boolean;
  onClose: () => void;
  program: WorkoutProgram;
  pupils: Pupil[];
  trainerId: number;
}

export function StudentSelectionDialog({
  isOpen,
  onClose,
  program,
  pupils,
  trainerId
}: StudentSelectionDialogProps) {
  const [selectedPupil, setSelectedPupil] = useState<Pupil | null>(null);
  const { addActiveWorkout, isWorkoutActive } = useActiveWorkout();
  const { toast } = useToast();

  const handleSelectPupil = (pupil: Pupil) => {
    setSelectedPupil(pupil);
  };

  const handleConfirmSelection = () => {
    if (!selectedPupil) return;

    // Проверяем, есть ли уже активная тренировка для этого ученика
    if (isWorkoutActive(trainerId, selectedPupil.id)) {
      toast({
        title: "Тренировка уже активна",
        description: `У ученика ${selectedPupil.firstName} ${selectedPupil.lastName} уже есть активная тренировка.`,
        variant: "destructive"
      });
      return;
    }

    // Добавляем активную тренировку
    addActiveWorkout(trainerId, selectedPupil, program);
    
    toast({
      title: "Ученик выбран",
      description: `${selectedPupil.firstName} ${selectedPupil.lastName} готов к тренировке "${program.name}".`,
    });

    setSelectedPupil(null);
    onClose();
  };

  const handleCancel = () => {
    setSelectedPupil(null);
    onClose();
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const getPupilAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    const age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      return age - 1;
    }
    return age;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Выберите ученика для тренировки
          </DialogTitle>
          <div className="text-sm text-muted-foreground">
            План тренировки: <span className="font-medium">{program.name}</span>
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          <div className="space-y-2">
            {pupils.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <User className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Нет учеников для выбора</p>
              </div>
            ) : (
              pupils.map((pupil) => {
                const isActive = isWorkoutActive(trainerId, pupil.id);
                const isSelected = selectedPupil?.id === pupil.id;
                
                return (
                  <div
                    key={pupil.id}
                    className={`
                      p-4 rounded-lg border cursor-pointer transition-all duration-200
                      ${isSelected 
                        ? 'border-blue-500 bg-blue-50 shadow-md' 
                        : isActive 
                          ? 'border-orange-300 bg-orange-50 opacity-70 cursor-not-allowed'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }
                    `}
                    onClick={() => !isActive && handleSelectPupil(pupil)}
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={pupil.photo || undefined} />
                        <AvatarFallback>
                          {getInitials(pupil.firstName, pupil.lastName)}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            {pupil.firstName} {pupil.lastName}
                          </h3>
                          {isActive && (
                            <Badge variant="outline" className="text-orange-600 border-orange-300">
                              На тренировке
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>Возраст: {getPupilAge(pupil.birthDate)} лет</span>
                          {pupil.goal && (
                            <span className="truncate">Цель: {pupil.goal}</span>
                          )}
                        </div>
                      </div>
                      
                      {isSelected && (
                        <div className="text-blue-500 font-medium">
                          Выбран
                        </div>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>

        <div className="flex gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={handleCancel}
            className="flex-1"
          >
            Отмена
          </Button>
          <Button
            onClick={handleConfirmSelection}
            disabled={!selectedPupil}
            className="flex-1"
          >
            Подтвердить выбор
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}