"use client";

import { createClient, updateClient } from "@apis/clients";
import { FieldsClient } from "@clients/fields/FieldsClient";
import { ClientFormProps } from "@clients/types/types";
import { ClientFormInputs } from "@interfaces/clients";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const ClientForm = ({ onSuccess, token, initialData }: ClientFormProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<ClientFormInputs>({
    defaultValues: {
      name: initialData?.name || "",
      apat: initialData?.apat || "",
      amat: initialData?.amat || "",
      dni: initialData?.dni || "",
      address: initialData?.address || "",
      phone: initialData?.phone || "",
      email: initialData?.email || "",
    },
  });

  useEffect(()=> {
    if (initialData) {
      form.reset({
        name: initialData.name,
        apat: initialData.apat,
        amat: initialData.amat,
        dni: initialData.dni,
        address: initialData.address,
        phone: initialData.phone,
        email: initialData.email,
      });
    }
  }, [initialData, form.reset, form]);

  const handleSubmit = async (values: ClientFormInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      if (isEditMode) {
        await updateClient(token, initialData.id!, values);
      } else {
        await createClient(token, values);
      }

      form.reset();
      onSuccess();

      Swal.fire({
        title: "Mensaje",
        text: `Cliente ${isEditMode ? 'actualizado': 'creado'} correctamente.`,
        icon: 'success',
      });

      router.refresh();
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: 'Error',
        text: `Hubo un error al ${isEditMode ? 'actualizar' : 'crear'} el cliente.`,
        icon: 'error',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldsClient mode={isEditMode ? "update" : "create"} form={form} />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? `${isEditMode ? 'Actualizando' : 'Creando'}`
              : `${isEditMode ? 'Editar' : 'Crear'} cliente`  
            }
          </Button>
        </div>
      </form>
    </FormProvider>
  );

};