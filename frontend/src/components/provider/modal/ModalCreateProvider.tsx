'use client';

import { useState } from "react";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { ProviderForm } from "../form/ProviderForm";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

export default function ModalCreateProvider() {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  const handleOpenModal = () => {
    setIsOpen(true);
  }

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <ActionButton
        icon={Plus}
        onClick={handleOpenModal}
        title="Nueva Presentación"
        variant="default"
        showText
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Crear Proveedor"
        description="Crea un nueva proveedor para tus productos"
      >
        <ProviderForm
          onSuccess={handleCloseModal}
          token={token!}
        />
      </BaseModal>
    </>
  );
}