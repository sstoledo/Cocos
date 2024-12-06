export interface CategoriesResponse {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  fatherId: string;
}

export interface CategoriesResponseSelect {
  id: string;
  name: string;
}

export interface CategoriesTable {
  id: string;
  name: string;
  fatherName: string;
}