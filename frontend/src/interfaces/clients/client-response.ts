export interface ClientResponse {
  id: string;
  name: string;
  apat: string;
  amat: string;
  dni: string;
  address: string;
  phone: string;
  email: string;
  inicio?: string;
}

export interface ClientFormInputs {
  name: string;
  apat: string;
  amat: string;
  dni: string;
  address?: string;
  phone?: string;
  email?: string;
}

export interface ClientTable {
  id: string;
  name: string;
  apat: string;
  dni: string;
  phone: string;
}

export interface ClientSelect {
  id: string;
  name: string;
  dni?: string;
}