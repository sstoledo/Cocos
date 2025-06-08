'use client';

import { ModalViewAuto } from "@automovil/modal/ModalViewAuto";
import { ModalDeleteAuto } from "@automovil/modal/ModalDeleteAuto";
import { ModalEditAuto } from "@automovil/modal/ModalEditAuto";
import { AutoResponse } from "@interfaces/automovil";
import { ColumnDef } from "@tanstack/react-table";

export const columnsAutomovil: ColumnDef<AutoResponse>[] = [
  {
    accessorKey: "matricula",
    header: "Matricula",
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="whitespace-nowrap truncate">
        {row.getValue("matricula")}
      </div>
    ),
  },
  {
    accessorKey: "kilometraje",
    header: "KM",
    cell: ({row}) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">
        {row.getValue("kilometraje")}
      </div>
    ),
  },
  {
    accessorKey: "modelo",
    header: "Modelo",
    cell: ({row}) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">
        {row.getValue("modelo")}
      </div>
    ),
  },
  {
    accessorKey: "nameClient",
    header: "nameCliente",
    cell: ({row}) => (
      <div className="whitespace-nowrap truncate">
        {row.getValue("nameClient")}
      </div>
    )
  },
  {id: "actions",
    cell: ({row}) => {
      const automovil = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditAuto autoId={automovil.id} />
          <ModalViewAuto autoId={automovil.id} />
          <ModalDeleteAuto autoId={automovil.id} />
        </div>
      );
    }
  }
]