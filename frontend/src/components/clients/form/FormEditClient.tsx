'use client'

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import Swal from "sweetalert2";
import { ClientResponse } from "@interfaces/clients";
import { updateClient } from "@apis/clients";


interface Props {
  client: ClientResponse;
  token: string;
}

interface Inputs {
  name: string;
  apat: string;
  amat: string;
  dni: string;
  address?: string;
  phone?: string;
  email?: string;
}

export const FormEditClient = ({ client, token }: Props) => {

  const router = useRouter();
  const form = useForm<Inputs>({
    defaultValues: {
      name: client.name,
      apat: client.apat,
      amat: client.amat,
      dni: client.dni,
      address: client.address,
      phone: client.phone,
      email: client.email
    },
  });

  const onSubmit = async (values: Inputs) => {

    await updateClient(token, client.id, values);

    Swal.fire({
      title: "Mensaje",
      text: "Cliente modificado correctamente",
      icon: "success"
    });

    setTimeout(() => {
      window.location.href = "/dashboard/clientes"
    }, 1200)

  }


  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b ">
        <div className="w-full flex justify-between">
          <CardTitle className="text-2xl font-bold uppercase">Edita los datos del cliente</CardTitle>
          <button
            className="py-1 px-3 bg-blue-800 hover:bg-blue-900 cursor-pointer text-white rounded-md shadow-md"
            onClick={() => router.back()}
          >
            Regresar
          </button>

        </div>
      </CardHeader>

      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                rules={{
                  required: "El nombre del cliente es obligatorio",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Nombre del cliente</FormLabel>
                    <FormControl>
                      <Input  {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="apat"
                rules={{
                  required: "El Apellido del cliente es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El nombre debe tener al menos 2 caracteres"
                  },
                  maxLength: {
                    value: 50,
                    message: "El nombre no debe exceder los 50 caracteres"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Apellido Paterno</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amat"
                rules={{
                  required: "El apellido materno del cliente es obligatorio",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Apellido materno</FormLabel>
                    <FormControl>
                      <Input placeholder="Han" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dni"
                rules={{
                  required: "El dni del cliente es obligatorio",
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Dni</FormLabel>
                    <FormControl>
                      <Input placeholder="76179902" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Dirección</FormLabel>
                    <FormControl>
                      <Input placeholder="Av. san jose" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Teléfono</FormLabel>
                    <FormControl>
                      <Input placeholder="987654321" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="jhon@email.com" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-center mt-6 ">
              <Button
                type="submit"
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-5 text-lg font-semibold flex items-center justify-center"
              >
                Guardar
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

