"use client";

import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ComboProvider {
  id: string;
  name: string;
}

interface ProviderSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

function ProviderSelect({ onSelect, selectedId }: ProviderSelectProps) {
  const [proveedores, setProveedores] = useState<ComboProvider[]>([]);
  const [estaCargando, setEstaCargando] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const obtenerProveedores = async () => {
      try {
        setEstaCargando(true);
        const respuesta = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/providers/combo`);
        if (!respuesta.ok) {
          throw new Error('No se pudo obtener los proveedores');
        }
        const datos = await respuesta.json();
        setProveedores(datos);
      } catch (error) {
        console.error('Error al obtener proveedores', error);
        setError('No se pudieron cargar los proveedores. Por favor, intente de nuevo más tarde.');
        setProveedores([]);
      } finally {
        setEstaCargando(false);
      }
    };

    obtenerProveedores();
  }, []);

  useEffect(() => {
    if (selectedId && !proveedores.find(proveedor => proveedor.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, proveedores, onSelect]);

  if (estaCargando) return <p>Cargando proveedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Select
      onValueChange={(value) => onSelect(value || null)}
      value={selectedId || ''}
    >
      <SelectTrigger>
        <SelectValue placeholder="Seleccione un proveedor" />
      </SelectTrigger>
      <SelectContent>
        {proveedores.map((proveedor) => (
          <SelectItem key={proveedor.id} value={proveedor.id}>
            {proveedor.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default ProviderSelect;