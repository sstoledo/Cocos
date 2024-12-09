"use client";

import { Button } from "@ui/button";
import {
  DialogFooter,
} from "@ui/dialog"
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deletePresentacion } from "@apis/presentacion";
import { ActionButton } from "@modal/button";
import { BaseModal } from "@modal/base";
import { ModalPresentacionProps } from "@presentacion/types";

export function ModalDeletePresentacion({ presentacionId }: ModalPresentacionProps) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");
  const router = useRouter();

  const handleDelete = async () => {
    await deletePresentacion(token!, presentacionId);
    setIsOpen(false);
    Swal.fire({
      title: "¡Eliminado!",
      text: "La presentación ha sido eliminada",
      icon: "success"
    });
    router.refresh();
  };

  return (
    <>
      <ActionButton
        icon={Trash2}
        onClick={() => setIsOpen(true)}
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
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Confirmar
          </Button>
        </DialogFooter>
      </BaseModal>
    </>
  );
};