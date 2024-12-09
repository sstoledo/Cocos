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