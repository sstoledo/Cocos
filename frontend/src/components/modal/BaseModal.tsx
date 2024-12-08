import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseModalProps } from "./types";
import { X } from "lucide-react";
import { Button } from "../ui/button";

export const BaseModal = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  maxWidth = "sm",
  preventAutoFocus = false,
}: BaseModalProps) => {

  const widthClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    "2xl": "max-w-2xl",
    full: "max-w-full"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className={`${widthClasses[maxWidth]} w-full mx-auto`}
        onPointerDownOutside={(e) => {
          if (preventAutoFocus) {
            e.preventDefault();
          } else {
            onOpenChange(false);
          }
        }}
      >

        <DialogHeader className="pt-2">
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};