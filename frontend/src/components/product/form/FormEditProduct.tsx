"use client";

import { uploadImage } from "@apis/cloudinary";
import { updateProduct } from "@apis/products";
import { UploadOptionsDto } from "@interfaces/cloudinary";
import { ProductFormInputs } from "@interfaces/products";
import { FieldsProduct } from "@product/fields";
import { FormProductEditProps } from "@product/types";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Form } from "@ui/form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const FormEditProduct = ({ token, product }: FormProductEditProps) => {

  const router = useRouter();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ProductFormInputs>({
    defaultValues: {
      code: product.code,
      name: product.name,
      description: product.description,
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      idProvider: product.idProvider,
      idCategory: product.idCategory,
      idPresentacion: product.idPresentacion,
      publicId: product.publicId,
      isActive: product.isActive,
    }
  });

  const handleSubmit = async (data: ProductFormInputs) => {
    if (isSubmitting) return;

    try {
      let finalPublicId = data.publicId;


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
      }

      await updateProduct(token, product.id!, productData);

      Swal.fire({
        title: "Mensaje",
        text: `Producto actualizado correctamente`,
        icon: "success"
      });


      setTimeout(() => {
        window.location.href = "/dashboard/productos";
      }, 1500);

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `Hubo un error al actualizar el producto`,
        icon: "error"
      })
    } finally {
      setIsSubmitting(false);
    }
  }

  const handleReturn = () => {
    router.back();
  }

  return (
    <Card className="w-full max-w-6xl mx-auto shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b ">
        <div className="w-full flex justify-between">
          <CardTitle className="text-2xl font-bold uppercase">
            Edita los datos del producto
          </CardTitle>
          <Button onClick={handleReturn}>
            <ArrowLeft className="h-4 w-4 mr-4" />
            Volver
          </Button>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
            <FieldsProduct
              mode="update"
              form={form}
              onFileSelect={(file) => setSelectedFile(file)}
              isSubmitting={isSubmitting}
            />
            <Button
              type="submit"
              className="w-full mt-4"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Actualizando...' : 'Actualizar'}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}