export interface CategoriaSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface CategoriaSelectPropsUpdate {
  onSelect: (id: string | null) => void;
  value?: string | null;
}

export interface Inputs {
  name: string;
  father: string;
}