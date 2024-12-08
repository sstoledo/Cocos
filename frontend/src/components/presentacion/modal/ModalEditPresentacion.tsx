"use client";

import Cookies from "js-cookie";
import { Edit } from "lucide-react";
import { PresentacionForm } from "../form/PresentacionForm";
import { usePresentacionModal } from "../hooks/usePresentacionModal";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

interface Props {
  presentacionId: string;
}

export default function ModalEditarPresentacion({ presentacionId }: Props) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    presentacion,
    loading
  } = usePresentacionModal(presentacionId, token);

  return (
    <>
      <ActionButton
        icon={Edit}
        onClick={() => setIsOpen(true)}
        title="Editar"
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Editar Presentación"
        description="Edita el nombre de tu presentación"
        preventAutoFocus={true}
      >
        {!loading && presentacion && (
          <PresentacionForm
            key={presentacion.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={presentacion}
          />
        )}
      </BaseModal>
    </>
  );
}