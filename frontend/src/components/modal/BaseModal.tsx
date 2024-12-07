import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { BaseModalProps } from "./types";

export const BaseModal = ({
  open,
  onOpenChange,
  children,
  title,
  description,
  maxWidth = "sm",
  preventAutoFocus = false,
}: BaseModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`sm:max-w-[${maxWidth === "sm" ? "425px" : maxWidth === "md" ? "640px" : "1024px"}]`}
        onOpenAutoFocus={(e) => preventAutoFocus && e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};