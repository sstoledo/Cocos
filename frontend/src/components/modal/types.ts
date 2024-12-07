export interface BaseModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  title: string;
  description?: string;
  maxWidth?: "sm" | "md" | "lg";
  preventAutoFocus?: boolean;
}