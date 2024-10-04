import { useCallback, useEffect, useState } from "react"
import { ComboCategoriaFather } from "./types"
import Cookies from "js-cookie"

export const useCategoriasFathre = () => {
  const [categories, setCategories] = useState<ComboCategoriaFather[]>([]);

  const fetchCategories = useCallback(async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error("No hay token");
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/category/fathers`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error("La API no devolvió un array", data);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error al obtener las categorías:", error);
      setCategories([]);
    }
  }, []);

  useEffect(()=> {
    fetchCategories();
  }, [fetchCategories]);

  return categories;
}