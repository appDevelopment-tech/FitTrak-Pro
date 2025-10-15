import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit, Trash2, GripVertical } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MuscleGroup {
  id: string;
  name: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export function MuscleGroupsManagement() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<MuscleGroup | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Load muscle groups
  const { data: muscleGroups = [], isLoading } = useQuery<MuscleGroup[]>({
    queryKey: ['muscleGroups'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('muscle_groups')
        .select('*')
        .order('display_order', { ascending: true });
      if (error) throw error;
      return data || [];
    },
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: async (data: { name: string; description: string }) => {
      const maxOrder = muscleGroups.reduce((max, g) => Math.max(max, g.display_order), 0);
      const { data: newGroup, error } = await supabase
        .from('muscle_groups')
        .insert({
          name: data.name,
          description: data.description || null,
          display_order: maxOrder + 1
        })
        .select()
        .single();
      if (error) throw error;
      return newGroup;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
      setIsCreateDialogOpen(false);
      setFormData({ name: "", description: "" });
      toast({ title: "Группа мышц создана" });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка создания",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: { name: string; description: string } }) => {
      const { data: updated, error } = await supabase
        .from('muscle_groups')
        .update({
          name: data.name,
          description: data.description || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return updated;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
      setIsEditDialogOpen(false);
      setSelectedGroup(null);
      setFormData({ name: "", description: "" });
      toast({ title: "Группа мышц обновлена" });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка обновления",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('muscle_groups')
        .delete()
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['muscleGroups'] });
      setIsDeleteDialogOpen(false);
      setSelectedGroup(null);
      toast({ title: "Группа мышц удалена" });
    },
    onError: (error: any) => {
      toast({
        title: "Ошибка удаления",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleCreate = () => {
    if (!formData.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название группы мышц",
        variant: "destructive"
      });
      return;
    }
    createMutation.mutate(formData);
  };

  const handleEdit = () => {
    if (!selectedGroup || !formData.name.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите название группы мышц",
        variant: "destructive"
      });
      return;
    }
    updateMutation.mutate({ id: selectedGroup.id, data: formData });
  };

  const openEditDialog = (group: MuscleGroup) => {
    setSelectedGroup(group);
    setFormData({ name: group.name, description: group.description || "" });
    setIsEditDialogOpen(true);
  };

  const openDeleteDialog = (group: MuscleGroup) => {
    setSelectedGroup(group);
    setIsDeleteDialogOpen(true);
  };

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Группы мышц</CardTitle>
          <Button onClick={() => setIsCreateDialogOpen(true)} size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Добавить группу
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {muscleGroups.map((group) => (
              <div
                key={group.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent"
              >
                <div className="flex items-center gap-3">
                  <GripVertical className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{group.name}</p>
                    {group.description && (
                      <p className="text-sm text-muted-foreground">{group.description}</p>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openEditDialog(group)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => openDeleteDialog(group)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Create Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Добавить группу мышц</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Название *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Например: грудь"
              />
            </div>
            <div>
              <Label htmlFor="description">Описание</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Опциональное описание группы мышц"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleCreate}>
              Создать
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Редактировать группу мышц</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="edit-name">Название *</Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="edit-description">Описание</Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Отмена
            </Button>
            <Button onClick={handleEdit}>
              Сохранить
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Удалить группу мышц?</AlertDialogTitle>
            <AlertDialogDescription>
              Вы уверены, что хотите удалить группу "{selectedGroup?.name}"?
              Это действие нельзя отменить.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Отмена</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => selectedGroup && deleteMutation.mutate(selectedGroup.id)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Удалить
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
