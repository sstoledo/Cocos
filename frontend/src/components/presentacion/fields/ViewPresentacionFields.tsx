'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ComboPresentacion } from "@/interfaces";

interface Props {
  presentacion: ComboPresentacion
}

export default function ViewPresentacionFields({ presentacion }: Props) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="name" className="text-right">
          Nombre:
        </Label>
        <Input
          contentEditable={false}
          id="name"
          value={presentacion.name}
          // defaultValue="Pedro Duarte"
          className="col-span-3"
        />
      </div>
    </div>
  );
}