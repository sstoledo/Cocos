'use client';

import { ViewCategoryFields } from "@category/fields";
import { useCategoryModal } from "@category/hook";
import { ModalCategoryProps } from "@category/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";


export function ModalViewCategory({ categoryId }: ModalCategoryProps) {
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
        icon={Eye}
        onClick={() => setIsOpen(true)}
        title="Ver más"
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Detalles de la Categoria"
        description="Información detallada de la categoria"
        preventAutoFocus={true}
      >
        {!loading && category ? (
          <ViewCategoryFields category={category} />
        ) : (
          <div className="flex items-center justify-center h-32">
            {loading ? "Cargando..." : "No se encontró la categoria"}
          </div>
        )}
      </BaseModal>
    </>
  );
}