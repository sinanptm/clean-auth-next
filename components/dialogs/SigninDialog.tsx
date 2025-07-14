"use client";

import { memo, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/store/auth/useAuth";
import signinAction from "@/app/(server)/actions/signin";
// for initializing firebase config;
import {} from "@/config";
import LoadingOverlay from "../common/LoadingOverlay";

const SignInDialog = () => {
  const { isAuthModelOpen, setAuthModelOpen, isHydrated, setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const auth = getAuth();

  const handleOAuthSignIn = async (provider: GithubAuthProvider | GoogleAuthProvider) => {
    setIsLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);

      if (!result.user.email) {
        toast.error("Unable to get email from provider");
        return;
      }

      const firebaseIdToken = await result.user.getIdToken();

      const res = await signinAction(firebaseIdToken);

      if (res.data) {
        setUser(JSON.parse(res.data)!);
        toast.success("Signed in successfully!");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      console.log(error);
      toast.error("Unknown error occurred :");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isHydrated || !isAuthModelOpen) return;

  return (
    <Dialog open={isAuthModelOpen} onOpenChange={setAuthModelOpen}>
      <DialogContent className="sm:max-w-[500px] p-">
        <DialogHeader className="text-center">
          <DialogTitle className="text-2xl font-bold">Sign In</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose your preferred method to sign in.
          </DialogDescription>
        </DialogHeader>
        <div className={`flex flex-col gap-3 py-5`}>
          <Button
            variant="outline"
            type="button"
            onClick={() => handleOAuthSignIn(new GithubAuthProvider())}
            className={`flex items-center gap-2 h-11`}
            disabled={isLoading}
          >
            <Github size={18} />
            <span>Continue with GitHub</span>
          </Button>

          <Button
            variant="outline"
            type="button"
            onClick={() => handleOAuthSignIn(new GoogleAuthProvider())}
            className="flex items-center gap-2 h-11"
            disabled={isLoading}
          >
            <Image alt="Google" src="/assets/google.svg" width={18} height={18} />
            <span>Continue with Google</span>
          </Button>
        </div>
      </DialogContent>

      <LoadingOverlay loading={isLoading} />
    </Dialog>
  );
};

export default memo(SignInDialog);
