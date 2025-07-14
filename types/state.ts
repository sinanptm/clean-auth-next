type User = {
  name: string;
  id: string;
};
export interface UserAuthState {
  isAuthenticated: boolean;
  token: string | null;
  user: User | null;
  isAuthModelOpen: boolean;

  setToken: (token: string) => void;
  setUser: (user: User) => void;
  logout: () => void;
  initialize: (token: string | null, user: User | null) => void;
  setAuthModelOpen: () => void;
}


export interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}
