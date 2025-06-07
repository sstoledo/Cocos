import { getClient } from "@apis/clients";
import { ClientResponse } from "@interfaces/clients";
import { useEffect, useState } from "react";

export const useClientModal = (clientId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [client, setClient] = useState<ClientResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if (!isOpen) {
      setClient(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(()=> {
    let isMounted = true;

    const fechClient = async () => {
      if (!token || !clientId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getClient(token, clientId);
        if (isMounted) setClient(data);
      } catch (error) {
        console.log('Error fetching client:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fechClient();

    return () => {
      isMounted = false;
    };
  }, [clientId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    client,
    loading,
    setClient
  };
}