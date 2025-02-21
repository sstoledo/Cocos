'use client';

import { LotTable } from "@interfaces/lots";
import { ModalEditLot } from "@lots/modal";
import { ColumnDef } from "@tanstack/react-table";

export const columnsLot: ColumnDef<LotTable>[] = [
  {
    accessorKey: "nameProduct",
    header: "Nombre Producto",
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("nameProduct")}
      </div>
    ),
  },
  {
    accessorKey: "quantity",
    header: "Cantidad",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("quantity")}
      </div>
    ),
  },
  {
    accessorKey: "dateEntry",
    header: "Fecha",
    cell: ({ row }) => (
      <div className="whitespace-nowrap">
        {row.getValue("dateEntry")}
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const lot = row.original;

      return (
        <div className="flex items-center justify-end gap-2 whitespace-nowrap">
          <ModalEditLot lotId={lot.id} />
        </div>
      )
    },
  }
]