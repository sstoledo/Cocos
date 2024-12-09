import { Package } from 'lucide-react';

export function EmptyState() {
  return (
    <div className="text-center py-12 bg-muted/20 rounded-lg">
      <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
      <h3 className="mt-4 text-lg font-semibold">No se encontraron productos</h3>
      <p className="text-muted-foreground">
        Intenta ajustar los filtros o el término de búsqueda
      </p>
    </div>
  );
}