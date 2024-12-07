"use client";

import { useRouter } from "next/navigation";
import { ProviderFormInputs, ProviderFormProps } from "../type";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { createProvider, updateProvider } from "@/helpers/apis/providers/provider-api";
import Swal from "sweetalert2";
import { ProviderFormFields } from "../fields/ProviderFormFields";
import { Button } from "@/components/ui/button";

export const ProviderForm = ({onSuccess, token, initialData}: ProviderFormProps) => {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<ProviderFormInputs>({
    defaultValues: {
      name: initialData?.name || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
    },
  });

  useEffect(()=> {
    if (initialData) {
      form.reset({
        name: initialData.name,
        address: initialData.address,
        phone: initialData.phone,
        email: initialData.email
      });
    }
  }, [initialData, form.reset]);

  const handleSubmit = async (values: ProviderFormInputs)=> {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateProvider(token, initialData.id!, values);
      } else {
        await createProvider(token, values);
      }

      form.reset();
      onSuccess();

      Swal.fire({
        title: "Mensaje",
        text: `Proveedor ${isEditMode ? 'actualizada' : 'creada'} correctamente`,
        icon: "success",
      });
      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: `Hubo un problema al ${isEditMode ? 'actualizar' : 'crear'} el proveedor.`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <ProviderFormFields />
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