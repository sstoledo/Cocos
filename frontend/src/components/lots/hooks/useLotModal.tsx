import { getLotById } from "@apis/lots";
import { LotByIdResponse } from "@interfaces/lots";
import { useEffect, useState } from "react";

export const useLotModal = (lotId: string, token: string | undefined) => {
  const [isOpen, setIsOpen] = useState(false);
  const [lot, setLot] = useState<LotByIdResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isOpen) {
      setLot(null);
      setLoading(true);
    }
  }, [isOpen]);

  useEffect(() => {
    let isMounted = true;

    const fetchLot = async () => {
      if (!token || !lotId || !isOpen) return;

      setLoading(true);
      try {
        const data = await getLotById(token, lotId);
        if (isMounted) setLot(data);
      } catch (error) {
        console.error('Error fetching lot:', error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLot();

    return () => {
      isMounted = false;
    };
  }, [lotId, token, isOpen]);

  return  {
    isOpen,
    setIsOpen,
    lot,
    loading,
    setLot
  }
}