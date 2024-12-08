"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { ActionButton } from "@/components/modal/ActionButton";
import { Plus } from "lucide-react";
import { BaseModal } from "@/components/modal/BaseModal";
import { FormProduct } from "../form/FormProduct";

export function ModalCreateProduct() {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  return (
    <>
      <ActionButton 
        icon={Plus}
        onClick={() => setIsOpen(true)}
        title="Nueva Producto"
        variant="default"
        showText
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Crear Producto"
        maxWidth='2xl'
        preventAutoFocus={true}
      >
        <FormProduct 
          onSuccess={() => setIsOpen(false)}
          token={token!}
        />
      </BaseModal>
    </>
  );
}