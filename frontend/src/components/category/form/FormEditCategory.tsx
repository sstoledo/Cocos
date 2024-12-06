'use client';

import { CategoriesResponse } from "@/interfaces";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Inputs } from "../types";
import { updateCategory } from "@/helpers/apis/categories/categories-api";
import Swal from "sweetalert2";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import EditCategoryFields from "./EditCategoryFields";
import { Button } from "@/components/ui/button";

interface Props {
  category: CategoriesResponse;
  token: string;
}

export const FormEditCategory = ({ category, token }: Props) => {

  const router = useRouter();
  const form = useForm<Inputs>({
    defaultValues: {
      name: category.name,
      father: category.fatherId // Asegúrate de que sea null si no hay fatherId
    },
  });
  console.log("Initial form values:", form.getValues());

  const onSubmit = async (values: Inputs) => {
    await updateCategory(token, category.id, values);

    Swal.fire({
      title: "Mensaje",
      text: "Categoria actualizada correctamente",
      icon: "success"
    });

    // setTimeout(() => {
    //   window.location.href = "/dashboard/categorias"
    // }, 1200)
  }

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b ">
        <CardTitle className="text-2xl font-bold uppercase">
          Editar la categoria
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <EditCategoryFields
              form={form}
            />
            <div className="flex justify-center mt-6">
              <Button
                type="submit"
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-5 text-lg font-semibold flex items-center justify-center"
              >
                Editar categoria
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}