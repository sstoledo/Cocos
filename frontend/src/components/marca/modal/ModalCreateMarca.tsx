'use client';

import { MarcaForm } from "@marca/form";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Plus } from "lucide-react";
import { useState } from "react";

export function ModalCreateMarca() {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  return (
    <>
      <ActionButton 
        icon={Plus}
        onClick={()=> setIsOpen(true)}
        title="Nueva Marca"
        variant="default"
        showText
      />
      <BaseModal 
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Crear Marca"
        description="Crea una nueva marca para tus productos"
      >
        <MarcaForm 
          onSuccess={() => setIsOpen(false)}
          token={token!}
        />
      </BaseModal>
    </>
  )
}