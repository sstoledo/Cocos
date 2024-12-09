'use client';

import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import { ModalPresentacionProps } from "@presentacion/types";
import { usePresentacionModal } from "@presentacion/hooks";
import { ActionButton } from "@modal/button";
import { BaseModal } from "@modal/base";
import { ViewPresentacionFields } from "@presentacion/fields";


export function ModalViewPresentacion({presentacionId}: ModalPresentacionProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    presentacion,
    loading
  } = usePresentacionModal(presentacionId, token);

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
        title="Detalles de la Presentación"
        description="Información detallada de la presentación"
        preventAutoFocus={true}
      >
        {!loading && presentacion ? (
          <ViewPresentacionFields presentacion={presentacion} />
        ) : (
          <div className="flex items-center justify-center h-32">
            {loading ? "Cargando..." : "No se encontró la presentación"}
          </div>
        )}
      </BaseModal>
    </>
  );
};