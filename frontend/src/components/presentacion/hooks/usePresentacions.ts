import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { PresentacionResponseSelect } from "@interfaces/presentacion";
import { getPresentacionsSelect } from "@apis/presentacion";

export const usePresentacions = () => {
  const [presentaciones, setPresentaciones] = useState<PresentacionResponseSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(()=> {
    const fetchPresentaciones = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedPresentaciones = await getPresentacionsSelect(token);
        setPresentaciones(fetchedPresentaciones);
      } catch (error) {
        console.log('Error fetching presentaciones:', error);
        setError("Failed to fetch presentaciones");
        setPresentaciones([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPresentaciones();
  }, [token]);

  return { presentaciones, loading, error };
}