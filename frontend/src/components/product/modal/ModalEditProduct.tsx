'use client';
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";
import Cookies from "js-cookie";
import { FormProduct } from "../form/FormProduct";
import { Edit2 } from "lucide-react";
import { useProductModal } from "../hooks/useProductModal";

export default function ModalEditarProduct({ productId }: { productId: string }) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    product,
    loading
  } = useProductModal(productId, token);

  return (
    <>
      <ActionButton
        variant="secondary"
        icon={Edit2}
        onClick={() => setIsOpen(true)}
        title="Editar"
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Editar Producto"
        maxWidth="2xl"
        preventAutoFocus={true}
      >
        {!loading && product && (
          <FormProduct
            key={product.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={product}
          />
        )}
      </BaseModal>
    </>
  );
}