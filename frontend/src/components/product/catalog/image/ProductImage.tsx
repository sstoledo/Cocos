import { memo } from 'react';
import { AdvancedImage, placeholder, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';

// Movemos la inicialización de Cloudinary fuera del componente
const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

interface ProductImageProps {
  publicId: string;
  alt: string;
}

// Creamos una función que prepare la imagen fuera del componente
const prepareImage = (publicId: string) => {
  return cld
    .image(publicId)
    .delivery(format('auto'))
    .delivery(quality(auto()));
};

// Memorizamos el componente para evitar re-renders innecesarios
export const ProductImage = memo(function ProductImage({ publicId, alt }: ProductImageProps) {
  const cldImage = prepareImage(publicId);

  return (
    <div className="aspect-square overflow-hidden">
      <AdvancedImage
        cldImg={cldImage}
        plugins={[responsive(), placeholder({ mode: 'blur' })]}
        alt={alt}
        className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
        loading="lazy"
      />
    </div>
  );
});

