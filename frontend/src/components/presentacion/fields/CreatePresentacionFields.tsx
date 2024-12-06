import { FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export default function CreatePresentacionFields({ form }: { form: any }) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="name"
        rules={{
          required: "El nombre de la presentación es obligatorio",
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium">
              Nombre de la presentación
            </FormLabel>
            <Input placeholder="Nombre de la presentación" {...field} className="w-full" />
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}