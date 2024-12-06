import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Input } from "../../ui/input";
import CategorieFatherSelect from "../selectFather/categorieFatherSelect";

export default function CreateCategoryFields({ form }: { form: any }) {
  return (
    <div className="flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            rules={{
              required: "El nombre es obligatorio",
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
                <FormLabel className="text-sm font-medium uppercase">
                  Nombre de la categoría
                </FormLabel>
                <FormControl>
                  <Input placeholder="Ingrese el nombre" {...field} className="w-full" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="father"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium uppercase">
                  Categoría padre
                  <br />
                  <span className="capitalize text-xs text-gray-500 italic">
                    No seleccione esta opción si no es una subcategoría
                  </span>
                </FormLabel>
                <FormControl>
                  <CategorieFatherSelect 
                    onSelect={field.onChange} 
                    selectedId={field.value || undefined} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}