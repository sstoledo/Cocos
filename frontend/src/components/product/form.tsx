'use client';

import { useForm } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import ProviderSelect from "../provider/providerSelect";
import PresentacionSelect from "../presentacion/presentacionSelect";
import CategoriaSelect from "../category/categorieSelect";

interface Inputs {
  code_product: string;
  name_product: string;
  description_product?: string;
  price_sale: number;
  id_provider: string;
  id_category: string;
  id_presentacion: string;
  is_active: boolean;
  public_id?: string;
}

export default function FormularioProducto() {
  const form = useForm<Inputs>({
    defaultValues: {
      code_product: "",
      name_product: "",
      description_product: "",
      price_sale: 0,
      id_provider: "",
      id_category: "",
      id_presentacion: "",
      is_active: false,
      public_id: "",
    },
  });

  return (
    <Card className="w-full max-w-8xl mx-auto bg-white shadow-xl text-black">
      <CardHeader className="bg-gray-50 border-b">
        <CardTitle className="text-2xl font-bold uppercase">Crear un nuevo producto</CardTitle>
      </CardHeader>
      <CardContent className="p-8">
        <Form {...form}>
          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="code_product"
                rules={{
                  required: "El código del producto es obligatorio",
                  minLength: {
                    value: 2,
                    message: "El código debe tener al menos 2 caracteres"
                  },
                  maxLength: {
                    value: 50,
                    message: "El código no debe exceder los 50 caracteres"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Código de producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el código" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="name_product"
                rules={{
                  required: "El nombre del producto es obligatorio",
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
                    <FormLabel className="text-sm font-medium uppercase">Nombre del producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre" {...field} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description_product"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium uppercase">Descripción del producto</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ingrese la descripción" {...field} className="w-full h-24" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="price_sale"
                rules={{
                  required: "El precio es obligatorio",
                  min: {
                    value: 0,
                    message: "El precio debe ser positivo"
                  }
                }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Precio de venta</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} className="w-full" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id_provider"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Proveedor</FormLabel>
                    <FormControl>
                      <ProviderSelect onSelect={(id) => field.onChange(id)} selectedId={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="id_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Categoría</FormLabel>
                    <FormControl>
                      <CategoriaSelect onSelect={(id) => field.onChange(id)} selectedId={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="id_presentacion"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium uppercase">Presentación</FormLabel>
                    <FormControl>
                      <PresentacionSelect onSelect={(id) => field.onChange(id)} selectedId={field.value} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="public_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium uppercase">Imagen del producto</FormLabel>
                  <FormControl>
                    {/* Aquí iría el componente ImgCloudy */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-medium uppercase">
                      Activo
                    </FormLabel>
                    <FormDescription className="text-xs text-gray-500">
                      Este producto estará disponible para la venta si está marcado
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />


            <div className="flex justify-center mt-6 ">
              <Button
                type="submit"
                className="lg:w-1/3 md:w-1/2 sm:w-2/3 py-6 text-lg font-semibold flex items-center justify-center"
              >
                Crear Producto
              </Button>
            </div>

          </form>
        </Form>
      </CardContent>
    </Card>
  );
}