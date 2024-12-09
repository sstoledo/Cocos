"use client";

import { useState } from "react";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { ActionButton } from "@modal/button";
import { BaseModal } from "@modal/base";
import { FormProduct } from "@product/form";

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