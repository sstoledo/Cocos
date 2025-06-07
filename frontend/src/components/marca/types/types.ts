import { columns } from '@clients/data-table';
import { MarcaFormInputs, MarcaResponseAll } from '@interfaces/marcas';
import { ColumnDef } from '@tanstack/react-table';
export interface MarcaFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: {
    id?: string;
    name: string;
  }
}

export type MarcaInputs = MarcaFormInputs;

export interface ModalMarcaProps {
  marcaId: string;
}

interface BaseMarcaSelectProps {
  onSelect: (value: string | null) => void;
  mode: 'create' | 'update';
}

interface MarcaSelectCreateProps extends BaseMarcaSelectProps {
  mode: 'create';
  selectedId?: string | null;
  value?: never;  // Ensure value isn't used in create mode
}

interface MarcaSelectUpdateProps extends BaseMarcaSelectProps {
  mode: 'update';
  value: string | null;
  selectedId?: never;  // Ensure selectedId isn't used in update mode
}

export type MarcaSelectProps = MarcaSelectCreateProps | MarcaSelectUpdateProps;

export interface MarcaDataTableProps {
  columns: ColumnDef<MarcaResponseAll, any>[]
  data: MarcaResponseAll[]
}