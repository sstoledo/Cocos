"use client";

import { Plus } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { PresentacionForm } from "../form/PresentacionForm";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

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