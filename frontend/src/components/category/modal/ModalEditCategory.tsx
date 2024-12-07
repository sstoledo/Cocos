'use client';

import Cookies from "js-cookie";
import { Edit } from "lucide-react";
import { CategoryForm } from "../form/CategoryForm";
import { useCategoryModal } from "../hook/useCategoryForm";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";


interface Props {
  categorieId: string;
}

export default function ModalEditCategory({ categorieId }: Props) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    category,
    loading
  } = useCategoryModal(categorieId, token);


  return (
    <>
      <ActionButton
        icon={Edit}
        onClick={() => setIsOpen(true)}
        title="Editar"
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Editar Presentación"
        description="Edita el nombre de tu presentación"
        preventAutoFocus={true}
      >
        {!loading && category && (
          <CategoryForm
            key={category.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={category}
          />
        )}
      </BaseModal>
    </>
  );
}