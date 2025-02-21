import { AutoFormInputs, AutoResponse, AutoResponseById } from "@interfaces/automovil/automovil-response";

// api para la creacion de automoviles
export const createAutomovil = async (token: string, data: AutoFormInputs) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automovil`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al crear el automovil');
  return response.json();
};

// api para obtener todas las automoviles
export const getAllAutomoviles = async (token: string): Promise<AutoResponse[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automovil`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener las automoviles');
  return response.json();
}

// api para obtener una automovil especifica
export const getAutomovilById = async (token: string, id: string): Promise<AutoResponseById> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automovil/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener la automovil');
  return response.json();
}

// api para actualizar una automovil
export const updateAutomovil = async (token: string, id: string, data: AutoFormInputs) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automovil/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al actualizar la automovil');
  return response.json();
};

// api para eliminar una automovil
export const deleteAutomovil = async (token: string, id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/automovil/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al eliminar la automovil');
  return response.json();
};