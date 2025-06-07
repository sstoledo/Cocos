import { AutoFormInputs, AutoResponse, AutoResponseById, InitialAuto } from "@interfaces/automovil";
import { ColumnDef } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";

export interface AutomovilFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: InitialAuto;
  codeClient?: string;
}

export interface FieldsAutomovilProps {
  mode: 'create' | 'update';
  form?: UseFormReturn<AutoFormInputs>;
}

export interface DataTableAutomovilProps {
  columns: ColumnDef<AutoResponse,unknown>[];
  data: AutoResponse[];
}

export interface ModalAutoProps {
  autoId : string;
}

export interface ViewAutomovilFieldsProps {
  automovil: AutoResponseById;
}