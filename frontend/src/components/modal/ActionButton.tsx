import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ActionButtonProps {
  icon: LucideIcon;
  onClick: () => void;
  title: string;
  variant?: "default" | "ghost" | "destructive";
  showText?: boolean;
}

export const ActionButton = ({
  icon: Icon,
  onClick,
  title,
  variant = "ghost",
  showText = false,
}: ActionButtonProps) => (
  <Button
    variant={variant}
    size={showText ? "default" : "icon"}
    className={showText ? undefined : "h-8 w-8 p-0"}
    onClick={onClick}
    title={title}
  >
    <Icon className={`h-4 w-4 ${showText ? "mr-2" : ""}`} />
    {showText && title}
  </Button>
);