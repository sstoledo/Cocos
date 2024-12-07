import React, { memo } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriesResponseSelect } from '@/interfaces/categories/categories-response';
import { CategoriaSelectProps } from '../types';

interface CategorySelectUIProps extends CategoriaSelectProps {
  categories: CategoriesResponseSelect[];
}

export const CategorySelectUI = memo<CategorySelectUIProps>(({ onSelect, selectedId, categories }) => (
  <Select
    onValueChange={(value) => onSelect(value === "no-categories" ? null : value)}
    value={selectedId || undefined}
  >
    <SelectTrigger className='w-full'>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      {categories.length > 0 ? (
        categories.map((category) => (
          <SelectItem 
            key={category.id} 
            value={category.id}
          >
            {category.name}
          </SelectItem>
        ))
      ) : (
        <SelectItem value="no-categories" disabled>
          No categories available
        </SelectItem>
      )}
    </SelectContent>
  </Select>
));