import { ShoppingCart, Eye } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { Button } from '@ui/button';
import { ModalEditarProduct } from '@product/modal';

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="secondary" className="h-9 w-9">
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Agregar al carrito</TooltipContent>
        </Tooltip>
        <ModalEditarProduct productId={productId} />
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="secondary" className="h-9 w-9">
              <Eye className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver detalles</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}