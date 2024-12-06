"use client";
import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";
import Image from 'next/image';

interface ImageUploadProps {
  onUploadSuccess: (publicId: string, imageUrl: string) => void;
  defaultImage?: string;
}

export default function ImageUpload({ onUploadSuccess, defaultImage}:ImageUploadProps){
  const token = Cookies.get("authToken");
  const [selectedImage, setSelectedImage] = useState<string>(defaultImage || "");
  const [loading, setLoading] = useState(false);

  const handleImageUpdaload = async (e:React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return;

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(``, {
        method: "POST",
        body: formData,
        headers:{
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      const data = await response.json();
      setSelectedImage(data.secure_url);
      onUploadSuccess(data.public_id, data.secure_url);
    } catch (error) {
      console.log("Error al subir la imagen:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className='space-y-4'>
      <div className="flex items-center gap-4">
        <Input 
          type='file'
          accept='image/*'
          onChange={handleImageUpdaload}
          disabled={loading}
        />
        {loading && <span>Subiendo...</span>}
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