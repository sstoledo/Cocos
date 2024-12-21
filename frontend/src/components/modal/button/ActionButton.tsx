import { Button } from "@ui/button";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@ui/tooltip";

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title?: string;
  variant?: "default" | "ghost" | "destructive" | "secondary";
  showText?: boolean;
}

export const ActionButton = ({
  icon: Icon,
  onClick,
  title,
  variant = "destructive",
  showText = false,
}: ActionButtonProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size={showText ? "default" : "icon"}
          className={showText ? 'bg-[#315286]' : "h-9 w-9 p-0 bg-[#315286]"}
          onClick={onClick}
        >
          <Icon className={`h-4 w-4 ${showText ? "mr-2" : ""}`} />
          {showText && title}
        </Button >
      </TooltipTrigger>
      {!showText &&
        <TooltipContent>{title}</TooltipContent>
      }
    </Tooltip>
  </TooltipProvider>
);