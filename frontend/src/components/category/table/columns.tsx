'use client';

import Cookies from "js-cookie";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import Swal from "sweetalert2";
import { deleteCategory } from "@/helpers/apis/categories/categories-api";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

interface Category {
  id: string;
  name: string;
  fatherName: string | null;
}

export const columnsCategory: ColumnDef<Category>[] = [

  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "fatherName",
    header: "Categoria Padre",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      const token = Cookies.get("authToken");
      const router = useRouter();
      const onDeleteCategory = (uuid: string) => {

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

            deleteCategory(token!, uuid);
            Swal.fire({
              title: "¡Eliminado!",
              text: "La categoria a sido eliminado",
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
              <Link href={`/dashboard/categorias/${category.id}`}>
                Ver más
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href={`/dashboard/categorias/editar-categoria/${category.id}`}>
                Editar
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDeleteCategory(category.id)}>
              Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]