"use client";

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
import { cn } from '@lib/utils';

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

  const isActive = activeFilters[type].length > 0;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant={"default"}
          className={cn(
            "h-9 px-4 flex items-center gap-2 bg-[#315286] hover:bg-[#243c73] focus-visible:outline-none",
            isActive && "ring-2 ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300 dark:ring-primary-400"
          )}
        >
          <Icon className="mr-2 h-4 w-4" />
          <span className="hidden sm:hidden md:flex">{title}</span> {/* Ocultar nombre en sm, mostrar en dsm */}
          <ChevronDown className="ml-2 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[200px] bg-dark-bg-primary dark:bg-gray-800">
        <DropdownMenuLabel className="dark:text-white">Seleccionar {title}</DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-gray-700" />
        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="flex items-center justify-between dark:text-white"
            onClick={() => onToggleFilter(type, item)}
          >
            <span className="flex items-center gap-2">
              <Icon className="h-4 w-4" /> {/* Mostrar ícono en todas las pantallas */}
              <span className="hidden sm:hidden dsm:flex">{item}</span> {/* Ocultar nombre en sm, mostrar en dsm */}
            </span>
            {activeFilters[type].includes(item) && (
              <Badge variant="secondary" className="ml-2 dark:bg-gray-700 dark:text-white">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}