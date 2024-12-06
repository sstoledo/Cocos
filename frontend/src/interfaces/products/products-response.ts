export interface ProductsResponse {
  id: string;
  code: string;
  name: string;
  description: string;
  price: number;
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  idProvidr: string;
  idCategory: string;
  idPresentacion: string;
}