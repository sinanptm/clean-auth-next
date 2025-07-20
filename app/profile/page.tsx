import { AuthServerUtils } from "@/lib/utils/auth/server";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

const ProfilePage = async () => {
  const user = await AuthServerUtils.getAuthUser();

  if (!user) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] py-8 px-4 sm:py-12 sm:px-0">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center">Profile</h1>
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4">
            <Avatar className="h-20 w-20 mx-auto sm:mx-0">
              {user.profile && <AvatarImage src={user.profile} alt="Profile Picture" />}
              <AvatarFallback>{user.name?.charAt(0).toUpperCase() || "U"}</AvatarFallback>
            </Avatar>
            <div className="text-center sm:text-left">
              <CardTitle className="text-xl sm:text-2xl">{user.name}</CardTitle>
              <p className="text-muted-foreground text-sm break-all">EMAIL: {user.email}</p>
            </div>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ProfilePage;
