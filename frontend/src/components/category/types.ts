export interface ComboCategoria {
  id: string;
  name: string;
}

export interface CategoriaSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}