"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { ClientTable } from "@interfaces/clients"
import { ModalDeleteClient, ModalEditClient, ModalViewClient } from "@clients/modal"
import { Button } from "@ui/button"
import { Trash } from "lucide-react"
import { ModalCreateAuto } from "@automovil/modal"


export const columns: ColumnDef<ClientTable>[] = [

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
    accessorKey: "apat",
    header: "Apellido",
    cell: ({ row }) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">
        {row.getValue("apat")}
      </div>
    ),
  },
  {
    accessorKey: "dni",
    header: "Dni",
    cell: ({ row }) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">
        {row.getValue("dni")}
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
      const client = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditClient clientId={client.id} />
          <ModalViewClient clientId={client.id} />
          <ModalDeleteClient clientId={client.id} />
          <ModalCreateAuto clientId={client.id} />
        </div>
      )
    },
  },
]
