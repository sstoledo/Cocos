import { getPresentacionById } from "@apis/presentacion";
import { PresentacionResponseSelect } from "@interfaces/presentacion";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    let isMounted = true;

    const fetchPresentacion = async () => {
      if (!token || !presentacionId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getPresentacionById(token, presentacionId);
        if (isMounted) setPresentacion(data);
      } catch (error) {
        console.error('Error fetching presentacion:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchPresentacion();

    return () => {
      isMounted = false;
    };
  }, [presentacionId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    presentacion,
    loading,
    setPresentacion
  };
};