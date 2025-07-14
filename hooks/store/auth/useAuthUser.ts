"use client";

import { create } from "zustand";
import { getItemLocalStorage, setItemLocalStorage } from "@/lib/utils/index";
import { useEffect, useState } from "react";
import { UserAuthState } from "@/types";

// This is just the store creation without any hydration logic
const createAuthStore = create<UserAuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isAuthModelOpen: false,


  setUser: (user) => {
    if (user) {
      set({ user, isAuthenticated: true });
      setItemLocalStorage("user", JSON.stringify(user));
    } else {
      set({ user: null, isAuthenticated: false });
      localStorage.removeItem("user");
    }
  },

  logout: () => {
    localStorage.removeItem("user");
    set({ user: null, isAuthenticated: false });
  },

  setAuthModelOpen: () => {
    set({ isAuthModelOpen: !get().isAuthModelOpen });
  }
}));

// This hook handles hydration and returns the store
const useAuthUser = () => {
  const [isHydrated, setIsHydrated] = useState(false);
  const store = createAuthStore();

  // Hydrate the store on the client side
  useEffect(() => {
    if (!isHydrated) {
      const userStr = getItemLocalStorage("user");
      const user = userStr ? JSON.parse(userStr) : null;

      store.setUser(user);
      setIsHydrated(true);
    }
  }, [isHydrated, store]);

  return {
    ...store,
    isHydrated,
  };
};

export default useAuthUser;
