'use client';

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";

interface ComboPresentacion {
  id_presentacion: string;
  name_presentacion: string;
}

interface PresentacionSelectProps {
  onSelect: (id: string | null) => void;
  selectedId?: string | null;
}

export default function PresentacionSelect({ onSelect, selectedId }: PresentacionSelectProps) {

  const [presentaciones, setPresentaciones] = useState<ComboPresentacion[]>([]);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/presentacion/combo`)
      .then(res => res.json())
      .then(data => setPresentaciones(data))
      .catch(error => console.error('Error fetching presentaciones', error));
  }, []);

  useEffect(() => {
    if (selectedId !== null && !presentaciones.find(presentacion => presentacion.id_presentacion === selectedId)) {
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
          <SelectItem key={presentacion.id_presentacion} value={presentacion.id_presentacion.toString()}>
            {presentacion.name_presentacion}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}