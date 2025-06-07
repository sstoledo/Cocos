'use client';

import { ViewClientFields } from "@clients/fields";
import { useClientModal } from "@clients/hook";
import { ModalClientProps } from "@clients/types";
import { BaseModal } from "@modal/base";
import { ActionButton } from "@modal/button";
import Cookies from "js-cookie";
import { Eye } from "lucide-react";
import Link from "next/link";

export function ModalViewClient({ clientId }: ModalClientProps) {
  const token = Cookies.get("authToken");
  const {
    isOpen,
    setIsOpen,
    client,
    loading
  } = useClientModal(clientId, token);

  return (
    <>
      <Link href={`/dashboard/clientes/${clientId}`}>
        <ActionButton
          icon={Eye}
          onClick={() => setIsOpen(true)}
          title="Ver más"
        />
      </Link>

      {/* Esto es para ver el modal de detalles del cliente */}
      <BaseModal
        open={isOpen}
        onOpenChange={setIsOpen}
        maxWidth="lg"
        title="Detalles del Cliente"
        description="Información detallada del cliente"
        preventAutoFocus={true}
      >
        {!loading && client ? (
          <ViewClientFields client={client} />
        ) : (
          <div className="flex items-center justify-center h-32">
            {loading ? "Cargando..." : "No se encontró el cliente"}
          </div>
        )}
      </BaseModal>
    </>
  )
}