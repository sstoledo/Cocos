import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ComboCategoria, CategoriaSelectProps } from './types';

interface CategorySelectUIProps extends CategoriaSelectProps {
  categories: ComboCategoria[];
}

export const CategorySelectUI: React.FC<CategorySelectUIProps> = ({ onSelect, selectedId, categories }) => (
  <Select
    onValueChange={(value) => onSelect(value || null)}
    value={selectedId || ''}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      {categories.map((category) => (
        <SelectItem key={category.id} value={category.id}>
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);