'use client';

import { ClientForm } from "@clients/form";
import { useClientModal } from "@clients/hook";
import { ModalClientProps } from "@clients/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Edit } from "lucide-react";

export function ModalEditClient({ clientId }: ModalClientProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    client,
    loading
  } = useClientModal(clientId, token);

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
        title="Editar Cliente"
        maxWidth="3xl"
        description="Edita los campos de tu cliente"
        preventAutoFocus={true}
      >
        {!loading && client && (
          <ClientForm
            key={client.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={client}
          />
        )}
      </BaseModal>
    </>
  );
  
}