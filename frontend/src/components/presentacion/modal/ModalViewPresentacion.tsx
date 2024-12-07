'use client';

import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import ViewPresentacionFields from "../fields/ViewPresentacionFields";
import { usePresentacionModal } from "../hooks/usePresentacionModal";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";

interface Props {
  presentacionId: string;
}

export default function ModalViewPresentacion({
  presentacionId
}: Props) {
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