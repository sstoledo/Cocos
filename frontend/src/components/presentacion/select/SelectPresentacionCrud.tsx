import React from "react";
import { PresentacionSelectCrudProps } from "../types/types";
import { usePresentacions } from "../hooks/usePresentacions";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";

export const SelectPresentacionCrud: React.FC<PresentacionSelectCrudProps> = (props) => {
  const { presentaciones, loading, error } = usePresentacions();
  if (loading) return <div>Loading presentaciones...</div>;
  if (error) return <div>Error: {error}</div>;

  const { mode, onSelect } = props;
  const selectedValue = mode === 'create'
    ? props.selectedId
    : props.value;

  const showNoPresentacion = mode === 'update';

  return (
    <Select
      onValueChange={(value) => onSelect(value === "no-presentaciones" ? null : value)}
      value={selectedValue || (showNoPresentacion ? "no-presentaciones" : undefined)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona una presentación" />
      </SelectTrigger>
      <SelectContent>
        {showNoPresentacion && (
          <SelectItem value="no-presentaciones">No presentacion</SelectItem>
        )}
        {presentaciones.map((category) => (
          <SelectItem
            key={category.id}
            value={category.id}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}