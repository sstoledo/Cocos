"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@lib/utils"
import { Button } from "@ui/button"
import { Calendar } from "@ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/popover"

interface DatePickerDemoProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePickerDemo({ value, onChange }: DatePickerDemoProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "lg:w-[280px] justify-start text-left font-normal",
            !value && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {value ? format(value, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={value}
          onSelect={onChange}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
