"use client";

import { deleteAutomovil } from "@apis/automovil";
import { ModalAutoProps } from "@automovil/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import { Button } from "@ui/button";
import { DialogFooter } from "@ui/dialog";
import Cookies from "js-cookie";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export function ModalDeleteAuto({ autoId }: ModalAutoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");
  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteAuto = async () => {
    deleteAutomovil(token!, autoId);
    handleCloseModal();
    Swal.fire({
      title: "¡Eliminado!",
      text: "El automovil a sido eliminado",
      icon: "success"
    });
    router.refresh();
  };

  return (
    <>
      <ActionButton
        icon={Trash2}
        onClick={handleOpenModal}
        title="Eliminar"
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="¿Estás seguro de continuar?"
        description="Esta acción no se puede deshacer."
        preventAutoFocus
      >
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDeleteAuto}>
            Confirmar
          </Button>
        </DialogFooter>
      </BaseModal>
    </>
  );
}