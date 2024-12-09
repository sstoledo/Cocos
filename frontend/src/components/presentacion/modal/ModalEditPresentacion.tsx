"use client";

import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import { PresentacionForm } from "@presentacion/form";
import { usePresentacionModal } from "@presentacion/hooks";
import { ModalPresentacionProps } from "@presentacion/types";
import Cookies from "js-cookie";
import { Edit } from "lucide-react";


export function ModalEditarPresentacion({ presentacionId }: ModalPresentacionProps) {
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