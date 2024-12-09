import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { CategorySelectProps } from '@category/types';
import { useCategories } from '@category/hook';

export const SelectCategoryCrud: React.FC<CategorySelectProps> = (props) => {
  const { categories, loading, error } = useCategories();

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error: {error}</div>;

  const { mode, onSelect } = props;
  // Use the correct prop based on mode
  const selectedValue = mode === 'create'
    ? props.selectedId
    : props.value;

  const showNoCategory = mode === 'update';

  return (
    <Select
      onValueChange={(value) => onSelect(value === "no-categories" ? null : value)}
      value={selectedValue || (showNoCategory ? "no-categories" : undefined)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona una categoría" />
      </SelectTrigger>
      <SelectContent>
        {showNoCategory && (
          <SelectItem value="no-categories">No category</SelectItem>
        )}
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
          >
            {'  '.repeat(category.level)}{category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};