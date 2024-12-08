"use client";

import { InitialProduct } from "@/interfaces/products/products-response";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { InputsProduct } from "../types";
import { createProduct, updateProduct } from "@/helpers/apis/products/products-api";
import { uploadImage } from "@/helpers/apis/cloudinary/cloudinary-api";
import { UploadOptionsDto } from "@/interfaces/cloudinary/cloudinay-response";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { FieldsProduct } from "../fields/FieldsProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FormProductProps {
  onSuccess: () => void;
  token: string;
  initialData?: InitialProduct;
  isModal?: boolean;
}

export const FormProduct = ({ onSuccess, token, initialData, isModal = false }: FormProductProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [shouldReset, setShouldReset] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<InputsProduct>({
    defaultValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      idProvider: initialData?.idProvider || "",
      idCategory: initialData?.idCategory || "",
      idPresentacion: initialData?.idPresentacion || "",
      publicId: initialData?.publicId || "",
      isActive: initialData?.isActive ?? true,
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        code: initialData.code,
        name: initialData.name,
        description: initialData.description,
        price: initialData.price,
        idProvider: initialData.idProvider,
        idCategory: initialData.idCategory,
        idPresentacion: initialData.idPresentacion,
        publicId: initialData.publicId,
        isActive: initialData.isActive,
      });
    }
  }, [initialData, form]);

  const handleReset = () => {
    form.reset();
    setSelectedFile(null);
    setShouldReset(true);
  };

  const handleSubmit = async (data: InputsProduct) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let imageData = null;

      // Solo procesar la imagen si hay un archivo seleccionado
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const options: UploadOptionsDto = {
          folder: "products",
          resource_type: "image",
        };

        Object.entries(options).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          imageData = await uploadImage(token, formData);
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new Error('Failed to upload image');
        }
      }

      const productData = {
        ...data,
        publicId: imageData?.publicId || data.publicId,
      };

      if (isEditMode) {
        await updateProduct(token, initialData.id!, productData);
      } else {
        await createProduct(token, productData);
      }

      handleReset();
      onSuccess();

      Swal.fire({
        title: "Éxito",
        text: `Producto ${isEditMode ? 'actualizado' : 'creado'} exitosamente`,
        icon: "success",
      });

      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Hubo un error al ${isEditMode ? 'actualizar' : 'crear'} el producto`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const formContent = (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldsProduct
          onFileSelect={(file) => {
            setSelectedFile(file);
            setShouldReset(false);
          }}
          isSubmitting={isSubmitting}
          shouldReset={shouldReset}
        />
        <div className="flex justify-center gap-4 mt-6">
          <Button
            type="submit"
            className={`${isModal ? 'w-full' : 'lg:w-1/3 md:w-1/2 sm:w-2/3'} py-6 text-lg font-semibold flex items-center justify-center`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? `${isEditMode ? 'Actualizando' : 'Creando'}...`
              : `${isEditMode ? 'Actualizar' : 'Crear'} Producto`
            }
          </Button>
          {!isModal && (
            <Button
              type="button"
              variant="outline"
              className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
              onClick={handleReset}
            >
              Reiniciar
            </Button>
          )}
        </div>
      </form>
    </FormProvider>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold uppercase">
          {isEditMode ? 'Editar' : 'Crear'} Producto
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {formContent}
      </CardContent>
    </Card>
  );
};