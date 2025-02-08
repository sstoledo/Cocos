"use client";

import { FormLot } from "@lots/form";
import { useLotModal } from "@lots/hooks";
import { ModalLotProps } from "@lots/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Edit } from "lucide-react";

export function ModalEditLot({ lotId }: ModalLotProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    lot,
    loading
  } = useLotModal(lotId, token);

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
        title="Editar Lote"
        description="Edita el lote"
        preventAutoFocus={true}
      >
        {!loading && lot && (
          <FormLot
            key={lot.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={lot}
          />
        )}
      </BaseModal>
    </>
  );
} 