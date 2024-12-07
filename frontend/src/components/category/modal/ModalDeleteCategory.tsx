'use client';

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
import { Trash2 } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import { deleteCategory } from "@/helpers";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

interface Props {
  categoryId: string;
}

export default function ModalDeleteCategory({ categoryId }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");
  const router = useRouter();

  const handleOpenModal = () => {
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  const handleDeleteCategory = async () => {
    deleteCategory(token!, categoryId);
    handleCloseModal();
    Swal.fire({
      title: "¡Eliminado!",
      text: "La categoría a sido eliminado",
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
          <Button variant="destructive" onClick={handleDeleteCategory}>
            Confirmar
          </Button>
        </DialogFooter>
      </BaseModal>
    </>
  );
}