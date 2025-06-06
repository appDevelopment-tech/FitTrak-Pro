import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Search, Image as ImageIcon, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ExerciseImage {
  id: string;
  url: string;
  thumb: string;
  description: string;
  photographer: string;
  downloadUrl: string;
}

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
  const [selectedImage, setSelectedImage] = useState<string | null>(currentImageUrl ?? null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: images, isLoading, error } = useQuery<ExerciseImage[]>({
    queryKey: ['exercise-images', exerciseId],
    queryFn: async (): Promise<ExerciseImage[]> => {
      const response = await fetch(`/api/exercises/${exerciseId}/search-image`);
      if (!response.ok) throw new Error('Failed to fetch images');
      return await response.json() as ExerciseImage[];
    },
    enabled: true
  });

  const updateImageMutation = useMutation({
    mutationFn: (imageUrl: string) => 
      apiRequest(`/api/exercises/${exerciseId}/image`, 'PATCH', { imageUrl }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['exercises'] });
      toast({
        title: "Изображение обновлено",
        description: "Изображение упражнения успешно обновлено"
      });
      onClose();
    },
    onError: () => {
      toast({
        title: "Ошибка",
        description: "Не удалось обновить изображение",
        variant: "destructive"
      });
    }
  });

  const handleSaveImage = () => {
    if (selectedImage) {
      updateImageMutation.mutate(selectedImage);
    }
  };

  const handleRemoveImage = () => {
    updateImageMutation.mutate("");
  };

  if (error) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ImageIcon className="h-5 w-5" />
            Изображения для "{exerciseName}"
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500 mb-4">
              Для загрузки изображений требуется API ключ Unsplash
            </p>
            <p className="text-sm text-gray-400">
              Настройте API ключ для автоматического поиска качественных фотографий упражнений
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Изображения для "{exerciseName}"
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-48 w-full rounded-lg" />
            ))}
          </div>
        ) : images && images.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {images.map((image: ExerciseImage) => (
                <div
                  key={image.id}
                  className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image.url 
                      ? 'border-blue-500 ring-2 ring-blue-200' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedImage(image.url)}
                >
                  <img
                    src={image.thumb}
                    alt={image.description}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                    <p className="text-xs truncate">{image.description}</p>
                    <p className="text-xs text-gray-300">by {image.photographer}</p>
                  </div>
                  {selectedImage === image.url && (
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-blue-500">
                        <Check className="h-3 w-3" />
                      </Badge>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button 
                  onClick={handleSaveImage}
                  disabled={!selectedImage || updateImageMutation.isPending}
                >
                  {updateImageMutation.isPending ? "Сохранение..." : "Сохранить изображение"}
                </Button>
                {currentImageUrl && (
                  <Button 
                    variant="outline"
                    onClick={handleRemoveImage}
                    disabled={updateImageMutation.isPending}
                  >
                    Удалить изображение
                  </Button>
                )}
              </div>
              <Button variant="outline" onClick={onClose}>
                <X className="h-4 w-4 mr-2" />
                Закрыть
              </Button>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <Search className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">Изображения не найдены</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}