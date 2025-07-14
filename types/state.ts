type User = {
  name: string;
  id: string;
  profile: string;
};
export interface UserAuthState {
  isAuthenticated: boolean;
  user: User | null;
  isAuthModelOpen: boolean;

  setUser: (user: User) => void;
  logout: () => void;
  setAuthModelOpen: () => void;
}


export interface LoadingState {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}
