export interface AutoResponse {
  id: string;
  matricula: string;
  kilometraje: number;
  idMarca: string;
  modelo: string;
  clientId: string;
  nameClient: string;
  nameMarca: string;
}

export type AutoFormInputs = Omit<AutoResponse, 'id' | 'nameClient' | 'nameMarca'>;

export type AutoResponseById = Omit<AutoResponse, 'nameClient' | 'nameMarca'>;

export type InitialAuto = AutoResponseById;

