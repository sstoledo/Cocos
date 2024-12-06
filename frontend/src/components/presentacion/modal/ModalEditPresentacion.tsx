"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FormEditPresentacion } from "../form/FormEditPresentacion";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { getPresentacionById } from "@/helpers";
import { ComboPresentacion } from "@/interfaces";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { set } from "react-hook-form";

interface Props {
  presentacionId: string;
}

export default function ModalEditarPresentacion({
  presentacionId,
}: Props) {
  const token = Cookies.get("authToken");
  const [openModal, setOpenModal] = useState(false);
  const [presentacion, setPresentacion] = useState<ComboPresentacion | null>(null);
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

  const handleCloseModal = () => {
    setPresentacion(null);
    setLoading(true);
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          title="Editar"
        >
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>Editar Presentacion</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Edita el nombre de tu presentacion
        </DialogDescription>
        {!loading && presentacion && (
          <FormEditPresentacion
            key={presentacion.id}
            onSuccess={handleCloseModal}
            presentacion={presentacion}
            token={token!}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}