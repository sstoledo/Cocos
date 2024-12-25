"use client";

import { BaseModalProps } from "@modal/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
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
      <DialogOverlay className="bg-black/50 backdrop-blur-lg" />
      <DialogContent
        className={`
          ${widthClasses[maxWidth]} 
          w-full mx-auto 
          overflow-y-auto 
          max-h-[90vh] 
          bg-light-bg-surface dark:bg-dark-bg-surface
          border border-light-border-default dark:border-dark-border-default
          shadow-lg
          rounded-lg
          text-light-text-primary dark:text-dark-text-primary
          transition-all
          duration-200
          ease-in-out
          transform
          z-50
          `}
        onPointerDownOutside={(e) => {
          if (preventAutoFocus) {
            e.preventDefault();
          } else {
            onOpenChange(false);
          }
        }}
      >
        <DialogTitle className="hidden">
          {title}
        </DialogTitle>
        <DialogHeader className="pt-2">
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};