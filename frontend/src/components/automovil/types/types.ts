import { InitialAuto } from "@interfaces/automovil";

export interface AutomovilFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: InitialAuto;
}

export interface FieldsAutomovilProps {
  mode: 'create' | 'update';
  form?: any;
}