"use client";

import { ClientForm } from "@clients/form";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useState } from "react";

export function ModalCreateClient() {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

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
        <ClientForm onSuccess={() => setIsOpen(false)} token={token!} />
      </BaseModal>
    </>
  )
}