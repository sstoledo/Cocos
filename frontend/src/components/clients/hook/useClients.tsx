import { getClientSelect } from "@apis/clients";
import { ClientSelect } from "@interfaces/clients"
import Cookies from "js-cookie";
import { useEffect, useState, useCallback } from "react"

export const useClients = () => {
  const [clients, setClients] = useState<ClientSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  const fetchClients = useCallback(async () => {
    if (!token) {
      setError("No authentication token found");
      setLoading(false);
      return;
    }

    try {
      const fetchedClients = await getClientSelect(token);
      setClients(fetchedClients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      setError("Failed to fetch clients");
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const refreshClients = async () => {
    return await fetchClients();
  };

  return { clients, loading, error, refreshClients };
}