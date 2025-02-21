import { clientValidationRules } from "@clients/hook";
import { FieldsClientProps } from "@clients/types/types";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { useFormContext } from "react-hook-form";

export const FieldsClient = ({ mode, form: externalForm }: FieldsClientProps) => {
  const contextForm = useFormContext();
  const form = mode === 'create' ? externalForm : contextForm;

  return (
    <>
      <div className="grid grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="name"
          rules={clientValidationRules.name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Nombre:
              </FormLabel>
              <FormControl>
                <Input placeholder="Jhon" {...field} className="w-full-sm" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="apat"
          rules={clientValidationRules.apat}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Apellido Paterno:
              </FormLabel>
              <FormControl>
                <Input placeholder="Doe" {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="amat"
          rules={clientValidationRules.amat}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Apellido Materno:
              </FormLabel>
              <FormControl>
                <Input placeholder="Han" {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="dni"
          rules={clientValidationRules.dni}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Dni:
              </FormLabel>
              <FormControl>
                <Input placeholder="87654321" {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          rules={clientValidationRules.address}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Direccion:
              </FormLabel>
              <FormControl>
                <Input placeholder="Calle Rosales 123" {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          rules={clientValidationRules.phone}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Telefono:
              </FormLabel>
              <FormControl>
                <Input placeholder="999999999" {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="email"
        rules={clientValidationRules.email}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium uppercase">
              Email:
            </FormLabel>
            <FormControl>
              <Input placeholder="email@example.com" {...field} className="w-full-sm" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

    </>
  );
}