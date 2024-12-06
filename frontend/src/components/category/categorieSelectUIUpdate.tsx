import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CategoriaSelectPropsUpdate } from './types';
import { CategoriesResponseSelect } from '@/interfaces/categories/categories-response';

interface CategorySelectUIProps extends CategoriaSelectPropsUpdate {
  categories: CategoriesResponseSelect[];
}

export const CategorySelectUIUpdate: React.FC<CategorySelectUIProps> = ({ onSelect, value, categories }) => (
  <Select
    onValueChange={(selectedValue) => onSelect(selectedValue === "no-categories" ? null : selectedValue)}
    value={value || "no-categories"}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a category" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="no-categories">No category</SelectItem>
      {categories.map((category) => (
        <SelectItem key={category.id} value={category.id}>
          {category.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);