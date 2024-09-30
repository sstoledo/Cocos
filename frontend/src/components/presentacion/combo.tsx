'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import React, { useCallback, useEffect, useState } from "react";
import Cookies from "js-cookie";

interface ComboPresentacion {
  id: string;
  name: string;
}

interface PresentacionSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

function PresentacionSelect({ onSelect, selectedId }: PresentacionSelectProps) {

  const [presentaciones, setPresentaciones] = useState<ComboPresentacion[]>([]);

  const fetchPresentations = useCallback(async ()=> {
    const token = Cookies.get("authToken");
    if(!token){
      console.error('No se encontró token de autorización');
      return;
    }
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/presentacion/all`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if(Array.isArray(data)){
        setPresentaciones(data);
      } else {
        console.error('La API no devolvió un array', data);
        setPresentaciones([]);
      }
    } catch (error) {
      console.error('Error al obtener presentaciones', error);
      setPresentaciones([]);
    }
  }, []);

  useEffect(()=>{
    fetchPresentations();
  }, [fetchPresentations]);

  useEffect(() => {
    if (selectedId && !presentaciones.find(p=> p.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, presentaciones, onSelect]);

  return (
    <Select onValueChange={(value) => onSelect(value || null)}
      value={selectedId || ''}
    >
      <SelectTrigger>
        <SelectValue placeholder="Select a presentacion" />
      </SelectTrigger>
      <SelectContent>
        {presentaciones.map((presentacion) => (
          <SelectItem key={presentacion.id} value={presentacion.id}>
            {presentacion.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default PresentacionSelect;