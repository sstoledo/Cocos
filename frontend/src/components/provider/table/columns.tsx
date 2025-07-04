'use client';

import { ProviderResponseSelect } from "@interfaces/providers";
import { ModalDeleteProvider, ModalEditarProvider, ModalViewProvider } from "@provider/modal";
import { ColumnDef } from "@tanstack/react-table";

export const columnsProvider: ColumnDef<ProviderResponseSelect>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("name")}
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Dirección",
    cell: ({ row }) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">
        {row.getValue("address")}
      </div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
    cell: ({ row }) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">
        {row.getValue("phone")}
      </div>
    ),  
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const provider = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditarProvider providerId={provider.id} />
          <ModalViewProvider providerId={provider.id} />
          <ModalDeleteProvider providerId={provider.id} />
        </div>
      )
    },
  },  
]