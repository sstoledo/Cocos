"use client";

import { Card, CardContent, CardFooter, CardHeader } from '@ui/card';
import { Badge } from "@ui/badge";
import { Tag, Package, Truck } from 'lucide-react';
import { ProductImage } from '../image';
import { ProductActions } from '../actions';
import { Product } from '@product/types';

interface ProductCardProps {
  product: Product;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

export function ProductCard({ product, isHovered, onHover }: ProductCardProps) {
  return (
    <Card
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800 shadow-md"
      onMouseEnter={() => onHover(product.id)}
      onMouseLeave={() => onHover(null)}
    >
      <CardHeader className="p-0 relative">
        <ProductImage
          publicId={product.publicId}
          alt={product.name}
        />
        {isHovered && <ProductActions productId={product.id} />}
        <Badge
          className="absolute top-2 right-2"
          variant={product.isActive ? "default" : "destructive"}
        >
          {product.isActive ? "Disponible" : "No disponible"}
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold line-clamp-1 text-lg dark:text-white">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-primary dark:text-blue-300">
                  ${product.price}
                </p>
              </div>
              <p className="text-sm text-muted-foreground dark:text-gray-400 mt-1">
                Código: {product.code}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Badge variant="outline" className="flex items-center gap-1 dark:bg-gray-700 dark:text-white truncate max-w-32">
          <Tag className="h-3 w-3" />
          {product.categoryName}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 dark:bg-gray-700 dark:text-white">
          <Package className="h-3 w-3" />
          {product.presentacionName}
        </Badge>
        <Badge variant="outline" className="flex items-center gap-1 dark:bg-gray-700 dark:text-white">
          <Truck className="h-3 w-3" />
          {product.providerName}
        </Badge>
      </CardFooter>
    </Card>
  );
}