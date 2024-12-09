"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import Swal from "sweetalert2";
import { createCategory, updateCategory } from "@apis/categories";
import { CategoryFormInputs, CategoryFormProps } from "@category/types";
import { FieldsCategory } from "@category/fields";
import { Button } from "@ui/button";

export const CategoryForm = ({ onSuccess, token, initialData }: CategoryFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<CategoryFormInputs>({
    defaultValues: {
      name: initialData?.name || "",
      fatherId: initialData?.fatherId || undefined,
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name,
        fatherId: initialData.fatherId
      });
    }
  }, [initialData, form.reset]);

  const handleSubmit = async (values: CategoryFormInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateCategory(token, initialData.id!, values);
      } else {
        await createCategory(token, values);
      }

      form.reset();
      onSuccess();

      Swal.fire({
        title: "Mensaje",
        text: `Caregoria ${isEditMode ? 'actualizada' : 'creada'} correctamente`,
        icon: "success",
      });

      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al ${isEditMode ? 'actualizar' : 'crear'} la categoria.`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldsCategory
          mode={isEditMode ? "update"
            : "create"}
          form={form}
        />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? `${isEditMode ? 'Actualizando' : 'Creando'}...`
              : `${isEditMode ? 'Editar' : 'Crear'} presentación`
            }
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};