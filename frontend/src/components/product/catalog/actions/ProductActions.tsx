"use client";

import { ShoppingCart, Eye, Edit2, Receipt } from 'lucide-react';
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
    <div
      className="absolute inset-0 backdrop-blur-sm flex items-center justify-center gap-2 transition-opacity duration-300"
    >
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="secondary"
              onClick={handleAddToCart}
              className="h-9 w-9 
                bg-light-btn-primary dark:bg-dark-btn-primary
                hover:bg-light-btn-primary-hover dark:hover:bg-dark-btn-primary-hover
                text-light-btn-primary-text dark:text-dark-btn-primary-text"
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Agregar al carrito</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/productos/edit/${productId}`}>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9
                  bg-light-btn-secondary dark:bg-dark-btn-secondary
                  hover:bg-light-btn-secondary-hover dark:hover:bg-dark-btn-secondary-hover
                  text-light-btn-secondary-text dark:text-dark-btn-secondary-text"
              >
                <Edit2 className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Editar</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/productos/`}>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9
              bg-light-btn-tertiary dark:bg-dark-btn-tertiary
              hover:bg-light-btn-tertiary-hover dark:hover:bg-dark-btn-tertiary-hover
              text-light-btn-tertiary-text dark:text-dark-btn-tertiary-text"
              >
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Ver detalles</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href={`/dashboard/lotes/create/${productId}`}>
              <Button
                size="icon"
                variant="secondary"
                className="h-9 w-9
              bg-light-btn-secondary dark:bg-dark-btn-secondary
              hover:bg-light-btn-secondary-hover dark:hover:bg-dark-btn-secondary-hover
              text-light-btn-secondary-text dark:text-dark-btn-secondary-text"
              >
                <Receipt className="h-4 w-4" />
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>Agregar lote</TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}