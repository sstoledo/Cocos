"use client";
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Cookies from "js-cookie";

interface ImageUploadProps {
  onUploadSuccess: (publicId: string) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUploadSuccess }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const token = Cookies.get("authToken");

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/cloudinary/upload`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      if (response.ok) {
        const data = await response.json();
        onUploadSuccess(data.public_id);
      } else {
        console.error('Error al subir la imagen');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex flex-col space-y-2">
      <Input type="file" onChange={handleFileChange} accept="image/*" />
      <Button onClick={handleUpload} disabled={!selectedFile || uploading}>
        {uploading ? 'Subiendo...' : 'Subir Imagen'}
      </Button>
    </div>
  );
};

export default ImageUpload;