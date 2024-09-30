"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Cookies from "js-cookie";

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

  const fetchProviders = useCallback(async ()=> {
    const token = Cookies.get("authToken");
    if(!token){
      console.error('No se encontró token de autorización');
      return;
    }

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/provider/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data)) {
        setProveedores(data);
      } else {
        console.error('La API no devolvió un array', data);
        setProveedores([]);
      }
    } catch (error) {
      console.error('Error al obtener proveedores', error);
      setProveedores([]);
    }
  }, []);

  useEffect(()=> {
    fetchProviders();
  }, [fetchProviders]);

  useEffect(()=> {
    if (selectedId && !proveedores.find(pro => pro.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, proveedores, onSelect]);

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