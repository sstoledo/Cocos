import { useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { ComboCategoria } from './types';

export const useCategorias = () => {
  const [categories, setCategories] = useState<ComboCategoria[]>([]);

  const fetchCategories = useCallback(async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error('No se encontró token de autorización');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('La API no devolvió un array', data);
        setCategories([]);
      }
    } catch (error) {
      console.error('Error al obtener categorías', error);
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return categories;
};