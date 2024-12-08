
import { FormField, FormItem, FormLabel, FormControl, FormMessage, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import PresentacionSelect from "../presentacion/presentacionSelect";
import ImageUpload from "../cloudinary/ImageUpload";
import SelectCategories from "../category/select/SelectCategories";
import SelectProvider from "../provider/select/SelectProvider";

interface ProductFormFieldsProps {
  form: any;
  onFileSelect: (file: File) => void;
  isSubmitting: boolean;
  shouldReset?: boolean;
}

export default function ProductFormFields({
  form,
  onFileSelect,
  isSubmitting,
  shouldReset,
}: ProductFormFieldsProps) {
  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="code"
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
          name="name"
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
        name="description"
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
          name="price"
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
          name="idProvider"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">Proveedor</FormLabel>
              <FormControl>
                <SelectProvider onSelect={(id) => field.onChange(id)} selectedId={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="idCategory"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">Categoría</FormLabel>
              <FormControl>
                <SelectCategories onSelect={(id) => field.onChange(id)} selectedId={field.value} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="idPresentacion"
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
        name="publicId"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium uppercase">Imagen del producto</FormLabel>
            <FormControl>
              <ImageUpload
                onFileSelect={onFileSelect}
                isLoading={isSubmitting}
                shouldReset={shouldReset}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="isActive"
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
    </>
  );
}