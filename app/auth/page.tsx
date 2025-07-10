import { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import OAuthButtons from "@/components/user/auth/OAuthButtons";


const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center">Sign In</CardTitle>
        </CardHeader>
        <CardContent>
          <OAuthButtons className="mb-4" />
          <div className="text-center">
            <span className="text-sm text-muted-foreground">Don't have an account? </span>
            <Link
              prefetch={false}
              href={"/auth/signup"}
              className="text-sm font-medium text-primary hover:text-primary/80 hover:underline transition-colors"
            >
              Signup
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default memo(Signin);
