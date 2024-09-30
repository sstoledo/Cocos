import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Provider, ProviderSelectProps } from "./type";

interface ProviderSelectUIProps extends ProviderSelectProps {
  providers: Provider[];
}

export const ProviderSelectUI: React.FC<ProviderSelectUIProps> = ({ onSelect, selectedId, providers }) => (
  <Select
    onValueChange={(value) => onSelect(value || null)}
    value={selectedId || ''}
  >
    <SelectTrigger>
      <SelectValue placeholder="Select a provider" />
    </SelectTrigger>
    <SelectContent>
      {providers.map((pro) => (
        <SelectItem
          key={pro.id}
          value={pro.id}
        >
          {pro.name}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
);