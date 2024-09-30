'use client';

import { useEffect } from "react";
import { ProviderSelectProps } from "./type";
import { useProvider } from "./useProvider";
import { ProviderSelectUI } from "./providerSelectUI";

export default function ProviderSelect({ onSelect, selectedId }: ProviderSelectProps) {

  const providers = useProvider();

  useEffect(() => {
    if (selectedId && !providers.find(pro => pro.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, providers, onSelect])

  return (
    <ProviderSelectUI
      onSelect={onSelect}
      selectedId={selectedId}
      providers={providers}
    />
  );
}