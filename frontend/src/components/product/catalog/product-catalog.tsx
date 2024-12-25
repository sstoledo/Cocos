'use client';
import { useState, useEffect, useCallback } from 'react';
import { Search, Filter, Tag, Package, Truck, X, CircleCheck } from 'lucide-react';
import { Input } from '@ui/input';
import { Button } from '@ui/button';
import { Badge } from "@ui/badge";
import { Filters, Product } from '@product/types';
import { FilterDropdown } from './dropdown';
import { ProductCard } from './card';
import { EmptyState } from './empty';

interface ProductCatalogProps {
  products: Product[];
}

export function ProductCatalog({ products }: ProductCatalogProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilters, setActiveFilters] = useState<Filters>({
    categories: [],
    presentations: [],
    providers: [],
    availability: []
  });
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  // Extract unique values for filters
  const uniqueValues = {
    categories: Array.from(new Set(products.map(p => p.categoryName))),
    presentations: Array.from(new Set(products.map(p => p.presentacionName))),
    providers: Array.from(new Set(products.map(p => p.providerName))),
    availability: ['Disponible', 'No disponible']
  };

  // Filter logic remains the same...
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

      const matchesAvailability = activeFilters.availability.length === 0 ||
        (activeFilters.availability.includes('Disponible') && product.isActive) ||
        (activeFilters.availability.includes('No disponible') && !product.isActive);

      return matchesSearch && matchesCategory && matchesPresentation &&
        matchesProvider && matchesAvailability;
    });

    setFilteredProducts(filtered);
  }, [searchTerm, activeFilters, products]);

  const toggleFilter = useCallback((type: keyof Filters, value: string) => {
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
  }, []);

  const clearFilters = useCallback(() => {
    setActiveFilters({
      categories: [],
      presentations: [],
      providers: [],
      availability: []
    });
    setSearchTerm('');
  }, []);

  const handleHover = useCallback((id: string | null) => {
    setHoveredCard(id);
  }, []);

  return (
    <div className="w-full space-y-6">
      {/* Filter Section */}
      <div 
      className="p-4 sm:p-6 rounded-lg space-y-4 shadow-lg
        dark:bg-dark-bg-accent bg-light-bg-accent
      "
      >
        {/* Search and Filters Container */}
        <div className="flex flex-col space-y-4">
          {/* Search Bar */}
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground dark:text-gray-400" />
            <Input
              placeholder="Buscar por nombre o código..."
              className="pl-8 w-full bg-light-bg-surface dark:bg-dark-input-default 
             text-light-text-primary dark:text-dark-text-primary
             border-light-input-border dark:border-dark-input-border
             hover:border-light-input-border_hover hover:dark:border-dark-input-border_hover
             focus:border-light-input-border_focus focus:dark:border-dark-input-border_focus"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filters Grid */}
          <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center">
            {/* Filter Dropdowns */}
            <FilterDropdown
              title="Categorías"
              icon={Tag}
              items={uniqueValues.categories}
              type="categories"
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
            />
            <FilterDropdown
              title="Presentaciones"
              icon={Package}
              items={uniqueValues.presentations}
              type="presentations"
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
            />
            <FilterDropdown
              title="Proveedores"
              icon={Truck}
              items={uniqueValues.providers}
              type="providers"
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
            />
            <FilterDropdown
              title="Disponibilidad"
              icon={CircleCheck}
              items={uniqueValues.availability}
              type="availability"
              activeFilters={activeFilters}
              onToggleFilter={toggleFilter}
            />

            {/* Clear Filters Button */}
            {(Object.values(activeFilters).some(arr => arr.length > 0) || searchTerm) && (
              <Button
                variant="destructive"
                size="sm"
                onClick={clearFilters}
                className="col-span-2 sm:col-span-1 h-9 mt-2 sm:mt-0 dark:bg-red-600 dark:hover:bg-red-700"
              >
                <Filter className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Limpiar filtros</span>
                <span className="sm:hidden">Limpiar</span>
                <X className="h-4 w-4 sm:ml-2" />
              </Button>
            )}
          </div>
        </div>

        {/* Active Filters Tags */}
        {Object.values(activeFilters).some(arr => arr.length > 0) && (
          <div className="flex flex-wrap gap-2 pt-2">
            <div className="w-full flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Filter className="h-4 w-4" />
              <span>Filtros activos:</span>
            </div>
            {Object.entries(activeFilters).map(([type, filters]) =>
              filters.map((filter: string) => (
                <Badge
                  key={`${type}-${filter}`}
                  variant="secondary"
                  className="px-2 py-1 flex items-center gap-1 text-sm dark:bg-gray-700 dark:text-white"
                >
                  <span className="truncate max-w-[150px]">{filter}</span>
                  <X
                    className="h-3 w-3 flex-shrink-0 cursor-pointer"
                    onClick={() => toggleFilter(type as keyof Filters, filter)}
                  />
                </Badge>
              ))
            )}
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isHovered={hoveredCard === product.id}
              onHover={handleHover}
            />
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}