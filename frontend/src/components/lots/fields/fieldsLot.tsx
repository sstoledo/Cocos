"use client";

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@ui/form";
import { useFormContext } from "react-hook-form"
import { lotValidationRules } from "./validation-schema";
import { Input } from "@ui/input";
import { DatePickerDemo } from "@ui/date-picker";
import { SelectProduct } from "@product/select";
import { UseFormReturn } from "react-hook-form";
import { LotFormInputs } from "@interfaces/lots";

interface LotFormFieldsEditProps {
  mode: "create" | "update";
  form: UseFormReturn<LotFormInputs>;
}

export const FieldsLot = ({ mode, form: externalForm}: LotFormFieldsEditProps) => {
  const form = mode === "create" ? externalForm : useFormContext<LotFormInputs>();

  return (
    <>
      <div className="grid grid-cols-2 gap-6">
        <FormField
          control={form.control}
          name="codeProduct"
          rules={lotValidationRules.codeProduct}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase text-light-text-primary dark:text-dark-text-primary">
                Código del producto
              </FormLabel>
              <FormControl>
                <SelectProduct
                  {...(mode === 'create' 
                    ? { mode: 'create' as const, selectedId: field.value, onSelect: field.onChange }
                    : { mode: 'update' as const, value: field.value, onSelect: field.onChange }
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateEntry"
          rules={lotValidationRules.dateEntry}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase text-light-text-primary dark:text-dark-text-primary block mb-1">
                Fecha
              </FormLabel>
              <FormControl className="w-full">
                <DatePickerDemo
                  {...field}
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      </div>
      <div className="grid grid-cols-3 gap-6">
        <FormField
          control={form.control}
          name="priceBuy"
          rules={lotValidationRules.priceBuy}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase text-light-text-primary dark:text-dark-text-primary">
                Precio de compra
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
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
                  step="0.01"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priceLot"
          rules={lotValidationRules.priceLot}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase text-light-text-primary dark:text-dark-text-primary">
                Precio del lote
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
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
                  step="0.01"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="quantity"
          rules={lotValidationRules.quantity}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium uppercase text-light-text-primary dark:text-dark-text-primary">
                Cantidad
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
    </>
  )
}