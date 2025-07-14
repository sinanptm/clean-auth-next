"use client";

import useAuthUser from "@/hooks/store/auth/useAuthUser";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { isAuthenticated, isHydrated, setAuthModelOpen } = useAuthUser();

  if (!isHydrated) {
    return (
      <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
        <div className="flex gap-4">
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
      <div className="flex gap-4">
        {!isAuthenticated ? (
          <Button
            variant={"outline"}
            onClick={setAuthModelOpen}
          >
            Sign In
          </Button>
        ) : (
          <h1>Welcome 🏠</h1>
        )}
      </div>
    </div>
  );
};

export default Page;
