'use client';

import { PresentacionByIdResponse } from "@interfaces/presentacion";
import { Input } from "@ui/input";
import { Label } from "@ui/label";

interface Props {
  presentacion: PresentacionByIdResponse;
}

export function ViewPresentacionFields({ presentacion }: Props) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre:
        </Label>
        <Input
          contentEditable={false}
          id="name"
          defaultValue={presentacion.name}
          className="col-span-3"
          autoFocus
        />
      </div>
    </div>
  );
}