import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";
import OAuthButtons from "@/components/user/auth/OAuthButtons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Signup",
};

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign Up</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <OAuthButtons className="mb-4" />
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Already have an account? </span>
            <Link
              prefetch={false}
              href={"/auth"}
              className="text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Signin
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(Signup);
