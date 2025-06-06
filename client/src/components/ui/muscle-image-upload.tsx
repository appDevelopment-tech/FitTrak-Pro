import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Link2 } from "lucide-react";

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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setPreviewUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveFromFile = () => {
    if (previewUrl) {
      onImageSave(previewUrl);
      onClose();
    }
  };

  const handleSaveFromUrl = () => {
    if (imageUrl.trim()) {
      onImageSave(imageUrl);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Изображение для группы мышц: {muscleGroup}</DialogTitle>
        </DialogHeader>
        
        <Tabs defaultValue="file" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="file">Загрузить файл</TabsTrigger>
            <TabsTrigger value="url">Ссылка на изображение</TabsTrigger>
          </TabsList>
          
          <TabsContent value="file" className="space-y-4">
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
              <Label htmlFor="fileInput">Выберите изображение</Label>
              <div className="flex flex-col gap-2">
                <div className="relative">
                  <Input
                    id="fileInput"
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-gray-50 file:text-gray-700 hover:file:bg-gray-100"
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">
                Выберите изображение для группы мышц "{muscleGroup}"
              </p>
            </div>

            {previewUrl && (
              <div className="text-center">
                <img 
                  src={previewUrl} 
                  alt="Предпросмотр"
                  className="w-24 h-24 object-cover rounded-lg mx-auto mb-2"
                />
                <p className="text-sm text-gray-600">Предпросмотр</p>
              </div>
            )}
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>
                Отмена
              </Button>
              <Button onClick={handleSaveFromFile} disabled={!selectedFile}>
                Сохранить
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="url" className="space-y-4">
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
              <Button onClick={handleSaveFromUrl} disabled={!imageUrl.trim()}>
                Сохранить
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}