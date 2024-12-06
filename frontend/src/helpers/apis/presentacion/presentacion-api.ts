import { PresentacionResponse } from "@/interfaces";
import { ComboPresentacion } from "@/interfaces/presentacion/presentacion-response";

interface Data {
  name: string;
}

export const getPresentacion = async (token: string): Promise<PresentacionResponse[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error("Error al crear presentación");
  return response.json();
}

export const getPresentacionById = (token: string, id: string): Promise<ComboPresentacion> => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json());
}

export const createPresentacion = async (token: string, data: Data) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) throw new Error("Error al crear presentación");
  return response.json();
}

export const updatePresentacion = (token: string, id: string, data: Data) => {
  return fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

export const deletePresentacion = async (token: string, uuid: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  if (!response.ok) throw new Error("Error al crear presentación");
  return response.json();
}