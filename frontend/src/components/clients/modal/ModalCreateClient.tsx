"use client";

import { ClientForm } from "@clients/form";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useState } from "react";

interface ModalCreateClientProps {
  onClientCreated?: () => void;
}

export function ModalCreateClient({ onClientCreated }: ModalCreateClientProps = {}) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  const handleSuccess = () => {
    setIsOpen(false);
    // Llamar al callback si existe
    if (onClientCreated) {
      onClientCreated();
    }
  };

  return (
    <>
      <ActionButton
        icon={Plus}
        onClick={() => setIsOpen(true)}
        title="Nuevo Cliente"
        variant="default"
        showText
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        maxWidth="3xl"
        title="Crear Cliente"
        description="Crea un nuevo cliente para tus productos"
      >
        <ClientForm onSuccess={handleSuccess} token={token!} />
      </BaseModal>
    </>
  );
}