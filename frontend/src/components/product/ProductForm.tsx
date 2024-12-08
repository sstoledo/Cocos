"use client";

import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import ProductFormFields from "./ProductFormFields";
import { useState } from "react";
import { InputsProduct } from "./types";
import Cookies from "js-cookie";
import { createProduct } from "@/helpers/apis/products/products-api";
import { uploadImage } from "@/helpers/apis/cloudinary/cloudinary-api";
import { UploadOptionsDto } from "@/interfaces/cloudinary/cloudinay-response";
import Swal from "sweetalert2";

export default function ProductForm() {
  const [shouldReset, setShouldReset] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const token = Cookies.get("authToken");

  const form = useForm<InputsProduct>({
    defaultValues: {
      code: "",
      name: "",
      description: "",
      price: 0,
      idProvider: "",
      idCategory: "",
      idPresentacion: "",
      publicId: "",
      isActive: true,
    },
  });


  const handleSubmit = async (data: InputsProduct) => {
    try {
      setIsSubmitting(true);

      let imageData = null;

      // 1. Si hay una imagen seleccionada, subirla primero
      if (selectedFile) {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const options: UploadOptionsDto = {
          folder: "products",
          resource_type: "image",
        };

        // Append options to formData
        Object.entries(options).forEach(([key, value]) => {
          formData.append(key, value);
        });

        try {
          imageData = await uploadImage(token!, formData);
        } catch (error) {
          console.error('Error uploading image:', error);
          throw new Error('Failed to upload image');
        }
      }

      // 2. Crear el producto con la información de la imagen
      const productData = {
        ...data,
        publicId: imageData?.publicId || '',
      };

      const productResponse = await createProduct(token!, productData);
      handleReset();
      Swal.fire({
        title: "Éxito",
        text: "Producto creado exitosamente",
        icon: "success",
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un error al crear el producto",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    form.reset();
    setSelectedFile(null);
    setShouldReset(true);
  }

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold uppercase">
          Crear un nuevo producto
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <ProductFormFields
              form={form}
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
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Procesando...' : 'Crear Producto'}
              </Button>
              <Button
                type="button"
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
                onClick={handleReset}
              >
                Reiniciar
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}