'use client';

import { useEffect } from "react";
import { PresentacionSelectProps } from "./types";
import { usePresentacion } from "./usePresentacion";
import { PresentacionUI } from "./presentacionSelectUI";

function PresentacionSelect({ onSelect, selectedId }: PresentacionSelectProps) {

  const presentacion = usePresentacion();

  useEffect(() => {
    if (selectedId && !presentacion.find(p => p.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, presentacion, onSelect]);

  return (
    <PresentacionUI
      onSelect={onSelect}
      selectedId={selectedId}
      presentacion={presentacion}
    />
  );
}

export default PresentacionSelect;