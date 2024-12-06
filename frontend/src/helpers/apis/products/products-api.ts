import { ProductsResponse } from "@/interfaces";

interface Data {
  code: string;
  name: string;
  description: string;
  price: number;
  publicId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
  idProvidr: string;
  idCategory: string;
  idPresentacion: string;
}

export const getProducts = async (token: string): Promise<ProductsResponse[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export const getProduct = async (token: string, id: string): Promise<ProductsResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export const createProduct = async (token: string, data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export const updateProduct = async (token: string, id: string, data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export const deleteProduct = async (token: string, uuid: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/product/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
  });
  return res.json();
}