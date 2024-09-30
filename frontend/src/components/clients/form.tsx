'use client';

import { useForm, SubmitHandler } from "react-hook-form";
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
import ProviderSelect from "../provider/combo";
import CategoriaSelect from "../category/comboAll";
import PresentacionSelect from "../presentacion/combo";

interface Inputs{
  code_product: string;
  name_product: string;
  description_product?: string;
  price_sale: number;
  id_provider: number;
  id_category: number;
  id_presentacion: number;
  is_active: boolean;
  public_id?: string;
}

export default function FormularioCliente() {

  const form = useForm<Inputs>({
    defaultValues: {
      code_product: "",
      name_product: "",
      description_product: "",
      price_sale: 0,
      id_provider: 0,
      id_category: 0,
      id_presentacion: 0,
      is_active: false,
      public_id: "",
    },
  });

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white shadow-ml text-black">
      <CardHeader>
        <CardTitle>Crear un nuevo producto</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form>
            <div className="grid grid-cols-2 gap-4">
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
                    <FormLabel>Código de producto</FormLabel>
                    <FormControl>

                      <Input placeholder="Ingrese el código" {...field} />
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
                    <FormLabel>Nombre del producto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el nombre" {...field} />
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
                  <FormLabel>Descripción del producto</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Ingrese la descripción" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
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
                    <FormLabel>Precio de venta</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0.00" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
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
                    <FormLabel>Proveedor</FormLabel>
                    <FormControl>
                      <ProviderSelect onSelect={(id) => field.onChange(id)} selectedId={field.value.toString()} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="id_category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Categoría</FormLabel>
                    <FormControl>
                      <CategoriaSelect onSelect={(id) => field.onChange(id)} selectedId={field.value.toString()} />
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
                    <FormLabel>Presentación</FormLabel>
                    <FormControl>
                      <PresentacionSelect onSelect={(id) => field.onChange(id)} selectedId={field.value.toString()} />
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
                  <FormLabel>Imagen del producto</FormLabel>
                  <FormControl>
                    {/* <ImgCloudy
                      onUploadSuccess={handleImageUploadSuccess}
                      resetImage={resetImage}
                    /> */}
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="is_active"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Activo
                    </FormLabel>
                    <FormDescription>
                      Este producto estará disponible para la venta si está marcado
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />

            {/* {error && <p className="text-red-500 text-xs italic">{error}</p>} */}
            <Button type="submit" className="w-full">Crear Producto</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}