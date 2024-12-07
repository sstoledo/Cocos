import { useState, useEffect } from "react";
import { ProviderByIdResponse } from "@/interfaces/providers/providers-response";
import { getProviderById } from "@/helpers/apis/providers/provider-api";

export const useProviderModal = (providerId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [provider, setProvider] = useState<ProviderByIdResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setProvider(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;

    const fetchProvider = async () => {
      if (!token || !providerId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getProviderById(token, providerId);
        if (isMounted) setProvider(data);
      } catch (error) {
        console.error('Error fetching provider:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProvider();

    return () => {
      isMounted = false;
    };
  }, [providerId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    provider,
    loading,
    setProvider
  };
};