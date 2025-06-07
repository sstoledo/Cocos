"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, FormProvider } from "react-hook-form";
import { Button } from "@ui/button";
import Swal from "sweetalert2";
import { PresentacionFormInputs, PresentacionFormProps } from "@presentacion/types";
import { createPresentacion, updatePresentacion } from "@apis/presentacion";
import { PresentacionFormFields } from "@presentacion/fields";

export const PresentacionForm = ({ onSuccess, token, initialData }: PresentacionFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<PresentacionFormInputs>({
    defaultValues: {
      name: initialData?.name || "",
    },
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        name: initialData.name
      });
    }
  }, [initialData, form.reset, form]);

  const handleSubmit = async (values: PresentacionFormInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updatePresentacion(token, initialData.id!, values);
      } else {
        await createPresentacion(token, values);
      }

      form.reset();
      onSuccess();

      Swal.fire({
        title: "Mensaje",
        text: `Presentación ${isEditMode ? 'actualizada' : 'creada'} correctamente`,
        icon: "success",
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al ${isEditMode ? 'actualizar' : 'crear'} la presentación.`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <PresentacionFormFields />
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