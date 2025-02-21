'use client';

import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import { ViewProviderFields } from "@provider/fields";
import { useProviderModal } from "@provider/hooks";
import { ModalProviderProps } from "@provider/types";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";


export function ModalViewProvider({
  providerId
}: ModalProviderProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    provider,
    loading
  } = useProviderModal(providerId, token);

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
        title="Detalles de la Proveedor"
        description="Información detallada del proveedor"
        preventAutoFocus={true}
      >
        {!loading && provider ? (
          <ViewProviderFields provider={provider} />
        ) : (
          <div className="flex items-center justify-center h-32">
            {loading ? "Cargando..." : "No se encontró el proveedor"}
          </div>
        )}
      </BaseModal>
    </>
  );
}