import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Upload, Camera, X, Check } from 'lucide-react';

interface PhotoUploadProps {
  currentPhoto?: string | null;
  onPhotoChange: (photo: string | null) => void;
  userName?: string;
}

export function PhotoUpload({ currentPhoto, onPhotoChange, userName }: PhotoUploadProps) {
  const [previewPhoto, setPreviewPhoto] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  // Функция сжатия изображения
  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        // Максимальные размеры
        const maxWidth = 300;
        const maxHeight = 300;
        
        // Вычисляем новые размеры с сохранением пропорций
        let { width, height } = img;
        if (width > height) {
          if (width > maxWidth) {
            height = (height * maxWidth) / width;
            width = maxWidth;
          }
        } else {
          if (height > maxHeight) {
            width = (width * maxHeight) / height;
            height = maxHeight;
          }
        }

        canvas.width = width;
        canvas.height = height;

        // Рисуем сжатое изображение
        ctx?.drawImage(img, 0, 0, width, height);

        // Конвертируем в base64 с качеством 0.8
        const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
        resolve(compressedDataUrl);
      };

      img.onerror = () => reject(new Error('Ошибка загрузки изображения'));
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (file: File) => {
    if (!file) return;

    // Проверка типа файла
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Ошибка",
        description: "Пожалуйста, выберите изображение",
        variant: "destructive",
      });
      return;
    }

    // Проверка размера файла (максимум 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "Ошибка",
        description: "Размер файла не должен превышать 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Сжимаем изображение
      const compressedPhoto = await compressImage(file);
      
      // Устанавливаем превью
      setPreviewPhoto(compressedPhoto);
      
      // Передаем сжатое изображение родительскому компоненту
      onPhotoChange(compressedPhoto);

      toast({
        title: "Успешно",
        description: "Фото загружено и сохранено автоматически",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось обработать изображение",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleRemovePhoto = () => {
    setPreviewPhoto(null);
    onPhotoChange(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const displayPhoto = previewPhoto || currentPhoto;

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Фото профиля
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Аватар */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20 bg-muted">
              {displayPhoto ? (
                <img
                  src={displayPhoto}
                  alt={`Фото ${userName || 'пользователя'}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full flex items-center justify-center bg-muted text-muted-foreground">
                  <Camera className="h-8 w-8" />
                </div>
              )}
            </div>
            
            {/* Индикатор успешной загрузки */}
            {previewPhoto && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                <Check className="h-4 w-4 text-white" />
              </div>
            )}
          </div>

          {/* Кнопки управления */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="flex items-center gap-2"
            >
              <Upload className="h-4 w-4" />
              {isUploading ? 'Загрузка...' : 'Выбрать фото'}
            </Button>
            
            {displayPhoto && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleRemovePhoto}
                className="flex items-center gap-2 text-destructive hover:text-destructive"
              >
                <X className="h-4 w-4" />
                Удалить
              </Button>
            )}
          </div>
        </div>

        {/* Скрытый input для выбора файла */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileInputChange}
          className="hidden"
        />

        {/* Информация */}
        <div className="text-sm text-muted-foreground text-center">
          <p>Поддерживаемые форматы: JPG, PNG, GIF</p>
          <p>Максимальный размер: 5MB</p>
          <p>Рекомендуемый размер: 300x300px</p>
        </div>

        {/* Статус */}
        {previewPhoto && (
          <div className="text-sm text-green-600 text-center font-medium">
            ✅ Фото готово к сохранению
          </div>
        )}
      </CardContent>
    </Card>
  );
}
