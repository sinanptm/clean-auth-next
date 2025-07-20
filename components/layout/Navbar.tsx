"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/store/auth/useAuth";
import LogoutConfirmDialog from "@/components/dialogs/LogoutConfirmDialog";
import { APP_NAME } from "@/constants";
import { UserRole } from "@/types";
import dynamic from "next/dynamic";
import logoutAction from "@/app/(server)/actions/logout";
import NavMenu from "./NavMenu";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const ThemeButton = dynamic(() => import("@/components/common/ThemeButton"), { ssr: false });

const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { isAuthenticated, setAuthModelOpen, logout, user } = useAuth();
  const router = useRouter();

  const handleLogoutClick = useCallback(() => {
    setShowLogoutDialog(true);
  }, []);

  const handleLogoutConfirm = useCallback(async () => {
    setLoading(true);
    const toastId = toast.loading("Logging out...");
    try {
      if (isAuthenticated) {
        await logoutAction();
        logout();
        router.push("/");
        toast.success("Logged out successfully!", { id: toastId });
      }
      setShowLogoutDialog(false);
    } catch (error) {
      console.log(error);
      toast.error("Logout failed.", { id: toastId });
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated, logout, router]);

  return (
    <>
      <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold transition-colors hover:text-primary">
            {APP_NAME}
          </Link>
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <NavMenu user={user!} onSignOut={handleLogoutClick} />
            ) : (
              <>
                <ThemeButton />
                <Button variant="outline" size="sm" onClick={setAuthModelOpen}>
                  Sign In
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>

      <LogoutConfirmDialog
        open={showLogoutDialog}
        onOpenChange={setShowLogoutDialog}
        onConfirm={handleLogoutConfirm}
        userType={UserRole.User}
        isLoading={isLoading}
      />
    </>
  );
};

export default memo(Navbar);
