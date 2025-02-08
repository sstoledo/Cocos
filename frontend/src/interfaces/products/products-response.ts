export interface ProductsResponse {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  publicId: string;
  idProvider: string;
  idCategory: string;
  idPresentacion: string;
}

export interface InitialProduct {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  idProvider: string;
  idCategory: string;
  idPresentacion: string;
  publicId?: string;
  isActive: boolean;
}

export interface ProductFormInputs {
  code: string;
  name: string;
  description: string;
  price: number;
  idProvider: string;
  idCategory: string;
  idPresentacion: string;
  publicId: string;
  isActive: boolean;
}

export interface ProductsCatalogoResponse {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  publicId: string;
  providerName: string;
  idProvider: string;
  categoryName: string;
  idCategory: string;
  presentacionName: string;
  idPresentacion: string;
  isActive: boolean;
  stock: number;
}

export interface ProductComboResponse {
  code: string;
  name: string;
}
