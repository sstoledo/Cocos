"use client";

import { Package } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-muted/20 rounded-lg dark:bg-gray-800">
      <Package className="mx-auto h-12 w-12 text-muted-foreground/50 dark:text-gray-400" />
      <h3 className="mt-4 text-lg font-semibold dark:text-white">No se encontraron productos</h3>
      <p className="text-muted-foreground dark:text-gray-400">
        Intenta ajustar los filtros o el término de búsqueda
      </p>
    </div>
  );
}