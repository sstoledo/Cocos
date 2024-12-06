'use client';

import { useEffect, useState } from "react";
import { PresentacionSelectProps } from "./types";
import { getPresentacion } from "@/helpers/apis/presentacion/presentacion-api";
import { PresentacionResponse } from "@/interfaces";
import { PresentacionUI } from "./presentacionSelectUI";
import Cookies from "js-cookie";

function PresentacionSelect({ onSelect, selectedId }: PresentacionSelectProps) {

  const [presentacion, setPresentacion] = useState<PresentacionResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchPresentacions = async () => {
      if (token) {
        try {
          setLoading(true);
          setError(null);
          const fetchedPresentacions = await getPresentacion(token);
          console.log("Fetched presentacion:", fetchedPresentacions); // Debug log
          setPresentacion(fetchedPresentacions);
        } catch (error) {
          console.error("Error fetching presentacion:", error);
          setError("Failed to fetch presentacion");
          setPresentacion([]);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPresentacions();
  }, [token]);

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