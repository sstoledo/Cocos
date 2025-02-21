import { automovilValidationRules } from "@automovil/hook";
import { FieldsAutomovilProps } from "@automovil/types";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { Input } from "@ui/input";
import { useFormContext } from "react-hook-form";

export const FieldsAutomovil = ({ mode, form: externalForm }: FieldsAutomovilProps) => {
  const contextForm = useFormContext();
  const form = mode === 'create' ? externalForm : contextForm;

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="matricula"
          rules={automovilValidationRules.matricula}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Matricula:
              </FormLabel>
              <FormControl>
                <Input placeholder="Ej: ABC-123 o A123BC" {...field} className="w-full bg-light-bg-surface dark:bg-dark-input-default 
             text-light-text-primary dark:text-dark-text-primary
             border-light-input-border dark:border-dark-input-border
             hover:border-light-input-border_hover hover:dark:border-dark-input-border_hover
             focus:border-light-input-border_focus focus:dark:border-dark-input-border_focus" autoFocus />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="kilometraje"
          rules={automovilValidationRules.kilometraje}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Kilómetraje:
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0"
                  {...field}
                  value={field.value || ''}
                  onChange={(e) => {
                    const value = e.target.valueAsNumber;
                    field.onChange(isNaN(value) ? 0 : value);
                  }}
                  className="w-full bg-light-bg-surface dark:bg-dark-input-default 
             text-light-text-primary dark:text-dark-text-primary
             border-light-input-border dark:border-dark-input-border
             hover:border-light-input-border_hover hover:dark:border-dark-input-border_hover
             focus:border-light-input-border_focus focus:dark:border-dark-input-border_focus"
                  step="0"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="idMarca"
          rules={automovilValidationRules.idMarca}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Marca:
              </FormLabel>
              <FormControl>
                <Input placeholder="Deberia haber un select de marcas. Pronto." {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="idClient"
          rules={automovilValidationRules.idClient}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase">
                Cliente:
              </FormLabel>
              <FormControl>
                <Input placeholder="Deberia haber un select de clientes. Pronto." {...field} className="w-full-sm" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <FormField
        control={form.control}
        name="modelo"
        rules={automovilValidationRules.modelo}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium uppercase">
              Modelo:
            </FormLabel>
            <FormControl>
              <Input placeholder="Ej: Golf, Sedan, etc." {...field} className="w-full bg-light-bg-surface dark:bg-dark-input-default 
             text-light-text-primary dark:text-dark-text-primary
             border-light-input-border dark:border-dark-input-border
             hover:border-light-input-border_hover hover:dark:border-dark-input-border_hover
             focus:border-light-input-border_focus focus:dark:border-dark-input-border_focus" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
}