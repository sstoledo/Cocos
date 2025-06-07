'use client';

import { ModalDeleteCategory, ModalEditCategory, ModalViewCategory } from "@category/modal";
import { CategoriesAll } from "@interfaces/categories";
import { ColumnDef } from "@tanstack/react-table";


export const columnsCategory: ColumnDef<CategoriesAll>[] = [

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
    accessorKey: "level",
    header: "Jerarquia",
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">{row.getValue("level")}</div>
    ),
  },
  {
    accessorKey: "fatherName",
    header: "Categoria Padre",
    cell: ({ row }) => (
      <div className="hidden dsm:table-cell whitespace-nowrap">{row.getValue("fatherName")}</div>
    ),
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