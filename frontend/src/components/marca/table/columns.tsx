'use client';

import { MarcaResponseAll } from "@interfaces/marcas";
import { ModalEditMarca } from "@marca/modal";
import { ColumnDef } from "@tanstack/react-table";

export const columnsMarca: ColumnDef<MarcaResponseAll>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="whitespace-nowrap truncate w-20 sm:w-full">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const marca = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditMarca marcaId={marca.id} />
        </div>
      );
    },
  },
];