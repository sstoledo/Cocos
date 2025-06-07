"use client";

import { useAutomovilModal } from "@automovil/hook";
import { ModalAutoProps } from "@automovil/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";

export function ModalViewAuto({ autoId }: ModalAutoProps) {
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
        icon={Eye}
        onClick={() => setIsOpen(true)}
        title="Ver más"
      />
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        title="Detalles del Automovil"
        description="Información detallada del automovil"
        preventAutoFocus={true}
      >
        {!loading && automovil ? (
          <span>Hola</span>
        ) :
          <div className="flex items-center justify-center h-32">
            {loading ? "Cargando..." : "No se encontró el automovil"}
          </div>
        }
      </BaseModal>
    </>
  );
}