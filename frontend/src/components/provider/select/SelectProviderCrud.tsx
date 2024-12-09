import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";
import { ProviderSelectCrudProps } from "@provider/types";
import { useProviders } from "@provider/hooks";

export const SelectProviderCrud:React.FC<ProviderSelectCrudProps> = (props) => {
  const { providers, loading, error } = useProviders();

  if (loading) return <div>Loading providers...</div>;
  if (error) return <div>Error: {error}</div>;

  const { mode, onSelect } = props;

  const selectedValue = mode === 'create'
    ? props.selectedId
    : props.value;

  const showNoProvider = mode === 'update';
  return (
    <Select
      onValueChange={(value)=> onSelect(value === "no-providers" ? null : value)}
      value={selectedValue || (showNoProvider ? "no-providers" : undefined)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Selecciona un proveedor" />
      </SelectTrigger>
      <SelectContent>
        {showNoProvider && (
          <SelectItem value="no-providers">No proveedor</SelectItem>
        )}
        {providers.map((pro) => (
          <SelectItem
            key={pro.id}
            value={pro.id}
          >
            {pro.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}