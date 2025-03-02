"use client";

import { useState } from "react";
import { Title } from "@ui/Title";
import { Button } from "@ui/button";
import { useRouter } from "next/navigation";
import { useClients } from "@clients/hook"; // Ajusta la ruta
import { useCart } from "@cart/provider";
import { SelectClient } from "@clients/select";
import Receipt from "@cart/receipt/receipt";
import { ModalCreateClient } from "@clients/modal";

interface CustomerInfo {
  id: string;
  name: string;
  dni?: string;
}

export default function ProformaPage() {
  const { cart, clearCart } = useCart();
  const router = useRouter();
  const [step, setStep] = useState<"select-client" | "receipt">("select-client");
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const { clients, refreshClients } = useClients();
  const [refreshCounter, setRefreshCounter] = useState(0);

  // Si el carrito está vacío, muestra un mensaje
  if (cart.length === 0) {
    return (
      <div className="w-full shadow rounded-lg p-4 md:p-6 flex flex-col gap-4 h-[calc(100vh-130px)]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2">
            <Title
              title="Mis boletas"
              subTitle="Gestiona todo tipo de boletas"
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-center h-full">
          <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
            No hay productos en el carrito para generar una boleta.
          </p>
          <Button
            onClick={() => router.push('/dashboard/productos')}
            className="bg-light-btn-secondary hover:bg-light-btn-secondary-hover text-light-bg-container dark:text-dark-text-primary dark:bg-dark-btn-secondary dark:hover:bg-dark-btn-secondary-hover"
          >
            Volver a la tienda
          </Button>
        </div>
      </div>
    );
  }

  const handleCancel = () => {
    router.push('/dashboard/productos');
  }

  const handleClearCart = () => {
    clearCart();
  }

  const handleClientCreated = async () => {
    // Actualizar la lista de clientes
    await refreshClients();
    setRefreshCounter(prev => prev + 1);
  };

  const handleClientSelect = (clientId: string | null) => {
    setSelectedClientId(clientId);
  };

  const handleContinue = () => {
    if (selectedClientId) {
      setStep("receipt");
    }
  };

  const getSelectedClient = (): CustomerInfo | null => {
    if (!selectedClientId) return null;

    const selectedClient = clients.find(client => client.id === selectedClientId);
    if (!selectedClient) return null;

    return {
      id: selectedClient.id,
      name: selectedClient.name,
      dni: selectedClient.dni
    };
  };

  const handleConfirmPurchase = () => {
    // Aquí podrías añadir lógica para guardar la compra en tu base de datos

    // Limpia el carrito después de completar la compra
    clearCart();

    // Redirecciona a alguna página de confirmación o de vuelta a la tienda
    router.push('/dashboard/purchase-confirmation');
  };

  return (
    <div className="w-full shadow rounded-lg am:p-4 sm:p-4 md:p-6 xl:p-8 flex flex-col gap-4 h-[calc(100vh-130px)] overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <Title
            title="Boleta de compra"
            subTitle={step === "select-client" ? "Selecciona un cliente para continuar" : "Revisa los detalles de tu compra"}
          />
        </div>
      </div>

      {step === "select-client" ? (
        <div className="w-full max-w-2xl border border-light-border-default dark:border-dark-border-active mx-auto p-6 bg-light-bg-container dark:bg-dark-bg-container rounded-lg shadow-md">
          <div className="mb-6">
            <div className="flex justify-between items-center">

              <div>
                <h2 className="text-xl font-semibold mb-2 text-light-text-primary dark:text-dark-text-primary">
                  Selecciona un cliente
                </h2>
                <p className="text-light-text-secondary dark:text-dark-text-secondary mb-4">
                  Elige un cliente registrado para emitir la boleta
                </p>
              </div>

              <div>
                <ModalCreateClient onClientCreated={handleClientCreated} />
              </div>
            </div>

            <div className="mb-6">
              <SelectClient
                mode="create"
                selectedId={selectedClientId || undefined}
                onSelect={handleClientSelect}
                clientsList={clients}
                forceRefresh={refreshCounter}
              />
            </div>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                variant="outline"
                onClick={() => router.push('/dashboard/productos')}
              >
                Cancelar
              </Button>
              <Button
                onClick={handleContinue}
                disabled={!selectedClientId}
                variant="default"
              >
                Continuar
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Mostrar el recibo con los datos del carrito y del cliente */}
          <Receipt
            cart={cart}
            customerInfo={getSelectedClient() || undefined}
          />

          {/* Botones de acción */}
          <div className="flex justify-end gap-4 mt-4">
            <Button
              variant="destructive"
              onClick={handleClearCart}>
              Limpiar carrito
            </Button>
            <Button
              variant="tertiary"
              onClick={handleCancel}
            >
              Editar carrito
            </Button>
            <Button
              variant="secondary"
              onClick={() => setStep("select-client")}
            >
              Cambiar cliente
            </Button>
            <Button
              variant="default"
              onClick={handleConfirmPurchase}
            >
              Confirmar compra
            </Button>
          </div>
        </>
      )}
    </div>
  );
}