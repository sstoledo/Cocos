export interface ProviderResponseSelect {
  id: string;
  name: string;
}

export interface ProviderByIdResponse {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

export interface ProviderAll {
  id: string;
  name: string;
  phone: string;
}

export interface ProviderFormInputs {
  name: string;
  address: string;
  phone: string;
  email: string;
}