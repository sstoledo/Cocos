"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ComboCategoria {
  id: string;
  name: string;
}

interface CategoriaSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

function CategoriaSelect({ onSelect, selectedId }: CategoriaSelectProps) {

  const [categories, setCategorias] = useState<ComboCategoria[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories/combo`)
      .then(res => res.json())
      .then(data => setCategorias(data))
      .catch(error => console.error('Error fetching categories', error));
  }, []);


  useEffect(() => {
    if (
      selectedId !== null &&
      !categories.find(category => category.id === selectedId)
    ) {
      onSelect(null);
    }
  }, [selectedId, categories, onSelect]);

  return (
    <Select onValueChange={(value) => onSelect(value || null)}
      value={selectedId || ''}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        {categories.map((category) => (
          <SelectItem key={category.id} value={category.id.toString()}>
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )

}

export default CategoriaSelect;