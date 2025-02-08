import { useProducts } from "@product/hooks";
import { ProductSelectCrudProps } from "@product/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@ui/select";

export const SelectProduct: React.FC<ProductSelectCrudProps> = (props) => {
  const { productos, loading, error } = useProducts();
  if (loading) return <div>Loading productos...</div>;
  if (error) return <div>Error: {error}</div>;

  const { mode, onSelect } = props;
  const selectedValue = mode === 'create'
    ? props.selectedId
    : props.value;

  const showNoProduct = mode === 'update';

  return (
    <Select
      onValueChange={(value) => onSelect(value === "no-productos" ? null : value)}
      value={selectedValue || (showNoProduct ? "no-productos" : undefined)}
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
          placeholder="Selecciona un producto"
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
        {showNoProduct && (
          <SelectItem
            value="no-productos"
            className="
              text-light-text-primary dark:text-dark-text-primary
              hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
              focus:bg-light-bg-active dark:focus:bg-dark-bg-active
              data-[highlighted]:bg-light-bg-hover dark:data-[highlighted]:bg-dark-bg-hover
            "
          >
            No producto
          </SelectItem>
        )}
        {productos.map((prod) => (
          <SelectItem
            value={prod.code}
            key={prod.code}
            className="
              text-light-text-primary dark:text-dark-text-primary
              hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
              focus:bg-light-bg-active dark:focus:bg-dark-bg-active
              data-[highlighted]:bg-light-bg-hover dark:data-[highlighted]:bg-dark-bg-hover
              pl-[calc(0.75rem_+_theme(space.4)_*_var(--indent,0))]
            "
          >
            {prod.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}