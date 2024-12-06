import { ClientResponse } from "@/interfaces";


interface Data {
  name: string;
  apat: string;
  amat: string;
  dni: string;
  address?: string;
  phone?: string;
  email?: string;
}

export const getClients = async (token: string): Promise<ClientResponse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}


export const getClient = async (token: string, id: string): Promise<ClientResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}




export const createClient = async (token: string, data: Data) => {

  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return resp.json();

}

export const updateClient = async (token: string, id: string, data: Data): Promise<ClientResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  return res.json();
}

export const deleteClient = async (token: string, uuid: string) => {
  const resp = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/clientes/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });

  return resp.json();

}