'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useEffect, useState } from "react";
import { getPresentacionById } from "@/helpers";
import { ComboPresentacion } from "@/interfaces";
import Cookies from "js-cookie";
import { Card, CardContent } from "@/components/ui/card";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ViewPresentacionFields from "../fields/ViewPresentacionFields";

interface Props {
  presentacionId: string;
}

export default function ModalViewPresentacion({
  presentacionId
}: Props) {
  const token = Cookies.get("authToken");
  const [presentacion, setPresentacion] = useState<ComboPresentacion | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!openModal) {
      setPresentacion(null);
      setLoading(true);
    }
  }, [openModal]);

  useEffect(() => {
    let isMounted = true;

    const fetchPresentacion = async () => {
      if (!token || !presentacionId || !openModal) return;

      setLoading(true);
      try {
        const data = await getPresentacionById(token, presentacionId);
        if (isMounted) {
          setPresentacion(data);
        }
      } catch (error) {
        console.error('Error fetching presentacion:', error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPresentacion();

    return () => {
      isMounted = false;
    };
  }, [presentacionId, token, openModal]);

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          title="Ver más"
        >
          <Eye className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Detalles de la Presentación</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Información detallada de la presentación
        </DialogDescription>
        {!loading && presentacion ? (
          <ViewPresentacionFields presentacion={presentacion} />
        ) : (
          <div className="flex items-center justify-center h-32">
            {loading ? "Cargando..." : "No se encontró la presentación"}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}