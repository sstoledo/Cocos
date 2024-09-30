"use client";

import React, { useEffect } from "react";
import { useCategorias } from './useCategories';
import { CategorySelectUI } from './categorieSelectUI';
import { CategoriaSelectProps } from './types';

function CategoriaSelect({ onSelect, selectedId }: CategoriaSelectProps) {
  const categories = useCategorias();

  useEffect(() => {
    if (selectedId && !categories.find(cate => cate.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, categories, onSelect]);

  return (
    <CategorySelectUI
      onSelect={onSelect}
      selectedId={selectedId}
      categories={categories}
    />
  );
}

export default CategoriaSelect;