"use client";
import React, { useEffect, useState } from 'react';
import { Input } from "@ui/input";
import Image from 'next/image';
import { ImageUploadProps } from '@cloudinary/types';
import { CldImage } from 'next-cloudinary';


export function ImageUpload({
  onFileSelect,
  defaultImage,
  previewUrl,
  isLoading,
  isEditMode = false,
  publicId
}: ImageUploadProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(defaultImage || previewUrl || null);
  //esto es solo para mostrar la imagen cargada
  const [cldPublicId, setCldPublicId] = useState(publicId);

  

  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {

    //si estamos en modo de edicion, cargamos la imagen
    if (isEditMode && publicId) {
      setCldPublicId(publicId);
    }
  }, [isEditMode, publicId]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const objectUrl = URL.createObjectURL(file);
    setSelectedImage(objectUrl);
    onFileSelect(file);

    return () => URL.revokeObjectURL(objectUrl);
  };

  const columnas = isEditMode ? 'grid-cols-3' : 'grid-cols-2';

  return (
    <div className={`grid ${columnas} gap-4`}>
      {/* Modo Editar: Mostrar imagen actual */}
      {isEditMode && cldPublicId && (
        <div className="flex items-center justify-center">
          <CldImage
            width={250}
            height={250}
            crop="fill"
            src={cldPublicId}
            alt={cldPublicId}
            className="rounded-md"
          />
        </div>
      )}

      {/* Input de archivo y vista previa */}
      <div className="flex flex-col items-center justify-center gap-4">
        <Input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          disabled={isLoading}
          className="cursor-pointer border border-gray-300 p-2 rounded-md"
        />
        {isLoading && <span className="text-gray-500">Procesando...</span>}
      </div>

      {selectedImage && (
        <div className="flex items-center justify-center">
          <div className="relative w-40 h-40">
            <Image
              src={selectedImage}
              alt="Vista previa de la imagen"
              fill
              className="rounded-md object-cover"
            />
          </div>
        </div>
      )}
    </div>
  );
}