"use client";

import { create } from "zustand";
import { useEffect, useState } from "react";
import { UserAuthState } from "@/types";
import { AuthClientUtils } from "@/lib/utils/auth/client";

const createAuthStore = create<UserAuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isAuthModelOpen: false,

  setUser: (user) => {
    if (user) {
      set({ user, isAuthenticated: true, isAuthModelOpen: false });
    } else {
      set({ user: null, isAuthenticated: false });
    }
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
  },

  setAuthModelOpen: () => {
    set({ isAuthModelOpen: !get().isAuthModelOpen });
  },
}));

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
