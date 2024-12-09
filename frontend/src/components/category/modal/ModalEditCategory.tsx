'use client';

import Cookies from "js-cookie";
import { Edit } from "lucide-react";
import { ActionButton } from "@modal/button";
import { BaseModal } from "@modal/base";
import { ModalCategoryProps } from "@category/types";
import { useCategoryModal } from "@category/hook";
import { CategoryForm } from "@category/form";


export function ModalEditCategory({ categoryId }: ModalCategoryProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    category,
    loading
  } = useCategoryModal(categoryId, token);


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