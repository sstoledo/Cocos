import { SelectCategoryCrud } from "@category/select";
import { FieldsCategoryProps } from "@category/types";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { useFormContext } from "react-hook-form";


export const FieldsCategory = ({ mode, form: externalForm }: FieldsCategoryProps) => {
  // Usamos el form proporcionado externamente o el del contexto
  const contextForm = useFormContext();
  const form = mode === 'create' ? externalForm : contextForm;

  return (
    <div className="space-y-4">
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
            <FormLabel className="text-sm font-medium">
              Nombre de la categoría
            </FormLabel>
            <FormControl>
              <Input
                placeholder={mode === 'create' ? "Categoria 1" : undefined}
                {...field}
                className="w-full"
                autoFocus
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name='father' // Ajustamos el nombre del campo según el modo
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Categoría padre
              <br />
              <span className="text-xs text-gray-500 italic">
                No seleccione nada si no es una subcategoría
              </span>
            </FormLabel>
            <FormControl>
              <SelectCategoryCrud
                mode={mode}
                onSelect={field.onChange}
                value={field.value}
                selectedId={field.value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default FieldsCategory;