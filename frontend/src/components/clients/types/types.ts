import { ClientFormInputs, ClientResponse, ClientTable } from '@interfaces/clients';
import { ColumnDef } from '@tanstack/react-table';
import { UseFormReturn } from 'react-hook-form';

export interface ClientFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: ClientResponse;
}

export interface FieldsClientProps {
  mode: 'create' | 'update';
  form?: UseFormReturn<ClientFormInputs>;
}

export interface ClientDataTableProps {
  columns: ColumnDef<ClientTable, unknown>[]
  data: ClientTable[]
}

export interface ModalClientProps {
  clientId: string;
}

export interface ViewClientFieldsProps {
  client: ClientResponse;
}

interface BaseClientSelectProps {
  onSelect: (value: string | null) => void;
  mode: 'create' | 'update';
}

interface ClientSelectCreateProps extends BaseClientSelectProps {
  mode: 'create';
  selectedId?: string | null;
  value?: never;  // Ensure value isn't used in create mode
}

interface ClientSelectUpdateProps extends BaseClientSelectProps {
  mode: 'update';
  value: string | null;
  selectedId?: never;  // Ensure selectedId isn't used in update mode
}

export type ClientSelectProps = ClientSelectCreateProps | ClientSelectUpdateProps;