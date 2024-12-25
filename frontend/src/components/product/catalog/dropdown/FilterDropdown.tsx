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
          variant="secondary"
          className={cn(
            "relative flex items-center gap-1 min-w-[40px]",
            "sm:min-w-[120px] sm:gap-2 sm:px-3",
            "md:min-w-[140px] md:px-4",
            isActive && "ring-2 ring-blue-300 focus-visible:ring-2 focus-visible:ring-blue-300 dark:ring-primary-400"
          )}
        >
          <Icon className="h-4 w-4 flex-shrink-0" />
          <span className="hidden sm:block text-sm font-medium truncate max-w-[80px] md:max-w-[100px]">
            {title}
          </span>
          <ChevronDown className="h-4 w-4 flex-shrink-0" />
          {isActive && (
            <Badge
              variant="secondary"
              className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs"
            >
              {activeFilters[type].length}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="start"
        className="w-[200px] max-h-[300px] overflow-y-auto
          bg-light-bg-surface dark:bg-dark-bg-accent
          border border-light-border-default dark:border-dark-border-default
          shadow-lg rounded-md
        "
      >
        <DropdownMenuLabel className="dark:text-white flex items-center gap-2">
          <Icon className="h-4 w-4" />
          <span>{title}</span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="dark:bg-gray-700" />

        {items.map((item) => (
          <DropdownMenuItem
            key={item}
            className="flex items-center justify-between 
              text-light-text-primary dark:text-dark-text-primary
              hover:bg-light-bg-hover dark:hover:bg-dark-bg-hover
              focus:bg-light-bg-active dark:focus:bg-dark-bg-active
              data-[highlighted]:bg-light-bg-hover dark:data-[highlighted]:bg-dark-bg-hover
              pl-[calc(0.75rem_+_theme(space.4)_*_var(--indent,0))]
            "
            onClick={() => onToggleFilter(type, item)}
          >
            <span className="flex items-center gap-2 truncate flex-1 min-w-0">
              <span className="truncate">{item}</span>
            </span>
            {activeFilters[type].includes(item) && (
              <Badge variant="secondary" className="flex-shrink-0 ml-2 dark:bg-gray-700 dark:text-white">
                ✓
              </Badge>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}