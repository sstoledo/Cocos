export interface ComboPresentacion {
  id: string;
  name: string;
}

export interface PresentacionSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface Inputs {
  name: string;
}

export interface PresentacionFormInputs {
  name: string;
}

export interface PresentacionFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: {
    id?: string;
    name: string;
  };
}