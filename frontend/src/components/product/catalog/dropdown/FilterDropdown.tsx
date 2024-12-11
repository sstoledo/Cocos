import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@ui/dropdown-menu';
import { Button } from '@ui/button';
import { Badge } from "@ui/badge";
import { ChevronDown } from 'lucide-react';
import { Filters } from '@product/types';

interface FilterDropdownProps {
  title: string;
  icon: any;
  items: string[];
  type: keyof Filters;
  activeFilters: Filters;
  onToggleFilter: (type: keyof Filters, value: string) => void;
}

export function FilterDropdown({
  title,
  icon: Icon,
  items,
  type,
  activeFilters,
  onToggleFilter
}: FilterDropdownProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={activeFilters[type].length > 0 ? "outline" : "default"}
          className="h-9 justify-between min-w-[150px] bg-[#3b82f6]"
        >
          <Icon className="mr-2 h-4 w-4" />
          {title}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-[#f0f5ff]">
        <DropdownMenuLabel>Seleccionar {title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="flex items-center justify-between"
            onClick={() => onToggleFilter(type, item)}
          >
            {item}
            {activeFilters[type].includes(item) && (
              <Badge variant="secondary" className="ml-2">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}