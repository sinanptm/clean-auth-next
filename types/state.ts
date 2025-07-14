export type AuthUser = {
  name: string;
  id: string;
  profile?: string;
};
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
