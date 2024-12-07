import { ProviderAll, ProviderByIdResponse, ProviderResponseSelect } from "@/interfaces/providers/providers-response";


interface Data {
  name: string;
  address: string;
  phone: string;
  email: string;
}

//metodo para obtener todos los proveedores
export const getAllProviders = async (token: string): Promise<ProviderAll[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

//metodo para llenar combobox de proveedores
export const getProvidersSelect = async (token: string): Promise<ProviderResponseSelect[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

//metodo para obtener un proveedor por su id
export const getProviderById = async (token: string, id: string): Promise<ProviderByIdResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

//metodo para crear un proveedor
export const createProvider = async (token: string, data: Data) => {
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

//metodo para actualizar un proveedor
export const updateProvider = async (token: string, id: string, data: Data) => {
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

//metodo para eliminar un proveedor
export const deleteProvider = async (token: string, uuid: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}