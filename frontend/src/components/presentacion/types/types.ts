import { PresentacionAll } from "@interfaces/presentacion";
import { ColumnDef } from "@tanstack/react-table";

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

interface BasePresentacionSelectProps {
  onSelect: (value: string | null) => void;
  mode: 'create' | 'update';
}

interface PresentacionSelectCreateProps extends BasePresentacionSelectProps {
  mode: 'create';
  selectedId?: string | null;
  value?: never;  // Ensure value isn't used in create mode
}

interface PresentacionSelectUpdateProps extends BasePresentacionSelectProps {
  mode: 'update';
  value: string | null;
  selectedId?: never;  // Ensure selectedId isn't used in update mode
}

export type PresentacionSelectCrudProps = PresentacionSelectCreateProps | PresentacionSelectUpdateProps;

export interface ModalPresentacionProps {
  presentacionId: string;
}


export interface PresentacionDataTableProps {
  columns: ColumnDef<PresentacionAll, any>[]
  data: PresentacionAll[]
}