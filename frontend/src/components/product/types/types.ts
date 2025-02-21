import { InitialProduct, ProductsCatalogoResponse } from "@interfaces/products";

export interface ProductFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: InitialProduct;
  isModal?: boolean;
}

export interface ProductFormFieldsProps {
  onFileSelect: (file: File) => void;
  isSubmitting: boolean;
  mode: 'create' | 'update';
  form?: any; // Para el modo create
}

export interface ProductFormFieldsEditProps {
  form?: InitialProduct;
  isSubmitting: boolean;
}

export interface FormProductEditProps {
  token: string;
  product: InitialProduct;
  mode: "update";
}

export interface FormProductProps {
  onSuccess: () => void;
  token: string;
  initialData?: InitialProduct;
  isModal?: boolean;
}

export interface ModalProductProps {
  productId: string;
}

export interface Product extends ProductsCatalogoResponse {
  isActive: boolean;
}

export interface Filters {
  categories: string[];
  presentations: string[];
  providers: string[];
  availability: string[];
}

interface BaseProductSelectProps {
  onSelect: (value: string | null) => void;
  mode: 'create' | 'update';
}

interface ProductSelectCreateProps extends BaseProductSelectProps {
  mode: 'create';
  selectedId?: string | null;
  value?: never;
}

interface ProductSelectUpdateProps extends BaseProductSelectProps {
  mode: 'update';
  value: string | null;
  selectedId?: never;
}

export type ProductSelectCrudProps = ProductSelectCreateProps | ProductSelectUpdateProps;

