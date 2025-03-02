import { MarcaFormInputs, MarcaResponseAll, MarcaResponseById, MarcaSelect } from "@interfaces/marcas";

//api para la creacion de marcas
export const createMarca = async (token: string, data: MarcaFormInputs) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marcacars`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al crear la marca');
  return response.json();
};

export const getAllMarcas = async (token: string): Promise<MarcaResponseAll[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marcacars/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener las marcas');
  return response.json();
}

// api para obtener todas las marcas
export const getSelectMarcas = async (token: string): Promise<MarcaSelect[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marcacars/all`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener las marcas');
  return response.json();
}

// api para obtener una marca especifica
export const getMarcaById = async (token: string, id: string): Promise<MarcaResponseById> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marcacars/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al obtener la marca');
  return response.json();
}

// api para actualizar una marca
export const updateMarca = async (token: string, id: string, data: MarcaFormInputs) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marcacars/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Error al actualizar la marca');
  return response.json();
};

// api para eliminar una marca
export const deleteMarca = async (token: string, id: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/marcacars/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) throw new Error('Error al eliminar la marca');
  return response.json();
};