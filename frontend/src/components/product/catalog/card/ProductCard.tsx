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
      className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl
        bg-light-bg-surface dark:bg-dark-bg-surface
        border-light-border-default hover:border-light-border-hover dark:border-dark-border-default dark:hover:border-dark-border-hover
        shadow-light-border-muted/10 dark:shadow-dark-border-muted/10"
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
          className="absolute top-2 right-2 shadow-sm"
          variant={product.isActive ? "success" : "warning"}
        >
          {product.isActive ? "Disponible" : "No disponible"}
        </Badge>
      </CardHeader>

      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold line-clamp-1 text-lg text-light-text-primary dark:text-dark-text-primary">
                  {product.name}
                </h3>
                <p className="text-lg font-bold text-light-btn-primary dark:text-dark-btn-primary">
                  ${product.price}
                </p>
              </div>
              <p className="text-sm mt-1 text-light-text-secondary dark:text-dark-text-secondary">
                Código: {product.code}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
        <Badge
          variant="outline"
          className="flex items-center gap-1 
            bg-light-bg-surface dark:bg-dark-bg-container
            text-light-text-primary dark:text-dark-text-primary
            border-light-border-default dark:border-dark-border-default
            hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
            truncate max-w-32"
        >
          <Tag className="h-3 w-3" />
          {product.categoryName}
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 
            bg-light-bg-surface dark:bg-dark-bg-container
            text-light-text-primary dark:text-dark-text-primary
            border-light-border-default dark:border-dark-border-default
            hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover"
        >
          <Package className="h-3 w-3" />
          {product.presentacionName}
        </Badge>
        <Badge
          variant="outline"
          className="flex items-center gap-1 
            bg-light-bg-surface dark:bg-dark-bg-container
            text-light-text-primary dark:text-dark-text-primary
            border-light-border-default dark:border-dark-border-default
            hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover"
        >
          <Truck className="h-3 w-3" />
          {product.providerName}
        </Badge>
      </CardFooter>
    </Card>
  );
}