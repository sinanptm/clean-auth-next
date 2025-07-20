import { ReactNode } from "react";
import { AuthUser } from "./user";

export interface WrapperProps {
  children: ReactNode;
}

export interface LoadingOverlayProps {
  loading?: boolean;
  children?: React.ReactNode;
}

export interface NavMenuProps {
  user?: AuthUser;
  onSignOut: () => void;
}
