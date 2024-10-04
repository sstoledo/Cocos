"use client";

import { useForm } from "react-hook-form";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Inputs } from "./types";
import { useProductSubmit } from "./useProductSubmit";
import ProductFormFields from "./ProductFormFields";

export default function ProductForm() {
  const form = useForm<Inputs>({
    defaultValues: {
      code_product: "",
      name_product: "",
      description_product: "",
      price_sale: 0,
      id_provider: "",
      id_category: "",
      id_presentacion: "",
      is_active: true,
      public_id: "",
    },
  });

  const { onSubmit, isSubmitting } = useProductSubmit();

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold uppercase">Crear un nuevo producto</CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <ProductFormFields form={form} />
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando...' : 'Crear Producto'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}