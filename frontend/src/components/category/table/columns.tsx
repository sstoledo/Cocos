'use client';

import { ColumnDef } from "@tanstack/react-table";
import ModalEditCategory from "../modal/ModalEditCategory";
import ModalDeleteCategory from "../modal/ModalDeleteCategory";
import ModalViewCategory from "../modal/ModalViewCategory";

interface Category {
  id: string;
  name: string;
  level: number;
  fatherName: string | null;
}

export const columnsCategory: ColumnDef<Category>[] = [

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
          <ModalEditCategory categorieId={category.id} />
          <ModalViewCategory categoryId={category.id} />
          <ModalDeleteCategory categoryId={category.id} />
        </div>
      )
    },
  },
]