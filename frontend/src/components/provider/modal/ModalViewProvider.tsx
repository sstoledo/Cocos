'use client';

import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import ViewProviderFields from "../fields/ViewProviderFields";
import { ActionButton } from "@/components/modal/ActionButton";
import { BaseModal } from "@/components/modal/BaseModal";
import { useProviderModal } from "../hooks/useProviderModel";

interface Props {
  providerId: string;
}

export default function ModalViewProvider({
  providerId
}: Props) {
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