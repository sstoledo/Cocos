'use client';

import { ProviderResponseSelect } from "@interfaces/providers";
import { ModalDeleteProvider, ModalEditarProvider, ModalViewProvider } from "@provider/modal";
import { ColumnDef } from "@tanstack/react-table";

export const columnsProvider: ColumnDef<ProviderResponseSelect>[] = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "address",
    header: "Dirección",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
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