import {  CategoriesResponse, CategoriesResponseSelect, CategoriesTable } from "@/interfaces/categories/categories-response";
import { useState } from "react";

interface Data {
  name: string;
  father: string;
}

//traer de uno en uno
export const getCate = async (token: string, id: string): Promise<CategoriesResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export const getAllCategories = async (token: string): Promise<CategoriesTable[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('Received data is not an array:', data);
      return [];
    }

    return data.map(category => ({
      id: category.id,
      name: category.name,
      fatherName: category.fatherName
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

//metodo para llenar combobox de categorias
export const getCategories = async (token: string): Promise<CategoriesResponseSelect[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data)) {
      console.error('Received data is not an array:', data);
      return [];
    }

    return data.map(category => ({
      id: category.id,
      name: category.name
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}
//metodo para llenar combobox de categorias padres

export const getCategoriesFather = async (token: string): Promise<CategoriesResponseSelect[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/fathers`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();

    // Asegúrate de que data es un array y tiene la estructura correcta
    if (Array.isArray(data) && data.length > 0 && 'id' in data[0] && 'name' in data[0]) {
      return data;
    } else {
      console.error('Unexpected data structure:', data);
      return [];
    }
  } catch (error) {
    console.error("Error fetching father categories:", error);
    return [];
  }
}

export const createCategory = async (token: string, data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export const updateCategory = async (token: string, id: string, data: Data) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });
  return res.json();
}

export const deleteCategory = async (token: string, uuid: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${uuid}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}

export const getUniqueCategory = async (token : string, uuid: string)=> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}