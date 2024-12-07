'use client';

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { Inputs } from "../types";
import { updateCategory } from "@/helpers/apis/categories/categories-api";
import Swal from "sweetalert2";
import EditCategoryFields from "./EditCategoryFields";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { CategoryByIdResponse } from "@/interfaces/categories/categories-response";
import FieldsCategory from "../fields/FieldsCategory";

interface Props {
  categories: CategoryByIdResponse;
  onSuccess: () => void;
  token: string;
}

export const FormEditCategory = ({ categories, onSuccess, token }: Props) => {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const form = useForm<Inputs>({
    defaultValues: {
      name: categories.name || '',
      fatherId: categories.fatherId || ''
    },
  });
  const { reset } = form;

  useEffect(() => {
    if (categories) {
      form.reset({
        name: categories.name || '',
        fatherId: categories.fatherId || ''
      })
    }
    return () => {
      form.reset({ name: '', fatherId: '' });
    };
  }, [categories, reset]);

  const onSubmit = async (values: Inputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updateCategory(token, categories.id, values);
      form.reset();
      onSuccess();
      Swal.fire({
        title: "Mensaje",
        text: "Categoria actualizada correctamente",
        icon: "success",
      });
      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar la categoria.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        {/* <EditCategoryFields /> */}
        <FieldsCategory mode="update" form={form} />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="lg:w-1/2 md:w-1/2 sm:w-2/3 py-5 text-lg font-semibold flex items-center justify-center"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Actualizando...' : 'Actualizar categoría'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}