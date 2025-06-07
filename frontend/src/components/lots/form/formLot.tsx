"use client";

import { createLot, updateLot } from "@apis/lots";
import { LotFormInputs } from "@interfaces/lots/lots-response";
import { FieldsLot } from "@lots/fields";
import { FormLotProps } from "@lots/types";
import { Button } from "@ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Swal from "sweetalert2";

export const FormLot = ({ token, initialData, codeProduct }: FormLotProps) => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isEditMode = !!initialData?.id;

  const form = useForm<LotFormInputs>({
    defaultValues: {
      codeProduct: initialData?.codeProduct || codeProduct || "",
      quantity: initialData?.quantity || 0,
      dateEntry: initialData?.dateEntry || undefined,
      priceBuy: initialData?.priceBuy || 0,
      priceLot: initialData?.priceLot || 0,
    }
  });

  useEffect(() => {
    if (initialData) {
      form.reset({
        codeProduct: initialData.codeProduct,
        quantity: initialData.quantity,
        dateEntry: initialData.dateEntry,
        priceBuy: initialData.priceBuy,
        priceLot: initialData.priceLot,
      });
    }
  }, [initialData, form.reset, form]);

  const handleSubmit = async (data: LotFormInputs) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      if (isEditMode) {
        await updateLot(initialData.id!, data, token);
        form.reset();
      } else {
        await createLot(token, data);
        form.reset();
      }

      Swal.fire({
        title: "Éxito",
        text: `Lote ${isEditMode ? 'creado exitosamente' : 'actualizado exitosamente'}`,
        icon: "success",
      });
      router.push("/dashboard/productos");

    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Error",
        text: `Hubo un error al ${isEditMode ? 'crear' : 'actualizar'} el lote`,
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);

    }
  };

  const formContent = (
    <FormProvider {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldsLot
          mode={isEditMode ? 'update' : 'create'}
          form={form}
        />
        <div className="flex justify-center gap-4 mt-6">
          <Button
            type="submit"
            className={`w-full lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center`}
            disabled={isSubmitting}
          >
            {isSubmitting
              ? `${isEditMode ? 'Creando' : 'Actualizando'}...`
              : `${isEditMode ? 'Crear Lote' : 'Actualizar Lote'}`
            }
          </Button>
        </div>
      </form>
    </FormProvider>
  );

  if (isEditMode) {
    return formContent;
  }

  return (

    <Card className="w-4/5 shadow-xl rounded-lg
    bg-light-bg-surface dark:bg-dark-bg-surface
    text-light-text-primary dark:text-dark-text-primary
    ">
      <CardHeader className="border-b">
        <CardTitle className="text-2xl font-bold uppercase">
          Crear Lote
        </CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        {formContent}
      </CardContent>
    </Card>
  );
};