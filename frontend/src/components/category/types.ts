import { CategoryByIdResponse } from "@/interfaces/categories/categories-response";

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

// Form input types
export interface CategoryFormInputs {
  name: string;
  fatherId: string;
}

// Category response type (if needed)
export interface CategoriesResponseSelect {
  id: string;
  name: string;
  level: number;
}

export interface CategoriaSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface CategoryFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: CategoryByIdResponse;
}