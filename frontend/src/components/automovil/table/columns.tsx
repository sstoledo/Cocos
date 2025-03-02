'use client';

import { AutoResponse } from "@interfaces/automovil";
import { ColumnDef } from "@tanstack/react-table";

export const columnsAutomovil: ColumnDef<AutoResponse>[] = [
  {
    accessorKey: "matricula",
    header: "Matricula",
    sortingFn: "text",
    cell: ({ row }) => (
      <div className="whitespace-nowrap truncate w-20 sm:w-full">
        {row.getValue("matricula")}
      </div>
    ),
  }
]