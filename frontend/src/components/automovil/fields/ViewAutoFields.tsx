"use client";

import { ViewAutomovilFieldsProps } from "@automovil/types";
import { Input } from "@ui/input";
import { Label } from "@ui/label";

export const ViewAutoFields = ({ automovil }: ViewAutomovilFieldsProps) => {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="matricula" className="text-right">
          Matricula:
        </Label>
        <Input
          contentEditable={false}
          id="matricula"
          defaultValue={automovil.matricula}
          className="col-span-3"
          autoFocus
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="kilometraje" className="text-right">
          Kilometraje:
        </Label>
        <Input
          contentEditable={false}
          id="kilometraje"
          defaultValue={automovil.kilometraje}
          className="col-span-3"
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="modelo" className="text-right">
          Modelo:
        </Label>
        <Input
          contentEditable={false}
          id="modelo"
          defaultValue={automovil.modelo}
          className="col-span-3"
        />
      </div>
    </div>
  )
}
