'use client';

import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import ViewCategoryFields from "../fields/ViewCategoryFields";
import { useCategoryModal } from "../hook/useCategoryForm";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

interface Props {
  categoryId: string;
}

export default function ModalViewCategory({ categoryId }: Props) {
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