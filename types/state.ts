import { AuthUser } from "./user";

export interface UserAuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isAuthModelOpen: boolean;

  setUser: (user: AuthUser) => void;
  logout: () => void;
  setAuthModelOpen: () => void;
}

export interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}
