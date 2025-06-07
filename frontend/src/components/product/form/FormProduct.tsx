"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Button } from "@ui/button";
import { FieldsProduct } from "../fields/FieldsProduct";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { ProductFormInputs } from "@interfaces/products";
import { UploadOptionsDto } from "@interfaces/cloudinary";
import { uploadImage } from "@apis/cloudinary";
import { createProduct, updateProduct } from "@apis/products";
import { FormProductProps } from "@product/types";

export const FormProduct = ({ onSuccess, token, initialData, isModal = false }: FormProductProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const isEditMode = !!initialData?.id;

  const form = useForm<ProductFormInputs>({
    defaultValues: {
      code: initialData?.code || "",
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: typeof initialData?.price === 'string' ? parseFloat(initialData.price) : initialData?.price || 0,
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
        price: typeof initialData.price === 'string' ? parseFloat(initialData.price) : initialData.price,
        idProvider: initialData.idProvider,
        idCategory: initialData.idCategory,
        idPresentacion: initialData.idPresentacion,
        publicId: initialData.publicId,
        isActive: initialData.isActive,
      });
    }
  }, [initialData, form]);

  const handleSubmit = async (data: ProductFormInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      let finalPublicId = data.publicId;   // Initialize with current publicId

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

        const imageData = await uploadImage(token, formData);
        finalPublicId = imageData?.publicId || data.publicId;
      }

      const productData = {
        ...data,
        publicId: finalPublicId,
      };

      if (isEditMode) {
        await updateProduct(token, initialData.id!, productData);
      } else {
        await createProduct(token, productData);
      }
      form.reset();
      onSuccess();
      
      Swal.fire({
        title: "Éxito",
        text: `Producto ${isEditMode ? 'actualizado' : 'creado'} exitosamente`,
        icon: "success",
      });
      
      // router.refresh();
    } catch (error) {
      console.log(error);
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
          mode={isEditMode ? "update"
            : "create"}
          form={form}
          onFileSelect={(file) => setSelectedFile(file)}
          isSubmitting={isSubmitting}
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
        </div>
      </form>
    </FormProvider>
  );

  if (isModal) {
    return formContent;
  }

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold uqppercase">
          {isEditMode ? 'Editar' : 'Crear'} Producto
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {formContent}
      </CardContent>
    </Card>
  );
};