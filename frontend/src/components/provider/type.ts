import { ProviderAll, ProviderByIdResponse, ProviderResponseSelect } from "@/interfaces/providers/providers-response";

export interface Provider {
  id: string;
  name: string;
}

export interface ProviderSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export interface ProviderSelectUIProps extends ProviderSelectProps {
  providers: ProviderResponseSelect[];
}

export interface ProviderFormProps {
  onSuccess: () => void;
  token: string;
  initialData?: ProviderByIdResponse;
}

export interface ProviderFormInputs {
  name: string;
  address: string;
  phone: string;
  email: string;
}