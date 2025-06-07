import { CategoriesAll, CategoryByIdResponse, CategoryFormInputs } from "@interfaces/categories";
import { ColumnDef } from "@tanstack/react-table";
import { UseFormReturn } from "react-hook-form";


// Base interface for common props
interface BaseCategorySelectProps {
  onSelect: (value: string | null) => void;
  mode: 'create' | 'update';
}

// Props specific to create mode
interface CategorySelectCreateProps extends BaseCategorySelectProps {
  mode: 'create';
  selectedId?: string | null;
  value?: never;  // Ensure value isn't used in create mode
}

// Props specific to update mode
interface CategorySelectUpdateProps extends BaseCategorySelectProps {
  mode: 'update';
  value: string | null;
  selectedId?: never;  // Ensure selectedId isn't used in update mode
}

// Union type for the component props
export type CategorySelectProps = CategorySelectCreateProps | CategorySelectUpdateProps;

export interface CategoriaSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface CategoryFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: CategoryByIdResponse;
}

export interface FieldsCategoryProps {
  mode: 'create' | 'update';
  form?: UseFormReturn<CategoryFormInputs>; // Para el modo create
}

export interface ViewCategoryFieldsProps {
  category: CategoryByIdResponse;
}

export interface ModalCategoryProps {
  categoryId: string;
}

export interface CategoryDataTableProps {
  columns: ColumnDef<CategoriesAll, unknown>[]
  data: CategoriesAll[]
}