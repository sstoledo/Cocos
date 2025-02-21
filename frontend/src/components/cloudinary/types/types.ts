export interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  defaultImage?: string;
  previewUrl?: string;
  isLoading?: boolean;
  isEditMode?: boolean;
  publicId?: string;
}