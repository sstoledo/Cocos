import { ProviderResponse } from "@/interfaces";

interface Data {
  name: string;
  address: string;
  phone: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

//metodo para llenar combobox de proveedores
export const getProviders = async(token: string): Promise<ProviderResponse[]> =>{
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export const getProvider = async(token:string, id: string): Promise<ProviderResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export const createProvider = async(token: string, data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export const updateProvider = async(token: string, id: string, data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export const deleteProvider = async(token: string, uuid: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}