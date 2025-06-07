import { getMarcaById } from "@apis/marcas";
import { MarcaResponseAll } from "@interfaces/marcas";
import { useEffect, useState } from "react";

export const useMarcaModal = (marcaId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [marca, setMarca] = useState<MarcaResponseAll | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setMarca(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;

    const fetchMarca = async () => {
      if (!token || !marcaId || !isOpen) return;
        setLoading(true);
        try {
          const data = await getMarcaById(token, marcaId);
          if (isMounted) setMarca(data);
        } catch (error) {
          console.log('Error al obtener la marca', error);
        } finally {
          if (isMounted) setLoading(false);
        }
    };

    fetchMarca();

    return () => {
      isMounted = false;
    };
  }, [marcaId, token, isOpen]);

  return {
    isOpen,
    setIsOpen,
    marca,
    loading
  };
}