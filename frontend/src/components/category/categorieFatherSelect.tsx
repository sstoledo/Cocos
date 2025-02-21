'use client';

import { useEffect } from "react";
import { CategoriaSelectProps } from "./types";
import { useCategoriasFathre } from "./useCategoriesFather";
import { CategorySelectUI } from "./categorieSelectUI";

export default function CategorieFatherSelect({onSelect, selectedId}: CategoriaSelectProps) {
  
  const categories = useCategoriasFathre();

  useEffect(()=> {
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