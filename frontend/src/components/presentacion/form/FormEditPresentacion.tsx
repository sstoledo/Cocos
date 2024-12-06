"use client";

import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { updatePresentacion } from "@/helpers/apis/presentacion/presentacion-api";
import Swal from "sweetalert2";
import EditPresentacionFields from "../fields/EditPresentacionFields";
import { Button } from "@/components/ui/button";
import { ComboPresentacion } from "@/interfaces";
import { Inputs } from "../types";
import { useEffect, useState } from "react";

interface Props {
  presentacion: ComboPresentacion;
  onSuccess: () => void;
  token: string;
}

export const FormEditPresentacion = ({ presentacion, onSuccess, token }: Props) => {

  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<Inputs>({
    defaultValues: {
      name: presentacion.name || '' // Proporcionar un valor por defecto
    }
  });
  const { reset } = form;

  useEffect(() => {
    if (presentacion) {
      form.reset({
        name: presentacion.name || ''
      });
    }

    // Cleanup function para cuando el componente se desmonte
    return () => {
      form.reset({ name: '' });
    };
  }, [presentacion, reset]);

  const onSubmit = async (values: Inputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await updatePresentacion(token, presentacion.id, values);
      form.reset();
      onSuccess();
      Swal.fire({
        title: "Mensaje",
        text: "Presentación actualizada correctamente",
        icon: "success",
      });
      router.refresh();
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: "Hubo un problema al actualizar la presentación.",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <EditPresentacionFields />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Actualizando...' : 'Editar presentación'}
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}