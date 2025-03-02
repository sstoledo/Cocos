'use client';

import { MarcaForm } from "@marca/form";
import { useMarcaModal } from "@marca/hook/useMarcaModal";
import { ModalMarcaProps } from "@marca/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Edit } from "lucide-react";

export function ModalEditMarca({ marcaId }: ModalMarcaProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    marca,
    loading
  } = useMarcaModal(marcaId, token);

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
        title="Editar Marca"
        description="Edita el nombre de tu marca"
        preventAutoFocus={true}
      >
        {!loading && marca && (
          <MarcaForm
            key={marca.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={marca}
          />
        )}
      </BaseModal>
    </>
  )
}