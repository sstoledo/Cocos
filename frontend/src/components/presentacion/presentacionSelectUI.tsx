import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Presentacion, PresentacionSelectProps } from "./types";

interface PresentacionSelectUIProps extends PresentacionSelectProps {
  presentacion: Presentacion[];
}

export const PresentacionUI: React.FC<PresentacionSelectUIProps> = ({ onSelect, selectedId, presentacion }) => (
  <Select
    onValueChange={(value) => onSelect(value || null)}
    value={selectedId || ''}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a presentacion" />
    </SelectTrigger>
    <SelectContent>
      {presentacion.map((p) => (
        <SelectItem
          key={p.id}
          value={p.id}
        >
          {p.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>

);