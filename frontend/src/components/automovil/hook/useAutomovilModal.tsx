import { getAutomovilById } from "@apis/automovil";
import { AutoResponseById } from "@interfaces/automovil";
import { useEffect, useState } from "react";

export const useAutomovilModal = (automovilId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [automovil, setAutomovil] = useState<AutoResponseById | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(()=> {
    if (!isOpen) {
      setAutomovil(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(()=> {
    let isMounted= true;

    const fechAutomovil = async () => {
      if (!token || !automovilId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getAutomovilById(token, automovilId);
        if (isMounted) setAutomovil(data);
      } catch (error) {
        console.log('Error fetching automovil:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fechAutomovil();

    return () => {
      isMounted = false;
    };
  }, [automovilId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    automovil,
    loading,
    setAutomovil
  };
}