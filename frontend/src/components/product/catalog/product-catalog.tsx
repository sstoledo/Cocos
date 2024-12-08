'use client';

import { useState, useEffect } from 'react';
import { AdvancedImage, placeholder, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { auto } from '@cloudinary/url-gen/qualifiers/quality';
import {
  Search,
  Filter,
  ChevronDown,
  Tag,
  Package,
  Truck,
  X,
  ShoppingCart,
  Heart,
  Eye,
  Edit2
} from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { ProductsCatalogoResponse } from "@/interfaces/products/products-response";
import ModalEditarProduct from '../modal/ModalEditProduct';

const cld = new Cloudinary({
  cloud: {
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
  }
});

interface Filters {
  categories: string[];
  presentations: string[];
  providers: string[];
}

interface ProductCatalogProps {
  products: ProductsCatalogoResponse[];
}

export default function ProductCatalog({ products }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    categories: [],
    presentations: [],
    providers: [],
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Extract unique values for filters
  const uniqueValues = {
    categories: Array.from(new Set(products.map(p => p.categoryName))),
    presentations: Array.from(new Set(products.map(p => p.presentacionName))),
    providers: Array.from(new Set(products.map(p => p.providerName))),
  };

  // Apply filters
  useEffect(() => {
    const filtered = products.filter(product => {
      const matchesSearch = (
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.code.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const matchesCategory = activeFilters.categories.length === 0 ||
        activeFilters.categories.includes(product.categoryName);

      const matchesPresentation = activeFilters.presentations.length === 0 ||
        activeFilters.presentations.includes(product.presentacionName);

      const matchesProvider = activeFilters.providers.length === 0 ||
        activeFilters.providers.includes(product.providerName);

      return matchesSearch && matchesCategory && matchesPresentation && matchesProvider;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, activeFilters, products]);

  const toggleFilter = (type: keyof Filters, value: string) => {
    setActiveFilters(prev => {
      const currentFilters = prev[type];
      const newFilters = currentFilters.includes(value)
        ? currentFilters.filter(v => v !== value)
        : [...currentFilters, value];

      return {
        ...prev,
        [type]: newFilters
      };
    });
  };

  const clearFilters = () => {
    setActiveFilters({
      categories: [],
      presentations: [],
      providers: [],
    });
    setSearchTerm('');
  };

  const FilterDropdown = ({
    title,
    icon: Icon,
    items,
    type
  }: {
    title: string;
    icon: any;
    items: string[];
    type: keyof Filters;
  }) => (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={activeFilters[type].length > 0 ? "default" : "outline"}
          className="h-9 justify-between min-w-[150px]"
        >
          <Icon className="mr-2 h-4 w-4" />
          {title}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px]">
        <DropdownMenuLabel>Seleccionar {title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="flex items-center justify-between"
            onClick={() => toggleFilter(type, item)}
          >
            {item}
            {activeFilters[type].includes(item) && (
              <Badge variant="secondary" className="ml-2">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );

  return (
    <div className="w-full space-y-6">
      {/* Search and Filters Section */}
      <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nombre o código..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <FilterDropdown
              title="Categorías"
              icon={Tag}
              items={uniqueValues.categories}
              type="categories"
            />
            <FilterDropdown
              title="Presentaciones"
              icon={Package}
              items={uniqueValues.presentations}
              type="presentations"
            />
            <FilterDropdown
              title="Proveedores"
              icon={Truck}
              items={uniqueValues.providers}
              type="providers"
            />
            {(activeFilters.categories.length > 0 ||
              activeFilters.presentations.length > 0 ||
              activeFilters.providers.length > 0 ||
              searchTerm) && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={clearFilters}
                  className="h-9"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Limpiar filtros
                  <X className="ml-2 h-4 w-4" />
                </Button>
              )}
          </div>
        </div>

        {/* Active Filters Display */}
        {(activeFilters.categories.length > 0 ||
          activeFilters.presentations.length > 0 ||
          activeFilters.providers.length > 0) && (
            <div className="flex flex-wrap gap-2 pt-2">
            <Filter />
              {Object.entries(activeFilters).map(([type, filters]) =>
                filters.map((filter : any) => (
                  <Badge
                    key={`${type}-${filter}`}
                    variant="secondary"
                    className="px-3 py-1 flex items-center gap-1"
                  >
                    {filter}
                    <X
                      className="h-3 w-3 ml-1 cursor-pointer"
                      onClick={() => toggleFilter(type as keyof Filters, filter)}
                    />
                  </Badge>
                ))
              )}
            </div>
          )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.map((product) => (
          <Card
            key={product.id}
            className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl"
            onMouseEnter={() => setHoveredCard(product.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <CardHeader className="p-0 relative">
              <div className="aspect-square overflow-hidden">
                <AdvancedImage
                  cldImg={cld
                    .image(product.publicId)
                    .delivery(format('auto'))
                    .delivery(quality(auto()))}
                  plugins={[responsive(), placeholder()]}
                  className="h-full w-full object-cover transition-all duration-500 group-hover:scale-110"
                />
              </div>
              {/* Hover Actions */}
              {hoveredCard === product.id && (
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <ModalEditarProduct productId={product.id} />
                      </TooltipTrigger>
                      <TooltipContent>Editar producto</TooltipContent>
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
              )}
              {/* Status Badge */}
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
                    <h3 className="font-semibold line-clamp-1 text-lg">
                      {product.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Código: {product.code}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-primary">
                      ${product.price}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>

            <CardFooter className="p-4 pt-0 flex flex-wrap gap-2">
              <Badge variant="outline" className="flex items-center gap-1">
                <Tag className="h-3 w-3" />
                {product.categoryName}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                {product.presentacionName}
              </Badge>
              <Badge variant="outline" className="flex items-center gap-1">
                <Truck className="h-3 w-3" />
                {product.providerName}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12 bg-muted/20 rounded-lg">
          <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-semibold">No se encontraron productos</h3>
          <p className="text-muted-foreground">
            Intenta ajustar los filtros o el término de búsqueda
          </p>
        </div>
      )}
    </div>
  );
}