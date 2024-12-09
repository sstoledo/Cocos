'use client';

import { ModalDeleteCategory, ModalEditCategory, ModalViewCategory } from "@category/modal";
import { CategoriesAll } from "@interfaces/categories";
import { ColumnDef } from "@tanstack/react-table";


export const columnsCategory: ColumnDef<CategoriesAll>[] = [

  {
    accessorKey: "name",
    header: "Nombre",
    sortingFn: "text"
  },
  {
    accessorKey: "level",
    header: "Jerarquia",
    sortingFn: "text"
  },
  {
    accessorKey: "fatherName",
    header: "Categoria Padre"
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditCategory categoryId={category.id} />
          <ModalViewCategory categoryId={category.id} />
          <ModalDeleteCategory categoryId={category.id} />
        </div>
      )
    },
  },
]