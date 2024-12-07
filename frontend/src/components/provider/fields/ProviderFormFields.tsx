'use client';

import { useFormContext } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { providerValidationRules } from "../validation-schema";

export const ProviderFormFields = () => {

  const form = useFormContext();

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        rules={providerValidationRules.name}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Nombre del proveedor
            </FormLabel>
            <FormControl>
              <Input {...field} className="w-full-sm" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="address"
        rules={providerValidationRules.address}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Dirección del proveedor
            </FormLabel>
            <FormControl>
              <Input {...field} className="w-full-sm" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="phone"
        rules={providerValidationRules.phone}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Teléfono
            </FormLabel>
            <FormControl>
              <Input {...field} className="w-full-sm" type="tel" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="email"
        rules={providerValidationRules.email}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Correo electrónico
            </FormLabel>
            <FormControl>
              <Input {...field} className="w-full-sm" type="email" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}