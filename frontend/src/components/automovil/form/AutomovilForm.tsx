'use client';

import { createAutomovil, updateAutomovil } from "@apis/automovil";
import { FieldsAutomovil } from "@automovil/fields";
import { AutomovilFormProps } from "@automovil/types";
import { AutoFormInputs } from "@interfaces/automovil";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const AutomovilForm = ({ onSuccess, token, initialData, codeClient }: AutomovilFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  console.log(`Client id: ${codeClient}`);

  const form = useForm<AutoFormInputs>({
    defaultValues: {
      matricula: initialData?.matricula || "",
      kilometraje: initialData?.kilometraje || 0,
      idMarca: initialData?.idMarca || "",
      modelo: initialData?.modelo || "",
      clientId: initialData?.clientId || codeClient || "",
    },
  });

  console.log(`Form values: ${JSON.stringify(form.getValues())}`);

  useEffect(() => {
    if (initialData) {
      form.reset({
        matricula: initialData.matricula,
        kilometraje: initialData.kilometraje,
        idMarca: initialData.idMarca,
        modelo: initialData.modelo,
        clientId: initialData.clientId,
      });
    }
  }, [initialData, form.reset, form]);

  const handleSubmit = async (values: AutoFormInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await updateAutomovil(token, initialData.id!, values);
      } else {
        await createAutomovil(token, values);
      }

      form.reset();
      onSuccess();

      Swal.fire({
        title: "Mensaje",
        text: `Auto ${isEditMode ? 'actualizado' : 'creado'} correctamente`,
        icon: "success",
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `Hubo un error al ${isEditMode ? 'actualizar' : 'crear'} el auto.`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldsAutomovil mode={isEditMode ? "update" : "create"} form={form} />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? `${isEditMode ? 'Actualizando' : 'Creando'}`
              : `${isEditMode ? 'Editar' : 'Crear'} auto`
            }
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}