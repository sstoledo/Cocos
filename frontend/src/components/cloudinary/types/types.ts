export interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  defaultImage?: string;
  // publicId?: string;
  previewUrl?: string;
  isLoading?: boolean;
  shouldReset?: boolean;
}