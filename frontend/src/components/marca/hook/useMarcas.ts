import { getSelectMarcas } from "@apis/marcas";
import { MarcaSelect } from "@interfaces/marcas";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export const useMarcas = () => {
  const [marcas, setMarcas] = useState<MarcaSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(()=> {
    const fechMarcas = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedMarcas = await getSelectMarcas(token);
        setMarcas(fetchedMarcas);
      } catch (error) {
        console.log('Error fetching marcas:', error);
        setError("Failed to fetch marcas");
        setMarcas([]);
      } finally {
        setLoading(false);
      }
    }
    fechMarcas();
  }, [token]);

  return { marcas, loading, error };
}