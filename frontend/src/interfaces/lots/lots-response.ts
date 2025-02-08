export interface LotFormInputs {
  codeProduct: string;
  quantity: number;
  dateEntry: Date;
  priceBuy: number;
  priceLot: number;
}

export interface InitialLot {
  id: string;
  codeProduct: string;
  quantity: number;
  dateEntry: Date;
  priceBuy: number;
  priceLot: number;
}

export interface LotTable {
  id: string;
  nameProduct: string;
  quantity: number;
  dateEntry: Date;
}

export interface LotByIdResponse {
  id: string;
  codeProduct: string;
  quantity: number;
  dateEntry: Date;
  priceBuy: number;
  priceLot: number;
}