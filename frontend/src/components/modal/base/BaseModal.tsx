"use client";

import { BaseModalProps } from "@modal/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/dialog";

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
    "3xl": "max-w-3xl",
    "4xl": "max-w-4xl",
    full: "max-w-full"
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange} modal>
      <DialogContent
        className={`${widthClasses[maxWidth]} w-full mx-auto overflow-y-auto max-h-[90vh]`}
        onPointerDownOutside={(e) => {
          if (preventAutoFocus) {
            e.preventDefault();
          } else {
            onOpenChange(false);
          }
        }}
      >
        <DialogTitle>
          {title && <DialogTitle>{title}</DialogTitle>}
        </DialogTitle>
        <DialogHeader className="pt-2">
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};