"use client";

import { memo } from 'react';
import { CldImage } from 'next-cloudinary';

interface ProductImageProps {
  publicId: string;
  alt: string;
}

export const ProductImage = memo(function ProductImage({ publicId, alt }: ProductImageProps) {
  return (
    <div className="aspect-square overflow-hidden">
      <CldImage
        src={publicId}
        crop="fill" // Asegura que la imagen se ajuste al contenedor
        width="400" // Ancho base de la imagen
        height="400" // Altura base de la imagen
        alt={alt}
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        loading="lazy" // Carga diferida para mejorar el rendimiento
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" // Define los tamaños responsivos
      />
    </div>
  );
});