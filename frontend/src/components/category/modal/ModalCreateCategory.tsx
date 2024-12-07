'use client';

import { Plus } from "lucide-react";
import { useState } from "react";
import Cookies from "js-cookie";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";
import { CategoryForm } from "../form/CategoryForm";

export default function ModalCreateCategory() {
  const [isOpen, setIsOpen] = useState(false);
  const token = Cookies.get("authToken");

  return (
    <>
      <ActionButton 
        icon={Plus}
        onClick={() => setIsOpen(true)}
        title="Nueva Categoria"
        variant="default"
        showText
      />
      <BaseModal 
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Crear Categoria"
        description="Crea una nueva categoria para tus productos"
      >
        <CategoryForm 
          onSuccess={() => setIsOpen(false)}
          token={token!}
        />
      </BaseModal>
    </>
  );
}