'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function EditPresentacionFields() {
  const form = useFormContext();
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
        render={({field})=> (
          <FormItem>
            <FormLabel>
              Nombre de la presentacion
            </FormLabel>
            <FormControl>
              <Input 
                {...field}
                className="w-full-sm"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}