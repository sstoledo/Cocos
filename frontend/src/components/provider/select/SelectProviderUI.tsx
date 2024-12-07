'use client';

import { memo } from "react";
import { ProviderSelectUIProps } from "../type";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";


export const SelectProviderUI = memo<ProviderSelectUIProps>(({ onSelect, selectedId, providers }) => (
  <Select
    onValueChange={(value) => onSelect(value || null)}
    value={selectedId || undefined}
  >
    <SelectTrigger className='w-full'>
      <SelectValue placeholder="Select a provider" />
    </SelectTrigger>
    <SelectContent>
      {providers.length > 0 ? (
        providers.map((pro) => (
          <SelectItem
            key={pro.id}
            value={pro.id}
          >
            {pro.name}
          </SelectItem>
        ))
      ) : (
        <SelectItem value="no-providers" disabled>
          No providers available
        </SelectItem>
      )}
    </SelectContent>
  </Select>
));