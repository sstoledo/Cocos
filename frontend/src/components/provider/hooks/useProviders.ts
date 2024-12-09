import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { ProviderResponseSelect } from "@interfaces/providers";
import { getProvidersSelect } from "@apis/providers";

export const useProviders = () => {
  const [providers, setProviders] = useState<ProviderResponseSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");
  useEffect(()=> {
    const fetchProviders = async () => {
      if (!token) {
        setError("No authentication token found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const fetchedProviders = await getProvidersSelect(token);
        setProviders(fetchedProviders);
      } catch (error) {
        console.log('Error fetching providers:', error);
        setError("Failed to fetch providers");
        setProviders([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProviders();
  }, [token]);

  return { providers, loading, error };
}