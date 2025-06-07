'use client';

import { AutomovilForm } from "@automovil/form";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useState } from "react";
import { redirect } from "next/navigation";
interface CreateAutoProps {
  clientId?: string;
}

export function ModalCreateAuto({ clientId }: CreateAutoProps) {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  if (!token) {
    redirect('/login');
  }

  return (
    <>
      <ActionButton
        icon={Plus}
        onClick={() => setIsOpen(true)}
        title={clientId ? "Agregar Auto" : "Nuevo automóvil"}
        variant={clientId ? "tertiary" : "default"}
        showText={clientId ? false : true}
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        maxWidth="lg"
        title="Crear Automóvil"
        description="Crea un nuevo automóvil para tus productos"
      >
        <AutomovilForm onSuccess={() => setIsOpen(false)} token={token!} codeClient={clientId} />
      </BaseModal>
    </>
  );
}