import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Plus, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { exercisesDb } from "@/lib/database";

interface ExerciseImageManagerProps {
  exerciseId: number;
  exerciseName: string;
  currentImageUrl?: string | null;
  onClose: () => void;
}

export function ExerciseImageManager({ 
  exerciseId, 
  exerciseName, 
  currentImageUrl, 
  onClose 
}: ExerciseImageManagerProps) {
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const updateImageMutation = useMutation({
    mutationFn: async (imageUrl: string) => {
      return await exercisesDb.update(exerciseId, { techniqueImageUrl: imageUrl });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      toast({
        title: "Изображение обновлено",
        description: "Изображение упражнения успешно добавлено"
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Ошибка",
        description: error instanceof Error ? error.message : "Не удалось обновить изображение",
        variant: "destructive"
      });
    }
  });

  const handleImageUrlChange = (url: string) => {
    setImageUrl(url);
    // Автоматический предпросмотр при вводе URL
    if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
      setPreviewUrl(url);
    } else {
      setPreviewUrl("");
    }
  };

  const handleAddImage = () => {
    if (!imageUrl.trim()) {
      toast({
        title: "Ошибка",
        description: "Введите URL изображения",
        variant: "destructive"
      });
      return;
    }
    updateImageMutation.mutate(imageUrl.trim());
  };

  const handleRemoveImage = () => {
    updateImageMutation.mutate("");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Управление изображением: {exerciseName}</h3>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Текущее изображение */}
      {currentImageUrl && (
        <div className="space-y-3">
          <h4 className="font-medium">Текущее изображение:</h4>
          <div className="relative max-w-md">
            <img
              src={currentImageUrl}
              alt={exerciseName}
              className="w-full h-48 object-cover rounded-lg border"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <Button
              variant="destructive"
              size="sm"
              onClick={handleRemoveImage}
              disabled={updateImageMutation.isPending}
              className="absolute top-2 right-2"
            >
              {updateImageMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      )}

      {/* Добавление нового изображения */}
      <div className="space-y-4 border-t pt-6">
        <h4 className="font-medium">Добавить изображение по URL:</h4>
        
        <div className="space-y-3">
          <div>
            <Label htmlFor="imageUrl">URL изображения</Label>
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              value={imageUrl}
              onChange={(e) => handleImageUrlChange(e.target.value)}
              className="mt-1"
            />
            <p className="text-xs text-gray-500 mt-1">
              Вставьте прямую ссылку на изображение упражнения
            </p>
          </div>

          {/* Предпросмотр */}
          {previewUrl && (
            <div className="space-y-2">
              <Label>Предпросмотр:</Label>
              <img
                src={previewUrl}
                alt="Предпросмотр"
                className="w-full max-w-md h-48 object-cover rounded-lg border"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  toast({
                    title: "Ошибка",
                    description: "Не удалось загрузить изображение по указанному URL",
                    variant: "destructive"
                  });
                }}
              />
            </div>
          )}

          <div className="flex gap-2">
            <Button
              onClick={handleAddImage}
              disabled={updateImageMutation.isPending || !imageUrl.trim()}
              className="flex-1"
            >
              {updateImageMutation.isPending ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : (
                <Plus className="h-4 w-4 mr-2" />
              )}
              Добавить изображение
            </Button>
          </div>
        </div>

        {/* Рекомендации */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h5 className="font-medium text-blue-900 mb-2">Рекомендации:</h5>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Используйте качественные изображения с разрешением не менее 500x300</li>
            <li>• Убедитесь, что изображение демонстрирует правильную технику выполнения</li>
            <li>• Проверьте, что URL является прямой ссылкой на файл изображения</li>
            <li>• Поддерживаются форматы: JPG, PNG, WebP</li>
          </ul>
        </div>
      </div>
    </div>
  );
}