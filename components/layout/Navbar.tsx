"use client";

import { memo, useCallback, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import useAuthUser from "@/hooks/store/auth/useAuthUser";
import LogoutConfirmDialog from "@/components/dialogs/LogoutConfirmDialog";
import { APP_NAME } from "@/constants";
import { UserRole } from "@/types";
import dynamic from "next/dynamic";
import logoutAction from "@/app/(server)/actions/logout";

const ThemeButton = dynamic(() => import("@/components/common/ThemeButton"), { ssr: false });

const Navbar = () => {
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { isAuthenticated: isUserAuthenticated, setAuthModelOpen } = useAuthUser();

  const handleLogoutClick = useCallback(() => {
    setShowLogoutDialog(true);
  }, []);

  const handleLogoutConfirm = useCallback(async () => {
    try {
      setLoading(true);
      if (isUserAuthenticated) {
        await logoutAction();
      }
      setShowLogoutDialog(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [isUserAuthenticated]);


  return (
    <>
      <nav className="h-14 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-full items-center justify-between px-4">
          <Link href="/" className="text-lg font-semibold transition-colors hover:text-primary">
            {APP_NAME}
          </Link>
          <div className="flex items-center space-x-4">
            <ThemeButton />
            {isUserAuthenticated ? (
              <Button variant="outline" size="sm" onClick={handleLogoutClick}>
                Logout
              </Button>
            ) : (
              <>
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
