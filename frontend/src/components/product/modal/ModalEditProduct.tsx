'use client';

import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import { FormProduct } from "@product/form";
import { useProductModal } from "@product/hooks";
import { ModalProductProps } from "@product/types";
import Cookies from "js-cookie";
import { Edit2 } from "lucide-react";

export function ModalEditarProduct({ productId }: ModalProductProps) {
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