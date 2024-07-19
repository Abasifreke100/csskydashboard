import { ReactNode } from "react";

export interface LayoutProps {
    children?: ReactNode
  }
  
  export interface DefaultDialogProps {
    isOpen?: boolean
    onClose: () => void
  }
  