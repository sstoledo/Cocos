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

      const matchesAvailability = activeFilters.availability.length === 0 ||
        (activeFilters.availability.includes('Disponible') && product.isActive) ||
        (activeFilters.availability.includes('No disponible') && !product.isActive);

      return matchesSearch && matchesCategory && matchesPresentation &&
        matchesProvider && matchesAvailability;
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
      availability: []
    });
    setSearchTerm('');
  };

  const handleHover = useCallback((id: string | null) => {
    setHoveredCard(id);
  }, []);

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
            {(Object.values(activeFilters).some(arr => arr.length > 0) || searchTerm) && (
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
        {Object.values(activeFilters).some(arr => arr.length > 0) && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Filter />
            {Object.entries(activeFilters).map(([type, filters]) =>
              filters.map((filter: string) => (
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
          <ProductCard
            key={product.id}
            product={product}
            isHovered={hoveredCard === product.id}
            onHover={handleHover}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && <EmptyState />}
    </div>
  );
}