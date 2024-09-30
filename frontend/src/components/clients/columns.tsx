"use client"

import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import Link from "next/link"

export type Clients = {
  id: string
  name: string
  apat: string
  dni:string
  phone:string
}

export const columns: ColumnDef<Clients>[] = [
  
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "apat",
    header: "Apellido",
  },
  {
    accessorKey: "dni",
    header: "Dni",
  },
  {
    accessorKey: "phone",
    header: "Teléfono",
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original
      
 
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link href={`/dashboard/clientes/${client.id}`}>
                Ver más
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>Editar</DropdownMenuItem>
            <DropdownMenuItem>Eliminar</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
