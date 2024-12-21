import { ShoppingCart, Eye, Edit2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/tooltip";
import { Button } from '@ui/button';
import Link from 'next/link';
import { useCart } from '@cart/provider';
import Cookies from "js-cookie";
import { getProduct } from '@apis/products';

interface ProductActionsProps {
  productId: string;
}

export function ProductActions({ productId }: ProductActionsProps) {
  const { addToCart } = useCart();
  const token = Cookies.get("authToken");

  const handleAddToCart = async () => {
    //Hacemos peticion a la api para saber sus datos
    const responseProduct = await getProduct(token!, productId);
    const productDetails = {
      id: responseProduct.id,
      name: responseProduct.name,
      price: responseProduct.price,
      quantity: 1,
    };
    console.log({ productDetails })
    addToCart(productDetails);
  };

  return (
    <div className="absolute inset-0 bg-black/40 flex items-center justify-center gap-2 transition-opacity duration-300">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="secondary" className="h-9 w-9" onClick={handleAddToCart}>
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Agregar al carrito</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/productos/edit/${productId}`}>
              <Button size="icon" variant="secondary" className="h-9 w-9">
                <Edit2 className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Editar</TooltipContent>
        </Tooltip>
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