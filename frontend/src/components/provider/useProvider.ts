import { useCallback, useEffect, useState } from "react"
import { Provider } from "./type"
import Cookies from "js-cookie";

export const useProvider = () => {
  const [provider, setProvider] = useState<Provider[]>([]);

  const fetchProvider = useCallback(async () => {
    const token = Cookies.get("authToken");
    if (!token) {
      console.error('No se encontró token de autorización');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion/all`, {
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
        setProvider(data);
      } else {
        console.error('La API no devolvió un array', data);
        setProvider([]);
      }
    } catch (error) {
      console.error('Error al obtener presentaciones', error);
      setProvider([]);
    }
  }, []);

  useEffect(()=> {
    fetchProvider();
  }, [fetchProvider]);

  return provider;
}