import { LotByIdResponse, LotFormInputs, LotTable } from "@interfaces/lots";


export const createLot = async (token: string, data: LotFormInputs) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lot`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    }
  );
  if (!response.ok) throw new Error("Error al crear presentación");
  return response.json();
};

export const getAllLots = async (token: string): Promise<LotTable[]> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lot`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener todos los lotes");
  return response.json();
};

export const getLotById = async (token: string, id: string): Promise<LotByIdResponse> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lot/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al obtener el lote");
  return response.json();
};

export const updateLot = async (id: string, data: LotFormInputs, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lot/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error("Error al actualizar el lote");
  return response.json();
};

export const deleteLot = async (id: string, token: string) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/lot/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) throw new Error("Error al eliminar el lote");
  return response.json();
}