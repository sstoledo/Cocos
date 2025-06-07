import { AutomovilForm } from "@automovil/form";
import { useAutomovilModal } from "@automovil/hook";
import { ModalAutoProps } from "@automovil/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Edit } from "lucide-react";

export function ModalEditAuto({autoId}: ModalAutoProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    automovil,
    loading
  } = useAutomovilModal(autoId, token);

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
        title="Editar Automovil"
        description="Edita los campos de tu automovil"
        preventAutoFocus={true}
      >
        {!loading && automovil && (
          <AutomovilForm
            key={automovil.id}
            onSuccess={() => setIsOpen(false)}
            token={token!}
            initialData={automovil}
          />
        )}
      </BaseModal>
    </>
  );
}