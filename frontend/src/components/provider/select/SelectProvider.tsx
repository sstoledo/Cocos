'use client';

import { useEffect, useState } from "react";
import { ProviderSelectProps } from "../type";
import { ProviderResponseSelect } from "@/interfaces/providers/providers-response";
import Cookies from "js-cookie";
import { getProvidersSelect } from "@/helpers/apis/providers/provider-api";
import { SelectProviderUI } from "./SelectProviderUI";

export default function SelectProvider({ onSelect, selectedId }: ProviderSelectProps) {

  const [providers, setProviders] = useState<ProviderResponseSelect[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const token = Cookies.get("authToken");

  useEffect(() => {
    const fetchProviders = async () => {
      if (token) {
        try {
          setLoading(true);
          setError(null);
          const fetchedProviders = await getProvidersSelect(token);
          setProviders(fetchedProviders);
        } catch (error) {
          console.log('Error fetching providers:', error);
          setError('Failed to fetch providers');
          setProviders([]);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchProviders();
  }, [token]);

  useEffect(() => {
    if (selectedId && !providers.find(p => p.id === selectedId)) {
      onSelect(null);
    }
  }, [selectedId, providers, onSelect]);

  if (loading) return <div>Loading providers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <SelectProviderUI
      onSelect={onSelect}
      selectedId={selectedId}
      providers={providers}
    />
  );
}