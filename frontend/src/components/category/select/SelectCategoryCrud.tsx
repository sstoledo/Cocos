import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { CategorySelectProps } from '@category/types';
import { useCategories } from '@category/hook';

export const SelectCategoryCrud: React.FC<CategorySelectProps> = (props) => {
  const { categories, loading, error } = useCategories();

  if (loading) return (
    <div className="text-light-text-secondary dark:text-dark-text-secondary">
      Loading categories...
    </div>
  );

  if (error) return (
    <div className="text-light-status-error-text dark:text-dark-status-error-text">
      Error: {error}
    </div>
  );

  const { mode, onSelect } = props;
  const selectedValue = mode === 'create'
    ? props.selectedId
    : props.value;

  const showNoCategory = mode === 'update';

  return (
    <Select
      onValueChange={(value) => onSelect(value === "no-categories" ? null : value)}
      value={selectedValue || (showNoCategory ? "no-categories" : undefined)}
    >
      <SelectTrigger
        className="w-full
          bg-light-bg-surface dark:bg-dark-input-default 
          text-light-text-primary dark:text-dark-text-primary
          border-light-input-border dark:border-dark-input-border
          hover:border-light-input-border_hover hover:dark:border-dark-input-border_hover
          focus:border-light-input-border_focus focus:dark:border-dark-input-border_focus
          focus:ring-light-input-border_focus focus:dark:ring-dark-input-border_focus
          focus:ring-1 focus:ring-offset-0"
      >
        <SelectValue
          placeholder="Selecciona una categoría"
          className="text-light-text-tertiary dark:text-dark-text-tertiary"
        />
      </SelectTrigger>
      <SelectContent
        className="
          bg-light-bg-surface dark:bg-dark-bg-accent
          border border-light-border-default dark:border-dark-border-default
          shadow-lg rounded-md
          overflow-hidden
        "
      >
        {showNoCategory && (
          <SelectItem
            value="no-categories"
            className="
              text-light-text-primary dark:text-dark-text-primary
              hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
              focus:bg-light-bg-active dark:focus:bg-dark-bg-active
              data-[highlighted]:bg-light-bg-hover dark:data-[highlighted]:bg-dark-bg-hover
            "
          >
            No category
          </SelectItem>
        )}
        {categories.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
            className="
              text-light-text-primary dark:text-dark-text-primary
              hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
              focus:bg-light-bg-active dark:focus:bg-dark-bg-active
              data-[highlighted]:bg-light-bg-hover dark:data-[highlighted]:bg-dark-bg-hover
              pl-[calc(0.75rem_+_theme(space.4)_*_var(--indent,0))]
            "
            style={{ '--indent': category.level } as React.CSSProperties}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};