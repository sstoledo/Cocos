"use client";

import { Button } from "@ui/button";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title?: string;
  variant?: "default" | "ghost" | "destructive" | "secondary" | "outline" | "link" | "tertiary";
  showText?: boolean;
}

export const ActionButton = ({
  icon: Icon,
  onClick,
  title,
  variant = "tertiary",
  showText = false,
}: ActionButtonProps) => (
  <TooltipProvider> 
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={showText ? "default" : "icon"}
          onClick={onClick}
        >
          <Icon className="h-4 w-4" />
          <span className="hidden md:inline-block xl:inline-block">
            {showText && title}
          </span>
        </Button >
      </TooltipTrigger>
      {!showText &&
        <TooltipContent>{title}</TooltipContent>
      }
    </Tooltip>
  </TooltipProvider>
);