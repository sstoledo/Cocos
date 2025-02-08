import { InitialLot, LotTable } from '@interfaces/lots';
import { ColumnDef } from '@tanstack/react-table';

export interface FormLotProps {
  token: string;
  initialData?: InitialLot;
  codeProduct?: string;
  onSuccess: () => void;
}

export interface LotDataTableProps {
  columns: ColumnDef<LotTable>[]
  data: LotTable[]
}

export interface ModalLotProps {
  lotId: string;
}
