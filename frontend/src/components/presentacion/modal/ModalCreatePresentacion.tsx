"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { ActionButton } from "@modal/button";
import { BaseModal } from "@modal/base";
import { PresentacionForm } from "@presentacion/form";

export function ModalCreatePresentacion() {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  return (
    <>
      <ActionButton
        icon={Plus}
        onClick={() => setIsOpen(true)}
        title="Nueva Presentación"
        variant="default"
        showText
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Crear Presentación"
        description="Crea una nueva presentación para tus productos"
      >
        <PresentacionForm
          onSuccess={() => setIsOpen(false)}
          token={token!}
        />
      </BaseModal>
    </>
  );

}