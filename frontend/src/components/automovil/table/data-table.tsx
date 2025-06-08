"use client";

import { DataTableAutomovilProps } from "@automovil/types";
import { ColumnFiltersState, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, SortingState, useReactTable } from "@tanstack/react-table";
import { Input } from "@ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@ui/table";
import { useState } from "react";

export function DataTableAutomovil({ columns, data }: DataTableAutomovilProps) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'matricula', desc: false }
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      columnFilters,
      sorting
    }
  });

  return (
    <div className="w-full space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-sm">
          <Input
            type="text"
            placeholder="Filtrar por nombre"
            value={(table.getColumn("matricula")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("matricula")?.setFilterValue(event.target.value)
            }
            className="w-full 
              bg-light-input-default dark:bg-dark-bg-accent
              text-light-text-primary dark:text-dark-text-primary
              placeholder:text-light-text-tertiary dark:placeholder:text-dark-text-tertiary
              border-light-input-border dark:border-dark-input-border
              hover:border-light-input-border_hover hover:dark:border-dark-input-border_hover
              hover:bg-light-input-hover hover:dark:bg-dark-input-hover
              focus:bg-light-input-focus focus:dark:bg-dark-input-focus
              focus:border-light-input-border_focus focus:dark:border-dark-input-border_focus"
          />
        </div>
      </div>
      <div className="w-full overflow-auto rounded-md border-4 border-light-border-default dark:border-dark-border-default 
        bg-light-bg-container dark:bg-dark-bg-container">
        <Table>
          <TableHeader className="bg-light-bg-surface dark:bg-dark-bg-surface 
                        border-b border-light-border-default dark:border-dark-border-default">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={`
                                      whitespace-nowrap px-4 
                                      text-light-text-primary dark:text-dark-text-primary
                                      ${header.id !== "name" && header.id !== "actions" ? "hidden dsm:table-cell" : ""}
                                      hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
                                      cursor-pointer
                                      transition-colors
                                      text-center
                                    `}
                      onClick={() => header.column.toggleSorting()}
                    >
                      <div className="flex justify-center items-center">
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      </div>
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b 
                    border-light-border-muted dark:border-dark-border-muted
                    hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
                    last:border-0
                    transition-colors"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={`
                        px-4
                        text-light-text-primary dark:text-dark-text-primary
                        ${cell.column.id !== "name" && cell.column.id !== "actions" ? "hidden dsm:table-cell" : ""}
                      `}
                    >
                      <div className={`
                        flex justify-center items-center
                        ${cell.column.id === "actions" ? "justify-end" : "justify-center"}
                      `}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-light-text-secondary dark:text-dark-text-secondary">
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}