import { ClientResponse, ClientTable } from '@interfaces/clients';
import { ColumnDef } from '@tanstack/react-table';

export interface ClientFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: ClientResponse;
}

export interface FieldsClientProps {
  mode: 'create' | 'update';
  form?: any;
}

export interface ClientDataTableProps {
  columns: ColumnDef<ClientTable, any>[]
  data: ClientTable[]
}

export interface ModalClientProps {
  clientId: string;
}

export interface ViewClientFieldsProps {
  client: ClientResponse;
}