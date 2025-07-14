"use client";

import { memo } from "react";
import { toast } from "sonner";
import Image from "next/image";
import { signInWithPopup, GithubAuthProvider, GoogleAuthProvider, getAuth } from "firebase/auth";
import { Github } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import signinAction from "@/app/(server)/actions/signin";
// for initializing firebase config;
import { } from "@/config";

const SignInDialog = () => {
    const { isAuthModelOpen, setAuthModelOpen, isHydrated } = useAuthUser();

    const auth = getAuth();

    const handleOAuthSignIn = async (provider: GithubAuthProvider | GoogleAuthProvider) => {
        try {
            const result = await signInWithPopup(auth, provider);

            if (!result.user.email) {
                toast.error("Unable to get email from provider");
                return;
            }

            const firebaseIdToken = await result.user.getIdToken();

            const serverPayload = {
                name: result.user.displayName || "User",
                email: result.user.email,
                profile: result.user.photoURL,
                accessToken: firebaseIdToken,
            };


            await signinAction(firebaseIdToken);
        } catch (error) {
            console.log(error);
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
                    >
                        <Github size={18} />
                        <span>Continue with GitHub</span>
                    </Button>

                    <Button
                        variant="outline"
                        type="button"
                        onClick={() => handleOAuthSignIn(new GoogleAuthProvider())}
                        className="flex items-center gap-2 h-11"
                    >
                        <Image alt="Google" src="/assets/google.svg" width={18} height={18} />
                        <span>Continue with Google</span>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default memo(SignInDialog);