import { ProviderByIdResponse, ProviderResponseSelect } from "@interfaces/providers";
import { ColumnDef } from "@tanstack/react-table";


export interface ProviderSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface ProviderSelectUIProps extends ProviderSelectProps {
  providers: ProviderResponseSelect[];
}

export interface ProviderFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: ProviderByIdResponse;
}

interface BaseProviderSelectProps {
  onSelect: (value: string | null) => void;
  mode: 'create' | 'update';
}

interface ProviderSelectCreateProps extends BaseProviderSelectProps {
  mode: 'create';
  selectedId?: string | null;
  value?: never;  // Ensure value isn't used in create mode
}

interface ProviderSelectUpdateProps extends BaseProviderSelectProps {
  mode: 'update';
  value: string | null;
  selectedId?: never;  // Ensure selectedId isn't used in update mode
}

export type ProviderSelectCrudProps = ProviderSelectCreateProps | ProviderSelectUpdateProps;

export interface ViewProviderFieldsProps {
  provider: ProviderResponseSelect;
}

export interface ModalProviderProps {
  providerId: string;
}

export interface ProviderDataTableProps {
  columns: ColumnDef<ProviderResponseSelect, any>[];
  data: ProviderResponseSelect[];
}