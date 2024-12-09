'use client';

import { ViewProviderFieldsProps } from "@provider/types";
import { Input } from "@ui/input";
import { Label } from "@ui/label";


export function ViewProviderFields({ provider }: ViewProviderFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre:
        </Label>
        <Input
          contentEditable={false}
          id="name"
          value={provider.name}
          className="col-span-3"
          autoFocus
        />
      </div>
    </div>
  );
}