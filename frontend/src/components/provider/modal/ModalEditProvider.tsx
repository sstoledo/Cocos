"use client";

import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import { ProviderForm } from "@provider/form";
import { useProviderModal } from "@provider/hooks";
import { ModalProviderProps } from "@provider/types";
import Cookies from "js-cookie";
import { Edit } from "lucide-react";


export function ModalEditarProvider({ providerId }: ModalProviderProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    provider,
    loading
  } = useProviderModal(providerId, token);

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
        title="Editar Proveedor"
        description="Edita el nombre de tu proveedor"
        preventAutoFocus={true}
      >
        {!loading && provider && (
          <ProviderForm
            key={provider.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={provider}
          />
        )}
      </BaseModal>
    </>
  );
}