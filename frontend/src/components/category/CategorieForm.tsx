'use client';

import { useForm } from "react-hook-form";
import { Inputs } from "./types";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Form } from "../ui/form";
import { Button } from "../ui/button";
import CategorieFormFields from "./CategorieFormFields";
import { useCategorieSubmit } from "./useCategorieSubmit";

export default function CategoriaForm() {

  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      fatherId: "",
    },
  });

  const { onSubmit, isSubmitting } = useCategorieSubmit();

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold uppercase">
          Crear una nueva categoría
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <CategorieFormFields form={form} />
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Creando...' : 'Crear Categoría'}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}