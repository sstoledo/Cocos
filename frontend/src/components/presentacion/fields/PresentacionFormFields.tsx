import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { presentacionValidationRules } from "../validation-schema";

export const PresentacionFormFields = () => {
  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        rules={presentacionValidationRules.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Nombre de la presentación
            </FormLabel>
            <FormControl>
              <Input
                placeholder="Presentación 1"
                {...field}
                className="w-full"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};