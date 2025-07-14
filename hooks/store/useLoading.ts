import { LoadingState } from "@/types";
import { create } from "zustand";

/**
 * Zustand store for managing global loading state.
 */
const useLoading = create<LoadingState>((set) => {
  return {
    isLoading: false,
    /**
     * Sets the global loading state.
     *
     * @param isLoading - A boolean indicating whether the application is loading.
     */
    setLoading: (isLoading) => {
      set({ isLoading });
    },
  };
});
export default useLoading;
