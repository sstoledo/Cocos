"use client";
import React, { useEffect, useState } from 'react';
import { Input } from "@/components/ui/input";
import Image from 'next/image';

interface ImageUploadProps {
  onFileSelect: (file: File) => void;
  defaultImage?: string;
  previewUrl?: string;
  isLoading?: boolean;
  shouldReset?: boolean;
}

export default function ImageUpload({
  onFileSelect,
  defaultImage,
  previewUrl,
  isLoading,
  shouldReset = false,
}: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(defaultImage || previewUrl || null);

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldReset) {
      setSelectedImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  }, [shouldReset]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setSelectedImage(objectUrl);
    onFileSelect(file);

    return () => URL.revokeObjectURL(objectUrl);
  };

  return (
    <div className='space-y-4'>
      <div className="flex items-center gap-4">
        <Input
          ref={fileInputRef}
          type='file'
          accept='image/*'
          onChange={handleImageSelect}
          disabled={isLoading}
        />
        {isLoading && <span>Procesando...</span>}
      </div>
      {selectedImage && (
        <div className="relative w-40 h-40">
          <Image
            src={selectedImage}
            alt='Vista previa'
            fill
            className="object-cover rounded-md"
          />
        </div>
      )}
    </div>
  );
}