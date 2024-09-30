export interface Provider {
  id: string;
  name: string;
}

export interface ProviderSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}