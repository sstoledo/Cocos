'use client';

import { ProviderResponseSelect } from "@/interfaces/providers/providers-response";
import { ColumnDef } from "@tanstack/react-table";
import ModalEditarProvider from "../modal/ModalEditProvider";
import ModalViewProvider from "../modal/ModalViewProvider";
import { ModalDeleteProvider } from "../modal/ModalDeleteProvider";

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