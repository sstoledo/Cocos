import { getPresentacionById } from "@apis/presentacion";
import { PresentacionResponseSelect } from "@interfaces/presentacion";
import { useState, useEffect, useCallback } from "react";

export const usePresentacionModal = (presentacionId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [presentacion, setPresentacion] = useState<PresentacionResponseSelect | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setPresentacion(null);
      setLoading(true);
    }
  }, [isOpen]);

  const fetchPresentacion = useCallback(async () => {
    if (!token || !presentacionId || !isOpen) return;

    setLoading(true);
    try {
      const data = await getPresentacionById(token, presentacionId);
      setPresentacion(data);
    } catch (error) {
      console.error('Error fetching presentacion:', error);
    } finally {
      setLoading(false);
    }
  }, [token, presentacionId, isOpen]);

  useEffect(() => {

    const fetchData = async () => {
      await fetchPresentacion();
    };

    fetchData();
  }, [fetchPresentacion]);

  return {
    isOpen,
    setIsOpen,
    presentacion,
    loading
  };
};