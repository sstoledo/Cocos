import { createMarca, updateMarca } from "@apis/marcas";
import { MarcaFields } from "@marca/fields";
import { MarcaFormProps, MarcaInputs } from "@marca/types";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const MarcaForm = ({ onSuccess, token, initialData }: MarcaFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<MarcaInputs>({
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
  }, [initialData, form.reset]);

  const handleSubmit = async (values: MarcaInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateMarca(token, initialData.id!, values);
      } else {
        await createMarca(token, values);
      }

      form.reset();
      onSuccess();

      Swal.fire({
        title: "Mensaje",
        text: `Marca ${isEditMode ? 'actualizada' : 'creada'} correctamente`,
        icon: "success",
      });

      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al ${isEditMode ? 'actualizar' : 'crear'} la marca.`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <MarcaFields />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? `${isEditMode ? 'Actualizando' : 'Creando'}...`
              : `${isEditMode ? 'Editar' : 'Crear'} marca`
            }
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};