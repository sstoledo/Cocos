"use client"

import * as React from "react"
import { Moon, Sun, SunMoon } from "lucide-react"
import { useTheme } from "next-themes"

import { Button } from "@ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/dropdown-menu"

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="
          bg-light-bg-secondary
          text-light-text-secondary
          hover:text-light-text-primary
          hover:bg-light-bg-tertiary
          dark:bg-dark-bg-primary
          dark:text-dark-text-secondary
          dark:hover:bg-dark-bg-container
          dark:hover:text-dark-text-primary 
          border-none
          "
        >
          <Sun
            className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-gray-500 dark:text-gray-300"
          />
          <Moon
            className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-gray-500 dark:text-gray-300"
          />
          <span
            className="sr-only"
          >
            Toggle theme
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="
        w-20 absolute top-5 right-0
        bg-light-bg-secondary
        border-light-border-default
        dark:bg-dark-bg-container
        dark:border-dark-border-default
        "
      >
        <DropdownMenuItem
          onClick={() => setTheme("light")}
          className="
          text-light-text-secondary
          hover:bg-light-bg-tertiary
          hover:text-light-text-primary
          dark:text-dark-text-secondary
          dark:hover:bg-dark-bg-accent
          dark:hover:text-dark-text-primary
        "
        >
          <Sun
            className="h-4 w-4
          "
          />
          <span className="ml-2 
          text-light-text-primary
          dark:text-dark-text-primary
          "
          >
            Light
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("dark")}
          className="
          text-light-text-secondary
          hover:bg-light-bg-tertiary
          hover:text-light-text-primary
          dark:text-dark-text-secondary
          dark:hover:bg-dark-bg-accent
          dark:hover:text-dark-text-primary
        "
        >
          <Moon
            className="h-4 w-4"
          />
          <span className="ml-2 
          text-light-text-primary
          dark:text-dark-text-primary
          "
          >
            Dark
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setTheme("system")}
          className="
          text-light-text-secondary
          hover:bg-light-bg-tertiary
          hover:text-light-text-primary
          dark:text-dark-text-secondary
          dark:hover:bg-dark-bg-accent
          dark:hover:text-dark-text-primary
        "
        >
          <SunMoon
            className="h-4 w-4"
          />
          <span className="ml-2 
          text-light-text-primary
          dark:text-dark-text-primary
          "
          >
            System
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
