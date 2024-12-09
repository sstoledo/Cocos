"use client";

import { Button } from "@ui/button";
import { DialogFooter } from "@ui/dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { ModalProviderProps } from "@provider/types";
import { deleteProvider } from "@apis/providers";
import { ActionButton } from "@modal/button";
import { BaseModal } from "@modal/base";

export function ModalDeleteProvider({ providerId }: ModalProviderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");
  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteProvider = async () => {
    deleteProvider(token!, providerId);
    handleCloseModal();
    Swal.fire({
      title: "¡Eliminado!",
      text: "El proveedor a sido eliminado",
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
        preventAutoFocus={false}	
      >
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDeleteProvider}>
            Confirmar
          </Button>
        </DialogFooter>
      </BaseModal>
    </>
  );

}