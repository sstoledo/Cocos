"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { deletePresentacion } from "@/helpers";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

interface Props {
  presentacionId: string;
}

export function ModalDeletePresentacion({ presentacionId }: Props) {

  const [openModal, setOpenModal] = useState(false);
  const token = Cookies.get("authToken");
  const router = useRouter();

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDeletePresentacion = async () => {
    deletePresentacion(token!, presentacionId);
    handleCloseModal();
    Swal.fire({
      title: "¡Eliminado!",
      text: "La presentación a sido eliminado",
      icon: "success"
    });
    router.refresh();
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0"
          title="Eliminar"
        >
          <Trash2 className="mr-2 h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onOpenAutoFocus={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle>¿Estas seguro de continuar?</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Esta accion no se puede deshacer.
        </DialogDescription>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDeletePresentacion}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );

}