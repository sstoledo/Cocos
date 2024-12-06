"use client";

import { set, useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import CreatePresentacionFields from "../fields/CreatePresentacionFields";
import Cookies from "js-cookie";
import { createPresentacion } from "@/helpers/apis/presentacion/presentacion-api";
import { useRouter } from "next/navigation";

interface Inputs {
  name: string;
}

interface Props {
  onSucces: () => void;
}

export default function PresentacionForm({onSucces}: Props) {

  const router = useRouter();
  const token = Cookies.get('authToken');
  const form = useForm<Inputs>({
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: Inputs) => {
    await createPresentacion(token!, values);
    
    // aqui tenemos que cerrar el modal
    onSucces();
    
    Swal.fire({
      title: "Mensaje",
      text: "Presentación creada correctamente",
      icon: "success"
    });

    router.refresh();
  }

  return (
    <Form {...form}>
      <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <CreatePresentacionFields form={form} />
        <div className="flex justify-center mt-6">
          <Button
            type="submit"
            className="w-full mt-4"
          >
            Crear presentación
          </Button>
        </div>
      </form>
    </Form>
  );
}