"use client";

import { memo, useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import useLogoutUser from "@/hooks/api/auth/useLogout";
import LogoutConfirmDialog from "@/components/dialogs/LogoutConfirmDialog";
import { APP_NAME } from "@/constants";
import { UserRole } from "@/types";

const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const { isAuthenticated: isUserAuthenticated } = useAuthUser();
  const { mutate: logoutUser, isPending: isUserLogoutPending } = useLogoutUser();

  const handleLogoutClick = useCallback(() => {
    setShowLogoutDialog(true);
  }, []);

  const handleLogoutConfirm = useCallback(() => {
    if (isUserAuthenticated) {
      logoutUser();
    }
    setShowLogoutDialog(false);
  }, [isUserAuthenticated, logoutUser]);

  const isLogoutPending = useMemo(() => {
    return isUserLogoutPending;
  }, [isUserLogoutPending]);

  return (
    <>
      <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold transition-colors hover:text-primary">
            {APP_NAME}
          </Link>
          <div className="flex items-center space-x-4">
            {isUserAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : (
              <>
                <Link href="/auth" prefetch={false}>
                  <Button variant="default" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup" prefetch={false}>
                  <Button variant="default" size="sm">
                    Sign Up
                  </Button>
                </Link>
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
        isLoading={isLogoutPending}
      />
    </>
  );
};

export default memo(Navbar);
