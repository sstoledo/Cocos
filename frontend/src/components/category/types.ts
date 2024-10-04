export interface ComboCategoria {
  id: string;
  name: string;
}

export interface CategoriaSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface ComboCategoriaFather {
  id: string;
  name: string;
}

export interface Inputs {
  name: string;
  fatherId: string;
}