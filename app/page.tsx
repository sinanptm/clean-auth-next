"use client";

import useAuth from "@/hooks/store/auth/useAuth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Page = () => {
  const { isAuthenticated, setAuthModelOpen, user } = useAuth();

  return (
    <div className="flex flex-col items-center min-h-screen space-y-5 justify-center gap-4">
      <div className="flex gap-4">
        {!isAuthenticated || !user ? (
          <Button variant={"outline"} onClick={setAuthModelOpen}>
            Sign In
          </Button>
        ) : (
          <h1>
            Welcome 🏠{" "}
            <Link className="underline" href={"/profile"}>
              {user.name}
            </Link>
          </h1>
        )}
      </div>
    </div>
  );
};

export default Page;
