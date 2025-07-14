"use client";

import { useMutation } from "@tanstack/react-query";
import { POST } from "@/lib/api";
import { PostRoutes } from "@/types/api/PostRoutes";
import { toast } from "sonner";
import type { TokenUserResponse } from "@/types";
import { onError } from "@/lib/utils";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useLoading from "@/hooks/store/useLoading";

interface AuthData {
  name: string;
  email: string;
  accessToken: string;
  profile: string | null;
}

const useAuthSignIn = () => {
  const { setToken, setUser, setAuthModelOpen } = useAuthUser();
  const { setLoading } = useLoading();

  return useMutation({
    mutationFn: async (data: AuthData) => {
      setLoading(true);
      const response = await POST<TokenUserResponse>({
        route: PostRoutes.OAuthSignIn,
        body: data,
      });
      return response;
    },
    onSuccess: ({ accessToken, user, message }: TokenUserResponse) => {
      toast.success(message, { icon: "🎉" });
      setToken(accessToken);
      setUser(user);
    },
    onError: (e) => {
      setTimeout(() => {
        onError(e);
        setLoading(false);
      }, 0);
    },
    onSettled: () => {
      setAuthModelOpen();
    }
  });
};

export default useAuthSignIn;
