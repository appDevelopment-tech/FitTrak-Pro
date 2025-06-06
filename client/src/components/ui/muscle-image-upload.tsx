import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link2 } from "lucide-react";

interface MuscleImageUploadProps {
  isOpen: boolean;
  onClose: () => void;
  muscleGroup: string;
  currentImage?: string;
  onImageSave: (imageUrl: string) => void;
}

export function MuscleImageUpload({ 
  isOpen, 
  onClose, 
  muscleGroup, 
  currentImage, 
  onImageSave 
}: MuscleImageUploadProps) {
  const [imageUrl, setImageUrl] = useState(currentImage || "");

  const handleSave = () => {
    onImageSave(imageUrl);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Изображение для группы мышц: {muscleGroup}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {currentImage && (
            <div className="text-center">
              <img 
                src={currentImage} 
                alt={`Текущее изображение ${muscleGroup}`}
                className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
              />
              <p className="text-sm text-gray-600">Текущее изображение</p>
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL изображения</Label>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Link2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="imageUrl"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <p className="text-xs text-gray-500">
              Вставьте ссылку на изображение для группы мышц "{muscleGroup}"
            </p>
          </div>

          {imageUrl && (
            <div className="text-center">
              <img 
                src={imageUrl} 
                alt="Предпросмотр"
                className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <p className="text-sm text-gray-600">Предпросмотр</p>
            </div>
          )}
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Отмена
            </Button>
            <Button onClick={handleSave} disabled={!imageUrl.trim()}>
              Сохранить
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}