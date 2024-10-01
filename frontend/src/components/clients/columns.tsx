"use client"

import Cookies from "js-cookie"
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
import Swal from "sweetalert2"
import { useRouter } from "next/navigation"
import { deleteClient } from "@/helpers"

export type Clients = {
  id: string
  name: string
  apat: string
  dni: string
  phone: string
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
      const client = row.original;
      const token = Cookies.get("authToken");
      const router = useRouter();
      const onDeleteClient = (uuid: string) => {

        Swal.fire({
          title: "¿Estas seguro de esta acción?",
          text: "Al confirma esta acción ya no se podrá revertir",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Si, deseo eliminar"
        }).then(async (result) => {
          if (result.isConfirmed) {

            deleteClient(token!, uuid);
            Swal.fire({
              title: "¡Eliminado!",
              text: "El cliente a sido eliminado",
              icon: "success"
            });

            router.refresh();

          }
        });
      }

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
            <DropdownMenuItem>
              <Link href={`/dashboard/clientes/editar-cliente/${client.id}`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteClient(client.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
