export interface MarcaFormInputs {
  name: string;
}

export interface InitialMarca {
  id: string;
  name: string;
} 

export interface MarcaResponseById {
  id: string;
  name: string;
  isActive: boolean;
}

export type MarcaResponseAll = MarcaResponseById;

export type MarcaSelect = InitialMarca;

//Opcion tambien valida:
//export type AutoResponse = AutoInitialLot;w