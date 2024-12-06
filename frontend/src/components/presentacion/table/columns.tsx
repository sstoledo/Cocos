"use client";

import { ColumnDef } from "@tanstack/react-table";
import ModalEditarPresentacion from "../modal/ModalEditPresentacion";
import ModalViewPresentacion from "../modal/ModalViewPresentacion";
import { ModalDeletePresentacion } from "../modal/ModalDeletePresentacion";

interface Presentacion {
  id: string;
  name: string;
}

export const columnsPresentacion: ColumnDef<Presentacion>[] = [

  {
    accessorKey: "name",
    header: "Nombre",
    sortingFn: "text"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const presentacion = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditarPresentacion presentacionId={presentacion.id} />
          <ModalViewPresentacion presentacionId={presentacion.id} />
          <ModalDeletePresentacion presentacionId={presentacion.id} />
        </div>
      )
    },
  },
];