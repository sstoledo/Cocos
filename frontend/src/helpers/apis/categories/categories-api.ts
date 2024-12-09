import { CategoriesAll, CategoriesResponseSelect, CategoryByIdResponse, CategoryFormInputs } from "@interfaces/categories";

//metodo para llenar la tabla de categorias
export const getAllCategories = async (token: string): Promise<CategoriesAll[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category`, {
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

    return data;

  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

//metodo para llenar combobox de categorias
export const getCategoriesSelect = async (token: string): Promise<CategoriesResponseSelect[]> => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/parents`, {
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

    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

//metodo para crear una categoría
export const createCategory = async (token: string, data: CategoryFormInputs) => {
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

//metodo para actualizar una categoría
export const updateCategory = async (token: string, id: string, data: CategoryFormInputs) => {
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

//metodo para eliminar una categoría
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

//metodo para obtener una categoría por su id
export const getCategoryById = async (token: string, uuid: string): Promise<CategoryByIdResponse> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/${uuid}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  return res.json();
}