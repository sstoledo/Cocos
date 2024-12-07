"use client";

import Cookies from "js-cookie";
import { Edit } from "lucide-react";
import { ProviderForm } from "../form/ProviderForm";
import { useProviderModal } from "../hooks/useProviderModel";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

interface Props {
  providerId: string;
}

export default function ModalEditarProvider({ providerId }: Props) {
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