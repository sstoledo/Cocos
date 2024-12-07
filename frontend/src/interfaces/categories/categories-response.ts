export interface CategoryByIdResponse {
  id: string;
  name: string;
  level: number;
  isRootCategory: boolean;
  fatherName: string;
  fatherId: string;
}

export interface CategoriesResponseSelect {
  id: string;
  name: string;
  level: number;
}

export interface CategoriesAll {
  id: string;
  name: string;
  level: number;
  fatherName: string | null;
}