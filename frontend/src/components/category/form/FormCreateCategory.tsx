'use client';

import { useForm } from "react-hook-form";
import { Inputs } from "../types";
import { Form } from "../../ui/form";
import { Button } from "../../ui/button";
import { createCategory } from "@/helpers/apis/categories/categories-api";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import FieldsCategory from "../fields/FieldsCategory";

interface Props {
  onSuccess: () => void;
}

export default function FormCreateCategorie({ onSuccess }: Props) {

  const router = useRouter();
  const token = Cookies.get("authToken");
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
      fatherId: undefined,
    },
  });
  const onSubmit = async (values: Inputs) => {
    await createCategory(token!, values);
    onSuccess();
    Swal.fire({
      title: "Mensaje",
      text: "Categoría creada correctamente",
      icon: "success"
    });
    router.refresh();
  }


  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <FieldsCategory mode="create" form={form} />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="lg:w-1/2 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
          >
            Crear categoría
          </Button>
        </div>
      </form>
    </Form>
  );
}