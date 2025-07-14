"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";
import { UserAuthState } from "@/types";
import { AuthClientUtils } from "@/lib/utils/auth/client";

const createAuthStore = create<UserAuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isAuthModelOpen: false,

  /**
   * Sets the authenticated user and updates authentication status.
   *
   * @param user - The authenticated user object, or null to clear the user.
   */
  setUser: (user) => {
    if (user) {
      set({ user, isAuthenticated: true, isAuthModelOpen: false });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  /**
   * Logs out the user by clearing user information and authentication status.
   */
  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  /**
   * Toggles the authentication model's open state.
   */
  setAuthModelOpen: () => {
    set({ isAuthModelOpen: !get().isAuthModelOpen });
  },
}));

/**
 * Custom hook for managing authentication state using Zustand.
 * Hydrates the authentication state from client-side cookies on initial load.
 *
 * @returns An object containing authentication state and actions, including `isHydrated`.
 */
const useAuth = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = createAuthStore();

  useEffect(() => {
    if (!isHydrated) {
      const userInfo = AuthClientUtils.getUserInfo();
      if (userInfo && !store.isAuthenticated) {
        store.setUser(userInfo);
      }
      setIsHydrated(true);
    }
  }, [isHydrated, store]);

  return {
    ...store,
    isHydrated,
  };
};

export default useAuth;
