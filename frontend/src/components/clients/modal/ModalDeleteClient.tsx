'use client';

import { deleteClient } from "@apis/clients";
import { ModalClientProps } from "@clients/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import { Button } from "@ui/button";
import { DialogFooter } from "@ui/dialog";
import Cookies from "js-cookie";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";

export function ModalDeleteClient({ clientId }: ModalClientProps) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");
  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteClient = async () => {
    deleteClient(token!, clientId);
    handleCloseModal();
    Swal.fire({
      title: "¡Eliminado!",
      text: "El cliente a sido eliminado",
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
          <Button variant="destructive" onClick={handleDeleteClient}>
            Confirmar
          </Button>
        </DialogFooter>
      </BaseModal>
    </>
  )
}