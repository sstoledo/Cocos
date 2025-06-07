import { FormControl, FormField, FormItem, FormLabel } from "@ui/form";
import { Input } from "@ui/input";
import { useFormContext } from "react-hook-form"
import { marcaValidationRules } from "../hook";

export const MarcaFields = () => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        rules={marcaValidationRules.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Nombre de la marca
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Ingrese el nombre de la marca"
                {...field}
                className="w-full"
                autoFocus
              />
            </FormControl>
          </FormItem>
        )}
      />
    </div>
  );
}