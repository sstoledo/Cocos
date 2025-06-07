import { AutoResponse, InitialAuto } from "@interfaces/automovil";
import { ColumnDef } from "@tanstack/react-table";

export interface AutomovilFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: InitialAuto;
  codeClient?: string;
}

export interface FieldsAutomovilProps {
  mode: 'create' | 'update';
  form?: any;
}

export interface DataTableAutomovilProps {
  columns: ColumnDef<AutoResponse,any>[];
  data: AutoResponse[];
}